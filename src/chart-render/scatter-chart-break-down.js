import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    ZAxis,
    CartesianGrid,
    Tooltip,
    Legend, ReferenceLine,
    ReferenceArea
} from "recharts"
import React, {useEffect, useState} from "react";
import * as d3 from "d3";

const width = window.innerWidth/1.05
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
    let linePosition = (a) =>{
        let sum = 0
        newData.forEach(item => {
            sum += parseFloat(item[a])
        })
        return sum/12
    }

    let maxValue = (a) => {
        let max = 0
        newData.forEach(item => {
            if(+(item[a]) > max){
                max = parseFloat(item[a])
            }
        })
        return max
    }

    for(let i = 0; i < 12; i++){
        let arrTemp = []
        arrTemp.push(newData[i])
        arrData.push(arrTemp)
        arrName.push(newData[i].industry)
    }

    console.log("break arr data", arrData, arrName)
    for(let i = 0; i < 12; i++){
        scatters.push(<Scatter name ={arrName[i]} data={arrData[i]} fill={colorPalette[i]} shape="circle"/>)
    }


    return (
        <div>
            <h1>The company's approach to government policy</h1>
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
                <Scatter name ={arrName[0]} data={arrData[0]} fill={colorPalette[0]} shape="circle"/>
                <ReferenceLine y={linePosition(apply)}  stroke="#03045e"  strokeWidth = {3}/>
                <ReferenceLine x={linePosition(intend)}  stroke="#03045e" strokeWidth = {3}/>
                <ReferenceArea x1={(linePosition(intend))/2}
                               x2={(linePosition(intend))/2}
                               y1={(maxValue(apply)-linePosition(apply))/1.5+linePosition(apply)}
                               y2 = {(maxValue(apply)-linePosition(apply))/1.5+linePosition(apply)} label="Very useful initiatives" opacity={0} />
                <ReferenceArea x1={(maxValue(intend)-linePosition(intend))/1.3+linePosition(intend)}
                               x2={(maxValue(intend)-linePosition(intend))/1.3+linePosition(intend)}
                               y1={(maxValue(apply)-linePosition(apply))/1.5+linePosition(apply)}
                               y2={(maxValue(apply)-linePosition(apply))/1.5+linePosition(apply)}
                               label="Very popular initiatives" opacity={0}/>
                <ReferenceArea x1={(linePosition(intend))/2}
                               x2={(linePosition(intend))/2}
                               y1={(linePosition(apply))/2}
                               y2 ={(linePosition(apply))/2} label="Not successful initiatives" opacity={0}/>
                <ReferenceArea x1={(maxValue(intend)-linePosition(intend))/1.3+linePosition(intend)}
                               x2={(maxValue(intend)-linePosition(intend))/1.3+linePosition(intend)}
                               y1={(linePosition(apply))/2}
                               y2 ={(linePosition(apply))/2}
                               label="Initiatives that do not work well" opacity={0}/>
            </ScatterChart>
        </div>
    )
}