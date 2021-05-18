import { render } from '@testing-library/react';
import React,{useEffect,useState} from 'react';
import '../../assets/scss/Layout/maybom.css';
import {Switch} from "antd";
import {Modal,Button} from "react-bootstrap";
import { qlDoAmService } from "../../services/quanLyDoAmService"
import {pumpControllService} from "../../services/pumpControll";
import {ThresholdService} from "../../services/thresholdService";
import axios from "axios"

export default function MayBom() {

    //let [currentFarm, setCurrentFarm] = useState("");
    let [sensorID, setSensorID] = useState(1);
    let [pumpID, setPumpID] = useState(1);

    let [pumpstatus,setPumpStatus] = useState()
    let [intensity,setIntensity] = useState(100);
    let [upperThreshold,setUpperThreshold] = useState();
    let [lowerThreshold,setLowerThreshold] = useState();
    let [upper,setUpper] = useState();
    let [lower,setLower] = useState();
    let [humidity, setHumidity] = useState();
    let [toggle,setToggle] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            qlDoAmService.layThongSoDoAm(sensorID).then(res => {
                setHumidity(res.data.moisture);
            }).catch(error => {
                console.log(error.response.data);
            });
            pumpControllService.getPumpStatus(pumpID).then(res =>{
                setPumpStatus(res.data.status);
            }).catch(error => {
                console.log(error.response.data);
            });
            ThresholdService.getCurrentThreshold(sensorID).then(res =>{
                setLower(res.data.lower)
                setUpper(res.data.upper)
            }).catch(error => {
                console.log(error.response.data);
            });
            }, 3000);
        }        
    );
/*
    useEffect(() =>{
        setTimeout(() => {
            pumpControllService.getPumpStatus(pumpID).then(res =>{
                setPumpStatus(res.data.status);
            }).catch(error => {
                console.log(error.response);
            });
        }, 1000);
    });
*/
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleIntensity = (event) =>{
        setIntensity(event.target.value);
    }

    const saveIntensity = (event) => {
        event.preventDefault();
        alert("intensity saved");
    }

    const handleUpperThreshold = (event) =>{
        setUpperThreshold(event.target.value);
    }
    
    const handleLowerThreshold = (event) =>{
        setLowerThreshold(event.target.value);
    }

    const saveThreshold = (event) => {
        event.preventDefault();
        axios.post(`http://localhost:8080/api/threshold/${sensorID}`, {
            upper: `${upperThreshold}`,
            lower: `${lowerThreshold}`
        }).then(res =>{
            console.log(res.response);
        }).catch(error => {
            console.log(error.response);
        });
        alert("threshold saved");
    }

    const toggler = () =>{
        toggle ? setToggle(false) : setToggle(true);
        render();
    }

    const handleTurnOn = () =>{
        pumpControllService.pumpTurnOn(pumpID).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
    }

    const handleTurnOff = () =>{
        pumpControllService.pumpTurnOff(pumpID).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
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
                        <td>Trạng thái</td><td>{pumpstatus}</td>
                    </tr>
                    <tr>
                        <td>Cường độ</td><td>{intensity}</td>
                    </tr>
                    <tr>
                        <td>Ngưỡng trên</td><td>{upper}</td>
                    </tr>
                    <tr>
                        <td>Ngưỡng dưới</td><td>{lower}</td>
                    </tr>
                    <tr>
                        <td>Độ ẩm</td><td>{humidity}</td>
                    </tr>
                </tbody>
            </table>

            <form className="intensity" onSubmit={saveIntensity}>
                <div>
                    <label className="intensitylabel">Cường độ:</label>
                    <input name="intensity" type="text" className="intensityinput" onChange={handleIntensity}/>
                    <button className="intensitybutton">SAVE</button>
                </div>
            </form>

            <div className="toggle">
                <label className="togglelabel">Điều khiển máy bơm thủ công</label>
                <Switch className="togglebutton" onClick={toggler}/>
                {
                    toggle && (
                        <div className="manual" >
                            <button className="onbutton" onClick={handleTurnOn}>ON</button>
                            <button className="offbutton" onClick={handleTurnOff}>OFF</button>
                        </div>
                    )
                }
            </div>

            <Button className="threshold" variant="primary" onClick={handleShow}>
                Thiết lập ngưỡng độ ẩm
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Thiết lập ngưỡng độ ẩm</Modal.Title>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    <p/> <p/>
                    <form className="thresholdform" onSubmit={saveThreshold}>
                    <div>
                        <label className="upperlabel">Ngưỡng trên:</label>
                        <input name="upperThreshold" type="text" value={upperThreshold}  className="upperinput" onChange={handleUpperThreshold}/> <br/> <p/>
                    </div>
                    <div>
                        <label className="lowerlabel">Ngưỡng dưới:</label>
                        <input name="lowerThreshold" type="text" value={lowerThreshold} className="lowerinput" onChange={handleLowerThreshold}/> <br/> <p/>
                    </div>
                        <button className="thresholdbutton"> Save Changes </button> 
                    </form>
                </Modal.Body>
            </Modal>

        </div>
    )
}
