import axios from "axios"

export class quanLyNongTraiService {
    layDanhSachNongTrai = () => {
        return axios({
            url: "http://localhost:8080/api/farms",
            method:'get',
        })
    }




}


export const qlNongTraiService = new quanLyNongTraiService();