import React from "react";
import {SectionList, Text} from "react-native";
import ListItem from "./ListItem";
import {Box, Heading, useColorMode, useContrastText, useTheme, View} from "native-base";

const SystemList = ({subsystem, sensors, actuators, externalStates, states}) => {
    const {
        colorMode
    } = useColorMode();

    const theme = useTheme();
    const contrast = useContrastText(theme.colors[colorMode][50]);
    const textColor = contrast === "lightText" ? "white" : "black";
    const data = [
        {
            title: "Sensors",
            data: sensors,
        },
        {
            title: "Actuators",
            data: actuators,
        },
        {
            title: "External States",
            data: externalStates,
        },
        {
            title: "States",
            data: states,
        },
    ];

    return (
        <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 3/4 }}>
                <Box>
                    <Box>
                        <Heading color={contrast}>
                            {subsystem}
                        </Heading>
                        <SectionList
                            sections={data}
                            keyExtractor={(item, index) => item + index}
                            renderItem={({item}) => <ListItem item={item}/>}
                            renderSectionHeader={({section: {title}}) => (
                                <Text style={{ fontWeight: "bold", color: textColor}} >{title}</Text>
                            )}
                            style={{width: '100%', height: '100%'}}
                        />
                    </Box>
                </Box>
            </View>
        </View>
    );
};

export default SystemList;
