import React, { useState, useRef, useEffect } from 'react'
import CurrentColor from './CurrentColor.js'
import AlternativeColor from './AlternativeColor.js'

function ColorPicker(props) {
  const containerRef = useRef(0)

  const [colors, setColors] = useState(undefined)
  const [hasColor, setHasColor] = useState('blue')
  const [showColors, setShowColors] = useState(false)
  const [width, setWidth] = useState(undefined)
  const [height, setHeight] = useState(undefined)

  useEffect(() => {
    props.setSelectedColor(hasColor)
  }, [hasColor])

  useEffect(() => {
    // Pick a random color from the list of colors

    const randomIndex = Math.floor(
      Math.random() * props.colors.length,
    )
    const pickColor = props.colors[randomIndex]
    const updateColors = props.colors.filter(c => c !== pickColor)
    setColors(updateColors)
    setHasColor(pickColor)

    // Update size of container as the window is resized.

    function handleResize() {
      setWidth(containerRef.current.offsetWidth)
      setHeight(containerRef.current.offsetHeight)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const containerStyle = {
    position: 'relative',
    width: 200,
    height: 200,
  }

  function handleClick() {
    setShowColors(!showColors)
  }

  function handleSwapColor(indexOfClickedColor) {
    // Swap clicked color with current color
    let updateColors = [...colors]
    let updateHasColor = hasColor

    updateHasColor = updateColors[indexOfClickedColor]
    updateColors[indexOfClickedColor] = hasColor

    setHasColor(updateHasColor)
    setColors(updateColors)
    // Hide colors after its swaped..
    setShowColors(false)
  }

  return (
    <div>
      <div ref={containerRef} style={containerStyle}>
        <CurrentColor handleClick={handleClick} color={hasColor} />
        {width &&
          height &&
          [0, 1, 2, 3, 4, 5, 6, 7].map(i => (
            <AlternativeColor
              key={i}
              showColors={showColors}
              index={i}
              color={colors[i]}
              deg={i * 45}
              handleSwapColor={handleSwapColor}
              forwardRef={containerRef}
              containerSize={[width, height]}
            />
          ))}
      </div>
    </div>
  )
}

export default ColorPicker
