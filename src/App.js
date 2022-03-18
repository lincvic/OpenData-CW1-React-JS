import {RadarRateChart} from "./chart-render/radar-chart";
import {VerticalTradingStatus} from "./chart-render/trading-status-chart";
import {LineChart0250} from "./chart-render/line-chart-0-250";
import {ScatterCircleChart} from "./chart-render/scatter-chart";
import {ScatterCircleChartBreakDown} from "./chart-render/scatter-chart-break-down";
import './App.css';
import ReactDropdown from "react-dropdown";
import {useState} from "react";
import 'react-dropdown/style.css';

const attributes = [
    { value: 'Corona', label: 'Coronavirus Job Retention Scheme' },
    { value: 'Business', label: 'Business rates holiday' },
    { value: 'Defer', label: 'Deferring VAT payments' },
    { value: 'HMRC', label: 'HMRC Time To Pay scheme' },
    { value: 'Gov', label: 'Government-funded small business grant or loan schemes' },
    { value: 'HMRC', label: 'HMRC Time To Pay scheme' },
    { value: 'Acc', label: 'Accredited finance agreements' }
]

const getLabel = value => {
    for (let i = 0; i < attributes.length; i++) {
        if (attributes[i].value === value) {
            return attributes[i].label;
        }
    }
}


function App() {
    const [chartAttribute, setChartAttribute] = useState("Corona")
    const chartLabel = getLabel(chartAttribute)
    return (
        <>
            <p><b>COVID UK Business Impact</b></p>
            <VerticalTradingStatus/>
            <RadarRateChart/>
            <LineChart0250/>
            <ScatterCircleChart answerName = {chartAttribute}/>
            <div className="menus-container">
                <span className="dropdown-label">Choose Initiatives</span>
                <ReactDropdown
                    options={attributes}
                    value={chartAttribute}
                    onChange={({ value }) => setChartAttribute(value)}
                />
            </div>
            <ScatterCircleChartBreakDown answerName={chartAttribute}/>
        </>
    )
}

export default App;
