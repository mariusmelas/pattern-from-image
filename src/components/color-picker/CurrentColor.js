import React, { useState, useRef, useEffect } from 'react'

function CurrentColor(props) {
  const currentColorStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    background: props.color,
    width: '30%',
    paddingTop: '30%',
    borderRadius: '50%',
    border: '2px solid white',
    zIndex: 10,
  }

  return (
    <div
      onClick={e => props.handleClick(e)}
      style={currentColorStyle}
    />
  )
}

export default CurrentColor
