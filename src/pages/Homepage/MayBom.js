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
    let [sensorID, setSensorID] = useState();
    let [pumpID, setPumpID] = useState();

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

		let [flag, setFlag] = useState(true);

    const taiKhoan = JSON.parse(localStorage.getItem('userLogin'))

    useEffect(() => {
        setTimeout(() => {
            setSensorID(JSON.parse(localStorage.getItem('presentSensorId')));
            setPumpID(JSON.parse(localStorage.getItem('presentPumpId')));
            qlDoAmService.layThongSoDoAm(sensorID).then(res => {
                setHumidity(res.data.moisture);
								setFlag(!flag);
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
            }, 2000);
        },       
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
        if (isNaN(`${upperThreshold}`) || isNaN(`${lowerThreshold}`)){
            alert("D??? li???u kh??ng ????ng y??u c???u");
        }
        else if (Number.isInteger(`${upperThreshold}`) || Number.isInteger(`${lowerThreshold}`)){
            alert("D??? li???u kh??ng ????ng y??u c???u");
        }
        else if(`${upperThreshold}` < `${lowerThreshold}`){
            alert("Ng?????ng d?????i kh??ng ???????c cao h??n ng?????ng tr??n");
        }
        else{
            axios.post(`http://localhost:8080/api/${taiKhoan.id}/threshold/${sensorID}`, {
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
        // render();
    }

    const handleTurnOn = () =>{
        pumpControllService.pumpTurnOn(taiKhoan.id,pumpID).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
        setShowTurnOn(false);
    }

    const handleTurnOff = () =>{
        pumpControllService.pumpTurnOff(taiKhoan.id,pumpID).then(response => {
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
                    <th colSpan="2" className="tableheader">Th??ng tin m??y b??m</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Tr???ng th??i</td><td>{pumpstatus}</td>
                    </tr>
                    <tr>
                        <td>Ng?????ng tr??n</td><td>{upper}</td>
                    </tr>
                    <tr>
                        <td>Ng?????ng d?????i</td><td>{lower}</td>
                    </tr>
                    <tr>
                        <td>????? ???m</td><td>{humidity}</td>
                    </tr>
                </tbody>
            </table>

            <div className="toggle">
                <label className="togglelabel">??i???u khi???n m??y b??m th??? c??ng</label>
                <Switch className="togglebutton" onClick={toggler}/>
                {
                    toggle && (
                        <div className="manual" >
                            <Button className="onbutton" variant="success" onClick={handleShowTurnOn}>
                                ON
                            </Button>

                            <Modal show={showTurnOn} onHide={handleCloseTurnOn}>
                                <Modal.Header>
                                    <Modal.Title>B???t m??y b??m</Modal.Title>

                                </Modal.Header>
                                <Modal.Body>
                                    <p/> <p/>
                                    B???n c?? ch???c ch???n mu???n b???t m??y b??m?
                                    <p/> <p/>
                                    <Button className="yesbutton" variant="primary" onClick={handleTurnOn}>
                                        C??
                                    </Button>
                                    <Button className="nobutton" variant="secondary" onClick={handleCloseTurnOn}>
                                        Kh??ng
                                    </Button>
                                </Modal.Body>
                            </Modal>

                            <Button className="offbutton" variant="danger" onClick={handleShowTurnOff}>
                                OFF
                            </Button>

                            <Modal show={showTurnOff} onHide={handleCloseTurnOff}>
                                <Modal.Header>
                                    <Modal.Title>T???t m??y b??m</Modal.Title>

                                </Modal.Header>
                                <Modal.Body>
                                    <p/> <p/>
                                    B???n c?? ch???c ch???n mu???n t???t m??y b??m?
                                    <p/> <p/>
                                    <Button className="yesbutton" variant="primary" onClick={handleTurnOff}>
                                        C??
                                    </Button>
                                    <Button className="nobutton" variant="secondary" onClick={handleCloseTurnOff}>
                                        Kh??ng
                                    </Button>
                                </Modal.Body>
                            </Modal>

                        </div>
                    )
                }
            </div>

            <Button className="threshold" variant="primary" onClick={handleShowThreshold}>
                Thi???t l???p ng?????ng ????? ???m
            </Button>

            <Modal show={showThreshold} onHide={handleCloseThreshold}>
                <Modal.Header>
                    <Modal.Title>Thi???t l???p ng?????ng ????? ???m</Modal.Title>
                    <Button variant="secondary" onClick={handleCloseThreshold}>
                        Close
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    <p/> <p/>
                    <form className="thresholdform" onSubmit={saveThreshold}>
                    <div>
                        <label className="upperlabel">Ng?????ng tr??n:</label>
                        <input name="upperThreshold" type="text" value={upperThreshold}  className="upperinput" onChange={handleUpperThreshold}/> <br/> <p/>
                    </div>
                    <div>
                        <label className="lowerlabel">Ng?????ng d?????i:</label>
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
                    <label className="intensitylabel">C?????ng ?????:</label>
                    <input name="intensity" type="text" className="intensityinput" value={intensityValue} onChange={handleIntensity}/>
                    <button className="intensitybutton">SAVE</button>
                </div>
            </form>
            */