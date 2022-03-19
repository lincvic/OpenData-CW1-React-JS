import React, {useState, useEffect} from 'react';
import {json} from 'd3';
import {feature, mesh} from 'topojson';

const engURL = './geo-json/Eng.json';
const scotlandURL = './geo-json/Scotland.json'
const walesURL = './geo-json/Wales.json'
const irelandURL = './geo-json/NorthenIreland.json'

export const useMapData = () => {

    const [data, setData] = useState(null);
    useEffect(() => {
        json(engURL).then(topology => {
            const eer = topology.objects.eer;
            setData({
                land: feature(topology, eer)
            })
        })
    }, [])

    async function fetchMapData() {
        const engTopo = await json(engURL)
        engTopo.mapName = "England"
        const walesTopo = await json(walesURL)
        engTopo.mapName = "Wales"
        const scotlandTopo = await json(scotlandURL)
        engTopo.mapName = "Scotland"
        const irelandTopo = await json(irelandURL)
        engTopo.mapName = "Northern Ireland"
    }

    return data;
};
