import React, { useState, useEffect, Fragment } from "react";
import { Route, NavLink, Redirect } from "react-router-dom";
import '../UserTemplate/UserTemplate.scss'
import ShowLogin from '../UserTemplate/ShowLogin'
import { useDispatch } from 'react-redux'
import { setEmptyState } from "../../redux/actions/UserFarmAction"
import { Layout } from 'antd';
const { Header, Content } = Layout;




const AdminLayout = (props) => {
    const dispatch = useDispatch();
    const taiKhoan = JSON.parse(localStorage.getItem('userLogin'))
    let [navActive, setNavActive] = useState({
        canhBaoMayHu: true,
        quanLyNongTrai: false,
        quanLyNguoiDung: false,
    })

    const dangXuat = () => {
        // console.log(taiKhoan)
        localStorage.removeItem('userLogin')
        dispatch(setEmptyState());
        // dispatch(dangNhapAction(localStorage.getItem(userLogin)))
    }

    const updateNavActive = (name) => {
        if (name === "canhBaoMayHu") {
            let temp = { ...navActive };
            temp.canhBaoMayHu = true;
            temp.quanLyNongTrai = false;
            temp.quanLyNguoiDung = false;
            setNavActive(temp);
        }
        else if (name === "quanLyNongTrai") {
            let temp = { ...navActive };
            temp.canhBaoMayHu = false;
            temp.quanLyNongTrai = true;
            temp.quanLyNguoiDung = false;
            setNavActive(temp);
        }
        else if (name === "quanLyNguoiDung") {
            let temp = { ...navActive };
            temp.canhBaoMayHu = false;
            temp.quanLyNongTrai = false;
            temp.quanLyNguoiDung = true;
            setNavActive(temp);
        }
    }

    const renderResponsiveMenu = () => {
        return <div className="collapse navbar-collapse" id="myMenu">
            <ul className="navbar-nav" style={{ flexDirection: "column" }}>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/">
                        <img className="avatar" src={"/images/avatar-login.jpg"}></img>
                        {taiKhoan.username}
                    </NavLink>
                </li>
                <li className={`nav-item ${navActive.canhBaoMayHu ? 'isActive' : ''}`}>
                    <NavLink className="nav-link" to="/admin/canhbaomayhu" onClick={() => { updateNavActive("canhBaoMayHu") }}>Cảnh báo máy hư</NavLink>
                </li>
                <li className={`nav-item ${navActive.quanLyNongTrai ? 'isActive' : ''}`}>
                    <NavLink className="nav-link" to="/admin/quanlynongtrai" onClick={() => { updateNavActive("quanLyNongTrai") }}>Quản lý nông trại</NavLink>
                </li>
                <li className={`nav-item ${navActive.quanLyNguoiDung ? 'isActive' : ''}`}>
                    <NavLink className="nav-link" to="/admin/quanlynongtrai" onClick={() => { updateNavActive("quanLyNguoiDung") }}>Quản lý người dùng</NavLink>
                </li>
                <li className="nav-item ">
                    <NavLink className="nav-link" to="/login" onClick={() => { dangXuat() }}>
                        Đăng xuất
                    </NavLink>
                </li>
            </ul>
        </div>
    }


    return (
        <Fragment>
            <Layout className="homePage">
                <Header>
                    <nav className="navbar navbar-expand-lg navbar-light">
                        <div className="header__left col-4">
                            <NavLink className="navbar-brand" to='/'><img src={"/images/1004px-Logo-hcmut.svg.png"} style={{ width: 45, height: 45 }} />&nbsp;Admin</NavLink>
                        </div>
                        <div className="header__center col-4 d-none d-md-flex" id="mainMenu">
                            <ul className="navbar-nav">
                                <li className={`nav-item ${navActive.canhBaoMayHu ? 'isActive' : ''}`}>
                                    <NavLink className="nav-link" to="/admin/canhbaomayhu" onClick={() => { updateNavActive("canhBaoMayHu") }}>Cảnh báo máy hư</NavLink>
                                </li>
                                <li className={`nav-item ${navActive.quanLyNongTrai ? 'isActive' : ''}`}>
                                    <NavLink className="nav-link " to="/admin/quanlynongtrai" onClick={() => { updateNavActive("quanLyNongTrai") }}>Quản lý nông trại</NavLink>
                                </li>
                                <li className={`nav-item ${navActive.quanLyNguoiDung ? 'isActive' : ''}`}>
                                    <NavLink className="nav-link " to="/admin/quanlynguoidung" onClick={() => { updateNavActive("quanLyNguoiDung") }}>Quản lý người dùng</NavLink>
                                </li>
                            </ul>
                        </div>
                        <div className="header__right col-4 d-none d-md-flex">
                            <ShowLogin></ShowLogin>
                        </div>
                        <button className="navbar-toggler responsiveMenuButton" type="button" data-bs-toggle="collapse" data-bs-target="#myMenu"
                            aria-controls="myMenu" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>


                        <div className="responsiveMenu d-flex d-md-none col-8">
                            {renderResponsiveMenu()}
                        </div>
                    </nav>
                </Header>
                <Content>
                    {props.children}
                </Content>

            </Layout>
        </Fragment>
    );
};

export const AdminTemplate = (props) => (
    <Route
        path={props.path}
        {...props.exact}
        render={(propsComponent) => {
            const userLogin = localStorage.getItem('userLogin')
            const userLoginData = JSON.parse(userLogin)
            if (userLoginData) {
                if (userLoginData.type =="admin") {
                    return <AdminLayout>
                    <props.component {...propsComponent} />
                </AdminLayout>
                }
                return <Redirect to="/" />
            }
            return <Redirect to="/login" />
        }}
    />
);