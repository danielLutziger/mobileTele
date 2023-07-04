import React from 'react';
import { Text } from "react-native";
// Notice the import path `@shopify/react-native-skia/lib/module/web`
// This is important only to pull the code responsible for loading Skia.
// @ts-expect-error
import { WithSkiaWeb } from "@shopify/react-native-skia/lib/module/web";

export default function SkiaLoadingComponent() {
    return (
        <WithSkiaWeb
            getComponent={() => import("./SimpleComponentWeb")}
            fallback={<Text>Loading Skia...</Text>}
        />
);
}
