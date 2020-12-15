import { Service, Feature } from "../data/types"
import { useCallback, useEffect, useState } from "react"

import data from "../data/api_techician_response_data.json"

const convertFeature = (raw: any): Feature => ({
  type: raw.type,
  properties: raw.properties,
  geometry: {
    type: raw.geometry.type,
    coordinates: {
      longitude: raw.geometry.coordinates[0],
      latitude: raw.geometry.coordinates[1],
    },
  },
})

// enum PollStatus {
//   idle = "idle",
//   running = "running",
// }

const useTechLocationService = () => {
  // const [status, setStatus] = useState<PollStatus>(PollStatus.idle)
  const [result, setResult] = useState<Service<Feature[]>>({
    status: "loading",
  })
  const [pollCount, setPollCount] = useState(0)

  // TODO: maybe use this for some user interaction
  // const togglePolling = useCallback(() => {
  //   setPollCount(0)
  //   setStatus((status) =>
  //     status === PollStatus.running ? PollStatus.idle : PollStatus.running
  //   )
  // }, [])

  const getData = useCallback(() => {
    if (pollCount >= data.length) return

    // FIXME: use the Service promise structure for error handling
    const features = data[pollCount].features.map((feature) => {
      const object = convertFeature(feature)
      console.debug(object)
      return object
    })

    setResult({
      status: "loaded",
      payload: features,
    })
  }, [pollCount])

  useEffect(() => {
    if (pollCount >= data.length) {
      console.log(`Polling stopped at ${pollCount}`)
      return
    }
    const pollingInterval = setInterval(() => {
      console.log(`Polling for more features... ${pollCount}`)
      getData()
      setPollCount((prevValue) => prevValue + 1)
    }, 1000)

    return () => clearInterval(pollingInterval)
  }, [getData, pollCount])
  return result
}

export { useTechLocationService }
