import { useState, useEffect } from "react"
import "./map.css"
import ReactMapGL from "react-map-gl"
import { useWindowSize } from "../../hooks"
import { Coordinate } from "../../data/types"

type Props = {
  coordinates?: Coordinate
}

const DEFAULT_COORDINATES = { latitude: 37.7577, longitude: -122.4376 }

const Map: React.FC<Props> = ({ coordinates = DEFAULT_COORDINATES }) => {
  const size = useWindowSize(100, 84)
  const [viewport, setViewport] = useState({
    width: size.width,
    height: size.height,
    latitude: coordinates.latitude,
    longitude: coordinates.longitude,
    zoom: 8,
  })

  // updates the viewport with window changes
  useEffect(() => {
    setViewport((previousView) => {
      return {
        ...previousView,
        width: size.width,
        height: size.height,
      }
    })
  }, [size])

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={(viewState) => setViewport(viewState)}
    />
  )
}

export { Map }
