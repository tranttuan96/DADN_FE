import React from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { NavLink } from "react-router-dom";
// npm install react-bootstrap bootstrap

export default class MyComponent extends React.Component {
  interval = null;

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      showModalAdd: false,
      showModalDelete: false,
      method: "",
      activeFarms: [],
      notActiveFarms: [],
      form: { id: 0, name: "", location: "" },
    };
  }

  async fetchJSON(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  }

  async postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const response2 = await response.json(); // parses JSON response into native JavaScript objects

    alert("Thêm nông trại thành công!");

    return response2;
  }

  async putData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const response2 = await response.json(); // parses JSON response into native JavaScript objects

    alert("Cập nhật nông trại thành công!");

    return response2;
  }

  async putData2(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    try {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch {
      alert(
        "Nông trại không tồn tại hoặc nông trại không thể hoạt động trở lại!"
      );
      return response;
    }

    const response2 = await response.json(); // parses JSON response into native JavaScript objects

    alert("Nông trại đã hoạt động trở lại!");

    return response2;
  }

  async deleteData(url = "") {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      // body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    try {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch {
      alert("Không thể ngừng hoạt động nông trại đang có thiết bị!");
      return response;
    }

    const response2 = await response.json(); // parses JSON response into native JavaScript objects

    alert("Ngừng hoạt động nông trại thành công!");

    return response2;
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.fetchJSON("http://localhost:8080/api/farms?active=1")
        .then((data) => {
          console.log("activeFarms = " + data);
          this.setState({
            ...this.state,
            isLoaded: true,
            activeFarms: data,
          });
        })
        .catch((e) => {
          console.log(e);
          this.setState({
            ...this.state,
            isLoaded: true,
            error: e,
          });
        });

      this.fetchJSON("http://localhost:8080/api/farms?active=0")
        .then((data) => {
          console.log("notActiveFarms = " + data);
          this.setState({
            ...this.state,
            isLoaded: true,
            notActiveFarms: data,
          });
        })
        .catch((e) => {
          console.log(e);
          this.setState({
            ...this.state,
            isLoaded: true,
            error: e,
          });
        });
    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    this.interval = null;
  }

  render() {
    const { error, isLoaded, activeFarms, notActiveFarms } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      console.log(this.state);
      return (
        <Container className="my-5">
          <Button
            className="mb-3"
            onClick={() =>
              this.setState({
                ...this.state,
                showModalAdd: true,
                method: "POST",
                form: { ...this.state.form, id: 0 },
              })
            }
          >
            Thêm nông trại
          </Button>

          {/* Add or update modal */}
          <Modal
            show={this.state.showModalAdd}
            onHide={() => this.setState({ ...this.state, showModalAdd: false })}
          >
            <Modal.Header closeButton>
              <Modal.Title>Thêm hoặc cập nhật nông trại</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (this.state.method == "POST") {
                    this.postData(
                      "http://localhost:8080/api/farms",
                      this.state.form
                    );
                  } else if (this.state.method == "PUT") {
                    this.putData(
                      "http://localhost:8080/api/farms/" +
                        this.state.form.id.toString(),
                      this.state.form
                    );
                  }

                  this.setState({ ...this.state, showModalAdd: false });
                }}
              >
                <Form.Group controlId="farmName" className="my-3">
                  <Form.Label>Tên</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => {
                      e.preventDefault();
                      console.log(e.target.value);
                      this.setState({
                        ...this.state,
                        form: { ...this.state.form, name: e.target.value },
                      });
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="farmLocation" className="my-3">
                  <Form.Label>Vị trí địa lý</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => {
                      e.preventDefault();
                      console.log(e.target.value);
                      this.setState({
                        ...this.state,
                        form: { ...this.state.form, location: e.target.value },
                      });
                    }}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="my-3">
                  Lưu
                </Button>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={() =>
                  this.setState({ ...this.state, showModalAdd: false })
                }
              >
                Huỷ
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Delete modal */}
          <Modal
            show={this.state.showModalDelete}
            onHide={() =>
              this.setState({ ...this.state, showModalDelete: false })
            }
          >
            <Modal.Header closeButton>
              <Modal.Title>Xoá nông trại</Modal.Title>
            </Modal.Header>
            <Modal.Body>Bạn có chắc chắn muốn ngừng hoạt động nông trại này?</Modal.Body>
            <Modal.Footer>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  this.deleteData(
                    "http://localhost:8080/api/farms/" + this.state.form.id
                  );

                  this.setState({ ...this.state, showModalDelete: false });
                }}
              >
                Chắc chắn
              </Button>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  this.setState({ ...this.state, showModalDelete: false });
                }}
              >
                Không
              </Button>
            </Modal.Footer>
          </Modal>

          <h4>Nông trại đang hoạt động</h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID nông trại</th>
                <th>Tên nông trại</th>
                <th>Vị trí địa lý</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {activeFarms.map((farm) => (
                <tr key={farm.id}>
                  <td>{farm.id}</td>
                  <td>{farm.name}</td>
                  <td>{farm.location}</td>
                  <td>
                    <Button
                      className="me-3"
                      variant="warning"
                      onClick={(e) => {
                        e.preventDefault();
                        this.setState({
                          ...this.state,
                          showModalAdd: true,
                          method: "PUT",
                          form: {
                            ...this.state.form,
                            id: farm.id,
                          },
                        });
                      }}
                    >
                      Cập nhật
                    </Button>
                    <Button
                      className="me-3"
                      variant="danger"
                      onClick={(e) => {
                        e.preventDefault();
                        this.setState({
                          ...this.state,
                          showModalDelete: true,
                          form: { ...this.state.form, id: farm.id },
                        });
                      }}
                    >
                      Ngừng hoạt động
                    </Button>
                    <Button className="me-3" variant="outline-dark">
                      <NavLink to={"/admin/quanlynongtrai/" + farm.id}>
                        Xem thiết bị trong nông trại
                      </NavLink>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <h4 className="mt-5">Nông trại ngừng hoạt động</h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID nông trại</th>
                <th>Tên nông trại</th>
                <th>Vị trí địa lý</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {notActiveFarms.map((farm) => (
                <tr key={farm.id}>
                  <td>{farm.id}</td>
                  <td>{farm.name}</td>
                  <td>{farm.location}</td>
                  <td>
                    <Button
                      className="me-3"
                      variant="warning"
                      onClick={(e) => {
                        e.preventDefault();
                        this.setState({
                          ...this.state,
                          showModalAdd: true,
                          method: "PUT",
                          form: {
                            ...this.state.form,
                            id: farm.id,
                          },
                        });
                      }}
                    >
                      Cập nhật
                    </Button>
                    <Button
                      className="me-3"
                      variant="danger"
                      onClick={(e) => {
                        e.preventDefault();
                        this.putData2("http://localhost:8080/api/farms/" + farm.id.toString() + "/active", {});
                      }}
                    >
                      Hoạt động trở lại
                    </Button>
                    <Button
                      className="me-3"
                      variant="outline-dark"
                      style={{ visibility: "hidden" }}
                    >
                      <NavLink to={"/admin/quanlynongtrai/" + farm.id}>
                        Xem thiết bị trong nông trại
                      </NavLink>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      );
    }
  }
}
