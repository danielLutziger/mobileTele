import React from "react";
import {NativeBaseProvider} from "native-base";
import MainApplicationComponent from "./components/MainApplicationComponent";


export default function App() {
    return (
        <NativeBaseProvider>
            <MainApplicationComponent />
        </NativeBaseProvider>
    );
}
