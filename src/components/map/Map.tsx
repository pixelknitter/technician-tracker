import { useState, useEffect, useMemo } from "react"
import "./map.css"
import ReactMapGL, { NavigationControl, Marker } from "react-map-gl"
import { useToasts } from "react-toast-notifications"
import { point, distance } from "@turf/turf"
import { useWindowSize } from "../../hooks"
import { Feature, Coordinate, Property } from "../../data/types"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import techMarker, {
  ReactComponent as TechMarker,
} from "../../assets/technician_icon.svg"

type Props = {
  data: Feature[]
}

const DEFAULT_COORDINATES = { latitude: 37.7577, longitude: -122.4376 }
const DEFAULT_ALERT_DISTANCE = 304.8 // meters or within 1000ft

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

type TechReach = { distance: number; techs: Property[] }

/**
 *
 * @param data - an array of properties/techs
 * @param distance - a distance in meters
 */
const techsWithinReach = (data: Feature[], reach: number): TechReach[] => {
  let result: TechReach[] = []

  for (let step = 0; step < data.length; step++) {
    const tech1 = data[step]
    for (let innerStep = step + 1; innerStep < data.length; innerStep++) {
      const tech2 = data[innerStep]

      const coords1 = tech1.geometry.coordinates
      const coords2 = tech2.geometry.coordinates
      const distanceBetween = distance(
        [coords1.latitude, coords1.longitude],
        [coords2.latitude, coords2.longitude],
        { units: "meters" }
      )

      if (distanceBetween <= reach) {
        result.push({
          distance: distanceBetween,
          techs: [tech1.properties, tech2.properties],
        })
      }
    }
  }
  return result
}

const Map: React.FC<Props> = ({ data = [] }) => {
  const { addToast } = useToasts()
  const size = useWindowSize(100, 84)
  const origin = useMemo(() => findCenter(data) || DEFAULT_COORDINATES, [data])
  const [viewport, setViewport] = useState({
    width: size.width,
    height: size.height,
    latitude: origin.latitude,
    longitude: origin.longitude,
    bearing: 0,
    zoom: 14, // get a rough size for demo
  })

  // display a toast alert when two techs get with an alert distance
  useEffect(() => {
    const nearbyTechs = techsWithinReach(data, DEFAULT_ALERT_DISTANCE)
    if (nearbyTechs.length > 0) {
      nearbyTechs.forEach((techReach) => {
        // FIXME: update the toast instead of simply adding new ones if the tech pairing is the same
        addToast(
          `${techReach.techs[0].name} and ${
            techReach.techs[1].name
          } are within ${techReach.distance.toFixed(2)} meters!`,
          {
            appearance: "info",
            autoDismiss: true,
          }
        )
      })
    }
  }, [data, addToast])

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
      {renderTechnicians(data)}
      <div style={{ position: "absolute", right: 0 }}>
        <NavigationControl />
      </div>
    </ReactMapGL>
  )
}

export { Map }
