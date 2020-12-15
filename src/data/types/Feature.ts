import { Property, Geometry } from "."

export type Feature = {
  type: string
  properties: Property
  geometry: Geometry
}
