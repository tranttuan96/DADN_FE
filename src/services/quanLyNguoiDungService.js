import axios from "axios"

export class quanLyNguoiDungService {
    dangNhap = (userInfo) => {
        return axios({
            url: "http://localhost:8080/api/users/login",
            method:'post',
            data: userInfo
        })
    }

    layDanhSachNguoiDung = () => {
        return axios({
            url: "http://localhost:8080/api/users",
            method:'get',
        })
    }
    layNguoiDungTheoID = (userID) => {
        return axios({
            url: `http://localhost:8080/api/users/${userID}`,
            method:'get',
        })
    }
    themNguoiDung = (dataUser) => {
        return axios({
            url: "http://localhost:8080/api/users",
            method:'post',
            data: dataUser
        })
    }
    layDanhSachNongTrai = (userID) => {
        return axios({
            url: `http://localhost:8080/api/users/getFarms/${userID}`,
            method:'get',
        })
    }
    themNongTraiNguoiDung = (userID, farmID) => {
        return axios({
            url: `http://localhost:8080/api/users/addFarm/${userID}/${farmID}`,
            method:'post',
        })
    }
    xoaNongTraiNguoiDung = (userFarmID) => {
        return axios({
            url: `http://localhost:8080/api/users/deleteFarm/${userFarmID}`,
            method:'post',
        })
    }
}

export const qlNguoiDungService = new quanLyNguoiDungService();