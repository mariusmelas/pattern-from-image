import { useState, useEffect } from 'react'

function usePercentOfMinSize(percent) {
  const [size, setSize] = useState(undefined)

  useEffect(() => {
    function handleResize() {
      const newSize =
        window.innerWidth < window.innerHeight
          ? window.innerWidth
          : window.innerHeight

      setSize(newSize)
    }

    window.addEventListener('resize', handleResize, false)

    return () => {
      window.removeEventListener('resize', false)
    }
  }, [])

  return Math.floor((size / 100) * percent)
}

export default usePercentOfMinSize
