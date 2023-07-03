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
import {originalData, animatedData, animatedData3} from "./data";

export const SkiaGraph = ({graphElement}) => {

    const [mockData, setMockData] = useState([]);
    const [graphPathData, setGraphPathData] = useState([]);

    const transition = useValue(1);
    const state = useValue({
        current: 0,
        next: 1,
    });
    const [visibleDataPoints, setVisibleDataPoints] = useState(30);

    const GRAPH_HEIGHT = 400;
    const GRAPH_WIDTH = 360;

    const makeGraph = (data) => {
        const max = Math.max(...data.map((val) => val.value));
        const min = Math.min(...data.map((val) => val.value));
        const y = scaleLinear().domain([0, max]).range([GRAPH_HEIGHT, 35]);

        const x = scaleTime()
            .domain([new Date(2000, 1, 1), new Date(2000, 1, 15)])
            .range([10, GRAPH_WIDTH - 10]);

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

    const transitionStart = (end) => {
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

    const graphData = [makeGraph(originalData), makeGraph(animatedData3)];

    const currentPath = useComputedValue(() => {
        const start = graphData[state.current.current].curve;
        const end = graphData[state.current.next].curve;
        const result = start.interpolate(end, transition.current);
        return result?.toSVGString() ?? "0";
    }, [state, transition]);


    useEffect(() => {
        const interval = setInterval(() => {

            let newMockData = mockData;
            newMockData.unshift(generateMockDataForOneSecond(graphElement, newMockData.length + 1));
            const graphMockData = newMockData.slice(0, visibleDataPoints); //this will get super slow at some point as this stores all the values... api required here
            setMockData(newMockData);
            console.log(mockData)
            setGraphPathData(makeGraph(graphMockData));
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
                        onValueChange={itemValue => transitionStart(itemValue)}>
                    <Select.Item label="30 Seconds" value={0}/>
                    <Select.Item label="60 Seconds" value={1}/>
                    <Select.Item label="180 Seconds" value={180}/>
                    <Select.Item label="300 Seconds" value={300}/>
                    <Select.Item label="All" value={1200} disabled={true}/>
                </Select>
            </View>
        </View>
    );
};
