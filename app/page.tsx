'use client'

import { useState, useEffect } from 'react'
import { Calculator, Users, Calendar, AlertCircle } from 'lucide-react'

interface PlatformData {
  engineers: number
  leaveDays: number
  holidays: number
}

interface PlatformResults {
  totalCapacity: number
  availableCapacity: number
  storyPoints: number
}

export default function SprintCalculator() {
  const [businessDays, setBusinessDays] = useState(10)
  const [holidays, setHolidays] = useState(0)
  const [platforms, setPlatforms] = useState<Record<string, PlatformData>>({
    web: { engineers: 5, leaveDays: 0, holidays: 0 },
    android: { engineers: 5, leaveDays: 0, holidays: 0 },
    ios: { engineers: 6, leaveDays: 0, holidays: 0 }
  })

  const [results, setResults] = useState<Record<string, PlatformResults>>({})

  const calculateStoryPoints = (platform: PlatformData): PlatformResults => {
    const totalCapacity = platform.engineers * businessDays
    const leavesImpact = platform.leaveDays
    const holidaysImpact = platform.engineers * holidays
    const availableCapacity = Math.max(0, totalCapacity - leavesImpact - holidaysImpact)
    const storyPoints = Math.round((availableCapacity / businessDays) * 8)
    
    return {
      totalCapacity,
      availableCapacity,
      storyPoints
    }
  }

  useEffect(() => {
    const newResults: Record<string, PlatformResults> = {}
    Object.entries(platforms).forEach(([platformName, platformData]) => {
      newResults[platformName] = calculateStoryPoints(platformData)
    })
    setResults(newResults)
  }, [platforms, businessDays, holidays])

  const updatePlatform = (platformName: string, field: keyof PlatformData, value: number) => {
    setPlatforms(prev => ({
      ...prev,
      [platformName]: {
        ...prev[platformName],
        [field]: Math.max(0, value)
      }
    }))
  }

  const totalStoryPoints = Object.values(results).reduce((sum, result) => sum + result.storyPoints, 0)

  const platformConfig = {
    web: { name: 'Web', color: 'bg-blue-500', lightColor: 'bg-blue-50', textColor: 'text-blue-700', icon: '🌐' },
    android: { name: 'Android', color: 'bg-green-500', lightColor: 'bg-green-50', textColor: 'text-green-700', icon: '🤖' },
    ios: { name: 'iOS', color: 'bg-gray-800', lightColor: 'bg-gray-50', textColor: 'text-gray-700', icon: '📱' }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calculator className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Sprint Story Points Calculator</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Calculate story points for your sprint based on team capacity, engineer leaves, and holidays. 
            Each engineer ideally works on 8 story points per sprint.
          </p>
        </div>

        {/* Business Days Input */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Sprint Configuration</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Business Days in Sprint
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={businessDays}
                onChange={(e) => setBusinessDays(Math.max(1, parseInt(e.target.value) || 1))}
                onFocus={(e) => e.target.select()}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Holiday Days (Applies to All Platforms)
              </label>
              <input
                type="number"
                min="0"
                max="30"
                value={holidays}
                onChange={(e) => setHolidays(Math.max(0, parseInt(e.target.value) || 0))}
                onFocus={(e) => e.target.select()}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
              />
            </div>
          </div>
        </div>

        {/* Platform Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {Object.entries(platformConfig).map(([platformKey, config]) => {
            const platformData = platforms[platformKey]
            const result = results[platformKey] || { totalCapacity: 0, availableCapacity: 0, storyPoints: 0 }
            
            return (
              <div key={platformKey} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className={`${config.color} px-6 py-4`}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{config.icon}</span>
                    <h3 className="text-xl font-semibold text-white">{config.name}</h3>
                  </div>
                </div>
                
                <div className="p-6">
                  {/* Input Fields */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Users className="inline h-4 w-4 mr-1" />
                        Number of Engineers
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={platformData.engineers}
                        onChange={(e) => updatePlatform(platformKey, 'engineers', parseInt(e.target.value) || 0)}
                        onFocus={(e) => e.target.select()}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <AlertCircle className="inline h-4 w-4 mr-1" />
                        Total Leave Days (All Engineers)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={platformData.leaveDays}
                        onChange={(e) => updatePlatform(platformKey, 'leaveDays', parseInt(e.target.value) || 0)}
                        onFocus={(e) => e.target.select()}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                      />
                    </div>
                  </div>

                  {/* Results */}
                  <div className={`${config.lightColor} rounded-lg p-4`}>
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-gray-900">Story Points:</span>
                      <span className={`${config.textColor}`}>
                        {result.storyPoints}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Total Summary */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Sprint Total</h2>
            <div className="text-5xl font-bold text-blue-600">{totalStoryPoints}</div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Story points are calculated based on 8 points per engineer per sprint, adjusted for leaves and holidays.</p>
        </div>
      </div>
    </div>
  )
}
