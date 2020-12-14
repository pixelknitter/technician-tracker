import { useEffect, useState } from "react"

// css dimension conversions
function vh(value: number) {
  var height = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  )
  return (value * height) / 100
}

function vw(value: number) {
  var width = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  )
  return (value * width) / 100
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function vmin(value: number) {
  return Math.min(vh(value), vw(value))
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function vmax(value: number) {
  return Math.max(vh(value), vw(value))
}

const useWindowSize = (
  // defaults to fullscreen
  preferredWidth: number = 100,
  preferredHeight: number = 100
) => {
  const [windowSize, setWindowSize] = useState({
    width: vw(preferredWidth),
    height: vh(preferredHeight),
  })

  useEffect(() => {
    const updateDimensions = () => {
      setWindowSize({
        width: vw(preferredWidth),
        height: vh(preferredHeight),
      })
    }
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [preferredHeight, preferredWidth])

  return windowSize
}

export { useWindowSize }
