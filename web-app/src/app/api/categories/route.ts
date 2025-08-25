import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

// GET /api/categories - Get streaming categories
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const language = searchParams.get('language') || 'pt'
    const portuguese_only = searchParams.get('portuguese_only') === 'true'
    const include_stats = searchParams.get('include_stats') === 'true'

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    let query = supabase
      .from('stream_categories')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (portuguese_only) {
      query = query.eq('portuguese_focused', true)
    }

    const { data: categories, error } = await query

    if (error) {
      console.error('Error fetching categories:', error)
      return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
    }

    // Format categories based on language preference
    let formattedCategories = (categories || []).map(category => ({
      id: category.id,
      name: language === 'pt' ? category.name_pt : category.name_en,
      slug: category.slug,
      description: language === 'pt' ? category.description_pt : category.description_en,
      icon: category.icon,
      portugueseFocused: category.portuguese_focused,
      culturalContext: category.cultural_context,
      sortOrder: category.sort_order
    }))

    // Include stream count statistics if requested
    if (include_stats) {
      const categoryStats = await Promise.all(
        formattedCategories.map(async (category) => {
          const { count: totalStreams } = await supabase
            .from('streams')
            .select('*', { count: 'exact', head: true })
            .eq('category_id', category.id)

          const { count: liveStreams } = await supabase
            .from('streams')
            .select('*', { count: 'exact', head: true })
            .eq('category_id', category.id)
            .eq('is_live', true)

          return {
            ...category,
            stats: {
              totalStreams: totalStreams || 0,
              liveStreams: liveStreams || 0
            }
          }
        })
      )

      formattedCategories = categoryStats
    }

    return NextResponse.json({
      categories: formattedCategories,
      total: formattedCategories.length,
      language: language,
      portugueseOnly: portuguese_only
    })
  } catch (error) {
    console.error('Error in GET /api/categories:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/categories - Create new streaming category (Admin only)
export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user has admin permissions (you might want to implement a proper admin check)
    const { data: userProfile } = await supabase
      .from('profiles')
      .select('membership_tier')
      .eq('id', user.id)
      .single()

    // For now, only allow premium users to create categories (implement proper admin roles later)
    if (userProfile?.membership_tier !== 'premium') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    }

    const data = await request.json()

    // Validate required fields
    if (!data.name_pt || !data.name_en || !data.slug) {
      return NextResponse.json({ 
        error: 'Lusophone name, English name, and slug are required' 
      }, { status: 400 })
    }

    // Check if slug already exists
    const { data: existingCategory } = await supabase
      .from('stream_categories')
      .select('id')
      .eq('slug', data.slug)
      .single()

    if (existingCategory) {
      return NextResponse.json({ 
        error: 'Category with this slug already exists' 
      }, { status: 400 })
    }

    const categoryData = {
      name_pt: data.name_pt.trim(),
      name_en: data.name_en.trim(),
      slug: data.slug.toLowerCase().trim(),
      description_pt: data.description_pt?.trim() || null,
      description_en: data.description_en?.trim() || null,
      icon: data.icon?.trim() || null,
      portuguese_focused: data.portuguese_focused || false,
      cultural_context: data.cultural_context || 'universal',
      sort_order: data.sort_order || 0
    }

    const { data: newCategory, error: createError } = await supabase
      .from('stream_categories')
      .insert(categoryData)
      .select()
      .single()

    if (createError) {
      console.error('Error creating category:', createError)
      return NextResponse.json({ error: 'Failed to create category' }, { status: 500 })
    }

    return NextResponse.json(newCategory, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/categories:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}