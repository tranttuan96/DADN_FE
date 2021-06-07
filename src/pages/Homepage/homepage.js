import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import "../../assets/scss/Layout/homepage.scss"
import { qlDoAmService } from "../../services/quanLyDoAmService"
import { qlNguoiDungService } from "../../services/quanLyNguoiDungService"
import { setListFarms, setCurrentFarmIndex } from "../../redux/actions/UserFarmAction"

export default function Homepage() {

  const thongTinUserFarm = useSelector((state) => state.UserFarmReducer);
  // console.log(thongTinUserFarm)
  const dispatch = useDispatch();
  const taiKhoan = JSON.parse(localStorage.getItem('userLogin'))
  let [farms, setFarms] = useState([]);
  let [currentFarm, setCurrentFarm] = useState();
  let [changeFarm, setChangeFarm] = useState(false);
  let [sensorID, setSensorID] = useState("");
  let [pumpID, setPumpID] = useState("");
  let [time, setTime] = useState();
  let [humidity, setHumidity] = useState();
  let [pumpStatus, setPumpStatus] = useState()

  let [flag, setFlag] = useState(true);

  useEffect(() => {
    if (thongTinUserFarm.listFarm.length !== 0 && thongTinUserFarm.currentFarmIndex !== -1) {
      if (sensorID === "") {
        qlDoAmService.layDanhSachSensor(thongTinUserFarm.listFarm[thongTinUserFarm.currentFarmIndex].id).then(res => {
          setSensorID(res.data[0].id);
          qlDoAmService.layThongSoDoAm(res.data[0].id).then(res => {
            setHumidity(res.data.moisture);
            setTime(res.data.updatedAt)
            setFlag(!flag);
          }).catch(error => {
            console.log(error.response);
          });
        }).catch(error => {
          console.log(error.response);
        });
        qlDoAmService.layDanhSachMayBom(thongTinUserFarm.listFarm[thongTinUserFarm.currentFarmIndex].id).then(res => {
          setPumpID(res.data[0].id);
          qlDoAmService.layThongSoMayBom(res.data[0].id).then(res => {
            setPumpStatus(res.data.status);
          }).catch(error => {
            console.log(error.response);
          });
        }).catch(error => {
          console.log(error.response);
        });
      }
      else {
        setTimeout(() => {
          if (!changeFarm) {

            qlDoAmService.layThongSoDoAm(sensorID).then(res => {
              setHumidity(res.data.moisture);
              setTime(res.data.updatedAt)
              setFlag(!flag);
            }).catch(error => {
              console.log(error.response);
            });
            qlDoAmService.layThongSoMayBom(pumpID).then(res => {
              setPumpStatus(res.data.status);
            }).catch(error => {
              console.log(error.response.data);
            });

          }
          else {
            setChangeFarm(false);
            qlDoAmService.layDanhSachSensor(thongTinUserFarm.listFarm[thongTinUserFarm.currentFarmIndex].id).then(res => {
              setSensorID(res.data[0].id);
              qlDoAmService.layThongSoDoAm(res.data[0].id).then(res => {
                setHumidity(res.data.moisture);
                setTime(res.data.updatedAt)
                setFlag(!flag);
              }).catch(error => {
                console.log(error.response);
              });
            }).catch(error => {
              console.log(error.response);
            });
            qlDoAmService.layDanhSachMayBom(thongTinUserFarm.listFarm[thongTinUserFarm.currentFarmIndex].id).then(res => {
              setPumpID(res.data[0].id);
              qlDoAmService.layThongSoMayBom(res.data[0].id).then(res => {
                setPumpStatus(res.data.status);
              }).catch(error => {
                console.log(error.response);
              });
            }).catch(error => {
              console.log(error.response);
            });
          }
        }, 5000);
      }

    }
    else {
      if (thongTinUserFarm.listFarm.length === 0) {
        if (taiKhoan.type === "admin") {
          qlDoAmService.layDanhSachNongTrai().then(res => {
            dispatch(setListFarms(res.data))
            setFarms(res.data);
          }).catch(error => {
            console.log(error.response.data);
          });
        }
        else {
          qlNguoiDungService.layDanhSachNongTrai(taiKhoan.id).then(res => {
            let temp = [];
            res.data.map((userFarm, i) => {
              temp = [...temp, userFarm.farm]
            })
            dispatch(setListFarms(temp))
            setFarms(temp);
          }).catch(error => {
            console.log(error.response);
          });
        }
      }
      else {
        setFarms(thongTinUserFarm.listFarm)
      }
    }
  });

  const handleChangeSelectFarm = (event) => {
    let { value } = event.target;
    setCurrentFarm(value);
  }

  const handleChangeSelectFarm2 = (event) => {
    let { value } = event.target;
    dispatch(setCurrentFarmIndex(value));
    setChangeFarm(true);
  }

  const chooseFirstTime = () => {
    // console.log(object)
    dispatch(setCurrentFarmIndex(currentFarm))
  }

  const renderContent = () => {
    if (thongTinUserFarm.listFarm.length === 0 || thongTinUserFarm.currentFarmIndex === -1) {
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
              if (farm.farmDevices.length != 0) {
                return <option key={i} value={i}>{farm.name}</option>;
              }
              else {
                return <option key={i} value={i} disabled>{farm.name}</option>;
              }
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
          <select className="form-select" name="farm" aria-label="Default select" onChange={handleChangeSelectFarm2}>
            <option value={thongTinUserFarm.listFarm[thongTinUserFarm.currentFarmIndex].id} defaultValue hidden>{thongTinUserFarm.listFarm[thongTinUserFarm.currentFarmIndex].name}</option>
            {thongTinUserFarm.listFarm.map((farm, i) => {
              if (farm.farmDevices.length != 0) {
                return <option key={i} value={i}>{farm.name}</option>;
              }
              else {
                return <option key={i} value={i} disabled>{farm.name}</option>;
              }
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
              <div>Trạng thái: {pumpStatus}</div>


            </div>

          </div>
        </div>

      </div>



    }
  };

  return <div className="homepage">{renderContent()}</div>;
}