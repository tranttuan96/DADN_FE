import axios from "axios"

export class WarningService {
    getWarnings = () => {
        return axios({
            url: "http://localhost:8080/api/warnings/",
            method:'get',
        })
    }
}

export const warningService = new WarningService();