import React, { useState, useEffect, Fragment } from "react";
import { Route, NavLink, Redirect } from "react-router-dom";
import './UserTemplate.scss'
import ShowLogin from './ShowLogin'
import { useDispatch } from 'react-redux'
import { setEmptyState } from "../../redux/actions/UserFarmAction"
import { Layout } from 'antd';
const { Header, Content } = Layout;




const UserLayout = (props) => {
    const dispatch = useDispatch();
    const taiKhoan = JSON.parse(localStorage.getItem('userLogin'))
    let [navActive, setNavActive] = useState({
        home: true,
        doAm: false,
        mayBom: false,
        lichSu: false,
    })

    const dangXuat = () => {
        // console.log(taiKhoan)
        // console.log("run logout")
        dispatch(setEmptyState());
        localStorage.removeItem('userLogin')
        // dispatch(dangNhapAction(localStorage.getItem(userLogin)))
    }

    const updateNavActive = (name) => {
        if (name === "home") {
            let temp = { ...navActive };
            temp.home = true;
            temp.doAm = false;
            temp.mayBom = false;
            temp.lichSu = false;
            setNavActive(temp);
        }
        else if (name === "doam") {
            let temp = { ...navActive };
            temp.home = false;
            temp.doAm = true;
            temp.mayBom = false;
            temp.lichSu = false;
            setNavActive(temp);
        }
        else if (name === "maybom") {
            let temp = { ...navActive };
            temp.home = false;
            temp.doAm = false;
            temp.mayBom = true;
            temp.lichSu = false;
            setNavActive(temp);
        }
        else if (name === "lichsu") {
            let temp = { ...navActive };
            temp.home = false;
            temp.doAm = false;
            temp.mayBom = false;
            temp.lichSu = true;
            setNavActive(temp);
        }
    }

    const renderResponsiveMenu = () => {
        return <div className="collapse navbar-collapse" id="myMenu">
            <ul className="navbar-nav" style={{ flexDirection: "column" }}>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/">
                        <img className="avatar" src={"images/avatar-login.jpg"}></img>
                        {taiKhoan.username}
                    </NavLink>
                </li>
                <li className={`nav-item ${navActive.home ? 'isActive' : ''}`}>
                    <NavLink className="nav-link" to="/" onClick={() => { updateNavActive("home") }}>Trang chủ</NavLink>
                </li>
                <li className={`nav-item ${navActive.doAm ? 'isActive' : ''}`}>
                    <NavLink className="nav-link" to="/doam" onClick={() => { updateNavActive("doam") }}>Độ ẩm</NavLink>
                </li>
                <li className={`nav-item ${navActive.mayBom ? 'isActive' : ''}`}>
                    <NavLink className="nav-link" to="/maybom" onClick={() => { updateNavActive("maybom") }}>Máy bơm</NavLink>
                </li>
                <li className={`nav-item ${navActive.lichSu ? 'isActive' : ''}`}>
                    <NavLink className="nav-link " to="/lichsu" onClick={() => { updateNavActive("lichsu") }}>Lịch sử</NavLink>
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
                            <NavLink className="navbar-brand" to='/'><img src={"images/1004px-Logo-hcmut.svg.png"} style={{ width: 45, height: 45 }} /></NavLink>
                        </div>
                        <div className="header__center col-4 d-none d-md-flex" id="mainMenu">
                            <ul className="navbar-nav">
                                <li className={`nav-item ${navActive.home ? 'isActive' : ''}`}>
                                    <NavLink className="nav-link" to="/" onClick={() => { updateNavActive("home") }}>Trang chủ</NavLink>
                                </li>
                                <li className={`nav-item ${navActive.doAm ? 'isActive' : ''}`}>
                                    <NavLink className="nav-link " to="/doam" onClick={() => { updateNavActive("doam") }}>Độ ẩm</NavLink>
                                </li>
                                <li className={`nav-item ${navActive.mayBom ? 'isActive' : ''}`}>
                                    <NavLink className="nav-link " to="/maybom" onClick={() => { updateNavActive("maybom") }}>Máy bơm</NavLink>
                                </li>
                                <li className={`nav-item ${navActive.lichSu ? 'isActive' : ''}`}>
                                    <NavLink className="nav-link " to="/lichsu" onClick={() => { updateNavActive("lichsu") }}>Lịch sử</NavLink>
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

export const UserTemplate = (props) => (
    <Route
        path={props.path}
        {...props.exact}
        render={(propsComponent) => {
            const userLogin = localStorage.getItem('userLogin')
            const userLoginData = JSON.parse(userLogin)
            if (userLoginData) {
                return <UserLayout>
                    <props.component {...propsComponent} />
                </UserLayout>
            }
            return <Redirect to="/login" />
        }}
    />
);