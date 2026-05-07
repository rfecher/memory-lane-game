import { GAME_CONFIG } from '../config'

function SettingsScreen({ onBack, ttsEnabled, onToggleTTS, fontSize, onSetFontSize, speechSpeed, onSetSpeechSpeed, onConfirmReset }) {
  const subtitles = GAME_CONFIG.subtitles

  return (
    <div className="screen">
      <h2 className="splash-title" style={{ fontSize: 'var(--font-size-heading)' }}>{subtitles.settings}</h2>

      <div className="settings-group">
        <span className="settings-label">{subtitles.ttsLabel}</span>
        <div className="toggle-row">
          <span>{ttsEnabled ? 'ON' : 'OFF'}</span>
          <div className={`toggle-switch ${ttsEnabled ? 'active' : ''}`} onClick={onToggleTTS}>
            <div className="toggle-knob" />
          </div>
        </div>
      </div>

      <div className="settings-group">
        <span className="settings-label">{subtitles.fontSizeLabel}</span>
        <div className="settings-option-group">
          {[
            { key: 'normal', label: subtitles.normal },
            { key: 'large', label: subtitles.large },
            { key: 'extraLarge', label: subtitles.extraLarge },
          ].map(({ key, label }) => (
            <button
              key={key}
              className={`settings-option-btn ${fontSize === key ? 'selected' : ''}`}
              onClick={() => onSetFontSize(key)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="settings-group">
        <span className="settings-label">{subtitles.speechSpeedLabel}</span>
        <div className="settings-option-group">
          {[
            { key: 'slow', label: subtitles.slow },
            { key: 'normal', label: subtitles.normalSpeed },
          ].map(({ key, label }) => (
            <button
              key={key}
              className={`settings-option-btn ${speechSpeed === key ? 'selected' : ''}`}
              onClick={() => onSetSpeechSpeed(key)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="settings-group">
        <span className="settings-label" style={{ color: 'var(--color-wrong)' }}>{subtitles.resetLabel}</span>
        <button className="game-btn wrong" onClick={onConfirmReset} style={{ maxWidth: '400px' }}>
          {subtitles.resetLabel}
        </button>
      </div>

      <button className="back-btn" onClick={onBack}>
        {subtitles.back}
      </button>
    </div>
  )
}

export default SettingsScreen
