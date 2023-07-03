import {useEffect, useState} from "react";
import MockComponentDefinitions from "../mockData/mockComponentDefinitions.json";
import {ACTUATOR_FILTER, EXTERNAL_STATES_FILTER, SENSOR_FILTER, STATES_FILTER} from "../utils/constants";

export const useDetailFilter = (item) => {
    const [sensors, setSensors] = useState();
    const [actuators, setActuators] = useState();
    const [externalStates, setExternalStates] = useState();
    const [states, setStates] = useState();
    useEffect(() => {
        const sensorArr = [];
        const actuatorArr = [];
        const externalStatesArr = [];
        const statesArr = [];
        const categorizeElement = (definition) => {
            if (definition?.startsWith(SENSOR_FILTER)) {
                sensorArr.push(definition);
            } else if (definition?.startsWith(ACTUATOR_FILTER)) {
                actuatorArr.push(definition);
            } else if (definition?.startsWith(EXTERNAL_STATES_FILTER)) {
                externalStatesArr.push(definition);
            } else if (definition?.startsWith(STATES_FILTER)) {
                statesArr.push(definition);
            } else {
                console.log("should not here")
                console.log(definition)
            }
        };


        categorizeElement(item?.string_key);
        item?.children?.forEach(child => {
            //const definition = MockComponentDefinitions[child]; //replace with API call (get definition from string_key)
            categorizeElement(child);
        });


        setSensors(sensorArr);
        setActuators(actuatorArr);
        setExternalStates(externalStatesArr);
        setStates(statesArr);
    }, [item]);

    return { sensors, actuators, externalStates, states };
}
