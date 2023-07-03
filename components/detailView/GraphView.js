import {generateMockData, generateMockDataForOneSecond} from "../../mockData/mockDataStream";
import {useEffect, useState} from "react";
import Graph from "./GraphConfig";

const INTERVAL = 1000;
const GraphView = ({graphElement}) => {
    const [data, setData] = useState(generateMockData(graphElement));

    let i = 0;

    useEffect(() => {
        const interval = setInterval(() => {
            const stream = generateMockDataForOneSecond(graphElement, i);
            setData(prevData => [...prevData, stream]);
            i += 1;
        }, INTERVAL);
        // Clear the interval on component unmount
        return () => clearInterval(interval);
    }, []);

    return(
        <Graph dataCollection={data} currentItem={graphElement} />
    )
}
export default GraphView;
