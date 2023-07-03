import React, {useEffect, useState} from "react";

import {
    Canvas,
    Line,
    Path,
    runTiming,
    Skia,
    SkPath,
    useComputedValue,
    useValue,
    vec,
} from "@shopify/react-native-skia";

import {curveBasis, line, scaleLinear, scaleTime} from "d3";
import {Easing, View, Pressable, Text, StyleSheet} from "react-native";
import {CheckIcon, Select} from "native-base";
import {generateMockData, generateMockDataForOneSecond} from "../../mockData/mockDataStream";

export const SkiaGraph = () => {
    const transition = useValue(1);
    const state = useValue({
        current: 0,
        next: 1,
    });
    const [visibleDataPoints, setVisibleDataPoints] = useState(30);
    const [mockData, setMockData] = useState(generateMockData("Key"));
    const [graphData, setGraphData] = useState([])

    const GRAPH_HEIGHT = 400;
    const GRAPH_WIDTH = 360;

    const makeGraph = (data) => {
        const max = Math.max(...data.map((val) => val.value));
        const min = Math.min(...data.map((val) => val.value));
        const y = scaleLinear().domain([0, max]).range([GRAPH_HEIGHT, 35]);

        const x = scaleTime()
            .domain([new Date(Date.now() - visibleDataPoints * 1000), new Date()])
            .range([0, GRAPH_WIDTH]);

        const curvedLine = line()
            .x((d) => x(new Date(d.date)))
            .y((d) => y(d.value))
            .curve(curveBasis)(data);

        const skPath = Skia.Path.MakeFromSVGString(curvedLine);

        return {
            max,
            min,
            curve: skPath,
        };
    };
    const transitionCharts = (end) => {
        state.current = {
            current: end,
            next: state.current.current,
        };
        transition.current = 0;
        runTiming(transition, 1, {
            duration: 750,
            easing: Easing.inOut(Easing.cubic),
        });
    };

    //const graphData = [makeGraph(originalData), makeGraph(animatedData)];

    const currentPath = useComputedValue(() => {
        let graph = graphData;
        if(graphData.length === 0){
            graph = makeGraph([{value: 0, timestamp: new Date(Date.now())}, {value: 3, timestamp: new Date(Date.now())}]);
        }
        // this does not make sense, it is the same graph over and over again and not properly stored in the array.
        console.log(state.current.current)
        console.log(graph[state.current.current])
        const start = graph[state.current.current].curve;
        const end = graph[state.current.next].curve;
        const result = start.interpolate(end, transition.current);
        return result?.toSVGString() ?? "0";

    }, [state, transition]);


/*    useEffect(() => {
        const newMockData = mockData.slice(0, visibleDataPoints);
        transitionCharts(/*insert here*//*);
    }, [visibleDataPoints, mockData]);*/


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
    );
};
