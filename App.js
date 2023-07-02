import React, { useEffect, useMemo, useState } from "react";
import {Box, useColorMode, extendTheme, NativeBaseProvider} from "native-base";
import SystemList from "./components/subsystems/SystemList";
import MenuBar from "./components/MenuBar";
import { useData } from "./utils/useData";

const config = {
    useSystemColorMode: false,
    initialColorMode: 'dark',
    colors: {
        light: {
            50: "#e3f2f9",
            100: "#c5e4f3",
            200: "#a2d4ec",
            300: "#7ac1e4",
            400: "#47a9da",
            500: "#0088cc",
            600: "#007ab8",
            700: "#006ba1",
            800: "#005885",
            900: "#00435f",
        },
        dark: {
            50: "#16161D",
            100: "#2A282C",
            200: "#3F3B40",
            300: "#524E54",
            400: "#655E68",
            500: "#79727B",
            600: "#8E848F",
            700: "#A097A3",
            800: "#B3A9B6",
            900: "#C5BBC9",
        },
    }
};

// extend the theme
const customTheme = extendTheme({ config });

export default function App() {
    const [content, setContent] = useState("Main");
    const [menuBarContent, setMenuBarContent] = useState();
    const { componentData, subsystems, sensors, actuators, externalStates, states } = useData();

    useEffect(() => {
        setMenuBarContent([...(subsystems ?? []), "Search", "Favourites", "Login"]);
    }, [subsystems]);

    return (
        <NativeBaseProvider theme={customTheme}>
            <Box flex={1} style={{height: '100%'}} flexDirection="column">
                <Box flex={1} alignItems="center" justifyContent="center">
                    {content === 'Home' && <SystemList sensors={sensors} actuators={actuators} externalStates={externalStates} states={states} />}
                    {subsystems?.includes(content) && (
                        <SystemList
                            subsystem={content}
                            sensors={sensors?.filter(sensor => sensor.page === content)}
                            actuators={actuators?.filter(actuator => actuator.page === content)}
                            externalStates={externalStates?.filter(externalState => externalState.page === content)}
                            states={states?.filter(state => state.page === content)}
                        />
                    )}
                    {content === "Search" && <Text>Search Page</Text>}
                    {content === "Favourites" && <Text>Favourites Page</Text>}
                    {content === "Login" && <Text>Login Page</Text>}
                </Box>
                <Box flex={0}>
                    <MenuBar subsystems={menuBarContent} activeContent={content} setCurrentActivePage={setContent} />
                </Box>
            </Box>
        </NativeBaseProvider>
    );
}
