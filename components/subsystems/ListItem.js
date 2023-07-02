import React from "react";
import { Badge, HStack, IconButton, Spacer, Text, useTheme } from "native-base";
import * as Animatable from "react-native-animatable";
import { MaterialIcons } from "@expo/vector-icons";

const ListItem = ({ item }) => {
    const { colors } = useTheme();

    return (
        <Animatable.View
            animation="fadeIn"
            style={{
                padding: 16,
                borderWidth: 1,
                borderRadius: 8,
                marginVertical: 8,
                alignItems: 'center',
                backgroundColor: colors.surface,
                borderColor: colors.border,
            }}
        >
            <HStack space={4} alignItems="center">
                <Text color={colors.text}>{item.label}</Text>

                {/* Add minigraph here */}
                <Text color={colors.text}>Graph</Text>

                <Badge colorScheme={"green"}>99</Badge>

                <Spacer />

                <IconButton
                    variant='unstyled'
                    icon={<MaterialIcons name='favorite-border' size={24} color={colors.text} />}
                    onPress={() => { /* function to add element to favourites */ }}
                />

                <IconButton
                    variant='unstyled'
                    icon={<MaterialIcons name='chevron-right' size={24} color={colors.text} />}
                    onPress={() => { /* drill down into detail view */ }}
                />
            </HStack>
        </Animatable.View>
    );
};

export default ListItem;
