import axios from "axios";

export class thresholdService {
    getCurrentThreshold = (sensorID) => {
        return axios({
            url: `http://localhost:8080/api/${sensorID}/threshold`,
            method:'get',
        })
    }

    getUpperThreshold = (sensorID) => {
        return axios({
            url: `http://localhost:8080/api/${sensorID}/threshold/upper`,
            method:'get',
        })
    }

    getLowerThreshold = (sensorID) => {
        return axios({
            url: `http://localhost:8080/api/${sensorID}/threshold/lower`,
            method:'get',
        })
    }
}

export const ThresholdService = new thresholdService();