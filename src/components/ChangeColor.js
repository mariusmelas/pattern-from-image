import React, { useState } from 'react'
import ColorPicker from './color-picker/ColorPicker.js'

function ChangeColor(props) {
  const {
    primaryColor,
    setPrimaryColor,
    secondaryColor,
    setSecondaryColor,
  } = { ...props }

  const [isChangeColor, setIsChangeColor] = useState(false)

  return isChangeColor ? (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: '1fr 1fr auto',
        justifyItems: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: '666',
        left: '50px',
        height: '90vh',
        right: 0,
        bottom: '0px',
        background: secondaryColor,
      }}
    >
      <ColorPicker
        window10percent={180}
        selectedColor={primaryColor}
        setSelectedColor={setPrimaryColor}
        colorID={0}
        isColor={primaryColor}
        colors={[
          '#F1CDB8',
          '#3E7490',
          '#D9B85F',
          '#9E969B',
          '#2F786B',
          '#EB9C5A',
          '#21141A',
          'green',
        ]}
      />
      <ColorPicker
        window10percent={180}
        selectedColor={secondaryColor}
        setSelectedColor={setSecondaryColor}
        colorID={1}
        isColor={secondaryColor}
        colors={[
          '#49BAE6',
          '#D91825',
          '#E9E6CC',
          '#E17783',
          '#0F2E3B',
          '#513A2C',
          '#E09A29',
          'green',
        ]}
      />
      <button
        style={{
          height: 40,
          borderRadius: 0,
          background: 'none',
          border: `1px solid ${primaryColor}`,
          color: primaryColor,
          marginBottom: '2%',
        }}
        onClick={() => {
          setIsChangeColor(false)
        }}
      >
        Close
      </button>
    </div>
  ) : (
    <button
      style={{
        position: 'absolute',
        right: 0,
        bottom: 150,
        transform: 'rotate(-90deg)',
        transformOrigin: 'right bottom',
        background: 'none',
        border: `1px solid ${secondaryColor}`,
        borderBottom: 'none',
        color: secondaryColor,
        padding: 5,
      }}
      onClick={() => {
        setIsChangeColor(!isChangeColor)
      }}
    >
      Change color
    </button>
  )
}

export default ChangeColor
