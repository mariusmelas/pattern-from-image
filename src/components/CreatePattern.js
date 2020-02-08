import React, { useEffect } from 'react'
import './styles/create-pattern-values.css'

function CreatePatternElement(props) {
  // Grid too draw one element of the pattern

  useEffect(() => {}, [props.window10percent])

  const updatePattern = (valueGrid, pixel) => {
    let newValuePatterns = [...props.pattern]
    newValuePatterns[valueGrid][pixel] = !newValuePatterns[valueGrid][
      pixel
    ]
    props.setPattern(newValuePatterns)
  }

  return (
    <div
      style={{
        width: props.window10percent || '10vw',
        height: props.window10percent || '10vw',
      }}
      className="create-pattern"
    >
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
  const numberOfValues = 6

  useEffect(() => {
    // Set up array that stores the pattern drawn by user.

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

    props.setPattern(newPattern)
  }, [])

  return (
    <div className="create-pattern-container">
      {props.pattern &&
        props.pattern.map((e, index) => (
          <CreatePatternElement
            key={e + index}
            patternElement={e}
            index={index}
            pattern={props.pattern}
            setPattern={props.setPattern}
            primaryColor={props.primaryColor}
            secondaryColor={props.secondaryColor}
            window10percent={props.window10percent}
          />
        ))}
    </div>
  )
}

export default CreatePattern
