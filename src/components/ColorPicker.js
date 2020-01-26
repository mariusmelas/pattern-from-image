import React, { useState } from 'react'
import './styles/color-picker.css'

function ColorPicker(props) {
  const [changePrimaryColor, setChangePrimaryColor] = useState(true)

  const colors = [
    'black',
    'green',
    'red',
    'blue',
    'yellow',
    'pink',
    'brown',
    'gold',
    'magenta',
  ]

  function handleClickColor(color) {
    let newSelectedColor = [...props.selectedColor]
    const colorIndex = changePrimaryColor ? 1 : 0
    if (!newSelectedColor.includes(color)) {
      newSelectedColor[colorIndex] = color
      setChangePrimaryColor(!changePrimaryColor)
      props.setSelectedColor(newSelectedColor)
    }
  }

  return (
    <div className="color-picker-container">
      {colors.map(color => (
        <div
          className="color-picker-color"
          style={{
            backgroundColor: color,
            borderColor: props.selectedColor[1],
          }}
          onClick={() => handleClickColor(color)}
        ></div>
      ))}
    </div>
  )
}

export default ColorPicker
