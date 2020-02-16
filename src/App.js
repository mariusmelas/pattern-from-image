import React, { useState, useEffect } from 'react'
import CreatePattern from './components/CreatePattern.js'
import ViewCanvas from './components/ViewImage.js'
import ChangeColor from './components/ChangeColor.js'
import './App.css'
import usePercentOfMinSize from './CustomHooks.js'

function App() {
  const [pattern, setPattern] = useState(undefined)
  const [primaryColor, setPrimaryColor] = useState('#E64D36')
  const [secondaryColor, setSecondaryColor] = useState('#D9CDE6')
  const numberOfValues = 6

  const percentOfMinSize = usePercentOfMinSize(40)

  useEffect(() => {
    document.body.style = `background: ${primaryColor};`
  }, [primaryColor])

  return (
    <div
      className="background"
      style={{
        backgroundColor: primaryColor,
        borderColor: secondaryColor,
        color: secondaryColor,
      }}
    >
      <ChangeColor
        primaryColor={primaryColor}
        setPrimaryColor={setPrimaryColor}
        secondaryColor={secondaryColor}
        setSecondaryColor={setSecondaryColor}
      />
      <div className="app-container">
        <div
          style={{
            display: 'grid',
            justifyItems: 'center',
            alignItems: 'center',
          }}
        >
          <ViewCanvas
            pattern={pattern}
            numberOfValues={numberOfValues}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
          />
        </div>
        <div className="pattern-container">
          <CreatePattern
            pattern={pattern}
            setPattern={setPattern}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            percentOfMinSize={percentOfMinSize}
          />
        </div>
      </div>
    </div>
  )
}

export default App
