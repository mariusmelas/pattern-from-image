import React, { useState, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'

function AlternativeColor(props) {
  const [position, setPosition] = useState([0, 0])
  const [startX, setStartX] = useState(undefined)
  const [startY, setStartY] = useState(undefined)

  useEffect(() => {
    // calculate the radius of currentColor and alternative colors in pixels
    // Sizes is 20% and 10% of container

    function handleResize() {
      const containerWidth = props.forwardRef.current.offsetWidth
      const containerHeight = props.forwardRef.current.offsetHeight
      const currentColorRadius = ((containerWidth / 100) * 30) / 2
      const alternativeColorRadius = ((containerWidth / 100) * 20) / 2

      // center of the container.
      const centerX = containerWidth / 2
      const centerY = containerHeight / 2

      // Start position for the alternative colors
      setStartX(centerX - alternativeColorRadius)
      setStartY(centerY - alternativeColorRadius)
      // Find position of alternative color.
      // Get point at d degrees around the current color
      const r = currentColorRadius * 2.5
      const deg = props.deg * (Math.PI / 180)
      let x = r * Math.cos(deg)
      let y = r * Math.sin(deg)

      // x += centerX - currentColorRadius + alternativeColorRadius
      // y += centerY - currentColorRadius + alternativeColorRadius

      setPosition([x, y])
    }
    handleResize()

    window.addEventListener('resize', handleResize, false)

    return () => {
      window.removeEventListener('resize', handleResize, false)
    }
  }, [])

  const alternativeColorStyle = {
    position: 'absolute',
    top: startX,
    left: startY,
    width: '20%',
    paddingTop: '20%',
    borderRadius: '50%',
  }

  const spring = useSpring({
    config: { duration: 300 },
    transform: props.showColors
      ? `translate(${position[0]}px,${position[1]}px) scale(1)`
      : 'translate(0px,0px) scale(0)',
    opacity: props.showColors ? 1 : 0,
    from: {
      transform: props.showColors
        ? 'translate(0px,0px) scale(0)'
        : `translate(${position[0]}px,${position[1]}px) scale(1)`,
      opacity: props.showColors ? 0 : 1,
    },
  })

  return (
    <animated.div
      onClick={() => props.handleSwapColor(props.index)}
      style={{
        ...spring,
        ...alternativeColorStyle,
        background: props.color,
      }}
    />
  )
}

export default AlternativeColor
