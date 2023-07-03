import React, {useEffect, useState} from "react";
import {useColorMode, useTheme, View, Text} from "native-base";
import {useDetailFilter} from "../../hooks/useDetailFilter";
import GraphView from "./GraphView";
import HelloWorld from "../skia/HelloWorld";
import {SkiaGraph} from "../skia/SkiaGraph";

const INTERVAL = 1000;
export default function DetailView({route}) {
    const theme = useTheme();
    const {
        colorMode
    } = useColorMode();

    const [currentSelection, setCurrentSelection] = useState([])
    const [fetchElements, setFetchElements] = useState([]);
    const {sensors, actuators, externalStates, states } = useDetailFilter(currentSelection);

    useEffect(() => {
        setCurrentSelection(route.params?.key);
        setFetchElements([route.params?.key.string_key, ...route.params?.key.children]);
    }, [currentSelection]);


    return (
        <View flex={1} backgroundColor={theme.colors[colorMode][100]}>
            {sensors?.map((element) => {
                return(
                    <View key={element}>
                        <SkiaGraph graphElement={element} />
                    </View>
                )
            })
            }
            {states?.map((element) => {
                return(
                    <View key={element}>
                        <Text>// basically same as sensors</Text>
                    </View>
                )
            })
            }
            {actuators?.map((element) => {
                return(
                    <View key={element}>
                        <Text>// steering element for actuators (basically same as external states)</Text>

                    </View>
                )
            })
            }
            {externalStates?.map((element) => {
                return(
                    <View key={element}>
                        <Text>// steering elements for external states</Text>
                    </View>
                )
            })
            }
        </View>
    )
}
