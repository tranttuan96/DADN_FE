import axios from "axios"

export class quanLyDoAmService {
    layThongSoDoAm = () => {
        return axios({
            url: "http://localhost:8080/api/v1/moiture",
            method:'get',
        })
    }
}

export const qlDoAmService = new quanLyDoAmService();