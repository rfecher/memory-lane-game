import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { GAME_CONFIG } from '../config'
import questions from '../questions.json'

const GameContext = createContext()

const pickWeightedCategory = () => {
  const weights = GAME_CONFIG.categoryWeights
  const total = Object.values(weights).reduce((s, w) => s + w, 0)
  let r = Math.random() * total
  for (const [cat, w] of Object.entries(weights)) {
    r -= w
    if (r <= 0) return cat
  }
  return 'golden_age'
}

function shuffleArray(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}

function shuffleAnswers(question) {
  const indices = question.answers.map((_, i) => i)
  return shuffleArray(indices)
}

function createNewRound(prevState) {
  const cat = pickWeightedCategory()
  const byCategory = {}
  questions.forEach(q => {
    if (!byCategory[q.category]) byCategory[q.category] = []
    byCategory[q.category].push(q)
  })
  const shuffled = shuffleArray(byCategory[cat] || [])
    .slice(0, GAME_CONFIG.questionsPerRound)
    .map(q => ({ ...q, shuffledAnswers: shuffleAnswers(q) }))
  return {
    ...prevState,
    currentQuestionIndex: 0,
    score: 0,
    currentCategory: cat,
    savedAnswers: [],
    shuffledQuestions: shuffled,
  }
}

export function GameProvider({ children }) {
  const [currentScreen, setCurrentScreen] = useState('splash')
  const [gameState, setGameState] = useState(null)

  const saveState = useCallback((state) => {
    if (state) {
      try { localStorage.setItem('memory-lane-state', JSON.stringify(state)) } catch { /* */ }
    }
  }, [])

  const loadState = useCallback(() => {
    try {
      const saved = localStorage.getItem('memory-lane-state')
      if (saved) {
        const parsed = JSON.parse(saved)
        setGameState(parsed)
        return !!parsed.shuffledQuestions?.length
      }
    } catch { /* */ }
    return false
  }, [])

  useEffect(() => { loadState() }, [loadState])

  const startNewGame = useCallback(() => {
    const newState = createNewRound({
      roundNumber: 1,
      currentQuestionIndex: 0,
      score: 0,
      currentCategory: null,
      savedAnswers: [],
      grandchildRotationIndex: 0,
      totalQuestionsInRound: GAME_CONFIG.questionsPerRound,
    })
    setGameState(newState)
    saveState(newState)
    setCurrentScreen('category-spin')
  }, [saveState])

  const continueGame = useCallback(() => {
    if (gameState?.shuffledQuestions?.length) setCurrentScreen('question')
  }, [gameState])

  const answerQuestion = useCallback((answerIndex) => {
    setGameState(prev => {
      if (!prev) return prev
      const q = prev.shuffledQuestions[prev.currentQuestionIndex]
      if (!q) return prev
      const isCorrect = q.shuffledAnswers[answerIndex] === q.correct
      const updatedAnswers = [...prev.savedAnswers, { questionId: q.id, correct: isCorrect }]
      const updated = { ...prev, savedAnswers: updatedAnswers, score: isCorrect ? prev.score + 1 : prev.score }
      saveState(updated)
      return updated
    })
  }, [saveState])

  const advanceQuestion = useCallback(() => {
    setGameState(prev => {
      if (!prev) return prev
      const nextIndex = prev.currentQuestionIndex + 1
      if (nextIndex >= prev.totalQuestionsInRound) {
        saveState(prev)
        return prev
      }
      const updated = {
        ...prev,
        currentQuestionIndex: nextIndex,
        currentCategory: prev.shuffledQuestions?.[nextIndex]?.category || prev.currentCategory,
      }
      saveState(updated)
      return updated
    })
  }, [saveState])

  const advanceToReward = useCallback(() => {
    setCurrentScreen('reward')
  }, [])

  const goBackToMenu = useCallback(() => {
    setCurrentScreen('menu')
  }, [])

  const nextRound = useCallback(() => {
    setGameState(prev => {
      if (!prev) return prev
      const updated = createNewRound({
        ...prev,
        roundNumber: prev.roundNumber + 1,
        grandchildRotationIndex: (prev.grandchildRotationIndex + 1) % 3,
      })
      saveState(updated)
      return updated
    })
    setCurrentScreen('category-spin')
  }, [saveState])

  const resetProgress = useCallback(() => {
    localStorage.removeItem('memory-lane-state')
    setGameState(null)
    setCurrentScreen('menu')
  }, [])

  const hasSavedState = !!(gameState?.shuffledQuestions?.length)

  const value = {
    currentScreen,
    setCurrentScreen,
    gameState,
    startNewGame,
    continueGame,
    answerQuestion,
    advanceQuestion,
    advanceToReward,
    goBackToMenu,
    nextRound,
    resetProgress,
    hasSavedState,
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export function useGame() {
  return useContext(GameContext)
}
