import { useState, useEffect } from 'react'
import './App.css'
import './photocard-additions.css'

const photocardCatalog = [
  { id: 'FC-001', group: 'ATEEZ', idol: 'San', rarity: 'UR', image: '/photocards/san-01.jpg' },
  { id: 'FC-002', group: 'ATEEZ', idol: 'San', rarity: 'R', image: '/photocards/san-02.jpg' },
  { id: 'FC-003', group: 'ATEEZ', idol: 'Jongho', rarity: 'UC', image: '/photocards/jongho-01.jpg' },
  { id: 'FC-004', group: 'ATEEZ', idol: 'Jongho', rarity: 'R', image: '/photocards/jongho-02.jpg' },
  { id: 'FC-005', group: 'ATEEZ', idol: 'Jongho', rarity: 'SSR', image: '/photocards/jongho-03.jpg' },
  { id: 'FC-006', group: 'BABYMONSTER', idol: 'Asa', rarity: 'UR', image: '/photocards/asa-01.jpg' },
  { id: 'FC-007', group: 'BABYMONSTER', idol: 'Asa', rarity: 'R', image: '/photocards/asa-02.jpg' },
  { id: 'FC-008', group: 'BLACKPINK', idol: 'Rosé', rarity: 'SSR', image: '/photocards/rose-01.jpg' },
  { id: 'FC-009', group: 'BLACKPINK', idol: 'Rosé', rarity: 'UR', image: '/photocards/rose-02.jpg' },
]

const durations = [5, 10, 15, 25, 30]
const ratings = ['Easy', 'Moderate', 'Challenging']

function Photocard({ card, compact = false }) {
  if (!card) return null

  return (
    <article className={`physical-photocard rarity-${String(card.rarity || 'C').toLowerCase()} ${compact ? 'photocard-compact' : ''}`}>
      <div className="physical-photo-wrap">
        <img src={card.image} alt={`${card.idol} photocard`} className="physical-photo" />
        <span className={`rarity-badge rarity-badge-${String(card.rarity || 'C').toLowerCase()}`}>
          {card.rarity || 'C'}
        </span>
        <span className="photocard-shine" aria-hidden="true" />
      </div>
      <div className="physical-card-caption">
        <span className="physical-group">{card.group}</span>
        <strong>{card.idol}</strong>
        <span className="physical-card-id">{card.id}</span>
      </div>
    </article>
  )
}

function App() {
  const [selectedTime, setSelectedTime] = useState(25)
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [studyGoal, setStudyGoal] = useState('')
  const [reflection, setReflection] = useState('')
  const [focusRating, setFocusRating] = useState('')
  const [reflectionSaved, setReflectionSaved] = useState(false)
  const [revealedCard, setRevealedCard] = useState(null)

  const [collection, setCollection] = useState(() => {
    try {
      const savedCollection = localStorage.getItem('focquestin-collection')
      return savedCollection ? JSON.parse(savedCollection) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('focquestin-collection', JSON.stringify(collection))
  }, [collection])

  useEffect(() => {
    if (!isRunning) return
    if (timeLeft === 0) {
      setIsRunning(false)
      setIsCompleted(true)
      return
    }
    const timeout = setTimeout(() => setTimeLeft((previousTime) => previousTime - 1), 1000)
    return () => clearTimeout(timeout)
  }, [isRunning, timeLeft])

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
  }

  const clearReflection = () => {
    setReflection('')
    setFocusRating('')
    setReflectionSaved(false)
    setRevealedCard(null)
  }

  const chooseDuration = (minutes) => {
    if (isRunning) return
    setSelectedTime(minutes)
    setTimeLeft(minutes * 60)
    setIsCompleted(false)
    clearReflection()
  }

  const startTimer = () => {
    if (timeLeft === 0) return
    setIsRunning(true)
  }

  const pauseTimer = () => setIsRunning(false)

  const resetTimer = () => {
    setIsRunning(false)
    setTimeLeft(selectedTime * 60)
    setIsCompleted(false)
    setStudyGoal('')
    clearReflection()
  }

  const saveReflection = (event) => {
    event.preventDefault()
    if (!reflection.trim() || !focusRating) return
    setReflectionSaved(true)
  }

  const revealCard = () => {
    if (revealedCard) return
    const randomIndex = Math.floor(Math.random() * photocardCatalog.length)
    const selectedCard = photocardCatalog[randomIndex]
    setRevealedCard(selectedCard)
    setCollection((previousCollection) => [
      ...previousCollection,
      { ...selectedCard, acquiredAt: new Date().toISOString() },
    ])
  }

  const groupedCollection = collection.reduce((result, card) => {
    if (!result[card.id]) result[card.id] = { ...card, quantity: 0 }
    result[card.id].quantity += 1
    return result
  }, {})

  const uniqueCards = Object.values(groupedCollection)
  const totalCards = collection.length
  const uniqueCardCount = uniqueCards.length

  return (
    <div className="app">
      <header className="navbar">
        <h1 className="logo">FOCQUESTIN</h1>
        <nav>
          <a href="#home">Home</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#focus-timer">Focus Timer</a>
          <a href="#collection">Collection</a>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <p className="eyebrow">YOUR PERSONAL FOCUS COMPANION</p>
          <h2>Focus on your goals.<br />Collect your rewards.</h2>
          <p className="description">Make every minute count and turn your study sessions into exciting rewards.</p>
          <a href="#focus-timer" className="start-button">Start Focusing</a>
        </section>

        <section className="features" id="how-it-works">
          <div className="section-heading">
            <p className="eyebrow">THE EXPERIENCE</p>
            <h2>How It Works</h2>
            <p>A little focus goes a long way.</p>
          </div>
          <div className="feature-container">
            <div className="feature-card"><span className="feature-number">01</span><h3>Focus</h3><p>Choose your preferred study duration and start your focus session.</p></div>
            <div className="feature-card"><span className="feature-number">02</span><h3>Reflect</h3><p>Review what you learned and evaluate your focus after each session.</p></div>
            <div className="feature-card"><span className="feature-number">03</span><h3>Collect</h3><p>Discover, collect, and organize your favorite photocards.</p></div>
          </div>
        </section>

        <section className="timer-section" id="focus-timer">
          <div className="section-heading">
            <p className="eyebrow">TIME TO CONCENTRATE</p>
            <h2>Focus Session</h2>
            <p>Choose your time and make it count.</p>
          </div>
          <div className="timer-card">
            <p className="timer-label">{isCompleted ? 'SESSION COMPLETED!' : isRunning ? 'STAY FOCUSED' : 'READY WHEN YOU ARE'}</p>
            <div className="study-goal">
              <label htmlFor="studyGoal">What are you focusing on today?</label>
              <input id="studyGoal" type="text" placeholder="e.g. Finish my assignments..." value={studyGoal} onChange={(event) => setStudyGoal(event.target.value)} disabled={isRunning || isCompleted} />
            </div>
            <div className="timer-display">{formatTime(timeLeft)}</div>
            <div className="duration-options">
              {durations.map((duration) => (
                <button key={duration} className={selectedTime === duration ? 'duration-button active' : 'duration-button'} onClick={() => chooseDuration(duration)} disabled={isRunning || isCompleted}>{duration} min</button>
              ))}
            </div>

            {!isCompleted && (
              <div className="timer-actions">
                {!isRunning ? <button className="timer-start" onClick={startTimer} disabled={timeLeft === 0}>Start</button> : <button className="timer-start" onClick={pauseTimer}>Pause</button>}
                <button className="timer-reset" onClick={resetTimer}>Reset</button>
              </div>
            )}

            {isCompleted && (
              <div className="reflection-section">
                <div className="completion-heading"><span className="completion-icon">✦</span><h3>Great Job!</h3><p>You completed your focus session.</p></div>
                <div className="session-summary">
                  <p className="summary-label">YOUR STUDY GOAL</p><p className="summary-goal">{studyGoal.trim() || 'No study goal specified'}</p>
                  <p className="summary-label">FOCUS DURATION</p><p className="summary-duration">{selectedTime} minutes</p>
                </div>

                {!reflectionSaved ? (
                  <form className="reflection-form" onSubmit={saveReflection}>
                    <h3>Time to Reflect</h3>
                    <p className="reflection-description">Take a moment to think about your learning progress.</p>
                    <label htmlFor="reflection">What did you accomplish or learn?</label>
                    <textarea id="reflection" value={reflection} onChange={(event) => setReflection(event.target.value)} placeholder="Today, I learned..." rows={4} required />
                    <label>How was your focus session?</label>
                    <div className="rating-options">
                      {ratings.map((rating) => <button key={rating} type="button" className={focusRating === rating ? 'rating-button selected' : 'rating-button'} onClick={() => setFocusRating(rating)}>{rating}</button>)}
                    </div>
                    <button type="submit" className="save-reflection-button" disabled={!reflection.trim() || !focusRating}>Save Reflection</button>
                  </form>
                ) : (
                  <div className="reflection-success">
                    <span className="success-icon">✓</span><h3>Reflection Saved!</h3>
                    <p>Thank you for taking the time to reflect on your progress.</p>
                    <div className="saved-reflection">
                      <p className="summary-label">YOUR REFLECTION</p><p>{reflection}</p>
                      <p className="summary-label">FOCUS RATING</p><p>{focusRating}</p>
                    </div>
                    <div className="reward-section">
                      <p className="reward-eyebrow">YOUR FOCUS REWARD</p>
                      <h3>Your reward is here!</h3>
                      <p className="reward-description">A little surprise for completing your focus session.</p>
                      {!revealedCard ? (
                        <button className="scratch-card" onClick={revealCard}>
                          <span className="scratch-star">✦</span><span className="scratch-title">FOCQUESTIN</span><span className="scratch-subtitle">YOUR MYSTERY PHOTOCARD</span><span className="scratch-action">TAP TO REVEAL</span>
                        </button>
                      ) : (
                        <div className="reward-result">
                          <Photocard card={revealedCard} />
                          <div className="reward-card-info">
                            <p className={`reward-rarity rarity-text-${revealedCard.rarity.toLowerCase()}`}>{revealedCard.rarity}</p>
                            <h4>Photocard Unlocked!</h4>
                            <p>Card ID: {revealedCard.id}</p>
                          </div>
                          <p className="reward-note">Your photocard has been added to your collection!</p>
                        </div>
                      )}
                    </div>
                    <button className="timer-reset" onClick={resetTimer} style={{ marginTop: '25px' }}>Start Another Session</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        <section className="collection-section" id="collection">
          <div className="section-heading">
            <p className="eyebrow">YOUR LITTLE TREASURE</p><h2>Digital Collectbook</h2>
            <p>Every card tells a story of your focus journey.</p>
          </div>
          <div className="collection-summary">
            <div className="collection-stat"><span className="collection-stat-number">{totalCards}</span><span className="collection-stat-label">Total Cards</span></div>
            <div className="collection-stat"><span className="collection-stat-number">{uniqueCardCount}</span><span className="collection-stat-label">Unique Cards</span></div>
            <div className="collection-stat"><span className="collection-stat-number">{totalCards - uniqueCardCount}</span><span className="collection-stat-label">Duplicates</span></div>
          </div>

          {collection.length === 0 ? (
            <div className="empty-collection">
              <span className="empty-collection-icon">✦</span><h3>Your collection is waiting!</h3>
              <p>Complete a focus session and reveal your first photocard to get started.</p>
              <a href="#focus-timer" className="start-button">Start Collecting</a>
            </div>
          ) : (
            <div className="collection-grid">
              {uniqueCards.map((card) => (
                <div className="collection-card" key={card.id}>
                  <Photocard card={card} compact />
                  <div className="collection-card-info">
                    <p className="collection-card-id">{card.id}</p>
                    <div className="collection-card-bottom">
                      <span className={`collection-rarity rarity-text-${String(card.rarity || 'C').toLowerCase()}`}>{card.rarity || 'C'}</span>
                      <span className="collection-quantity">×{card.quantity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <p className="collection-footer-note">Your collection is saved automatically on this device.</p>
        </section>
      </main>

      <footer className="footer"><p>FOCQUESTIN © 2026</p><p>Focus. Complete. Collect.</p></footer>
    </div>
  )
}

export default App
