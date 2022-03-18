import {Sankey, Tooltip, LabelList} from "recharts";
import './chart.css'

const data = {
    "nodes": [
        {"name": "All Industry"},

        {"name": "Workforce Size > 250"},
        {"name": "Workforce Size < 250"},
        {"name": "Workforce Size 0-99"},
        {"name": "Workforce Size 100-249"}

    ],
    "links": [
        {
            "source": 0,
            "target": 1,
            "value": 36.5
        },
        {
            "source": 0,
            "target": 2,
            "value": 32.1
        },
        {
            "source": 2,
            "target": 3,
            "value": 26.9
        },
        {
            "source": 2,
            "target": 4,
            "value": 37.9
        }
    ]
}

export const SankeyChartWF = () => {
    return (
        <div>
        <h1>Response Rate break down by workforce size</h1>
        <Sankey
            width={960}
            height={500}
            data={data}
            nodePadding={50}
            nameKey="name"
            margin={{
                left: 200,
                right: 200,
                top: 100,
                bottom: 100,
            }}
            link={{stroke: '#77c878'}}

        >
            <LabelList dataKey="name" position="left"/>
            <Tooltip/>
        </Sankey>
        </div>
    )
}