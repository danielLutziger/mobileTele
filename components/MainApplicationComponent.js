import React, { useEffect, useState } from "react";
import {Box, Text, useColorMode, useTheme} from "native-base";
import SystemList from "./subsystems/SystemList";
import MenuBar from "./MenuBar";
import { useData } from "../utils/useData";

function MainApplicationComponent() {
    const [content, setContent] = useState("Main");
    const [menuBarContent, setMenuBarContent] = useState();
    const { componentData, subsystems, sensors, actuators, externalStates, states } = useData();

    useEffect(() => {
        setMenuBarContent([...(subsystems ?? []), "Search", "Favourites", "Login"]);
    }, [subsystems]);

    const {
        colorMode,
        toggleColorMode
    } = useColorMode();

    const theme = useTheme();

    return (
        <Box flex={1} style={{height: '100%'}} flexDirection="column" backgroundColor={theme.colors[colorMode][100]}>
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
                <MenuBar subsystems={menuBarContent} activeContent={content} setCurrentActivePage={setContent} colorMode={colorMode} toggleColorMode={toggleColorMode} theme={theme}/>
            </Box>
        </Box>
    );
} export default MainApplicationComponent;
