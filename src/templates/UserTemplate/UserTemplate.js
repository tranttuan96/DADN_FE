import React, { useState, useEffect, Fragment } from "react";
import { Route, NavLink, Redirect } from "react-router-dom";
import './UserTemplate.scss'
import ShowLogin from './ShowLogin'

import { Layout } from 'antd';

const UserLayout = (props) => {
    return (
        <Fragment>
            <div className="user">
                <nav className="navbar navbar-expand-md navbar-light">
                    <div className="header__left col-4">

                        <a className="navbar-brand" to='/'>Logo</a>
                    </div>

                    <div className="header__center col-4 d-none d-md-flex" id="movieMenu">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" href="#">Trang chủ</a>
                            </li>
                            <li className="nav-item ">
                                <a className="nav-link " href="#">Độ ẩm</a>
                            </li>
                            <li className="nav-item ">
                                <a className="nav-link " href="#">Máy bơm</a>
                            </li>
                            <li className="nav-item ">
                                <a className="nav-link " href="#">Lịch sử</a>
                            </li>
                        </ul>
                    </div>
                    <div className="header__right col-4 d-none d-md-flex">
                        <ShowLogin></ShowLogin>
                    </div>
                    <button className="navbar-toggler responsiveMenuButton" type="button" data-toggle="collapse" data-target="#myMenu"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="responsiveMenu d-flex d-md-none col-8">
                    </div>
                </nav>

            </div>
            {props.children}
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