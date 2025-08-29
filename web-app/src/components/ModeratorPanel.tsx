'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Shield, 
  Settings, 
  Users, 
  MessageSquare, 
  Clock, 
  Ban, 
  AlertTriangle,
  Eye,
  Trash2,
  Crown
} from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { ChatRoom, ChatUser, ChatModeration } from '@/types/chat'
import { socketManager } from '@/lib/socket-client'
interface ModeratorPanelProps {
  room: ChatRoom | null
  onlineUsers: ChatUser[]
  currentUser: ChatUser | null
  isVisible: boolean
  onClose: () => void
}
export default function ModeratorPanel({ 
  room, 
  onlineUsers, 
  currentUser, 
  isVisible, 
  onClose 
}: ModeratorPanelProps) {
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = useState<'settings' | 'users' | 'moderation'>('settings')
  const [roomSettings, setRoomSettings] = useState({
    slowMode: room?.settings.slowMode || 0,
    subscriberOnly: room?.settings.subscriberOnly || false,
    emoteOnly: room?.settings.emoteOnly || false,
    portugueseOnly: room?.settings.portugueseOnly || false
  })
  const [moderationHistory, setModerationHistory] = useState<ChatModeration[]>([])
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null)
  if (!isVisible || !currentUser?.isModerator) return null
  const handleSettingsUpdate = (setting: string, value: any) => {
    const newSettings = { ...roomSettings, [setting]: value }
    setRoomSettings(newSettings)
    // In real implementation, this would update the room settings via socket
    }
  const handleUserAction = (userId: string, action: 'timeout' | 'ban' | 'unban', duration?: number) => {
    switch (action) {
      case 'timeout':
        socketManager.timeoutUser(userId, duration || 600)
        break
      case 'ban':
        socketManager.banUser(userId)
        break
      // 'unban' would be implemented similarly
    }
  }
  const getUsersByRole = () => {
    const hosts = onlineUsers.filter(u => u.isHost)
    const moderators = onlineUsers.filter(u => u.isModerator && !u.isHost)
    const subscribers = onlineUsers.filter(u => u.isSubscriber && !u.isModerator && !u.isHost)
    const viewers = onlineUsers.filter(u => !u.isSubscriber && !u.isModerator && !u.isHost)
    return { hosts, moderators, subscribers, viewers }
  }
  const { hosts, moderators, subscribers, viewers } = getUsersByRole()
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 300 }}
        className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl z-50 flex flex-col"
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-primary-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                {language === 'pt' ? 'Painel Moderação' : 'Moderation Panel'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-gray-500 hover:text-gray-700 rounded-lg"
            >
              ×
            </button>
          </div>
          {/* Tabs */}
          <div className="flex mt-3 bg-white rounded-lg p-1">
            {[
              { key: 'settings', icon: Settings, label: language === 'pt' ? 'Config' : 'Settings' },
              { key: 'users', icon: Users, label: language === 'pt' ? 'Usuários' : 'Users' },
              { key: 'moderation', icon: AlertTriangle, label: language === 'pt' ? 'Ações' : 'Actions' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded-md text-xs 
                  font-medium transition-colors ${
                  activeTab === tab.key
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <tab.icon className="w-3 h-3" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                {language === 'pt' ? 'Configurações do Chat' : 'Chat Settings'}
              </h3>
              {/* Slow Mode */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {language === 'pt' ? 'Modo Lento' : 'Slow Mode'}
                </label>
                <select
                  value={roomSettings.slowMode}
                  onChange={(e) => handleSettingsUpdate('slowMode', parseInt(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                >
                  <option value={0}>{language === 'pt' ? 'Desativado' : 'Off'}</option>
                  <option value={10}>10 {language === 'pt' ? 'segundos' : 'seconds'}</option>
                  <option value={30}>30 {language === 'pt' ? 'segundos' : 'seconds'}</option>
                  <option value={60}>1 {language === 'pt' ? 'minuto' : 'minute'}</option>
                  <option value={300}>5 {language === 'pt' ? 'minutos' : 'minutes'}</option>
                </select>
              </div>
              {/* Subscriber Only */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-premium-600" />
                  <span className="text-sm font-medium text-gray-700">
                    {language === 'pt' ? 'Só Membros' : 'Subscribers Only'}
                  </span>
                </div>
                <button
                  onClick={() => handleSettingsUpdate('subscriberOnly', !roomSettings.subscriberOnly)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    roomSettings.subscriberOnly ? 'bg-primary-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                      roomSettings.subscriberOnly ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              {/* Emote Only */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm font-medium text-gray-700">
                    {language === 'pt' ? 'Só Emotes' : 'Emote Only'}
                  </span>
                </div>
                <button
                  onClick={() => handleSettingsUpdate('emoteOnly', !roomSettings.emoteOnly)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    roomSettings.emoteOnly ? 'bg-primary-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                      roomSettings.emoteOnly ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              {/* Lusophone Only */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm">🇵🇹</span>
                  <span className="text-sm font-medium text-gray-700">
                    {language === 'pt' ? 'Só Português' : 'Lusophone Only'}
                  </span>
                </div>
                <button
                  onClick={() => handleSettingsUpdate('portugueseOnly', !roomSettings.portugueseOnly)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    roomSettings.portugueseOnly ? 'bg-primary-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                      roomSettings.portugueseOnly ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          )}
          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                {language === 'pt' ? 'Usuários Online' : 'Online Users'} ({onlineUsers.length})
              </h3>
              {/* Hosts */}
              {hosts.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-action-600 mb-2 uppercase tracking-wide">
                    {language === 'pt' ? 'Hosts' : 'Hosts'} ({hosts.length})
                  </h4>
                  <div className="space-y-2">
                    {hosts.map(user => (
                      <UserRow 
                        key={user.id} 
                        user={user} 
                        currentUser={currentUser}
                        onAction={handleUserAction}
                        language={language}
                      />
                    ))}
                  </div>
                </div>
              )}
              {/* Moderators */}
              {moderators.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-blue-600 mb-2 uppercase tracking-wide">
                    {language === 'pt' ? 'Moderadores' : 'Moderators'} ({moderators.length})
                  </h4>
                  <div className="space-y-2">
                    {moderators.map(user => (
                      <UserRow 
                        key={user.id} 
                        user={user} 
                        currentUser={currentUser}
                        onAction={handleUserAction}
                        language={language}
                      />
                    ))}
                  </div>
                </div>
              )}
              {/* Subscribers */}
              {subscribers.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-premium-600 mb-2 uppercase tracking-wide">
                    {language === 'pt' ? 'Membros' : 'Subscribers'} ({subscribers.length})
                  </h4>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {subscribers.map(user => (
                      <UserRow 
                        key={user.id} 
                        user={user} 
                        currentUser={currentUser}
                        onAction={handleUserAction}
                        language={language}
                      />
                    ))}
                  </div>
                </div>
              )}
              {/* Viewers */}
              {viewers.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                    {language === 'pt' ? 'Espectadores' : 'Viewers'} ({viewers.length})
                  </h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {viewers.map(user => (
                      <UserRow 
                        key={user.id} 
                        user={user} 
                        currentUser={currentUser}
                        onAction={handleUserAction}
                        language={language}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          {/* Moderation Tab */}
          {activeTab === 'moderation' && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                {language === 'pt' ? 'Ações de Moderação' : 'Moderation Actions'}
              </h3>
              {moderationHistory.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">
                    {language === 'pt' 
                      ? 'Nenhuma ação de moderação ainda'
                      : 'No moderation actions yet'
                    }
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {moderationHistory.map((action, index) => (
                    <div
                      key={index}
                      className="p-3 bg-gray-50 rounded-lg border-l-4 border-amber-400"
                    >
                      <div className="flex justify-between items-start text-xs">
                        <span className="font-medium">{action.type}</span>
                        <span className="text-gray-500">
                          {action.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mt-1">{action.reason}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="text-xs text-gray-500 text-center">
            {language === 'pt' 
              ? 'Moderação Portuguesa • LusoTown'
              : 'Lusophone Moderation • LusoTown'
            }
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
// User Row Component
function UserRow({ 
  user, 
  currentUser, 
  onAction, 
  language 
}: {
  user: ChatUser
  currentUser: ChatUser | null
  onAction: (userId: string, action: 'timeout' | 'ban' | 'unban', duration?: number) => void
  language: 'en' | 'pt'
}) {
  const [showActions, setShowActions] = useState(false)
  const canModerate = currentUser?.isHost || (currentUser?.isModerator && !user.isHost && !user.isModerator)
  return (
    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 group">
      <div className="flex items-center gap-2">
        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
          user.isHost 
            ? 'bg-gradient-to-r from-action-500 to-secondary-500'
            : user.isModerator
            ? 'bg-gradient-to-r from-blue-500 to-blue-600'
            : user.isSubscriber
            ? 'bg-gradient-to-r from-premium-500 to-premium-600'
            : 'bg-gradient-to-r from-gray-400 to-gray-500'
        }`}>
          {user.username.slice(0, 2).toUpperCase()}
        </div>
        <div>
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium text-gray-900">{user.username}</span>
            {user.isHost && <Crown className="w-3 h-3 text-action-600" />}
            {user.isModerator && !user.isHost && <Shield className="w-3 h-3 text-blue-600" />}
            {user.isSubscriber && !user.isModerator && !user.isHost && (
              <Crown className="w-3 h-3 text-premium-600" />
            )}
          </div>
          <div className="text-xs text-gray-500 flex items-center gap-1">
            <span>🌍</span>
            <span>{user.region}</span>
          </div>
        </div>
      </div>
      {canModerate && (
        <div className="relative">
          <button
            onClick={() => setShowActions(!showActions)}
            className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-gray-600 
              rounded transition-all"
          >
            <AlertTriangle className="w-4 h-4" />
          </button>
          {showActions && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg 
                shadow-lg z-50 py-1 min-w-32"
            >
              <button
                onClick={() => {
                  onAction(user.id, 'timeout', 60)
                  setShowActions(false)
                }}
                className="flex items-center gap-2 w-full px-3 py-1.5 text-xs hover:bg-gray-50 
                  text-amber-600 hover:text-amber-700"
              >
                <Clock className="w-3 h-3" />
                {language === 'pt' ? '1min' : '1min'}
              </button>
              <button
                onClick={() => {
                  onAction(user.id, 'timeout', 600)
                  setShowActions(false)
                }}
                className="flex items-center gap-2 w-full px-3 py-1.5 text-xs hover:bg-gray-50 
                  text-amber-600 hover:text-amber-700"
              >
                <Clock className="w-3 h-3" />
                {language === 'pt' ? '10min' : '10min'}
              </button>
              <hr className="my-1" />
              <button
                onClick={() => {
                  onAction(user.id, 'ban')
                  setShowActions(false)
                }}
                className="flex items-center gap-2 w-full px-3 py-1.5 text-xs hover:bg-gray-50 
                  text-red-600 hover:text-red-700"
              >
                <Ban className="w-3 h-3" />
                {language === 'pt' ? 'Banir' : 'Ban'}
              </button>
            </motion.div>
          )}
        </div>
      )}
    </div>
  )
}