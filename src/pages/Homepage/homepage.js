import React, { useEffect, useState } from 'react'

import "../../assets/scss/Layout/homepage.scss"
import { qlDoAmService } from "../../services/quanLyDoAmService"

export default function Homepage() {

  let [farms, setFarms] = useState([]);
  let [currentFarm, setCurrentFarm] = useState();
  let [sensorID, setSensorID] = useState("");

  let [time, setTime] = useState();
  let [humidity, setHumidity] = useState();

  let [flag, setFlag] = useState(true);

  let parameter = {
    time: "11:00AM 04/05/2021",
    humidity: "700",
    engine: { status: "OFF", intensity: "1" },
  };

  let [firstAccess, setFirstAccess] = useState(true);

  useEffect(() => {
    if (!firstAccess) {
      if(sensorID === "") {
        qlDoAmService.layDanhSachSensor(farms[currentFarm].id).then(res => {
          setSensorID(res.data[0].moistureSensorId);
          qlDoAmService.layThongSoDoAm(res.data[0].moistureSensorId).then(res => {
            setHumidity(res.data.moisture);
            setTime(res.data.updatedAt)
            setFlag(!flag);
          }).catch(error => {
            console.log(error.response);
          });
        }).catch(error => {
          console.log(error.response);
        });
      }
      else {
        setTimeout(() => {
          qlDoAmService.layThongSoDoAm(sensorID).then(res => {
            setHumidity(res.data.moisture);
            setTime(res.data.updatedAt)
            setFlag(!flag);
          }).catch(error => {
            console.log(error.response);
          });
        }, 3000);
      }
      
    }
    else {
      qlDoAmService.layDanhSachNongTrai().then(res => {
        setFarms(res.data);
      }).catch(error => {
        console.log(error.response.data);
      });
    }
  });

  const handleChangeSelectFarm = (event) => {
    let { value } = event.target;
    setCurrentFarm(value);
  }

  const chooseFirstTime = () => {
    setFirstAccess(false);
  }

  const renderContent = () => {
    if (firstAccess) {
      return (
        <div className="popupFarms">
          <h4>Vui lòng chọn nông trại: </h4>
          <select
            className="form-select"
            name="farm"
            aria-label="Default select"
            onChange={handleChangeSelectFarm}
          >
            <option defaultValue hidden>
              Lựa chọn nông trại
            </option>
            {farms.map((farm, i) => {
              return <option key={i} value={i}>{farm.name}</option>;
            })}
          </select>

          <div className="confirm">
            <button className="btn btn-success" onClick={chooseFirstTime}>
              Xác nhận
            </button>
          </div>
        </div>
      );
    }
    else {
      return <div className="showContent">
        <div className="chose__farm">
          <p>Thay đổi nông trại: </p>
          <select className="form-select" name="farm" aria-label="Default select" onChange={handleChangeSelectFarm}>
            <option value={farms[currentFarm].name} defaultValue hidden>{farms[currentFarm].name}</option>
            {farms.map((farm, i) => {
              return <option key={i} value={i}>{farm.name}</option>
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
              {time}
            </div>
          </div>
          <div className="item">
            <div className="icon"><img src={"images/humidity-icon.png"} /></div>
            <div className="parameterName">
              Độ ẩm
                        </div>
            <div className="detail">
              {humidity}
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
  };

  return <div className="homepage">{renderContent()}</div>;
}