-- AdyaTribe Community Platform Messages Schema
-- Created: 2025-08-12
-- Purpose: Add live chat functionality with real-time messaging

-- Create messages table for chat functionality
create table public.messages (
    id uuid default uuid_generate_v4() primary key,
    group_id uuid references public.groups(id) on delete cascade not null,
    user_id uuid references public.profiles(id) on delete cascade not null,
    content text not null,
    message_type varchar(20) default 'text' check (message_type in ('text', 'image', 'file', 'system', 'event', 'poll')),
    reply_to uuid references public.messages(id) on delete set null,
    is_edited boolean default false,
    edited_at timestamp with time zone,
    is_deleted boolean default false,
    deleted_at timestamp with time zone,
    is_pinned boolean default false,
    pinned_by uuid references public.profiles(id) on delete set null,
    pinned_at timestamp with time zone,
    attachments jsonb default '[]'::jsonb, -- Array of attachment objects
    mentions text[] default '{}', -- Array of mentioned user IDs
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create message_reactions table for emoji reactions
create table public.message_reactions (
    id uuid default uuid_generate_v4() primary key,
    message_id uuid references public.messages(id) on delete cascade not null,
    user_id uuid references public.profiles(id) on delete cascade not null,
    emoji varchar(10) not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(message_id, user_id, emoji)
);

-- Create typing_indicators table for real-time typing status
create table public.typing_indicators (
    group_id uuid references public.groups(id) on delete cascade not null,
    user_id uuid references public.profiles(id) on delete cascade not null,
    is_typing boolean default false,
    last_typed_at timestamp with time zone default timezone('utc'::text, now()) not null,
    primary key (group_id, user_id)
);

-- Create user_presence table for online status
create table public.user_presence (
    user_id uuid references public.profiles(id) on delete cascade primary key,
    is_online boolean default false,
    last_seen timestamp with time zone default timezone('utc'::text, now()) not null,
    status varchar(20) default 'offline' check (status in ('online', 'away', 'busy', 'offline')),
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create message_notifications table for push notifications
create table public.message_notifications (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.profiles(id) on delete cascade not null,
    group_id uuid references public.groups(id) on delete cascade not null,
    message_id uuid references public.messages(id) on delete cascade not null,
    notification_type varchar(20) not null check (notification_type in ('mention', 'reply', 'new_message', 'group_invite')),
    title varchar(255) not null,
    content text not null,
    is_read boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.messages enable row level security;
alter table public.message_reactions enable row level security;
alter table public.typing_indicators enable row level security;
alter table public.user_presence enable row level security;
alter table public.message_notifications enable row level security;

-- Messages policies
create policy "Group members can view messages" on public.messages
    for select using (
        exists (
            select 1 from public.group_members gm
            where gm.group_id = messages.group_id 
            and gm.user_id = auth.uid()
            and gm.is_active = true
        )
    );

create policy "Group members can insert messages" on public.messages
    for insert with check (
        auth.uid() = user_id and
        exists (
            select 1 from public.group_members gm
            where gm.group_id = messages.group_id 
            and gm.user_id = auth.uid()
            and gm.is_active = true
        )
    );

create policy "Users can update their own messages" on public.messages
    for update using (auth.uid() = user_id and is_deleted = false);

create policy "Users can soft delete their own messages" on public.messages
    for update using (auth.uid() = user_id and is_deleted = true);

-- Message reactions policies
create policy "Group members can view reactions" on public.message_reactions
    for select using (
        exists (
            select 1 from public.messages m
            join public.group_members gm on m.group_id = gm.group_id
            where m.id = message_reactions.message_id
            and gm.user_id = auth.uid()
            and gm.is_active = true
        )
    );

create policy "Group members can add reactions" on public.message_reactions
    for insert with check (
        auth.uid() = user_id and
        exists (
            select 1 from public.messages m
            join public.group_members gm on m.group_id = gm.group_id
            where m.id = message_reactions.message_id
            and gm.user_id = auth.uid()
            and gm.is_active = true
        )
    );

create policy "Users can remove their own reactions" on public.message_reactions
    for delete using (auth.uid() = user_id);

-- Typing indicators policies
create policy "Group members can view typing indicators" on public.typing_indicators
    for all using (
        exists (
            select 1 from public.group_members gm
            where gm.group_id = typing_indicators.group_id
            and gm.user_id = auth.uid()
            and gm.is_active = true
        )
    );

-- User presence policies
create policy "All authenticated users can view presence" on public.user_presence
    for select using (auth.role() = 'authenticated');

create policy "Users can update their own presence" on public.user_presence
    for all using (auth.uid() = user_id);

-- Message notifications policies
create policy "Users can view their own notifications" on public.message_notifications
    for select using (auth.uid() = user_id);

create policy "System can create notifications" on public.message_notifications
    for insert with check (true); -- Will be restricted by RLS function

create policy "Users can update their own notifications" on public.message_notifications
    for update using (auth.uid() = user_id);

-- Add updated_at triggers
create trigger handle_updated_at before update on public.messages
    for each row execute procedure handle_updated_at();

create trigger handle_updated_at before update on public.user_presence
    for each row execute procedure handle_updated_at();

-- Indexes for performance
create index idx_messages_group_id_created_at on public.messages(group_id, created_at desc);
create index idx_messages_user_id on public.messages(user_id);
create index idx_messages_reply_to on public.messages(reply_to) where reply_to is not null;
create index idx_message_reactions_message_id on public.message_reactions(message_id);
create index idx_typing_indicators_group_id on public.typing_indicators(group_id);
create index idx_user_presence_is_online on public.user_presence(is_online) where is_online = true;
create index idx_message_notifications_user_id_read on public.message_notifications(user_id, is_read);

-- Function to automatically create notifications for mentions
create or replace function handle_message_mentions()
returns trigger as $$
declare
    mentioned_user_id uuid;
    sender_name text;
begin
    -- Get sender name
    select concat(first_name, ' ', coalesce(last_name, '')) into sender_name
    from public.profiles where id = new.user_id;

    -- Create notifications for each mentioned user
    foreach mentioned_user_id in array new.mentions
    loop
        -- Only create notification if mentioned user is a group member
        if exists (
            select 1 from public.group_members gm
            where gm.group_id = new.group_id
            and gm.user_id = mentioned_user_id::uuid
            and gm.is_active = true
            and gm.user_id != new.user_id -- Don't notify self
        ) then
            insert into public.message_notifications (
                user_id,
                group_id,
                message_id,
                notification_type,
                title,
                content
            ) values (
                mentioned_user_id::uuid,
                new.group_id,
                new.id,
                'mention',
                concat(sender_name, ' mentioned you'),
                substring(new.content, 1, 100)
            );
        end if;
    end loop;

    return new;
end;
$$ language plpgsql security definer;

-- Trigger for message mentions
create trigger handle_message_mentions_trigger
    after insert on public.messages
    for each row
    when (array_length(new.mentions, 1) > 0)
    execute function handle_message_mentions();

-- Function to clean up old typing indicators
create or replace function cleanup_typing_indicators()
returns void as $$
begin
    update public.typing_indicators
    set is_typing = false
    where is_typing = true
    and last_typed_at < now() - interval '30 seconds';
end;
$$ language plpgsql security definer;

-- Function to update user presence
create or replace function update_user_presence(
    user_uuid uuid,
    online_status boolean,
    presence_status text default 'online'
)
returns void as $$
begin
    insert into public.user_presence (user_id, is_online, status, last_seen)
    values (user_uuid, online_status, presence_status, now())
    on conflict (user_id)
    do update set
        is_online = excluded.is_online,
        status = excluded.status,
        last_seen = excluded.last_seen,
        updated_at = now();
end;
$$ language plpgsql security definer;

-- Comments for documentation
comment on table public.messages is 'Chat messages within groups with support for replies, mentions, and attachments';
comment on table public.message_reactions is 'Emoji reactions to messages';
comment on table public.typing_indicators is 'Real-time typing indicators for group chats';
comment on table public.user_presence is 'User online status and presence information';
comment on table public.message_notifications is 'Push notifications for mentions, replies, and other message events';