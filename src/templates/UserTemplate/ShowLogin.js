import React from 'react'
import { NavLink } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { setEmptyState } from "../../redux/actions/UserFarmAction"
import './ShowLogin.scss'

export default function ShowLogin(props) {

    const taiKhoan = JSON.parse(localStorage.getItem('userLogin'))
    const dispatch = useDispatch();
    const dangXuat = () => {
        // console.log("run logout");
        dispatch(setEmptyState());
        localStorage.removeItem('userLogin')
    }

    const renderLogin = () => {
        // console.log(taiKhoan)

            return <div className="showLogin">
                <img className="avatar" src={"images/avatar-login.jpg"}></img>
                <div className="dropdown daDangNhap">
                    <div className="btn dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <NavLink className="nav-link" to="/">{taiKhoan.username}</NavLink>
                    </div>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <NavLink className="dropdown-item" to="/login" onClick={() => { dangXuat() }}>
                            <i className="fa fa-sign-out-alt"></i>
                            Đăng xuất
                        </NavLink>
                    </div>
                </div>
            </div>

    }


    return (
        <div>
            {renderLogin()}
        </div>
    )
}
