import React, { useState } from 'react'
import {userLogin} from '../../setting/config'
import '../../assets/scss/Layout/login.scss'


export default function Login(props) {

    let tempAccount = {
        taiKhoan: "user",
        matKhau: "user123"
    }

    let [state, setState] = useState({
        values: {
            taiKhoan: '',
            matKhau: '',
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
        if(state.values.taiKhoan === tempAccount.taiKhoan && state.values.matKhau == tempAccount.matKhau) {
            localStorage.setItem(userLogin, JSON.stringify(state.values.taiKhoan))
            alert("login success");
            props.history.push('/')
        }
        else {
            alert("wrong info");
        }
    }

    return (
        <div className="login">
            <header>Welcome Back</header>
            <form onSubmit={handleSubmit}>
                <div className="input-field">
                    <input name="taiKhoan" type="text" required onChange={handleChange}/>
                    <label>Email or Username</label>
                </div>
                <div className="input-field">
                    <input name="matKhau" className="pswrd" type="password" required onChange={handleChange}/>
                    <span className="show">SHOW</span>
                    <label>Password</label>
                </div>
                <div className="button">
                    <div className="inner">
                    </div>
                    <button>LOGIN</button>
                </div>
            </form>
            <div className="signup">
                Not a member? <a href="#">Signup now</a>
            </div>
        </div>
    )
}
