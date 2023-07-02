import React from "react";
import { Box, Center, HStack, Icon, Pressable, Text, useTheme } from "native-base";
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useColorMode } from "native-base";
import { useColorModeValue } from 'native-base';
export default function MenuBar({ subsystems, activeContent, setCurrentActivePage }) {
    const {
        colorMode,
        toggleColorMode
    } = useColorMode();

    const icons = {
        "Main": { type: MaterialCommunityIcons, active: 'home', inactive: 'home-outline' },
        "Search": { type: MaterialIcons, active: 'search', inactive: 'search' },
        "Favourites": { type: MaterialIcons, active: 'favorite', inactive: 'favorite' },
        "Login": { type: MaterialCommunityIcons, active: 'account', inactive: 'account-outline' },
        "Propulsion": { type: MaterialCommunityIcons, active: 'propane-tank', inactive: 'propane-tank-outline' },
        "Erosion": { type: MaterialCommunityIcons, active: 'screw-machine-flat-top', inactive: 'screw-machine-flat-top' },
    };
    const theme = useTheme();
    return (
        <Box flex={1} safeAreaTop width="100%" alignSelf="center" position="absolute" bottom={0}>
            <HStack bg={colorMode === 'dark' ? theme.colors.black: theme.colors.white} alignItems="center" safeAreaBottom shadow={6}>
                {subsystems?.map((system, index) => {
                    let IconType = icons[system] ? icons[system].type : MaterialCommunityIcons;
                    let iconName = icons[system] ? (activeContent === system ? icons[system].active : icons[system].inactive) : (activeContent === system ? 'question-answer' : 'question-answer');

                    return(
                        <Pressable cursor="pointer" opacity={activeContent === system ? 1 : 0.5} py="3" flex={1} onPress={() => setCurrentActivePage(system)} key={system + index}>
                            <Center>
                                <Icon mb="1" as={<IconType name={iconName} />} color={theme.colors.white} size="sm" />
                                <Text color={theme.colors.white} fontSize="12">
                                    {system}
                                </Text>
                            </Center>
                        </Pressable>
                    )
                })}
                <Pressable onPress={toggleColorMode}>
                    <Icon as={colorMode === 'dark' ? MaterialCommunityIcons : MaterialIcons}
                          name={colorMode === 'dark' ? 'white-balance-sunny' : 'nights-stay'}
                          color={theme.colors.white} size="sm"
                    />
                </Pressable>
            </HStack>
        </Box>
    );
}
