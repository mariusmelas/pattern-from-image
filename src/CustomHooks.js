import React, { useState, useEffect } from 'react'

function usePercentOfMinSize(percent) {
  const [orientation, setOrientation] = useState(undefined)
  const [size, setSize] = useState(undefined)

  useEffect(() => {
    function handleResize() {
      const newSize =
        window.innerWidth < window.innerHeight
          ? window.innerWidth
          : window.innerHeight

      setSize(newSize)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize')
    }
  }, [])

  return Math.floor((size / 100) * percent)
}

export default usePercentOfMinSize
