import React, { useState } from 'react';
import './StarRate.scss';
import EmptyStar from '../../assets/star-empty.svg'
import HalfStar from '../../assets/star-half.svg'
import FullStar from '../../assets/star-full.svg'
import Reset from '../../assets/reset.svg'

// 별의 갯수 = Score
const MAX_SCORE = 5

export const StarRate = ({ onChange, score }) => {
  // 표시되는 별의 상태
  const [displayScore, setDisplayScore] = useState(score)
  
  const calculateScore = (e) => {
    const { width, left } = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - left
    const scale = width / MAX_SCORE / 2
    return (Math.floor(x / scale) + 1) / 2
  }

  const handleMouseMove = (e) => {
    setDisplayScore(calculateScore(e))
  }

  return (
    <section>
      <div
        className="stars"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setDisplayScore(score)}
        onClick={() => onChange(displayScore)}
      >
        {[...Array(MAX_SCORE)].map((_, i) => (
          <Star key={i} score={displayScore} i={i} />
        ))}
      </div>
      <Reset 
        className="reset"
        onClick={() => {
          onChange(0)
          setDisplayScore(0)
        }}
      ></Reset>
    </section>
  )
}

const Star = ({ score, i }) => {
  if (score > i) {
    if (score - i === 0.5) {
      return <HalfStar />
    } else {
      return <FullStar />
    }
  } else {
    return <EmptyStar />
  }
}
  