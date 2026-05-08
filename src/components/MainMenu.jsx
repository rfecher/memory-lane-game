import { GAME_CONFIG } from '../config'

function MainMenu({ onNewGame, onContinue, onSettings, hasSaved }) {
  return (
    <div className="screen" style={{ justifyContent: 'center', minHeight: '70vh' }}>
      <h1 className="splash-title">{GAME_CONFIG.playerName}</h1>
      <p className="splash-subtitle" style={{ marginBottom: 'var(--spacing-xl)' }}>What would you like to do?</p>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-sm)', width: '100%', maxWidth: '400px' }}>
        <button className="game-btn gold-btn" onClick={onNewGame}>
          {GAME_CONFIG.subtitles.newGame}
        </button>
        <button
          className={`game-btn ${hasSaved ? 'primary' : 'primary'}`}
          onClick={onContinue}
          disabled={!hasSaved}
        >
          {GAME_CONFIG.subtitles.continue}
        </button>
        <button className="game-btn primary" onClick={onSettings}>
          {GAME_CONFIG.subtitles.settings}
        </button>
      </div>
    </div>
  )
}

export default MainMenu
