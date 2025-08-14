'use client'

import { motion } from 'framer-motion'
import { 
  EyeIcon,
  EyeSlashIcon,
  ShieldCheckIcon,
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  GlobeAltIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline'

interface PrivacySettings {
  showAge: boolean
  showLocation: boolean
  allowMessages: 'everyone' | 'connections' | 'premium'
  profileVisibility: 'public' | 'members_only' | 'connections_only'
}

interface ProfilePrivacyProps {
  privacy: PrivacySettings
  onChange: (privacy: PrivacySettings) => void
}

export default function ProfilePrivacy({ privacy, onChange }: ProfilePrivacyProps) {
  const handleChange = (key: keyof PrivacySettings, value: any) => {
    onChange({
      ...privacy,
      [key]: value
    })
  }

  const privacyLevels = {
    public: {
      icon: <GlobeAltIcon className="w-4 h-4" />,
      label: 'Public',
      description: 'Visible to everyone, including non-members'
    },
    members_only: {
      icon: <UserGroupIcon className="w-4 h-4" />,
      label: 'Members Only',
      description: 'Visible only to LusoTown members'
    },
    connections_only: {
      icon: <LockClosedIcon className="w-4 h-4" />,
      label: 'Connections Only',
      description: 'Visible only to your connections'
    }
  }

  const messageSettings = {
    everyone: {
      label: 'Everyone',
      description: 'All members can message you'
    },
    connections: {
      label: 'Connections Only',
      description: 'Only your connections can message you'
    },
    premium: {
      label: 'Premium Members',
      description: 'Only premium members can message you'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Privacy Settings</h2>
        <p className="text-gray-600">
          Control who can see your information and contact you on LusoTown.
        </p>
      </div>

      {/* Profile Information Visibility */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-gray-200 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <EyeIcon className="w-5 h-5" />
          Profile Information Visibility
        </h3>

        <div className="space-y-6">
          {/* Show Age */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Show My Age</h4>
              <p className="text-sm text-gray-600">
                Display your age on your profile and in search results
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={privacy.showAge}
                onChange={(e) => handleChange('showAge', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FF6B6B]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF6B6B]"></div>
            </label>
          </div>

          {/* Show Location */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Show My Location</h4>
              <p className="text-sm text-gray-600">
                Display your location on your profile (helps with local connections)
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={privacy.showLocation}
                onChange={(e) => handleChange('showLocation', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FF6B6B]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF6B6B]"></div>
            </label>
          </div>
        </div>
      </motion.div>

      {/* Profile Visibility */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white border border-gray-200 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <ShieldCheckIcon className="w-5 h-5" />
          Profile Visibility
        </h3>

        <p className="text-gray-600 mb-6">
          Choose who can view your full profile information
        </p>

        <div className="space-y-3">
          {Object.entries(privacyLevels).map(([key, level]) => (
            <label
              key={key}
              className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                privacy.profileVisibility === key
                  ? 'border-[#FF6B6B] bg-red-50'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <input
                type="radio"
                name="profileVisibility"
                value={key}
                checked={privacy.profileVisibility === key}
                onChange={(e) => handleChange('profileVisibility', e.target.value)}
                className="mt-1 text-[#FF6B6B] focus:ring-[#FF6B6B]"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {level.icon}
                  <span className="font-medium text-gray-900">{level.label}</span>
                </div>
                <p className="text-sm text-gray-600">{level.description}</p>
              </div>
            </label>
          ))}
        </div>
      </motion.div>

      {/* Messaging Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white border border-gray-200 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <ChatBubbleLeftRightIcon className="w-5 h-5" />
          Messaging Permissions
        </h3>

        <p className="text-gray-600 mb-6">
          Control who can send you direct messages
        </p>

        <div className="space-y-3">
          {Object.entries(messageSettings).map(([key, setting]) => (
            <label
              key={key}
              className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                privacy.allowMessages === key
                  ? 'border-[#FF6B6B] bg-red-50'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <input
                type="radio"
                name="allowMessages"
                value={key}
                checked={privacy.allowMessages === key}
                onChange={(e) => handleChange('allowMessages', e.target.value as any)}
                className="mt-1 text-[#FF6B6B] focus:ring-[#FF6B6B]"
              />
              <div className="flex-1">
                <div className="font-medium text-gray-900 mb-1">{setting.label}</div>
                <p className="text-sm text-gray-600">{setting.description}</p>
              </div>
            </label>
          ))}
        </div>
      </motion.div>

      {/* Privacy Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-primary-50 border border-primary-200 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-primary-900 mb-4">Current Privacy Level</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-primary-800">Profile Visibility:</span>
            <div className="flex items-center gap-2 text-primary-900 font-medium">
              {privacyLevels[privacy.profileVisibility].icon}
              {privacyLevels[privacy.profileVisibility].label}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-primary-800">Age Visibility:</span>
            <span className="text-primary-900 font-medium">
              {privacy.showAge ? 'Visible' : 'Hidden'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-primary-800">Location Visibility:</span>
            <span className="text-primary-900 font-medium">
              {privacy.showLocation ? 'Visible' : 'Hidden'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-primary-800">Who Can Message:</span>
            <span className="text-primary-900 font-medium">
              {messageSettings[privacy.allowMessages].label}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Privacy Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-green-50 border border-green-200 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center gap-2">
          <ShieldCheckIcon className="w-5 h-5" />
          Privacy & Safety Tips
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-800">
          <div>
            <h4 className="font-medium mb-2">🔒 Recommended Settings:</h4>
            <ul className="space-y-1">
              <li>• Keep profile visible to members only</li>
              <li>• Show location for better local connections</li>
              <li>• Allow messages from connections only</li>
              <li>• Enable age visibility if comfortable</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">🛡️ Additional Safety:</h4>
            <ul className="space-y-1">
              <li>• Report any inappropriate behavior</li>
              <li>• Block users who make you uncomfortable</li>
              <li>• Meet in public places for first meetings</li>
              <li>• Trust your instincts about connections</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Data & Account */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gray-50 border border-gray-200 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Data & Account Management</h3>
        <div className="space-y-3">
          <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors">
            <EyeIcon className="w-4 h-4" />
            <span>Download My Data</span>
          </button>
          <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors">
            <ShieldCheckIcon className="w-4 h-4" />
            <span>Privacy Policy</span>
          </button>
          <button className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors">
            <EyeSlashIcon className="w-4 h-4" />
            <span>Delete Account</span>
          </button>
        </div>
      </motion.div>
    </div>
  )
}