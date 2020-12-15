import { useState, useEffect } from "react"
import "./map.css"
import ReactMapGL, { NavigationControl, Marker } from "react-map-gl"
import { useWindowSize } from "../../hooks"
import { Feature, Coordinate } from "../../data/types"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import techMarker, {
  ReactComponent as TechMarker,
} from "../../assets/technician_icon.svg"

type Props = {
  data?: Feature[]
}

enum Unit {
  kilometer,
  miles,
  nauticalMiles,
}

const DEFAULT_COORDINATES = { latitude: 37.7577, longitude: -122.4376 }

const renderTechnicians = (data?: Feature[]): JSX.Element[] | null => {
  if (!data) return null

  return data.map((technician) => (
    <Marker
      className="Map-tech-marker"
      key={technician.properties.name}
      latitude={technician.geometry.coordinates.latitude}
      longitude={technician.geometry.coordinates.longitude}
      offsetLeft={0}
      offsetTop={0}
    >
      <TechMarker className="Map-tech-icon" />
      <p>{technician.properties.name}</p>
    </Marker>
  ))
}

const findCenter = (data: Feature[]): Coordinate => {
  if (!data) return DEFAULT_COORDINATES

  // calculate the rough centroid
  const centerLat: number =
    data
      .map((tech) => tech.geometry.coordinates.latitude)
      .reduce((prev, current) => prev + current, 0) / data.length
  const centerLong =
    data
      .map((tech) => tech.geometry.coordinates.longitude)
      .reduce((prev, current) => prev + current, 0) / data.length

  return { latitude: centerLat, longitude: centerLong }
}

// TODO: move to utilities
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const distance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
  unit: Unit
) => {
  if (lat1 === lat2 && lon1 === lon2) {
    return 0
  } else {
    var radlat1 = (Math.PI * lat1) / 180
    var radlat2 = (Math.PI * lat2) / 180
    var theta = lon1 - lon2
    var radtheta = (Math.PI * theta) / 180
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
    if (dist > 1) {
      dist = 1
    }
    dist = Math.acos(dist)
    dist = (dist * 180) / Math.PI
    dist = dist * 60 * 1.1515
    if (unit === Unit.kilometer) {
      dist = dist * 1.609344
    }
    if (unit === Unit.nauticalMiles) {
      dist = dist * 0.8684
    }
    return dist
  }
}

const Map: React.FC<Props> = ({ data }) => {
  const size = useWindowSize(100, 84)
  const origin = (data && findCenter(data)) || DEFAULT_COORDINATES
  const [viewport, setViewport] = useState({
    width: size.width,
    height: size.height,
    latitude: origin.latitude,
    longitude: origin.longitude,
    bearing: 0,
    zoom: 14, // get a rough size for demo
  })

  // updates the viewport with window changes
  useEffect(() => {
    // TODO: alert proximity when two techs are nearby
    setViewport((previousView) => {
      return {
        ...previousView,
        width: size.width,
        height: size.height,
        latitude: origin.latitude,
        longitude: origin.longitude,
      }
    })
  }, [size, origin])

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={(viewState) => setViewport(viewState)}
    >
      {data && renderTechnicians(data)}
      <div style={{ position: "absolute", right: 0 }}>
        <NavigationControl />
      </div>
    </ReactMapGL>
  )
}

export { Map }
