import { render } from '@testing-library/react';
import React,{useState} from 'react'
import '../../assets/scss/Layout/maybom.css'
import {Switch} from "antd"

export default function MayBom() {
    let[intensity,setIntensity]=useState(null);
    let[toggle,setToggle]=useState(false);

    var info = [
        {label: "Trạng thái", value: "Tắt"},
        {label: "Cường độ", value: {intensity}},
        {label: "Ngưỡng trên", value: "900"},
        {label: "Ngưỡng dưới", value: "100"},
        {label: "Độ ẩm", value: "512"},
    ]

    const renderInfo = (info,index) => {
        return(
            <tr key ={index}>
                <td>{info.label}</td>
                <td>{info.value}</td>
            </tr>
        )
    }


    function getIntensity(event) {
        event.preventDefault();
        setIntensity(event.target.value);
    }

    const saveIntensity = (event) => {
        event.preventDefault();
        alert("intensity change");
    }

    const toggler = () =>{
        toggle ? setToggle(false) : setToggle(true);
        render();
    }

    return (
        <div>
            <table className="tableInfo">
                <thead>
                    <tr>
                    <th colSpan="2" className="tableheader">Thông tin máy bơm</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Trạng thái</td><td>Tắt</td>
                    </tr>
                    <tr>
                        <td>Cường độ</td><td>100</td>
                    </tr>
                    <tr>
                        <td>Ngưỡng trên</td><td>900</td>
                    </tr>
                    <tr>
                        <td>Ngưỡng dưới</td><td>100</td>
                    </tr>
                    <tr>
                        <td>Độ ẩm</td><td>500</td>
                    </tr>
                </tbody>
            </table>

            <form className="intensity" onSubmit={saveIntensity}>
                <div>
                    <label className="intensitylabel">Cường độ:</label>
                    <input name="intent" type="text" onChange={getIntensity} className="intensityinput"/>
                    <button className="intensitybutton">SAVE</button>
                </div>
            </form>

            <div className="toggle">
                <label className="togglelabel">Điều khiển máy bơm thủ công</label>
                <Switch className="togglebutton" onClick={toggler}/>
                {
                    toggle && (
                        <div className="manual" >
                            <button className="onbutton">ON</button>
                            <button className="offbutton">OFF</button>
                        </div>
                    )
                }
            </div>

        </div>
    )
}
