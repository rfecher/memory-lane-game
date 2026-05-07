export function useTTS() {
  const speak = (text, rate = 0.85) => {
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = rate
    utterance.pitch = 1
    const voices = window.speechSynthesis.getVoices()
    const femaleVoice = voices.find(v => /female/i.test(v.name))
    if (femaleVoice) utterance.voice = femaleVoice
    window.speechSynthesis.speak(utterance)
  }

  const replay = (text, rate = 0.85) => {
    speak(text, rate)
  }

  return { speak, replay }
}
