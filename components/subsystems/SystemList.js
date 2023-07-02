import React from "react";
import {SectionList, Text} from "react-native";
import ListItem from "./ListItem";
import {Box, Heading, useTheme} from "native-base";

const SystemList = ({subsystem, sensors, actuators, externalStates, states}) => {
    const { colors } = useTheme();
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
        <Box bg={colors.background}>
            <Heading color={colors.text}>
                {subsystem}
            </Heading>
            <SectionList
                sections={data}
                keyExtractor={(item, index) => item + index}
                renderItem={({item}) => <ListItem item={item}/>}
                renderSectionHeader={({section: {title}}) => (
                    <Text style={{fontWeight: "bold"}}>{title}</Text>
                )}
                style={{width: '100%', height: '100%'}}
            />
        </Box>
    );
};

export default SystemList;
