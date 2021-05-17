import axios from "axios"

export class quanLyDoAmService {
    layDanhSachNongTrai = () => {
        return axios({
            url: "http://localhost:8080/api/farms",
            method:'get',
        })
    }
    layDanhSachSensor = (farmID) => {
        return axios({
            url: `http://localhost:8080/api/farms/${farmID}/moistureSensors`,
            method:'get',
        })
    }
    layThongSoDoAm = (sensorID) => {
        return axios({
            url: `http://localhost:8080/api/${sensorID}/moistureInfo`,
            method:'get',
        })
    }
}

export const qlDoAmService = new quanLyDoAmService();