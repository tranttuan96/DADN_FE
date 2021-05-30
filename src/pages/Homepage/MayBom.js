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
    let [sensorID, setSensorID] = useState(9);
    let [pumpID, setPumpID] = useState(11);

    let [pumpstatus,setPumpStatus] = useState()
    //let [intensity,setIntensity] = useState();
    //let [intensityValue,setIntensityValue] = useState();
    let [upperThreshold,setUpperThreshold] = useState();
    let [lowerThreshold,setLowerThreshold] = useState();
    let [upper,setUpper] = useState();
    let [lower,setLower] = useState();
    let [humidity, setHumidity] = useState();
    let [toggle,setToggle] = useState(false);
    let [showThreshold, setShowThreshold] = useState(false);
    let [showTurnOn, setShowTurnOn] = useState(false);
    let [showTurnOff, setShowTurnOff] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            qlDoAmService.layThongSoDoAm(sensorID).then(res => {
                setHumidity(res.data.moisture);
            }).catch(error => {
                console.log(error.response);
            });
            pumpControllService.getPumpStatus(pumpID).then(res =>{
                setPumpStatus(res.data.status);
                //setIntensity(res.data.intensity);
            }).catch(error => {
                console.log(error.response);
            });
            ThresholdService.getCurrentThreshold(sensorID).then(res =>{
                setLower(res.data.lower)
                setUpper(res.data.upper)
            }).catch(error => {
                console.log(error.response);
            });
            }, 3000);
        }        
    );

    const handleCloseThreshold = () => setShowThreshold(false);
    const handleShowThreshold = () => setShowThreshold(true);
    const handleCloseTurnOn = () => setShowTurnOn(false);
    const handleShowTurnOn = () => setShowTurnOn(true);
    const handleCloseTurnOff = () => setShowTurnOff(false);
    const handleShowTurnOff = () => setShowTurnOff(true);

    /*
    const handleIntensity = (event) =>{
        setIntensityValue(event.target.value);
    }

    const saveIntensity = (event) => {
        event.preventDefault();
        alert("intensity saved");
    }
    */

    const handleUpperThreshold = (event) =>{
        setUpperThreshold(event.target.value);
    }
    
    const handleLowerThreshold = (event) =>{
        setLowerThreshold(event.target.value);
    }

    const saveThreshold = (event) => {
        event.preventDefault();
        if(`${upperThreshold}` < `${lowerThreshold}`){
            alert("Ngưỡng dưới không được cao hơn ngưỡng trên");
        }
        else{
            axios.post(`http://localhost:8080/api/threshold/${sensorID}`, {
                upper: `${upperThreshold}`,
                lower: `${lowerThreshold}`
            }).then(res =>{
                console.log(res.response);
            }).catch(error => {
                console.log(error.response);
            });
            setShowThreshold(false);
            alert("threshold saved");
        }

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
        setShowTurnOn(false);
    }

    const handleTurnOff = () =>{
        pumpControllService.pumpTurnOff(pumpID).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
        setShowTurnOff(false);
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

            <div className="toggle">
                <label className="togglelabel">Điều khiển máy bơm thủ công</label>
                <Switch className="togglebutton" onClick={toggler}/>
                {
                    toggle && (
                        <div className="manual" >
                            <Button className="onbutton" variant="success" onClick={handleShowTurnOn}>
                                ON
                            </Button>

                            <Modal show={showTurnOn} onHide={handleCloseTurnOn}>
                                <Modal.Header>
                                    <Modal.Title>Bật máy bơm</Modal.Title>

                                </Modal.Header>
                                <Modal.Body>
                                    <p/> <p/>
                                    Bạn có chắc chắn muốn bật máy bơm?
                                    <p/> <p/>
                                    <Button className="yesbutton" variant="primary" onClick={handleTurnOn}>
                                        Có
                                    </Button>
                                    <Button className="nobutton" variant="secondary" onClick={handleCloseTurnOn}>
                                        Không
                                    </Button>
                                </Modal.Body>
                            </Modal>

                            <Button className="offbutton" variant="danger" onClick={handleShowTurnOff}>
                                OFF
                            </Button>

                            <Modal show={showTurnOff} onHide={handleCloseTurnOff}>
                                <Modal.Header>
                                    <Modal.Title>Tắt máy bơm</Modal.Title>

                                </Modal.Header>
                                <Modal.Body>
                                    <p/> <p/>
                                    Bạn có chắc chắn muốn tắt máy bơm?
                                    <p/> <p/>
                                    <Button className="yesbutton" variant="primary" onClick={handleTurnOff}>
                                        Có
                                    </Button>
                                    <Button className="nobutton" variant="secondary" onClick={handleCloseTurnOff}>
                                        Không
                                    </Button>
                                </Modal.Body>
                            </Modal>

                        </div>
                    )
                }
            </div>

            <Button className="threshold" variant="primary" onClick={handleShowThreshold}>
                Thiết lập ngưỡng độ ẩm
            </Button>

            <Modal show={showThreshold} onHide={handleCloseThreshold}>
                <Modal.Header>
                    <Modal.Title>Thiết lập ngưỡng độ ẩm</Modal.Title>
                    <Button variant="secondary" onClick={handleCloseThreshold}>
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

            /*
            <form className="intensity" onSubmit={saveIntensity}>
                <div>
                    <label className="intensitylabel">Cường độ:</label>
                    <input name="intensity" type="text" className="intensityinput" value={intensityValue} onChange={handleIntensity}/>
                    <button className="intensitybutton">SAVE</button>
                </div>
            </form>
            */