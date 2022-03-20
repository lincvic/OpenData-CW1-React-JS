import React, {useEffect, useState} from "react"
import {
    ComposedChart,
    Line,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ReferenceLine,
} from "recharts";
import * as d3 from "d3";
import './chart.css'


export const VerticalTradingStatus = () => {
    const [data, setData] = useState(null)
    useEffect(() => {
        d3.csv("./sparql-result/TotalResRate.csv").then(data => {
            setData(data)
        })
    }, [])
    if (!data) {
        return (<pre>Loading...</pre>)
    }
    var newData = data.map(item => {
        const newItem = {
            "industry": item["industry"].replace("http://www.semanticweb.org/yijiang/ontologies/2022/2/OpenData-CW-1-Yijiang#", "").match(/[A-Z][a-z]+/g)[0],
            "totalResponseRate":(parseFloat(item["totalResponseRate"]) * 100).toFixed(2),
            "continueRate":(parseFloat(item["continueRate"]) * 100).toFixed(2),
            "ceasedRate": ((item["ceasedRate"] === '*') ? (1-item["totalResponseRate"]) : (+(item["ceasedRate"]) * 100)).toFixed(2),
            "tempRate": (parseFloat(item["tempRate"]) * 100).toFixed(2)
        }

        return newItem
    })

    console.log(newData)
    return (
        <div>
            <h1>Trading Status break down by industry category</h1>
        <ComposedChart
            width={window.innerWidth/1.3}
            height={480}
            data={newData}
            margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="industry" scale="band" fontSize={25} angle={10} dx={10} interval={0}  style={{
                fontSize: '1rem',
                fontFamily: 'Fredoka',
            }}/>
            <YAxis type="number" name="Percentage" unit="%" label={{ value: 'Percentage', angle: -90, position: 'insideLeft'}} style={{
                fontSize: '1rem',
                fontFamily: 'Fredoka',
            }}/>
            <Tooltip cursor={{strokeDasharray: "3 3"}}/>

            <Legend/>

            <Bar dataKey="totalResponseRate" barSize={20} fill="#007EFF" />
            <Line dataKey="continueRate" fill="#8884d8" stroke="#0A4249" strokeWidth={5} type="monotone" activeDot={{ r: 8 }}/>
            <Line dataKey="ceasedRate" fill="#8884d8" stroke="#911300" strokeWidth={5} type="monotone" activeDot={{ r: 8 }}/>
            <Line dataKey="tempRate" fill="#8884d8" stroke="#00AF5F" strokeWidth={5} type="monotone" activeDot={{ r: 8 }}/>
            <ReferenceLine y={27.5} label="Min Response Rate" stroke="#007EFF" strokeDasharray="3 3" />
            <ReferenceLine y={96.7} label="Max Continue Rate" stroke="#007EFF" strokeDasharray="3 3" />
        </ComposedChart>
        </div>

    )
}