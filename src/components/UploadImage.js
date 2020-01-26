import React from 'react'
import './styles/upload-image.css'

// Uploads image locally in the browser
// To be used in ./UploadImage.js

function UploadImage(props) {
  const handleFileUpload = function(e) {
    e.stopPropagation()
    e.preventDefault()

    const file = e.target.files
      ? e.target.files[0]
      : e.dataTransfer.files[0]

    const reader = new FileReader()
    reader.onload = e => {
      props.handleImageUpload(e.target.result)
    }

    reader.onerror = e => {
      console.log('error')
    }

    reader.readAsDataURL(file)
  }

  const handleDragOver = function(e) {
    e.stopPropagation()
    e.preventDefault()
  }

  return (
    <div
      className="uploadimage-container"
      onDragOver={handleDragOver}
      onDrop={handleFileUpload}
    >
      <span className="uploadimage-info">
        <p className="uploadimage-text">Drag and drop image or</p>
        <form>
          <label tabIndex="1" htmlFor="upload-button">
            <div
              style={{
                backgroundColor: props.secondaryColor,
                color: props.primaryColor,
              }}
              className="choose-file-button"
            >
              choose file
            </div>
          </label>
          <input
            id="upload-button"
            style={{ visibility: 'hidden' }}
            type="file"
            onChange={e => handleFileUpload(e)}
          ></input>
        </form>
      </span>
    </div>
  )
}

export default UploadImage
