import { useState } from 'react'
import './PhotocardReward.css'

const placeholderCards = [
  { id: 'FC-001', group: 'MYSTERY GROUP', idol: 'Mystery Idol', era: 'Coming Soon' },
  { id: 'FC-002', group: 'MYSTERY GROUP', idol: 'Mystery Idol', era: 'Coming Soon' },
  { id: 'FC-003', group: 'MYSTERY GROUP', idol: 'Mystery Idol', era: 'Coming Soon' },
  { id: 'FC-004', group: 'MYSTERY GROUP', idol: 'Mystery Idol', era: 'Coming Soon' },
  { id: 'FC-005', group: 'MYSTERY GROUP', idol: 'Mystery Idol', era: 'Coming Soon' },
]

function PhotocardReward() {
  const [revealedCard, setRevealedCard] = useState(null)

  const revealCard = () => {
    const randomIndex = Math.floor(
      Math.random() * placeholderCards.length
    )

    setRevealedCard(placeholderCards[randomIndex])
  }

  return (
    <div className="reward-section">

      <p className="reward-eyebrow">YOUR FOCUS REWARD</p>
      <h3>Your reward is here!</h3>

      <p className="reward-description">
        A little surprise for completing your focus session.
      </p>

      {!revealedCard ? (
        <button
          className="scratch-card"
          onClick={revealCard}
          aria-label="Reveal your photocard"
        >
          <span className="scratch-star">✦</span>
          <span className="scratch-title">FOCQUESTIN</span>
          <span className="scratch-subtitle">
            YOUR MYSTERY PHOTOCARD
          </span>
          <span className="scratch-action">
            TAP TO REVEAL
          </span>
        </button>
      ) : (
        <div className="reward-result">

          <div className="photocard-placeholder">
            <div className="photocard-top">
              <span>FOCQUESTIN</span>
              <span>001</span>
            </div>

            <div className="photocard-image-area">
              <span className="photo-symbol">✦</span>
              <p>YOUR PHOTO</p>
              <small>COMING SOON</small>
            </div>

            <div className="photocard-details">
              <p>{revealedCard.group}</p>
              <h4>{revealedCard.idol}</h4>
              <span>{revealedCard.era}</span>
            </div>
          </div>

          <div className="reward-card-info">
            <p className="reward-rarity">COMMON</p>
            <h4>Photocard Unlocked!</h4>
            <p>Card ID: {revealedCard.id}</p>
          </div>

          <p className="reward-note">
            Your photocard collection journey starts here!
          </p>

        </div>
      )}

    </div>
  )
}

export default PhotocardReward