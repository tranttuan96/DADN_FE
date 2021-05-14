import axios from "axios"

export class quanLyDoAmService {
    layThongSoDoAm = () => {
        return axios({
            url: "https://io.adafruit.com/api/v2/tranttuan96/feeds/dadn-moisture/data?X-AIO-Key=aio_xCbm82a5SDOWfy8sw32D3ynKHl70",
            method:'get',
        })
    }
}

export const qlDoAmService = new quanLyDoAmService();