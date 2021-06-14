import React, { useEffect, useState } from 'react'
import "../../assets/scss/Layout/quanlynguoidung.scss"
import { qlNguoiDungService } from "../../services/quanLyNguoiDungService"
import { Modal, Button } from 'react-bootstrap';
import { Route, NavLink, Redirect } from "react-router-dom";
import swal from 'sweetalert';

export default function QuanLyNguoiDung() {

    const [listUser, setListUser] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newUser, setNewUser] = useState({
        values: {
            username: "",
            password: "",
            email: "",
        }
    });

    useEffect(() => {
        qlNguoiDungService.layDanhSachNguoiDung().then(res => {
            console.log(res.data)
            setListUser(res.data);
        }).catch(error => {
            console.log(error.response);
        });
    }, []);

    const renderListUser = () => {
        return listUser.map((user, index) => {
            return <tr key={index}>
                <th>{index + 1}</th>
                <th>{user.username}</th>
                <th>{user.email}</th>
                <th>{user.createTime}</th>
                <th>
                    <NavLink className="btn btn-primary" to={`/admin/quanlynguoidung/${user.id}`}>Chỉnh sửa nông trại</NavLink>
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

    const handleChange = (event) => {
        let { value, name } = event.target;
        let newValues = {
            ...newUser.values,
        };
        newValues = { ...newValues, [name]: value }
        setNewUser({ values: newValues })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let { values } = newUser;
        console.log(values)
        qlNguoiDungService.themNguoiDung(values).then(res => {
            closeModal();
            console.log(res.data === "")
            if(res.data === "") {
                swal("Thất bại.", "Tên tài khoản đã tồn tại", "error", {
                    buttons: false,
                    timer: 1500,
                });
            }
            else {
                swal("Thành công.", "Thêm tài khoản thành công", "success", {
                    buttons: false,
                    timer: 1500,
                });
                qlNguoiDungService.layDanhSachNguoiDung().then(res => {
                    setListUser(res.data);
                }).catch(error => {
                    console.log(error.response);
                });
            }
        }).catch(error => {
            console.log(error.response);
        });
    }

    return (
        <div className="userManage">
            <div className="header">
                <h3>Danh sách người dùng</h3>
                <Button type="button" className="btn btn-primary" onClick={openModal}>
                    Thêm người dùng
                </Button>
            </div>
            <table class="table table-striped">
                <thead class="table-dark">
                    <tr>
                        <th>STT</th>
                        <th>Tên tài khoản</th>
                        <th>Email</th>
                        <th>Ngày tạo</th>
                        <th>Quản lý nông trại người dùng</th>
                    </tr>
                </thead>
                <tbody>
                    {renderListUser()}
                </tbody>
            </table>
            <div>

                {/* Modal */}
                <Modal className="modal-container"
                    show={showModal}
                    onHide={closeModal}
                    animation={true}
                    bsSize="small">

                    <Modal.Header closeButton>
                        <Modal.Title>Thêm người dùng</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                    <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Tên tài khoản</label>
                                        <input type="text" name="username" className="form-control" id="username" required onChange={handleChange} />
                                        {/* <div>{newUser.errors.username}</div> */}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                        <input type="email" name="email" className="form-control" id="email" required onChange={handleChange} />
                                        {/* <div>{newUser.errors.email}</div> */}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                        <input type="text" name="password" className="form-control" id="password" required onChange={handleChange} />
                                        {/* <div>{newUser.errors.password}</div> */}
                                    </div>
                                    <button type="submit" className="btn btn-primary">Thêm</button>
                                </form>
                    </Modal.Body>
                </Modal>
            </div>

        </div>
    )
}
