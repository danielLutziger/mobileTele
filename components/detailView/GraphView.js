import {View} from "native-base";
import {generateMockData, generateMockDataForOneSecond} from "../../mockData/mockDataStream";
import {useEffect, useState} from "react";

const INTERVAL = 1000;
const GraphView = ({graphElement}) => {
    const [data, setData] = useState(generateMockData(graphElement));

    useEffect(() => {
        const interval = setInterval(() => {
            const stream = generateMockDataForOneSecond(graphElement);
            setData(prevData => [...prevData, stream]);
            console.log(data);
        }, INTERVAL);
        // Clear the interval on component unmount
        return () => clearInterval(interval);
    }, [data]);

    return(
        <View></View>
    )
}
export default GraphView;
