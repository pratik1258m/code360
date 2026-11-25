// Data for the map reading lab. Symbols and contour shapes follow the Survey of
// India conventional sign conventions taught in NCC map reading.

export type MapSymbol = {
  name: string
  family: 'Relief' | 'Water' | 'Vegetation' | 'Roads' | 'Buildings' | 'Military'
  drawn: string
  means: string
}

export const mapSymbols: MapSymbol[] = [
  { name: 'Contour', family: 'Relief', drawn: 'Thin brown curved line', means: 'Points of equal height; spacing shows steepness.' },
  { name: 'Index contour', family: 'Relief', drawn: 'Thicker brown line with a height', means: 'Every fifth contour, labelled with its elevation.' },
  { name: 'Spot height', family: 'Relief', drawn: 'Dot with a number, e.g. • 273', means: 'Exact height of that point in metres.' },
  { name: 'Depression', family: 'Relief', drawn: 'Closed contour with hachures inward', means: 'A hollow or crater below the surrounding ground.' },
  { name: 'Cliff', family: 'Relief', drawn: 'Contours merging into a heavy line', means: 'Near-vertical ground; impassable for vehicles.' },
  { name: 'River', family: 'Water', drawn: 'Blue line, widening downstream', means: 'Watercourse; crossing needs a bridge or ford.' },
  { name: 'Stream', family: 'Water', drawn: 'Thin blue line', means: 'Small watercourse, often seasonal.' },
  { name: 'Tank / lake', family: 'Water', drawn: 'Blue outline with blue fill', means: 'Standing water; check for a bund and a source.' },
  { name: 'Well', family: 'Water', drawn: 'Small blue circle', means: 'Water point — critical for a camp or harbour.' },
  { name: 'Canal', family: 'Water', drawn: 'Straight blue line with locks', means: 'Artificial waterway, often with a towpath.' },
  { name: 'Forest', family: 'Vegetation', drawn: 'Green stipple or tree symbols', means: 'Tree cover; good concealment, poor observation.' },
  { name: 'Orchard', family: 'Vegetation', drawn: 'Regular rows of green circles', means: 'Planted trees; ordered spacing is visible from the air.' },
  { name: 'Scrub', family: 'Vegetation', drawn: 'Small scattered green tufts', means: 'Low bushes; partial concealment only.' },
  { name: 'Metalled road', family: 'Roads', drawn: 'Two firm parallel black lines', means: 'All-weather road, usable by heavy vehicles.' },
  { name: 'Unmetalled road', family: 'Roads', drawn: 'Two parallel lines, one broken', means: 'Fair-weather road; may be impassable in rain.' },
  { name: 'Track', family: 'Roads', drawn: 'Single broken line', means: 'Village path; foot or light vehicle only.' },
  { name: 'Railway', family: 'Roads', drawn: 'Line with regular cross-ties', means: 'Rail line; a level crossing is a controlled point.' },
  { name: 'Bridge', family: 'Roads', drawn: 'Road crossing water, with a class mark', means: 'The number shows the load the bridge can carry.' },
  { name: 'Village', family: 'Buildings', drawn: 'Cluster of black blocks', means: 'Settlement; a source of labour, water and shelter.' },
  { name: 'Temple / mosque / church', family: 'Buildings', drawn: 'Symbol with spire, dome or cross', means: 'Landmark and often the highest structure locally.' },
  { name: 'Police station', family: 'Buildings', drawn: 'Block marked PS', means: 'Civil authority point for reporting incidents.' },
  { name: 'Airfield', family: 'Military', drawn: 'Long straight strip with a windsock', means: 'Runway; the number gives the magnetic heading.' },
  { name: 'Ferry', family: 'Military', drawn: 'Boat symbol on a water line', means: 'Crossing point without a bridge.' },
  { name: 'Ford', family: 'Military', drawn: 'Broken blue line with depth note', means: 'Shallow crossing; depth and bed decide usability.' },
]

export type ContourShape = {
  name: string
  sketch: string
  means: string
}

export const contourShapes: ContourShape[] = [
  { name: 'Hill', sketch: 'Concentric closed rings, highest inside', means: 'High ground all round; good observation, hard climb.' },
  { name: 'Valley', sketch: 'V shapes pointing upstream, often with a stream', means: 'Low ground between higher sides; a natural route.' },
  { name: 'Spur', sketch: 'U shapes pointing away from high ground', means: 'A ridge running out from a hill; good fields of fire.' },
  { name: 'Saddle', sketch: 'Two hills joined by a low neck', means: 'The lowest crossing between two summits.' },
  { name: 'Depression', sketch: 'Closed ring with hachures pointing inward', means: 'A hollow; dead ground and concealed approach.' },
  { name: 'Escarpment', sketch: 'Contours bunched on one side of a plateau', means: 'A steep face below flat high ground.' },
  { name: 'Ridge', sketch: 'A long line of U shapes along the crest', means: 'A continuous high line; a watershed.' },
  { name: 'Plateau', sketch: 'Wide flat area inside the highest contour', means: 'Flat high ground; poor drainage, good for a base.' },
]

export type BearingDrill = {
  from: string
  to: string
  gridBearing: number
  variation: number
}

// Grid bearings on a notional map extract; variation is degrees east.
export const bearingDrills: BearingDrill[] = [
  { from: 'Bridge at 452 318', to: 'Temple at 461 324', gridBearing: 40, variation: 2 },
  { from: 'Village at 418 302', to: 'Hill top at 430 311', gridBearing: 115, variation: 2 },
  { from: 'Ford at 507 289', to: 'Railway station at 498 297', gridBearing: 285, variation: 1 },
  { from: 'Camp at 336 415', to: 'Well at 344 408', gridBearing: 220, variation: 3 },
  { from: 'Track junction at 271 356', to: 'Forest edge at 280 369', gridBearing: 15, variation: 2 },
]

export type GridDrill = {
  feature: string
  easting: number
  northing: number
  answer: string
}

export const gridDrills: GridDrill[] = [
  { feature: 'Bridge', easting: 452, northing: 318, answer: '452318' },
  { feature: 'Temple', easting: 461, northing: 324, answer: '461324' },
  { feature: 'Well', easting: 344, northing: 408, answer: '344408' },
  { feature: 'Camp', easting: 336, northing: 415, answer: '336415' },
  { feature: 'Station', easting: 498, northing: 297, answer: '498297' },
]

export const scaleFacts = [
  { scale: '1:25,000', text: '1 cm = 250 m · 4 cm = 1 km · a 1 km square is 4 cm across' },
  { scale: '1:50,000', text: '1 cm = 500 m · 2 cm = 1 km · a 1 km square is 2 cm across' },
  { scale: '1:100,000', text: '1 cm = 1 km · a 1 km square is 1 cm across' },
  { scale: '1:250,000', text: '1 cm = 2.5 km · a 10 km square is 4 cm across' },
]
