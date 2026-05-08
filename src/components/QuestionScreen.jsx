import { useGame } from '../hooks/GameContext'
import { GAME_CONFIG } from '../config'

function QuestionScreen({ question, round, total, score, onAnswer, onReplay, onContinue, roundComplete }) {
  const icon = GAME_CONFIG.subtitles.categoryIcons[question.category] || '⭐'
  const name = GAME_CONFIG.subtitles.categoryNames[question.category] || question.category

  return (
    <div className="screen">
      <div className="category-header">
        <span className="category-badge">{icon} {name}</span>
        <span className="round-indicator">Round {round} of {total}</span>
      </div>

      <div className="question-card">
        <p className="question-text">{question.question}</p>
        <button className="replay-btn" onClick={onReplay}>
          {GAME_CONFIG.subtitles.replayAudio}
        </button>
      </div>

      <div className="answers-column">
        {['A', 'B', 'C'].map((label, i) => (
          <button
            key={i}
            className="game-btn primary answer-btn"
            onClick={() => onAnswer(question.shuffledAnswers[i])}
          >
            <span style={{ fontWeight: 400, opacity: 0.7, width: '40px' }}>{label}</span>
            <span>{question.answers[question.shuffledAnswers[i]]}</span>
          </button>
        ))}
      </div>

      {roundComplete && (
        <button className="game-btn gold-btn" onClick={onContinue} style={{ marginTop: 'var(--spacing-lg)', width: '60%' }}>
          Continue
        </button>
      )}
    </div>
  )
}

export default QuestionScreen
