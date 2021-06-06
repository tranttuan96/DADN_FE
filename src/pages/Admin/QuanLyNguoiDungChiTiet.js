import React, { useEffect, useState } from 'react'
import "../../assets/scss/Layout/quanlynguoidung.scss"
import { qlNguoiDungService } from "../../services/quanLyNguoiDungService"
import { qlNongTraiService } from "../../services/quanLyNongTraiService"
import { Modal, Button } from 'react-bootstrap';

export default function QuanLyNguoiDungChiTiet(props) {

    let [userID, setUserID] = useState("");
    let [userInfo, setUserInfo] = useState({});
    let [listUserFarm, setListUserFarm] = useState([]);
    let [listFarm, setListFarm] = useState([]);
    const [showModal, setShowModal] = useState(false);
    let [currentFarm, setCurrentFarm] = useState();
    let [chooseFarmError, setChooseFarmError] = useState("");

    useEffect(() => {
        setUserID(props.match.params.userID)
        qlNguoiDungService.layNguoiDungTheoID(props.match.params.userID).then(res => {
            console.log(res.data)
            setUserInfo(res.data);
        }).catch(error => {
            console.log(error.response);
        });
        qlNguoiDungService.layDanhSachNongTrai(props.match.params.userID).then(res => {
            setListUserFarm(res.data);
        }).catch(error => {
            console.log(error.response);
        });
        qlNongTraiService.layDanhSachNongTrai().then(res => {
            setListFarm(res.data)
        }).catch(error => {
            console.log(error.response);
        });
    }, []);

    const xoaNongTrai = (userFarmID) => {
        qlNguoiDungService.xoaNongTraiNguoiDung(userFarmID).then(res => {
            qlNguoiDungService.layDanhSachNongTrai(props.match.params.userID).then(res => {
                setListUserFarm(res.data);
            }).catch(error => {
                console.log(error.response);
            });
        }).catch(error => {
            console.log(error.response);
        });
    }

    const renderListFarms = () => {
        return listUserFarm.map((userFarm, index) => {

            return <tr key={index}>
                <th>{userFarm.farm.id}</th>
                <th>{userFarm.farm.name}</th>
                <th>{userFarm.farm.location}</th>
                <th>
                    <a className="btn btn-warning" onClick={() => xoaNongTrai(userFarm.id)}>Xóa nông trại</a>
                </th>
            </tr>
        })
    }


    const openModal = () => {
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    const addFarmOnClick = () => {
        qlNguoiDungService.themNongTraiNguoiDung(userID, currentFarm).then(res => {
            console.log(res.data)
            qlNguoiDungService.layDanhSachNongTrai(props.match.params.userID).then(res => {
                closeModal();
                setListUserFarm(res.data);
            }).catch(error => {
                console.log(error.response);
            });
        }).catch(error => {
            console.log(error.response);
        });
    }


    const handleChangeSelectFarm = (event) => {
        let { value } = event.target;
        let index = listUserFarm.findIndex(userFarm => userFarm.farm.id == value);
        if(index !== -1) {
            setChooseFarmError("Nông trại này đã được thêm, vui lòng chọn nông trại khác")
        }
        setCurrentFarm(value);
    }

    return (
        <div className="userManageDetail">
            <h4 className="text-center">
                Quản lý nông trại cho người dùng
            </h4>
            <p>User ID: {userID}</p>
            <p>Tên tài khoản: {userInfo.username}</p>
            <hr></hr>

            <div className="header">
                <h3>Danh sách nông trại</h3>
                <Button type="button" className="btn btn-primary" onClick={openModal}>
                    Thêm nông trại
                </Button>
            </div>
            <table class="table table-striped">
                <thead class="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Tên nông trại</th>
                        <th>Vị trí</th>
                        <th>Xóa</th>
                    </tr>
                </thead>
                <tbody>
                    {renderListFarms()}
                </tbody>
            </table>
            <Modal className="modal-container"
                show={showModal}
                onHide={closeModal}
                animation={true}
                bsSize="small">

                <Modal.Header closeButton>
                    <Modal.Title>Thêm nông trại cho người dùng</Modal.Title>
                </Modal.Header>

                <Modal.Body>
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
                        {listFarm.map((farm, i) => {
                            return <option key={i} value={farm.id}>{farm.name}</option>;
                        })}
                    </select>
                    <div>{chooseFarmError}</div>
                    <button type="submit" className="btn btn-primary" onClick={addFarmOnClick}>Submit</button>
                </Modal.Body>
            </Modal>
        </div>
    )
}
