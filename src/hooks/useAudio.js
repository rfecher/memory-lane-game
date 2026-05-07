export function useAudio() {
  const play = useCallback((frequencies, type = 'sine', duration = 0.15) => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)()
      frequencies.forEach((freq, i) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = type
        osc.frequency.value = freq
        gain.gain.setValueAtTime(0.3, ctx.currentTime + i * duration)
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * duration + duration * 2)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(ctx.currentTime + i * duration)
        osc.stop(ctx.currentTime + i * duration + duration * 2)
      })
    } catch { /* ignore audio errors */ }
  }, [])

  const playCorrect = useCallback(() => play([523, 659, 784], 'sine', 0.12), [play])
  const playWrong = useCallback(() => play([220], 'sine', 0.3), [play])
  const playComplete = useCallback(() => play([523, 659, 784, 1047], 'sine', 0.15), [play])

  return { playCorrect, playWrong, playComplete }
}
