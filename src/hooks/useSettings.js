import { useState, useCallback } from 'react'
import { GAME_CONFIG } from '../config'

const SETTINGS_KEY = 'memory-lane-settings'

export function useSettings() {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_KEY)
      if (saved) return { ...GAME_CONFIG, ...JSON.parse(saved) }
    } catch { /* ignore */ }
    return { ...GAME_CONFIG }
  })

  const saveSettings = useCallback((newSettings) => {
    setSettings(newSettings)
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings))
    } catch { /* ignore */ }
  }, [])

  const toggleTTS = useCallback(() => {
    setSettings(prev => {
      const next = { ...prev, ttsEnabled: !prev.ttsEnabled }
      saveSettings(next)
      return next
    })
  }, [saveSettings])

  const setFontSize = useCallback((size) => {
    setSettings(prev => {
      const next = { ...prev, fontSize: size }
      saveSettings(next)
      return next
    })
  }, [saveSettings])

  const setSpeechSpeed = useCallback((speed) => {
    setSettings(prev => {
      const next = { ...prev, ttsRate: speed === 'slow' ? 0.85 : 1.0 }
      saveSettings(next)
      return next
    })
  }, [saveSettings])

  return { settings, toggleTTS, setFontSize, setSpeechSpeed }
}
