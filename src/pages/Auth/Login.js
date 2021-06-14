import React, { useState } from 'react'
import {userLogin} from '../../setting/config'
import { qlNguoiDungService } from "../../services/quanLyNguoiDungService"
import '../../assets/scss/Layout/login.scss'
import swal from 'sweetalert';

export default function Login(props) {


    let accounts = [{
        taiKhoan: "user",
        matKhau: "user123",
        loaiNguoiDung: "user"
    }, {
        taiKhoan: "admin",
        matKhau: "admin123",
        loaiNguoiDung: "admin"
    }]

    let [state, setState] = useState({
        values: {
            username: '',
            password: '',
        }
    });

    const handleChange = (event) => {
        let { name, value } = event.target;
        const newValues = { ...state.values, [name]: value };
        //Gọi set lại state của hook
        setState(
            {
                values: newValues,
            })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let {values } = state;
        console.log(values)
        qlNguoiDungService.dangNhap(values).then(res => {
            console.log(res.data)
            if(!res.data) {
                swal("Thất bại.", "Thông tin đăng nhập không chính xác", "error", {
                    buttons: false,
                    timer: 1500,
                });
            }
            else {
                localStorage.setItem(userLogin, JSON.stringify(res.data))
                swal("Thành công.", "Đăng nhập thành công thành công", "success", {
                    buttons: false,
                    timer: 1500,
                });
                setTimeout(function() {
                    if(res.data.type === "nguoiDung") {
                        props.history.push('/')
                    }
                    else {
                        props.history.push('/admin/canhbaomayhu')
                    }
                }, 1500)
            }
            
        }).catch(error => {
            console.log(error.response);
        });
        // if(index != -1) {
        //     localStorage.setItem(userLogin, JSON.stringify(state.values.taiKhoan))
        //     alert("login success");
        //     if(accounts[index].loaiNguoiDung == "user") {
        //         props.history.push('/')
        //     }
        //     else {
        //         props.history.push('/admin/canhbaomayhu')
        //     }
            
        // }
        // else {
        //     alert("wrong info");
        // }
    }

    return (
        <div className="login">
            <header>Welcome Back</header>
            <form onSubmit={handleSubmit}>
                <div className="input-field">
                    <input name="username" type="text" required onChange={handleChange}/>
                    <label>Username</label>
                </div>
                <div className="input-field">
                    <input name="password" className="pswrd" type="password" required onChange={handleChange}/>
                    <label>Password</label>
                </div>
                <div className="button">
                    <div className="inner">
                    </div>
                    <button>LOGIN</button>
                </div>
            </form>
        </div>
    )
}
