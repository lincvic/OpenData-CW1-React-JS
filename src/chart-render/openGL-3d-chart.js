import 'echarts-gl';
import ReactECharts from "echarts-for-react";
import './chart.css'
import React, {useEffect, useState} from "react";
import * as d3 from "d3";

const openGL_Opt = () => {
    return (
        {
            grid3D: {},
            xAxis3D: {
                type: 'category'
            },
            yAxis3D: {},
            zAxis3D: {},
            dataset: {
                dimensions: [
                    'Income',
                    'Life Expectancy',
                    'Population',
                    'Country',
                    { name: 'Year', type: 'ordinal' }
                ],
                source: './sparql-result/test.json'
            },
            series: [
                {
                    type: 'scatter3D',
                    symbolSize: '2.5',
                    encode: {
                        x: 'Country',
                        y: 'Life Expectancy',
                        z: 'Income',
                        tooltip: [0, 1, 2, 3, 4]
                    }
                }
            ]
        }
    )
}

export const OpenGLChart = ()=> {
    console.log(openGL_Opt())
    return(
        <div>
            <h1>Answer</h1>
            <ReactECharts
                option={openGL_Opt()}
            />
        </div>
    )
}

