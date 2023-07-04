import React, {useEffect, useState} from "react";
import {useColorMode, useTheme, View, Text} from "native-base";
import {useDetailFilter} from "../../hooks/useDetailFilter";
import {HelloWorldXPO} from "../skia/SimpleComponentWeb";

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
                        <HelloWorldXPO graphElement={element} />
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
