import React, { useState } from 'react'
import "../../assets/scss/Layout/homepage.scss"

export default function Homepage() {
    let farms = [{ name: 'farm1' }, { name: 'farm2' }, { name: 'farm3' }]

    let [farm, setFarm] = useState("");

    let parameter = {time: "11:00AM 04/05/2021", humidity : "700", engine : {status: "OFF", intensity: "1"}}

    let [firstAccess, setFirstAccess] = useState(true);

    const handleChangeSelectFarm = (event) => {
        let { value } = event.target;
        setFarm(value);
    }

    const chooseFirstTime = () => {
        setFirstAccess(false);
    }

    const renderContent = () => {
        if (firstAccess) {
            return <div className="popupFarms">
                <h4>Vui lòng chọn nông trại: </h4>
                <select class="form-select" name="farm" aria-label="Default select" onChange={handleChangeSelectFarm}>
                    <option defaultValue hidden>Lựa chọn nông trại</option>
                    {farms.map((farm, i) => {
                        return <option value={farms[i].name}>{farms[i].name}</option>
                    })}
                </select>

                <div className="confirm">
                    <button className="btn btn-success" onClick={chooseFirstTime}>Xác nhận</button>
                </div>

            </div>
        }
        else {
            return <div className="showContent">
                <div className="chose__farm">
                    <p>Thay đổi nông trại: </p>
                    <select class="form-select" name="farm" aria-label="Default select" onChange={handleChangeSelectFarm}>
                        <option value={farm} defaultValue hidden>{farm}</option>
                        {farms.map((farm, i) => {
                            return <option value={farms[i].name}>{farms[i].name}</option>
                        })}
                    </select>
                </div>
                <div className="content">
                    <div className="item">
                        <div className="icon"><img src={"images/time-icon.png"} /></div>
                        <div className="parameterName">
                            Thời gian cập nhật
                        </div>
                        <div className="detail">
                            {parameter.time}
                        </div>
                        
                    </div>
                    <div className="item">
                        <div className="icon"><img src={"images/humidity-icon.png"} /></div>
                        <div className="parameterName">
                            Độ ẩm
                        </div>
                        <div className="detail">
                            {parameter.humidity}
                        </div>
                    </div>
                    <div className="item">
                        <div className="icon"><img src={"images/engine-icon.png"} /></div>
                        <div className="parameterName">
                            Máy bơm
                        </div>
                        <div className="detail">
                            Trạng thái: {parameter.engine.status}
                        </div>
                        
                    </div>
                </div>
            </div>
        }
    }

    return (
        <div className="homepage">
            {renderContent()}
        </div>
    )
}
