import { useEffect } from 'react'
import { useGame } from '../hooks/GameContext'
import { GAME_CONFIG } from '../config'

function CategorySpin() {
  const { gameState, setCurrentScreen } = useGame()
  const cat = gameState?.currentCategory
  const icon = GAME_CONFIG.subtitles.categoryIcons[cat] || '⭐'
  const name = GAME_CONFIG.subtitles.categoryNames[cat] || cat

  useEffect(() => {
    const timer = setTimeout(() => setCurrentScreen('question'), 2500)
    return () => clearTimeout(timer)
  }, [setCurrentScreen])

  return (
    <div className="screen" style={{ justifyContent: 'center', minHeight: '80vh' }}>
      <div className="spin-box">
        <div style={{ fontSize: '80px', marginBottom: 'var(--spacing-md)' }}>{icon}</div>
        <p className="category-name">{name}</p>
      </div>
      <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-light)', marginBottom: 'var(--spacing-lg)' }}>
        Get ready for {GAME_CONFIG.questionsPerRound} questions!
      </p>
      <button
        className="game-btn gold-btn"
        onClick={() => setCurrentScreen('question')}
        style={{ width: '60%' }}
      >
        Start
      </button>
    </div>
  )
}

export default CategorySpin
