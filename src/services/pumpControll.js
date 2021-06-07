import axios from "axios"

export class pumpControll {
    getPumpStatus = (pumpID) => {
        return axios({
            url: `http://localhost:8080/api/${pumpID}/pumpInfo`,
            method:'get',
        })
    }

    pumpControl = (pumpID,intensity) => {
        return axios({
            url: `http://localhost:8080/pump/${pumpID}/control/${intensity}`,
            method:'post',
        })
    }

    pumpTurnOn = (userID,pumpID) => {
        return axios({
            url: `http://localhost:8080/${userID}/pump/control/${pumpID}?state=ON`,
            method:'post',
        })
    }

    pumpTurnOff = (userID,pumpID) => {
        return axios({
            url: `http://localhost:8080/${userID}/pump/control/${pumpID}?state=OFF`,
            method:'post',
        })
    }

}

export const pumpControllService = new pumpControll();