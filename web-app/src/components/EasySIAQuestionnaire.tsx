'use client'

import React, { useState } from 'react'

interface EasySIAQuestionnaireProps {
  onComplete: (responses: Record<string, any>) => void
  onSkip?: () => void
}

export default function EasySIAQuestionnaire({
  onComplete,
  onSkip
}: EasySIAQuestionnaireProps) {
  const [responses, setResponses] = useState<Record<string, any>>({})

  const handleSubmit = () => {
    onComplete(responses)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Transport Preferences</h3>
      <p className="text-gray-600 mb-6">
        Help us understand your transport needs in the Portuguese-speaking community.
      </p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred transport method
          </label>
          <select 
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            onChange={(e) => setResponses({...responses, transportMethod: e.target.value})}
          >
            <option value="">Select...</option>
            <option value="car">Car sharing</option>
            <option value="public">Public transport</option>
            <option value="both">Both</option>
          </select>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        {onSkip && (
          <button
            type="button"
            onClick={onSkip}
            className="text-gray-500 hover:text-gray-700"
          >
            Skip for now
          </button>
        )}
        <button
          type="button"
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Continue
        </button>
      </div>
    </div>
  )
}
