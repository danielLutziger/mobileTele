import React, { useState, useEffect } from 'react';
import generateMockData from '../../mockData/mockDataStream';
import DetailView from "../detailView/./DetailView";

const INTERVAL = 1000;
export default function ComponentDetailView() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const newData = generateMockData();
            setData(prevData => [...prevData, newData]);
        }, INTERVAL);

        return () => clearInterval(interval);
    }, []);

    return (
        <DetailView dataPoints={data} />
    )
}
