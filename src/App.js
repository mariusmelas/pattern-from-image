import React, { useState, useEffect } from 'react'
import CreatePattern from './components/CreatePattern.js'
import ViewCanvas from './components/ViewImage.js'
import ColorPicker from './components/color-picker/ColorPicker.js'
import './App.css'

function App() {
  const [pattern, setPattern] = useState(undefined)
  const [primaryColor, setPrimaryColor] = useState(undefined)
  const [secondaryColor, setSecondaryColor] = useState(undefined)

  const numberOfValues = 6

  return (
    <div
      className="background"
      style={{
        backgroundColor: primaryColor,
        borderColor: secondaryColor,
        color: secondaryColor,
      }}
    >
      <div className="app-container">
        <div className="pattern-container">
          <div>
            <div
              style={{
                margin: '5%',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                justifyItems: 'center',
              }}
            >
              <ColorPicker
                selectedColor={primaryColor}
                setSelectedColor={setPrimaryColor}
                colorID={0}
                colors={[
                  '#E64D36',
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
                selectedColor={secondaryColor}
                setSelectedColor={setSecondaryColor}
                colorID={1}
                colors={[
                  '#D9CDE6',
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
            </div>
            <div style={{ margin: '5%' }}>
              <CreatePattern
                pattern={pattern}
                setPattern={setPattern}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
              />
            </div>
          </div>
          <div style={{ margin: '5%' }}>
            <ViewCanvas
              pattern={pattern}
              numberOfValues={numberOfValues}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
