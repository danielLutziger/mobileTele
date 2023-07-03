import React from "react";
import {Badge, HStack, IconButton, Pressable, Spacer, Text, useColorMode, useContrastText, useTheme} from "native-base";
import * as Animatable from "react-native-animatable";
import {MaterialIcons} from "@expo/vector-icons";

const ListItem = ({item, navigation}) => {
    const {
        colorMode
    } = useColorMode();

    const theme = useTheme();
    const contrast = useContrastText(theme.colors[colorMode][50]);
    const textColor = contrast === "lightText" ? "white" : "black";

    return (
        <Pressable onPress={() => navigation.navigate('Detail', {withAnimation: true, key: item})}>
            <Animatable.View
                animation="fadeIn"
                style={{
                    padding: 16,
                    borderWidth: 1,
                    borderRadius: 8,
                    marginVertical: 8,
                    alignItems: 'center',
                    backgroundColor: theme.colors[colorMode][50],
                    borderColor: theme.colors[colorMode][50],
                    elevation: 20,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.23,
                    shadowRadius: 2.62,
                }}
            >
                <HStack space={4} alignItems="center">
                    <Text color={textColor}>{item.label}</Text>

                    {/* Add minigraph here */}
                    <Text color={textColor}>{item.type}</Text>

                    <Badge colorScheme={"green"}>99</Badge>

                    <Spacer/>

                    <IconButton
                        variant='unstyled'
                        icon={<MaterialIcons name='favorite-border' size={24} color={textColor}/>}
                        onPress={() => { /* function to add element to favourites */
                        }}
                    />

                    <IconButton
                        variant='unstyled'
                        icon={<MaterialIcons name='chevron-right' size={24} color={textColor}/>}
                        onPress={() => { /* drill down into detail view */
                        }}
                    />
                </HStack>
            </Animatable.View>
        </Pressable>
    );
};

export default ListItem;
