import { geoNaturalEarth1, geoPath, geoGraticule } from 'd3';
import {useEffect} from "react";



export const UKMapD3 = ({ data }) => {
    const projection = geoNaturalEarth1().fitSize([640,480], data.land)
    const path = geoPath(projection);
    const graticule = geoGraticule();
    return(
        <g className="marks">
            {data["land"]["features"].map(feature => (
                <path className="land" d={path(feature)} />
            ))}
        </g>
    )
}
