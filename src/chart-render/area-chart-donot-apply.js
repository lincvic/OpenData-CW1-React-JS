import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import React, {useEffect, useState} from "react";
import * as d3 from "d3";

export const AreaChartDonotApply = () =>{
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
            "donot":(parseFloat(item["totalResponseRate"]) * 100).toFixed(2),
        }

        return newItem
    })

    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart
                width={500}
                height={400}
                data={data}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="uv" stackId="1" stroke="#8884d8" fill="#8884d8" />
                <Area type="monotone" dataKey="pv" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                <Area type="monotone" dataKey="amt" stackId="1" stroke="#ffc658" fill="#ffc658" />
            </AreaChart>
        </ResponsiveContainer>
    )
}