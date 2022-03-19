import React from 'react';
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis} from 'recharts';
const radarData = [
    {
        subject: "Response Rate",
        LT250: 36.5,
        GT250: 32.1
    },
    {
        subject: "Continue to Trade",
        LT250: 36.5,
        GT250: 79.8
    },
    {
        subject: "Permanently Ceased Trading",
        LT250: 0.5,
        GT250: 0.5
    },
    {
        subject: "Temporarily Closed or pause",
        LT250: 24.7,
        GT250: 19.7
    }
]

export const RadarRateChart = () =>{
    console.log(radarData)
    return (
        <div>
            <h1>Trading Status of different size company</h1>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}
                        width={800}
                        height={480}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" style={{
                    fontSize: '15px',
                    fontFamily: 'Fredoka',
                }}
                />
                <PolarRadiusAxis angle={45} domain={[0, 100]} />
                <Radar name="Size Less Than 250" dataKey="LT250" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Radar name="Size Geater Than 250" dataKey="GT250" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                <Legend />
            </RadarChart>
        </div>
    )
}