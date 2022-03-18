import * as d3 from 'd3'
import React, {useState, useEffect} from 'react'

const totalResRateURL = "./sparql-result/TotalResRate.csv"

export const DataReader = () => {
    const [data, setData] = useState(null)
    useEffect(()=>{
        d3.csv("./sparql-result/TotalResRate.csv").then(data => {
            setData(data)
        })
    },[])
}