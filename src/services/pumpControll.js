import axios from "axios"

export class pumpControll {
    pumpTurnOn = () => {
        return axios({
            url: "http://localhost:8080/pump/control?state=on",
            method:'post',
        })
    }

    pumpTurnOff = () => {
        return axios({
            url: "http://localhost:8080/pump/control?state=off",
            method:'post',
        })
    }
}

export const pumpControllService = new pumpControll();