import * as echarts from "echarts";
import EChartsReact from "echarts-for-react";
import * as uk from '../../public/geo-json/UK.json'


echarts.registerMap('UK', uk)

var option = {
    title: {
        text: 'USA Population Estimates (2012)',
        subtext: 'Data from www.census.gov',
        sublink: 'http://www.census.gov/popest/data/datasets.html',
        left: 'right'
    },
    tooltip: {
        trigger: 'item',
        showDelay: 0,
        transitionDuration: 0.2
    },
    visualMap: {
        left: 'right',
        min: 1,
        max: 100,
        inRange: {
            color: [
                '#313695',
                '#4575b4',
                '#74add1',
                '#abd9e9',
                '#e0f3f8',
                '#ffffbf',
                '#fee090',
                '#fdae61',
                '#f46d43',
                '#d73027',
                '#a50026'
            ]
        },
        text: ['High', 'Low'],
        calculable: true
    },
    toolbox: {
        show: true,
        left: 'left',
        top: 'top',
        feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
        }
    },
    series: [
        {
            name: 'UK PopEstimates',
            type: 'map',
            map: 'UK',
            emphasis: {
                label: {
                    show: true
                }
            },
            data: [
                { name: 'Wales', value: 10 },
                { name: 'Southampton', value: 100 }
            ]
        }
    ]
}

export const UKmap = () =>{
    return (
        <EChartsReact option={option}/>
    )
}


