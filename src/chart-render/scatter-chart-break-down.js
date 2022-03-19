import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    ZAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts"
import React, {useEffect, useState} from "react";
import * as d3 from "d3";

const width = 640
const height = 480
const colorPalette = ["#161418", "#e83131", "#0a0ab2", "#ea9494",
    "#21fa00", "#48BFE3", "#a69bda", "#fa07f4",
    "#ea83d4", "#d8ff4d", "#4cffde", "#ec9e0b"]

export const ScatterCircleChartBreakDown = ({answerName = "Corona"}) => {
    const [data, setData] = useState(null)
    useEffect(() => {
        d3.csv("./sparql-result/break-down-init.csv").then(data => {
            setData(data)
        })
    }, [])
    if (!data) {
        return (<pre>Loading...</pre>)
    }
    let apply = answerName + "Apply"
    let rec = answerName + "Rec"
    let intend = answerName + "Intend"

    let newData = data.map(item => {
        const newItem = {
            "industry": item["industry"].replace("http://www.semanticweb.org/yijiang/ontologies/2022/2/OpenData-CW-1-Yijiang#", ""),
            [apply]: +((+(item[apply]) * 100).toFixed(2)),
            [rec]: +(((item[rec] === '*') ? (0.1) : (+(item[rec]) * 100)).toFixed(2)),
            [intend]: +(((item[intend] === '*') ? (0.1) : (+(item[intend]) * 100)).toFixed(2))
        }
        return newItem
    })

    console.log("new data break down", newData)
    let arrData = []
    let arrName = []
    let scatters= []

    for(let i = 0; i < 2; i++){
        let arrTemp = []
        arrTemp.push(newData[i])
        arrData.push(arrTemp)
        arrName.push(newData[i].industry)
    }

    console.log("break arr data", arrData, arrName)
    for(let i = 0; i < 2; i++){
        scatters.push(<Scatter name ={arrName[i]} data={arrData[i]} fill={colorPalette[i+4]} shape="circle"/>)
    }


    return (
        <div>
            <h1>Break Down</h1>
            <h1>By Company Workforce size</h1>
            <ScatterChart
                width={width}
                height={height}
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20
                }}
            >
                <CartesianGrid />
                <XAxis type="number" dataKey={intend} name="Intend Rate" unit="%" label={
                    { value: 'Intend Rate', angle: 0, position: 'insideBottomRight'}
                }/>
                <YAxis type="number" dataKey={apply} name="Apply Rate" unit="%" label={{ value: 'Apply Rate', angle: -90, position: 'insideLeft'}}/>
                <ZAxis
                    type="number"
                    dataKey={rec}
                    range={[100,1000]}
                    name="Receive Rate"
                    unit="%"
                />
                <Tooltip cursor={{strokeDasharray: "3 3"}}/>
                <Legend/>
                {scatters}
            </ScatterChart>
        </div>
    )
}