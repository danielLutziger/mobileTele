import React from "react";
import {SectionList, Text} from "react-native";
import ListItem from "./ListItem";
import {Heading, useColorMode, useContrastText, useTheme, View} from "native-base";

const SystemList = ({navigation, subsystem, sensors, actuators, externalStates, states}) => {
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
        <View flex={1} backgroundColor={theme.colors[colorMode][100]}>
            <View flex={1} width={"75%"} paddingBottom={70} alignSelf={"center"}>
                <Heading color={contrast}>
                    {subsystem}
                </Heading>
                <SectionList
                    sections={data}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({item}) => <ListItem item={item} navigation={navigation}/>}
                    renderSectionHeader={({section: {title}}) => (
                        <Text style={{fontWeight: "bold", color: textColor}}>{title}</Text>
                    )}
                    flex={1}
                />
            </View>
        </View>
    );
};

export default SystemList;
