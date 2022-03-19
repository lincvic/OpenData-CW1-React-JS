import {useState, useEffect} from 'react';
import {json, csv} from 'd3';
import {feature} from 'topojson';

const engURL = './geo-json/Eng.json';
const scotlandURL = './geo-json/Scotland.json'
const walesURL = './geo-json/Wales.json'
const irelandURL = './geo-json/NorthenIreland.json'
const csvData = './sparql-result/Country.csv'

const row = (r) =>{
    r.country = r.country.replace("http://www.semanticweb.org/yijiang/ontologies/2022/2/OpenData-CW-1-Yijiang#", "")
    return r
}

export const useMapData = () => {
    const [data, setData] = useState(null);
    useEffect(()=>{
        async function fetchMapData() {
            const mapCSVData = await csv(csvData, row)
            const engTopo = await json(engURL)
            engTopo.mapName = "England"
            const walesTopo = await json(walesURL)
            walesTopo.mapName = "Wales"
            const scotlandTopo = await json(scotlandURL)
            scotlandTopo.mapName = "Scotland"
            const irelandTopo = await json(irelandURL)
            irelandTopo.mapName = "NorthernIreland"

            const topoArr = [
                engTopo,
                walesTopo,
                scotlandTopo,
                irelandTopo
            ]

            const ukCountry = topoArr.map(item => {
                let infoArr
                if(item.mapName === "NorthernIreland"){
                    infoArr = feature(item, item.objects.wpc)
                    console.log("Ireland", infoArr)
                }else{
                    infoArr = feature(item, item.objects.eer)
                }
                infoArr.mapName = item.mapName
                return infoArr
            })
            console.log("UK country is here", ukCountry)

            setData({
                mapCSVData,
                ukCountry
            })

        }
        fetchMapData()
    },[])
    console.log("data is here", data)
    return data;
};
