import { useState, useEffect } from 'react';
import MockComponentDefinitions from '../mockData/mockComponentDefinitions.json';
import {ACTUATOR_FILTER, EXTERNAL_STATES_FILTER, SENSOR_FILTER, STATES_FILTER} from "../utils/constants";


export const useData = () => {
    const [subsystems, setSubsystems] = useState();
    const [sensors, setSensors] = useState();
    const [actuators, setActuators] = useState();
    const [externalStates, setExternalStates] = useState();
    const [states, setStates] = useState();

    useEffect(() => {
        // filter all different subsystems
        const systems = [...new Set(MockComponentDefinitions.map(item => item.page))];
        setSubsystems(systems);

        // filter all sensors
        let sensItems = MockComponentDefinitions.filter(item => item.children.some(child => child.startsWith(SENSOR_FILTER)));
        setSensors(sensItems);

        // filter all actuators
        let actItems = MockComponentDefinitions.filter(item => item.children.some(child => child.startsWith(ACTUATOR_FILTER)));
        setActuators(actItems);

        // filter all the externalStates
        let extStates = MockComponentDefinitions.filter(item => item.children.some(child => child.startsWith(EXTERNAL_STATES_FILTER)));
        setExternalStates(extStates);

        // filter all the states
        let states = MockComponentDefinitions.filter(item => item.children.some(child => child.startsWith(STATES_FILTER)));
        setStates(states);
    }, []);

    return { subsystems, sensors, actuators, externalStates, states };
}
