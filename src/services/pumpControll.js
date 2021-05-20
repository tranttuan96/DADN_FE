import axios from "axios"

export class pumpControll {
    pumpTurnOn = (pumpID) => {
        return axios({
            url: `http://localhost:8080/pump/control/${pumpID}?state=ON`,
            method:'post',
        })
    }

    pumpTurnOff = (pumpID) => {
        return axios({
            url: `http://localhost:8080/pump/control/${pumpID}?state=OFF`,
            method:'post',
        })
    }

    getPumpStatus = (pumpID) => {
        return axios({
            url: `http://localhost:8080/api/${pumpID}/pumpInfo`,
            method:'get',
        })
    }
}

export const pumpControllService = new pumpControll();