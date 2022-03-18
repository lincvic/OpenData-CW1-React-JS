import React, { PureComponent } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import './chart.css'

const data = [
    {
        name:"Size 0-99",
        rate:26.9
    },
    {
        name:"Size 100-249",
        rate:37.9
    },
    {
        name:"Size > 250",
        rate:32.1
    }
]
export const LineChart0250 = () => {
    return(
        <div>
            <h1>Different workforce size company Response Rate</h1>
        <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis type="number" name="Percentage" unit="%" style={{
                fontSize: '1rem',
                fontFamily: 'Fredoka',
            }}/>
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="rate" stroke="#8884d8" activeDot={{ r: 8 }} strokeWidth={5}/>
        </LineChart>
        </div>
    )
}