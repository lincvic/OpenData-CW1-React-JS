import {RadarRateChart} from "./chart-render/radar-chart";
import {VerticalTradingStatus} from "./chart-render/trading-status-chart";
import {LineChart0250} from "./chart-render/line-chart-0-250";
import {ScatterCircleChart} from "./chart-render/scatter-chart";
import {ScatterCircleChartBreakDown} from "./chart-render/scatter-chart-break-down";
import {UKMapD3} from "./chart-render/ukmapd3";
import {useMapData} from "./data-reader/map-reader";
import './App.css';
import ReactDropdown from "react-dropdown";
import {useState} from "react";
import 'react-dropdown/style.css';

const attributes = [
    {value: 'Corona', label: 'Coronavirus Job Retention Scheme'},
    {value: 'Business', label: 'Business rates holiday'},
    {value: 'Defer', label: 'Deferring VAT payments'},
    {value: 'HMRC', label: 'HMRC Time To Pay scheme'},
    {value: 'Gov', label: 'Government-funded small business grant or loan schemes'},
    {value: 'HMRC', label: 'HMRC Time To Pay scheme'},
    {value: 'Acc', label: 'Accredited finance agreements'}
]


function App() {
    const [chartAttribute, setChartAttribute] = useState("Corona")
    const mapData = useMapData()
    if (mapData === null) {
        return (
            <>
                <p>Loading..</p>
            </>
        )
    }
    return (
        <>
            <div className="container">
                <p ><b>COVID UK Business Impact</b></p>
                <div className="stuName">
                    <h5>Yijiang Wang</h5>
                    <h5>Powered by React + D3.js</h5>
                </div>
            </div>
            <div className="container">
                <VerticalTradingStatus/>
            </div>

            <div className="container">
                <RadarRateChart/>
                <LineChart0250/>
            </div>
            <div className="menus-container">
                <span className="dropdown-label">Choose Initiatives</span>
                <ReactDropdown
                    options={attributes}
                    value={chartAttribute}
                    onChange={({value}) => setChartAttribute(value)}
                />
            </div>
            <div className="container">
                <ScatterCircleChart answerName={chartAttribute}/>
            </div>

            <div className="container">
                <ScatterCircleChartBreakDown answerName={chartAttribute}/>
                <div className="ukmap">
                    <h1>Break Down By Country</h1>
                    <svg width={640} height={480}>
                        <UKMapD3 country={mapData.ukCountry} mapCSV={mapData.mapCSVData} selectedName={chartAttribute}/>
                    </svg>
                </div>
                <div className="colorBox">
                    <svg width="400" height="110">
                        <defs>
                            <linearGradient id="myColor"
                                            x1="0%" y1="50%"
                                            x2="100%" y2="50%"
                                            spreadMethod="pad">
                                <stop offset="0%" stop-color="#A9E7F0" stop-opacity="1"/>
                                <stop offset="100%" stop-color="#7400B8" stop-opacity="1"/>
                            </linearGradient>
                        </defs>
                        <rect width="300" height="50" fill="url(#myColor)"/>
                        <text y="80" x = "110" className="svgColorLabel">0 - 100%</text>
                    </svg>

                </div>
            </div>
        </>
    )
}

export default App;
