import React, {useState, useEffect} from "react";
import {Canvas, Line, Path, runTiming, Skia, useComputedValue, useValue, vec} from "@shopify/react-native-skia";
import {curveBasis, line, scaleLinear, scaleTime} from "d3";
import {Easing, View, Text, StyleSheet} from "react-native";
import {Button, CheckIcon, HStack, Select} from "native-base";
import {generateMockData, generateMockDataForOneSecond} from "../../mockData/mockDataStream";

const HelloWorld = () => {
    const GRAPH_HEIGHT = 400;
    const GRAPH_WIDTH = 370;
    const [visibleDataPoints, setVisibleDataPoints] = useState(30);
    const [mockData, setMockData] = useState(generateMockData("Key"));
    const [graphData, setGraphData] = useState([])

    // Define transition state and completion variable
    const isTransitionCompleted = useValue(1);
    const transitionState = useValue({
        currentData: [],
        nextData: [],
    });

    // Set up a transition between the current and next datasets
    const transitionCharts = (nextData) => {
        transitionState.current = {
            currentData: mockData,
            nextData: nextData,
        };
        isTransitionCompleted.current = 0;
        runTiming(isTransitionCompleted, 1, {
            duration: 500,
            easing: Easing.inOut(Easing.cubic),
        });
    };

    // Update graphData whenever visibleDataPoints or mockData changes
    useEffect(() => {
        const newMockData = mockData.slice(0, visibleDataPoints);
        transitionCharts(newMockData);
    }, [visibleDataPoints, mockData]);

    // Create graph paths for the current and next datasets
    const currentPath = useComputedValue(() => {
        const start = graphData[transitionState.current.currentData]?.curve;
        const end = graphData[transitionState.current.nextData]?.curve;
        const result = start?.interpolate(end, isTransitionCompleted.current);
        return result;
    }, [transitionState, isTransitionCompleted]);

    const makeGraph = (data) => {
        const getYAxis = scaleLinear()
            .domain([0, 100])
            .range([GRAPH_HEIGHT - 35, 0]);

        const getXAxis = scaleTime()
            .domain([new Date(Date.now() - visibleDataPoints * 1000), new Date()])
            .range([0, GRAPH_WIDTH]);

        const curvedLine = line()
            .x((d) => getXAxis(new Date(d.Key.timestamp)))
            .y((d) => getYAxis(d.Key.value))
            .curve(curveBasis);

        const skPath = Skia.Path.MakeFromSVGString(curvedLine(data));
        return {
            curve: skPath,
        };
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setMockData((prevData) => {
                const newMockData = [...prevData];
                newMockData.unshift(generateMockDataForOneSecond("Key", newMockData.length + 1));
                return newMockData.slice(0, visibleDataPoints);
            });
            setGraphData(makeGraph(mockData));
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [visibleDataPoints]);

    return (
        <View>
            <Canvas style={{height: GRAPH_HEIGHT, width: GRAPH_WIDTH}}>
                {/* use such lines as min max */}
                <Line strokeWidth={1} color={"lightgray"} p1={vec(10, 130)} p2={vec(400, 130)}/>
                <Line strokeWidth={1} color={"lightgray"} p1={vec(10, 250)} p2={vec(400, 250)}/>
                <Line strokeWidth={1} color={"lightgray"} p1={vec(10, 370)} p2={vec(400, 370)}/>
                {/* the path of the graph which will be created. */}
                <Path path={currentPath} color={"purple"} strokeWidth={4} style={"stroke"}/>
            </Canvas>
            <View style={{flexDirection: 'row', margin: 10}}>
                <Select selectedValue={visibleDataPoints} minWidth="200" accessibilityLabel="Choose Service"
                        placeholder="Choose Service"
                        _selectedItem={{bg: "teal.600", endIcon: <CheckIcon size="5"/>}} mt={1}
                        onValueChange={itemValue => setVisibleDataPoints(itemValue)}>
                    <Select.Item label="30 Seconds" value={30}/>
                    <Select.Item label="60 Seconds" value={60}/>
                    <Select.Item label="180 Seconds" value={180}/>
                    <Select.Item label="300 Seconds" value={300}/>
                    <Select.Item label="All" value={1200} disabled={true}/>
                </Select>
            </View>
        </View>
    )
};

export default HelloWorld;
