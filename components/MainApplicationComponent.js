import React, { useEffect, useState } from "react";
import {Box, Text, useColorMode, useTheme, View} from "native-base";
import SystemList from "./subsystems/SystemList";
import MenuBar from "./MenuBar";
import { useData } from "../hooks/useData";
import ListDetailViewNavigator from "./ListDetailViewNavigator";

function MainApplicationComponent() {
    const [content, setContent] = useState("Main");
    const [menuBarContent, setMenuBarContent] = useState();
    const { subsystems, sensors, actuators, externalStates, states } = useData();

    useEffect(() => {
        setMenuBarContent([...(subsystems ?? []), "Search", "Favourites", "Login"]);
    }, [subsystems]);

    const {
        colorMode,
        toggleColorMode
    } = useColorMode();

    const theme = useTheme();

    return (
        <View flex={1}>
            <View flex={1}>
                {content === 'Home' && <SystemList sensors={sensors} actuators={actuators} externalStates={externalStates} states={states} />}
                {subsystems?.includes(content) && (
                    <ListDetailViewNavigator
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
            </View>
            <Box flex={0}>
                <MenuBar subsystems={menuBarContent} activeContent={content} setCurrentActivePage={setContent} colorMode={colorMode} toggleColorMode={toggleColorMode} theme={theme}/>
            </Box>
        </View>
    );
} export default MainApplicationComponent;
