import { useGame } from '../hooks/GameContext'
import { GAME_CONFIG } from '../config'

function CategorySpin() {
  const { gameState } = useGame()
  const cat = gameState?.currentCategory
  const icon = GAME_CONFIG.subtitles.categoryIcons[cat] || '⭐'
  const name = GAME_CONFIG.subtitles.categoryNames[cat] || cat

  return (
    <div className="screen" style={{ justifyContent: 'center', minHeight: '80vh' }}>
      <div className="spin-box">
        <div style={{ fontSize: '80px', marginBottom: 'var(--spacing-md)' }}>{icon}</div>
        <p className="category-name">{name}</p>
      </div>
      <div style={{ marginTop: 'var(--spacing-lg)', textAlign: 'center' }}>
        <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-light)' }}>
          Get ready for {GAME_CONFIG.questionsPerRound} questions!
        </p>
      </div>
    </div>
  )
}

export default CategorySpin
