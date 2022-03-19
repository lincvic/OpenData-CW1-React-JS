import {geoNaturalEarth1, geoPath} from 'd3';

const thresholdColorMapping = (num) => {
    let color
    num = parseFloat(num)
    switch (true) {
        case (num > 0 && num < 0.1):
            color = "#A9E7F0"
            break
        case (num > 0.1 && num < 0.2):
            color = "#93E1EC"
            break
        case (num > 0.2 && num < 0.3):
            color = "#78D9E7"
            break
        case (num > 0.3 && num < 0.4):
            color = "#56CFE1"
            break
        case (num > 0.4 && num < 0.5):
            color = "#48BFE3"
            break
        case (num > 0.5 && num < 0.6):
            color = "#4EA8DE"
            break
        case (num > 0.6 && num < 0.7):
            color = "#5390D9"
            break
        case (num > 0.7 && num < 0.8):
            color = "#5E60CE"
            break
        case (num > 0.8 && num < 0.9):
            color = "#6930C3"
            break
        case (num > 0.9 && num < 1):
            color = "#7400B8"
            break
    }
    return color
}

export const UKMapD3 = ({country, mapCSV, selectedName}) => {
    let apply = selectedName + "Apply"
    const featureArr = {
        type: "FeatureCollection",
        features: [],
    }
    country.forEach(item => {
        featureArr.features.push(...item.features)
    })
    const projection = geoNaturalEarth1().fitSize([640, 480], featureArr)
    const path = geoPath(projection)
    console.log("country data is here", country)

    return country.map((area) => {
        const mapName = area.mapName
        const mapData = mapCSV.find(item =>
            item["country"] === mapName
        )
        const [textX, textY] = path.centroid(area)
        if (mapData===null){
            return (
                <p>Loading</p>
            )
        }
        console.log("Map CSV Data Here", mapData[apply])
        console.log("Color is Here", thresholdColorMapping(mapData[apply]))
        return (
            <g key={area.mapName} className={`${area.mapName} map-area`}>
                {area.features.map((feature) => {
                    return (
                        <path key={feature.id}
                              fill={thresholdColorMapping(mapData[apply])}
                              className="feature"
                              d={path(feature)}
                        />
                    );
                })}
                <text fontSize={"15px"} fontWeight={600} textAnchor="middle" x={textX} y={textY}>
                    {area.mapName}:{(+(mapData[apply]) * 100).toFixed(2)}%
                </text>
            </g>
        )
    })
}
