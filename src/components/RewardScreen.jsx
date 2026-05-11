import { useEffect, useState } from 'react'
import { useGame } from '../hooks/GameContext'
import { GAME_CONFIG } from '../config'

function RewardScreen({ onPlayAgain, onBack }) {
  const { gameState } = useGame()
  const grandchild = gameState?.grandchildRotationIndex != null
    ? GAME_CONFIG.grandchildren[gameState.grandchildRotationIndex]
    : GAME_CONFIG.grandchildren[0]

  const photoSrc = `${import.meta.env.BASE_URL}photos/${grandchild.folder}/1.jpg`
  const [photoFailed, setPhotoFailed] = useState(false)

  useEffect(() => {
    setPhotoFailed(false)
  }, [grandchild.name])

  const getRelationship = (name) => {
    if (name === 'Richie') return 'grandson'
    if (name === 'Allison') return 'granddaughter'
    return 'little one'
  }

  const relationship = getRelationship(grandchild.name)

  return (
    <div className="screen" style={{ justifyContent: 'center', minHeight: '80vh' }}>
      <h2 className="splash-title" style={{ fontSize: 'var(--font-size-heading)' }}>{GAME_CONFIG.subtitles.youDidIt}</h2>

      <div style={{ width: 'min(70vw, 300px)', margin: 'var(--spacing-md) 0' }}>
        {!photoFailed ? (
          <img
            src={photoSrc}
            alt={`${grandchild.name}'s photo`}
            className="photo-reveal"
            onLoad={() => setPhotoFailed(false)}
            onError={() => setPhotoFailed(true)}
          />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            background: 'var(--color-cream)',
            borderRadius: 'var(--radius)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 'var(--spacing-sm)',
            fontSize: 'var(--font-size-subheading)',
            color: 'var(--color-text-light)',
          }}>
            <span style={{ fontSize: '48px' }}>📷</span>
            <span>Photo of {grandchild.name}</span>
          </div>
        )}
      </div>

      <p className="reward-message">
        That's your {relationship} {grandchild.name}! {grandchild.name} thinks you're the best, Marion! <span role="img" aria-label="heart">{grandchild.emoji}</span>
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', marginTop: 'var(--spacing-md)', maxWidth: '400px', margin: 'var(--spacing-md) auto 0' }}>
        <button className="game-btn gold-btn" onClick={onPlayAgain} style={{ width: '60%' }}>
          {GAME_CONFIG.subtitles.playAgain}
        </button>
        <button className="back-btn" onClick={onBack} style={{ marginTop: 'var(--spacing-sm)' }}>
          {GAME_CONFIG.subtitles.back}
        </button>
      </div>
    </div>
  )
}

export default RewardScreen
