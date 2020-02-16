import React, { useState, useRef, useEffect } from 'react'
import CurrentColor from './CurrentColor.js'
import AlternativeColor from './AlternativeColor.js'

function ColorPicker(props) {
  const containerRef = useRef(0)

  const [colors, setColors] = useState(props.colors)
  const [hasColor, setHasColor] = useState(props.isColor)
  const [showColors, setShowColors] = useState(true)

  useEffect(() => {
    props.setSelectedColor(hasColor)
  }, [hasColor])

  function handleClick() {
    setShowColors(!showColors)
  }

  function handleSwapColor(indexOfClickedColor) {
    console.log('clicked')
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
  const containerStyle = {
    position: 'relative',
    width: props.window10percent || '10vw',
    height: props.window10percent || '10vw',
  }
  return (
    <div>
      <div ref={containerRef} style={containerStyle}>
        <CurrentColor handleClick={handleClick} color={hasColor} />
        {colors &&
          [0, 1, 2, 3, 4, 5, 6, 7].map(i => (
            <AlternativeColor
              key={i}
              showColors={showColors}
              index={i}
              color={colors[i]}
              deg={i * 45}
              handleSwapColor={handleSwapColor}
              forwardRef={containerRef}
            />
          ))}
      </div>
    </div>
  )
}

export default ColorPicker
