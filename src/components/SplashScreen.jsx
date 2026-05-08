import { GAME_CONFIG } from '../config'

function SplashScreen({ onStart }) {
  return (
    <div className="screen" style={{ justifyContent: 'center', minHeight: '80vh' }}>
      <h1 className="splash-title">Memory Lane</h1>
      <p className="splash-subtitle">{GAME_CONFIG.subtitles.appSubtitle}</p>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', width: '100%' }}>
        <button className="game-btn gold-btn" onClick={onStart} style={{ width: '60%', marginTop: 'var(--spacing-xl)' }}>
          {GAME_CONFIG.subtitles.letsPlay}
        </button>
      </div>
    </div>
  )
}

export default SplashScreen
