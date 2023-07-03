import React, {useEffect, useMemo, useState} from "react";
import {View, Text, Button, } from "native-base";
import {LineChart} from "react-native-chart-kit";
import {Dimensions} from 'react-native';
import {Picker} from "@react-native-picker/picker";

const Graph = ({dataCollection, currentItem}) => {
    const [data, setData] = useState([{label: "0", value: 0}]);

    useEffect(() => {
        if (dataCollection?.length > 0) {
            const chartData = dataCollection?.map((item, index) => ({
                label: index.toString(),
                value: item[currentItem].value
            }));
            setData(chartData);
        }
    }, [dataCollection]);
    const [visibleDataPoints, setVisibleDataPoints] = useState(30);
    const [selectedPoint, setSelectedPoint] = useState(null);
    const handleDataPointClick = (dataPoint) => {
        setSelectedPoint(dataPoint);
    }
    const chartData = useMemo(() => {
        const slicedData = data.slice(-visibleDataPoints);
        return {
            labels: slicedData.map(d => d.label), // Set the labels to be the timestamps
            datasets: [
                {
                    data: slicedData.map(d => d.value), // Set the data to be the values
                },
            ],
        };
    }, [data, visibleDataPoints]);

    const formatXLabel = (value) => {
        const date = new Date(value);
        return date.toLocaleTimeString(); // convert to time format
    }

    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Picker
                    selectedValue={visibleDataPoints}
                    style={{ height: 50, width: 100 }}
                    onValueChange={(itemValue) => setVisibleDataPoints(itemValue)}
                >
                    <Picker.Item label="30" value={30} />
                    <Picker.Item label="60" value={60} />
                    <Picker.Item label="120" value={120} />
                    <Picker.Item label="180" value={180} />
                    <Picker.Item label="500" value={500} />
                    <Picker.Item label="All" value={data.length} />
                </Picker>
            </View>
            <LineChart
                data={chartData}
                width={Dimensions.get("window").width}
                height={220}
                onDataPointClick={handleDataPointClick}
                formatXLabel={formatXLabel}
                chartConfig={{
                    backgroundColor: "#e26a00",
                    backgroundGradientFrom: "#fb8c00",
                    backgroundGradientTo: "#ffa726",
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                }}
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />
            {selectedPoint && (
                <Text>Clicked data point: {selectedPoint.value}</Text>
            )}
        </View>
    );
}

export default Graph;
