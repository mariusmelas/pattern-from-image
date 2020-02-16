import React, { useState, useEffect } from 'react'
import './styles/create-pattern-values.css'

function initPatternArray() {
  const numberOfValues = 6
  const createPatternGridSize = 6 * 6
  let newPattern = []

  // Inital pattern
  for (let i = 0; i < numberOfValues; i++) {
    const patternElements = []
    for (let j = 0; j < createPatternGridSize; j++) {
      const offset = newPattern.length + 1
      patternElements.push(j % offset === 0 ? true : false)
    }
    newPattern.push(patternElements)
  }

  return newPattern
}

function CreatePatternElement(props) {
  // Grid too draw one element of the pattern

  useEffect(() => {}, [props.perentOfMinSize])

  const updatePattern = (valueGrid, pixel) => {
    let newValuePatterns = [...props.pattern]
    newValuePatterns[valueGrid][pixel] = !newValuePatterns[valueGrid][
      pixel
    ]
    props.setPattern(newValuePatterns)
  }

  return (
    <div className="create-pattern">
      {props.patternElement.map((pixel, pixelIndex) => (
        <div
          key={(pixel, pixelIndex)}
          onClick={() => updatePattern(props.index, pixelIndex)}
          className="pattern-pixel"
          style={{
            backgroundColor: pixel
              ? props.primaryColor
              : props.secondaryColor,
          }}
        />
      ))}
    </div>
  )
}

function CreatePattern(props) {
  const [isValue, setIsValue] = useState(0)
  useEffect(() => {
    // Set up array that stores the pattern drawn by user.
    props.setPattern(initPatternArray())
  }, [])

  function handleSelectPatternClick(i) {
    setIsValue(i)
  }

  return (
    <div className="create-pattern-mobile-container">
      {props.pattern && (
        <CreatePatternElement
          patternElement={props.pattern[isValue]}
          index={isValue}
          pattern={props.pattern}
          setPattern={props.setPattern}
          primaryColor={props.primaryColor}
          secondaryColor={props.secondaryColor}
          window10percent={props.perentOfMinSize}
        />
      )}
      <div className="select-pattern-element">
        {props.pattern &&
          props.pattern.map((e, i) => (
            <div
              key={i}
              style={{
                background:
                  isValue === i ? props.secondaryColor : 'none',
                borderColor: props.secondaryColor,
              }}
              className="select-pattern-element-icon"
              onClick={() => handleSelectPatternClick(i)}
            />
          ))}
      </div>
    </div>
  )
}

export default CreatePattern
