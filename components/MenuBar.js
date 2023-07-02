import React from "react";
import {Box, Center, HStack, Icon, Pressable, Text, useContrastText} from "native-base";
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
export default function MenuBar({ subsystems, activeContent, setCurrentActivePage, colorMode, toggleColorMode, theme}) {

    const contrastIconTextColor = useContrastText(theme.colors[colorMode][50]);

    const icons = {
        "Main": { type: MaterialCommunityIcons, active: 'home', inactive: 'home-outline' },
        "Search": { type: MaterialIcons, active: 'search', inactive: 'search' },
        "Favourites": { type: MaterialIcons, active: 'favorite', inactive: 'favorite' },
        "Login": { type: MaterialCommunityIcons, active: 'account', inactive: 'account-outline' },
        "Propulsion": { type: MaterialCommunityIcons, active: 'propane-tank', inactive: 'propane-tank-outline' },
        "Erosion": { type: MaterialCommunityIcons, active: 'screw-machine-flat-top', inactive: 'screw-machine-flat-top' },
    };

    return (
        <Box flex={1} safeAreaTop width="100%" alignSelf="center" position="absolute" bottom={0}>
            <HStack bg={theme.colors[colorMode][50]} alignItems="center" safeAreaBottom shadow={6}>
                {subsystems?.map((system, index) => {
                    let IconType = icons[system] ? icons[system].type : MaterialCommunityIcons;
                    let iconName = icons[system] ? (activeContent === system ? icons[system].active : icons[system].inactive) : (activeContent === system ? 'question-answer' : 'question-answer');

                    return(
                        <Pressable cursor="pointer" opacity={activeContent === system ? 1 : 0.5} py="3" flex={1} onPress={() => setCurrentActivePage(system)} key={system + index}>
                            <Center>
                                <Icon mb="1" as={<IconType name={iconName} />} color={contrastIconTextColor} size="sm" />
                                <Text color={contrastIconTextColor} fontSize="12">
                                    {system}
                                </Text>
                            </Center>
                        </Pressable>
                    )
                })}
                <Pressable onPress={toggleColorMode} style={{marginRight: 10}}>
                    <Icon as={colorMode === 'dark' ? MaterialCommunityIcons : MaterialIcons}
                          name={colorMode === 'dark' ? 'white-balance-sunny' : 'nights-stay'}
                          color={contrastIconTextColor} size="sm"
                    />
                </Pressable>
            </HStack>
        </Box>
    );
}
