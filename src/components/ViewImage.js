import React, { useState, useEffect, useRef } from 'react'
import UploadImage from './UploadImage.js'
import './styles/view-image.css'

function ViewPattern(props) {
  const [WIDTH, setWIDTH] = useState(undefined)
  const [HEIGHT, setHEIGHT] = useState(undefined)
  const [isBigSize, setIsBigSize] = useState(false)

  useEffect(() => {
    // Set the size for the canvas based on viewport width

    const orientation =
      window.visualViewport.width > window.visualViewport.height
        ? 'landscape'
        : 'portrait'
    if (!isBigSize) {
      let size = window.visualViewport.width
      size =
        size > 760 && orientation === 'landscape' ? size * 0.4 : size
      setWIDTH(size)
      setHEIGHT(size)
    }
  }, [isBigSize])

  const elements = 40
  const patternElementWidth = WIDTH / elements

  const patternCanvasRef = useRef(0)

  function handleCanvasClick() {
    if (!isBigSize) {
      let size = window.visualViewport.height
      setWIDTH(size)
      setHEIGHT(size)
      setIsBigSize(true)
    } else {
      setIsBigSize(false)
    }
  }

  useEffect(() => {
    const canvas = patternCanvasRef.current
    const ctx = canvas.getContext('2d')

    canvas.width = WIDTH
    canvas.height = HEIGHT

    // Draw pattern on canvas

    for (let i = 0; i < elements; i++) {
      for (let j = 0; j < elements; j++) {
        // find this pixels value and draw pattern
        const posInPixelated = j + elements * i
        const valueOfPixel = props.pixelated[posInPixelated]
        const pixelPattern = props.pattern[valueOfPixel]
        for (let x = 0; x < 6; x++) {
          for (let y = 0; y < 6; y++) {
            const posInPattern = y + 6 * x
            ctx.fillStyle = pixelPattern[posInPattern]
              ? props.primaryColor
              : props.secondaryColor
            ctx.fillRect(
              j * patternElementWidth +
                (y * WIDTH) / elements / 6 -
                0.6,
              i * patternElementWidth +
                (x * HEIGHT) / elements / 6 -
                0.6,
              WIDTH / elements / 6 + 0.6,
              WIDTH / elements / 6 + 0.6,
            )
          }
        }
      }
    }
  }, [
    props.pattern,
    props.primaryColor,
    props.secondaryColor,
    WIDTH,
    HEIGHT,
  ])

  return <canvas onClick={handleCanvasClick} ref={patternCanvasRef} />
}

function ViewImage(props) {
  // Set up size for the canvas
  // !! Should [fix] to relative sizes

  const WIDTH = 600
  const HEIGHT = 600
  const patternElementWidth = 15

  const canvasRef = useRef(0)

  useEffect(() => {
    const findAverageColor = function(pixels) {
      // Find the average color of a slice of the uploaded image.
      // Returns the color as greyscale rgb.

      let rgba = [0, 0, 0, 0]

      for (let p = 0; p < pixels.length; p += 4) {
        rgba[0] += pixels[p]
        rgba[1] += pixels[p + 1]
        rgba[2] += pixels[p + 2]
        rgba[3] += pixels[p + 3]
      }

      rgba[0] = Math.round(rgba[0] / (pixels.length / 4))
      rgba[1] = Math.round(rgba[1] / (pixels.length / 4))
      rgba[2] = Math.round(rgba[2] / (pixels.length / 4))
      rgba[3] = Math.round(rgba[3] / (pixels.length / 4))

      const greyscaleRGBValue = Math.round(
        (rgba[0] + rgba[1] + rgba[2]) / 3,
      )

      return greyscaleRGBValue
    }

    const findValue = function(greyscaleRGBValue, max) {
      // Returns a value to give the slice of image
      // based on greyscaleRGBValue
      const minimizer = Math.round(max / props.numberOfValues)
      let value = 0

      if (greyscaleRGBValue < minimizer) {
        value = 0
      } else if (greyscaleRGBValue < minimizer * 2) {
        value = 1
      } else if (greyscaleRGBValue < minimizer * 3) {
        value = 2
      } else if (greyscaleRGBValue < minimizer * 4) {
        value = 3
      } else if (greyscaleRGBValue < minimizer * 5) {
        value = 4
      } else if (greyscaleRGBValue < minimizer * 6) {
        value = 5
      }

      return value
    }

    // setup canvas
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = WIDTH
    canvas.height = HEIGHT

    const img = new Image()
    img.src = props.uploadedImage

    img.addEventListener(
      'load',
      () => {
        // Draw image to canvas
        ctx.drawImage(img, 0, 0, WIDTH, HEIGHT)
        let pixels = []

        // Loop over the image and push imageData from slices of the image to the pixels array
        for (let i = 0; i < WIDTH; i += patternElementWidth) {
          for (let j = 0; j < HEIGHT; j += patternElementWidth) {
            let imageData = ctx.getImageData(
              j,
              i,
              patternElementWidth,
              patternElementWidth,
            )
            imageData = Array.from(imageData.data)
            // Push the average color in greyscale
            pixels.push(findAverageColor(imageData))
          }
        }

        // Find the highest greyscale value
        // Map over pixels and change it to n < max / nmbrOfValues
        let max = 0
        pixels.forEach(n => {
          max = max < n ? n : max
        })
        pixels = pixels.map(n => findValue(n, max))
        props.handlePixelated(pixels)
      },
      false,
    )
  }, [])

  return (
    <div>
      {!props.pixelated && (
        <canvas
          style={{ visibility: 'hidden' }}
          ref={canvasRef}
        ></canvas>
      )}

      <div
        className="pixelated"
        style={{
          width: WIDTH,
          height: HEIGHT,
          display: 'grid',
          gridTemplateColumns: 'repeat(20,1fr)',
        }}
      >
        {props.pixelated &&
          props.pixelated.map((pixel, index) => (
            <div
              key={index}
              className="pixel"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(6, 1fr)',
                width: WIDTH / patternElementWidth,
                height: HEIGHT / patternElementWidth,
              }}
            >
              {props.pattern &&
                props.pattern[pixel] &&
                props.pattern[pixel].map(e => (
                  <div
                    style={{
                      width: patternElementWidth / 6,
                      height: patternElementWidth / 6,
                      backgroundColor: e ? 'black' : 'grey',
                    }}
                  ></div>
                ))}
            </div>
          ))}
      </div>
    </div>
  )
}

function ViewCanvas(props) {
  const [uploadedImage, setUploadedImage] = useState(false)
  const [pixelated, setPixelated] = useState(false)

  function handlePixelated(pixels) {
    setPixelated(pixels)
  }

  function handleImageUpload(file) {
    setUploadedImage(file)
  }

  function handleCloseButton() {
    setUploadedImage(false)
    setPixelated(false)
  }

  return (
    <div className="canvas-container">
      {!uploadedImage ? (
        <UploadImage
          primaryColor={props.primaryColor}
          secondaryColor={props.secondaryColor}
          handleImageUpload={handleImageUpload}
        />
      ) : props.pattern && pixelated ? (
        <div className="view-pattern-container">
          <ViewPattern
            primaryColor={props.primaryColor}
            secondaryColor={props.secondaryColor}
            pattern={props.pattern}
            numberOfValues={props.numberOfValues}
            handlePixelated={handlePixelated}
            pixelated={pixelated}
          />
        </div>
      ) : (
        !pixelated && (
          <ViewImage
            uploadedImage={uploadedImage}
            pattern={props.pattern}
            numberOfValues={props.numberOfValues}
            handlePixelated={handlePixelated}
            pixelated={pixelated}
          />
        )
      )}
    </div>
  )
}

export default ViewCanvas
