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
    layDanhSachMayBom = (farmID) => {
        return axios({
            url: `http://localhost:8080/api/farms/${farmID}/pumps`,
            method:'get',
        })
    }
    layThongSoDoAm = (sensorID) => {
        return axios({
            url: `http://localhost:8080/api/${sensorID}/moistureInfo`,
            method:'get',
        })
    }
    layThongSoMayBom = (pumpID) => {
        return axios({
            url: `http://localhost:8080/api/${pumpID}/pumpInfo`,
            method:'get',
        })
    }
}

export const qlDoAmService = new quanLyDoAmService();