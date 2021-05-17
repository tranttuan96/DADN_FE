import axios from "axios"

export class pumpControll {
    pumpTurnOn = () => {
        return axios({
            url: "http://localhost:8080/pump/control?state=ON",
            method:'post',
        })
    }

    pumpTurnOff = () => {
        return axios({
            url: "http://localhost:8080/pump/control?state=OFF",
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