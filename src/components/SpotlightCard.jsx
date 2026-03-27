import { useState } from 'react'
import { motion } from 'framer-motion'

export function SpotlightCard({ children, className = '', style, ...props }) {
  const [coords, setCoords] = useState({ x: '50%', y: '50%' })

  const handleMove = (event) => {
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - left) / width) * 100
    const y = ((event.clientY - top) / height) * 100
    setCoords({ x: `${x}%`, y: `${y}%` })
  }

  const handleLeave = () => {
    setCoords({ x: '50%', y: '50%' })
  }

  return (
    <motion.div
      // Bubble the original handlers while still updating the CSS custom props.
      {...props}
      onMouseMove={(event) => {
        handleMove(event)
        props.onMouseMove?.(event)
      }}
      onMouseLeave={(event) => {
        handleLeave()
        props.onMouseLeave?.(event)
      }}
      className={`spotlight-card surface-card ${className}`}
      style={{ '--spot-x': coords.x, '--spot-y': coords.y, ...style }}
    >
      {children}
    </motion.div>
  )
}
