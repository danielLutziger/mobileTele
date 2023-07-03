import React, {useEffect, useState} from "react";
import {useColorMode, useTheme, View} from "native-base";
import {useDetailFilter} from "../../hooks/useDetailFilter";
import GraphView from "./GraphView";

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
        const interval = setInterval(() => {
            setCurrentSelection(route.params?.key);
            setFetchElements([route.params?.key.string_key, ...route.params?.key.children]);
        }, INTERVAL);
        // Clear the interval on component unmount
        return () => clearInterval(interval);
    }, [currentSelection, fetchElements]);


    return (
        <View flex={1} backgroundColor={theme.colors[colorMode][100]}>
            {sensors?.map((element) => {
                return(
                    <View>
                        <GraphView graphElement={element} />
                    </View>
                )
            })
            }
            {states?.map((element) => {
                return(
                    <View>
                        // basically same as sensors
                    </View>
                )
            })
            }
            {actuators?.map((element) => {
                return(
                    <View>
                        // steering element for actuators (basically same as external states)

                    </View>
                )
            })
            }
            {externalStates?.map((element) => {
                return(
                    <View>
                        // steering elements for external states
                    </View>
                )
            })
            }
        </View>
    )
}
