import { useEffect, useState } from 'react'
import { useGame } from './hooks/GameContext'
import { useSettings } from './hooks/useSettings'
import { useTTS } from './hooks/useTTS'
import { useAudio } from './hooks/useAudio'
import SplashScreen from './components/SplashScreen'
import MainMenu from './components/MainMenu'
import CategorySpin from './components/CategorySpin'
import QuestionScreen from './components/QuestionScreen'
import RewardScreen from './components/RewardScreen'
import SettingsScreen from './components/SettingsScreen'

function GameContent() {
  const { currentScreen, setCurrentScreen, gameState, answerQuestion, advanceQuestion, advanceToReward, goBackToMenu, startNewGame, continueGame, nextRound, hasSavedState, resetProgress } = useGame()
  const { settings, toggleTTS, setFontSize, setSpeechSpeed } = useSettings()
  const { speak, replay } = useTTS()
  const { playCorrect, playWrong, playComplete } = useAudio()
  const [fontSizeClass, setFontSizeClass] = useState('')
  const [confirmReset, setConfirmReset] = useState(false)

  useEffect(() => {
    if ('speechSynthesis' in window) {
      const loadVoices = () => speak('', settings.ttsRate)
      window.speechSynthesis.onvoiceschanged = loadVoices
      loadVoices()
    }
  }, [])

  useEffect(() => {
    if (settings.fontSize === 'large') setFontSizeClass('font-large')
    else if (settings.fontSize === 'extraLarge') setFontSizeClass('font-extra-large')
    else setFontSizeClass('')
  }, [settings.fontSize])

  useEffect(() => {
    if (currentScreen === 'question' && settings.ttsEnabled && gameState?.shuffledQuestions?.[gameState.currentQuestionIndex]) {
      const q = gameState.shuffledQuestions[gameState.currentQuestionIndex]
      speak(q.question, settings.ttsRate)
    }
  }, [currentScreen, gameState?.currentQuestionIndex])

  const handleAnswer = (index) => {
    const q = gameState.shuffledQuestions?.[gameState.currentQuestionIndex]
    if (!q) return
    const isCorrect = q.shuffledAnswers[index] === q.correct
    answerQuestion(index)
    if (isCorrect) {
      playCorrect()
      setTimeout(() => advanceQuestion(), 800)
    } else {
      playWrong()
      if (settings.ttsEnabled) speak("Not quite — try again!", settings.ttsRate)
    }
  }

  const handleContinueRound = () => {
    playComplete()
    setTimeout(() => advanceToReward(), 500)
  }

  const handleNewGame = () => { startNewGame() }

  const handleContinue = () => { continueGame() }

  const handlePlayAgain = () => { nextRound() }

  const handleReset = () => { resetProgress(); setConfirmReset(false) }

  const screens = {
    splash: <SplashScreen onStart={() => setCurrentScreen('menu')} />,
    menu: <MainMenu onNewGame={handleNewGame} onContinue={handleContinue} onSettings={() => setCurrentScreen('settings')} hasSaved={hasSavedState} />,
    'category-spin': <CategorySpin />,
    question: currentScreen === 'question' && gameState?.shuffledQuestions ? (
      <QuestionScreen
        question={gameState.shuffledQuestions[gameState.currentQuestionIndex]}
        round={gameState.currentQuestionIndex + 1}
        total={gameState.totalQuestionsInRound}
        score={gameState.score}
        onAnswer={handleAnswer}
        onReplay={() => replay(gameState.shuffledQuestions[gameState.currentQuestionIndex]?.question || '', settings.ttsRate)}
        onContinue={handleContinueRound}
        roundComplete={gameState.currentQuestionIndex >= gameState.totalQuestionsInRound}
      />
    ) : null,
    reward: <RewardScreen onPlayAgain={handlePlayAgain} onBack={goBackToMenu} />,
    settings: <SettingsScreen
      onBack={() => setCurrentScreen('menu')}
      ttsEnabled={settings.ttsEnabled}
      onToggleTTS={toggleTTS}
      fontSize={settings.fontSize}
      onSetFontSize={setFontSize}
      speechSpeed={settings.ttsRate < 0.9 ? 'slow' : 'normal'}
      onSetSpeechSpeed={setSpeechSpeed}
      onConfirmReset={() => setConfirmReset(true)}
    />,
  }

  return (
    <div className={`app-container ${fontSizeClass}`}>
      {screens[currentScreen]}
      {confirmReset && (
        <div className="confirm-overlay">
          <div className="confirm-box">
            <p className="splash-subtitle" style={{ marginBottom: 'var(--spacing-md)' }}>Are you sure?</p>
            <button className="game-btn gold-btn" onClick={handleReset}>Yes, Reset</button>
            <button className="game-btn primary" onClick={() => setConfirmReset(false)}>No, Keep Playing</button>
          </div>
        </div>
      )}
    </div>
  )
}

function App() {
  return <GameContent />
}

export default App
