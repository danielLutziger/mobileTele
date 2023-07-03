import SystemList from './subsystems/SystemList';
import DetailView from "./detailView/./DetailView";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer} from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export default function ListDetailViewNavigator(parentProps) {

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {/* Possible optimization, use this reference instead of calling the component (recommended by react navigator)                 <Stack.Screen name="Detail" component={DetailView} /> */}
                <Stack.Screen name="All Elements">
                    {(props) => <SystemList {...props} subsystem={parentProps.subsystem}
                                            sensors={parentProps.sensors}
                                            actuators={parentProps.actuators}
                                            externalStates={parentProps.externalStates}
                                            states={parentProps.states}/>}
                </Stack.Screen>
                <Stack.Screen name="Detail" >
                    {(props) => <DetailView {...props} /> }
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
