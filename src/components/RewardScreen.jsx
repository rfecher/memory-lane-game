import { useGame } from '../hooks/GameContext'
import { GAME_CONFIG } from '../config'

function RewardScreen({ onPlayAgain, onBack }) {
  const { gameState } = useGame()
  const score = gameState?.score || 0
  const total = gameState?.totalQuestionsInRound || GAME_CONFIG.questionsPerRound
  const grandchild = gameState?.grandchildRotationIndex != null
    ? GAME_CONFIG.grandchildren[gameState.grandchildRotationIndex]
    : GAME_CONFIG.grandchildren[0]

  const tilesToShow = Math.min(Math.floor(score * 16 / total), 16)
  const tiles = Array.from({ length: 16 }, (_, i) => i < tilesToShow)
  const photoSrc = `/photos/${grandchild.folder}/1.jpg`

  const getRelationship = (name) => {
    if (name === 'Richie') return 'grandson'
    if (name === 'Allison') return 'granddaughter'
    return 'little one'
  }

  const relationship = getRelationship(grandchild.name)

  return (
    <div className="screen" style={{ justifyContent: 'center', minHeight: '80vh' }}>
      <h2 className="splash-title" style={{ fontSize: 'var(--font-size-heading)' }}>{GAME_CONFIG.subtitles.youDidIt}</h2>

      <div style={{ position: 'relative', width: 'min(80vw, 360px)', height: 'min(80vw, 360px)', margin: 'var(--spacing-md) 0' }}>
        <img
          src={photoSrc}
          alt={`${grandchild.name}'s photo`}
          className="photo-reveal"
          onError={(e) => { e.target.style.visibility = 'hidden' }}
        />
        <div className="photo-grid">
          {tiles.map((revealed, i) => (
            <div key={i} className={`photo-tile ${revealed ? 'removed' : ''}`} />
          ))}
        </div>
      </div>

      <p className="reward-message">
        That's your {relationship} {grandchild.name}! {grandchild.name} thinks you're the best, Marion! <span role="img" aria-label="heart">{grandchild.emoji}</span>
      </p>

      <button className="game-btn gold-btn" onClick={onPlayAgain} style={{ width: '60%', marginTop: 'var(--spacing-md)' }}>
        {GAME_CONFIG.subtitles.playAgain}
      </button>
      <button className="back-btn" onClick={onBack} style={{ marginTop: 'var(--spacing-sm)' }}>
        {GAME_CONFIG.subtitles.back}
      </button>
    </div>
  )
}

export default RewardScreen
