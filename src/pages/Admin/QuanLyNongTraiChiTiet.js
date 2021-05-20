import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import JSOG from "jsog";

// npm install react-bootstrap bootstrap
// npm install jsog for bidirectional relationships
// https://stackoverflow.com/.../deserialize-jackson-object...
// https://github.com/jsog/jsog
// https://github.com/jsog/jsog-jackson

export default class MyComponent extends React.Component {
  interval = null;

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      showModalAdd: false,
      showModalUpdate: false,
      showModalDelete: false,
      farm: {},
      moistureSensors: [],
      pumps: [],
      formMoistureSensor: { id: 0, moistureSensorId: "", name: "" },
      formPump: { id: 0, pumpId: "", name: "" },
      deviceType: "",
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

    alert("Thêm thiết bị thành công!");

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

    alert("Cập nhật thiết bị thành công!");

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

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const response2 = await response.json(); // parses JSON response into native JavaScript objects

    alert("Xoá thiết bị thành công!");

    return response2;
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.fetchJSON(
        "http://localhost:8080/api/farms/" +
          this.props.match.params.farmId.toString()
      )
        .then((data) => {
          this.setState({
            // ...this.state,
            // isLoaded: true,
            farm: data,
          });
        })
        .catch((e) => {
          console.log(e);
          this.setState({
            // ...this.state,
            // isLoaded: true,
            // error: e,
            e,
          });
        });

      this.fetchJSON(
        "http://localhost:8080/api/farms/" +
          this.props.match.params.farmId.toString() +
          "/moistureSensors"
      )
        .then((data) => {
          this.setState({
            // ...this.state,
            // isLoaded: true,
            moistureSensors: data,
          });
        })
        .catch((e) => {
          console.log(e);
          this.setState({
            // ...this.state,
            // isLoaded: true,
            // error: e,
            e,
          });
        });

      this.fetchJSON(
        "http://localhost:8080/api/farms/" +
          this.props.match.params.farmId.toString() +
          "/pumps"
      )
        .then((data) => {
          this.setState({
            // ...this.state,
            isLoaded: true,
            pumps: data,
          });
        })
        .catch((e) => {
          console.log(e);
          this.setState({
            // ...this.state,
            isLoaded: true,
            // error: e,
            e,
          });
        });
    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    this.interval = null;
  }

  render() {
    const { error, isLoaded, farm, moistureSensors, pumps } = this.state;

    console.log(farm);
    console.log(JSOG.decode(farm));

    let farmJSON = JSOG.decode(farm);

    let moistureSensorsJSON = JSOG.decode(moistureSensors);

    let pumpsJSON = JSOG.decode(pumps);

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      console.log(this.state);
      console.log(this.props.match);
      console.log(this.props.match.params.farmId);
      return (
        <Container className="my-5">
          <hr></hr>
          <Row className="mb-3 justify-content-center">
            <Row className="justify-content-center">
              <Col xs="10" sm="8" md="6" lg="4">
                <h2>Thông tin nông trại</h2>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col xs="5" sm="4" md="3" lg="2">
                <b>ID:</b>
              </Col>
              <Col xs="5" sm="4" md="3" lg="2">
                {farmJSON.id}
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col xs="5" sm="4" md="3" lg="2">
                <b>Tên:</b>
              </Col>
              <Col xs="5" sm="4" md="3" lg="2">
                {farmJSON.name}
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col xs="5" sm="4" md="3" lg="2">
                <b>Vị trí:</b>
              </Col>
              <Col xs="5" sm="4" md="3" lg="2">
                {farmJSON.location}
              </Col>
            </Row>
          </Row>
          <hr></hr>
          <Row className="justify-content-center mb-3">
            <Col xs="10" sm="8" md="6" lg="4">
              <h3>Thiết bị trong nông trại</h3>
            </Col>
          </Row>
          <h4>Cảm biến độ ẩm</h4>
          <Button
            className="mb-3"
            onClick={() =>
              this.setState({
                ...this.state,
                showModalAdd: true,
                formMoistureSensor: { ...this.state.formMoistureSensor, id: 0 },
                deviceType: "moistureSensor",
              })
            }
          >
            Thêm cảm biến độ ẩm
          </Button>

          {/* modalAdd */}
          <Modal
            show={this.state.showModalAdd}
            onHide={() => this.setState({ ...this.state, showModalAdd: false })}
          >
            <Modal.Header closeButton>
              <Modal.Title>Thêm thiết bị</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (this.state.deviceType == "moistureSensor") {
                    console.log("moisture sensor post");
                    this.postData(
                      "http://localhost:8080/api/farms/" +
                        farmJSON.id.toString() +
                        "/moistureSensors",
                      this.state.formMoistureSensor
                    );
                  } else if (this.state.deviceType == "pump") {
                    this.postData(
                      "http://localhost:8080/api/farms/" +
                        farmJSON.id.toString() +
                        "/pumps",
                      this.state.formPump
                    );
                  }

                  this.setState({ ...this.state, showModalAdd: false });
                }}
              >
                <Form.Group controlId="deviceId1" className="my-3">
                  <Form.Label>ID thiết bị</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => {
                      e.preventDefault();
                      console.log(e.target.value);
                      if (this.state.deviceType == "moistureSensor") {
                        this.setState({
                          ...this.state,
                          formMoistureSensor: {
                            ...this.state.formMoistureSensor,
                            moistureSensorId: e.target.value,
                          },
                        });
                      } else if (this.state.deviceType == "pump") {
                        this.setState({
                          ...this.state,
                          formPump: {
                            ...this.state.formPump,
                            pumpId: e.target.value,
                          },
                        });
                      }
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="deviceName1" className="my-3">
                  <Form.Label>Tên</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => {
                      e.preventDefault();
                      console.log(e.target.value);
                      if (this.state.deviceType == "moistureSensor") {
                        this.setState({
                          ...this.state,
                          formMoistureSensor: {
                            ...this.state.formMoistureSensor,
                            name: e.target.value,
                          },
                        });
                      } else if (this.state.deviceType == "pump") {
                        this.setState({
                          ...this.state,
                          formPump: {
                            ...this.state.formPump,
                            name: e.target.value,
                          },
                        });
                      }
                    }}
                  />
                </Form.Group>

                {/* <Form.Group controlId="deviceType1" className="my-3">
                  <Form.Label>Loại thiết bị</Form.Label>
                  <Form.Control
                    as="select"
                    className="mr-sm-2"
                    custom
                    onChange={(e) => {
                      e.preventDefault();
                      console.log(e.target.value);
                      this.setState({
                        ...this.state,
                        deviceType: e.target.value,
                      });
                    }}
                  >
                    <option value="">Chọn...</option>
                    <option value="moistureSensor">Cảm biến độ ẩm</option>
                    <option value="pump">Máy bơm</option>
                  </Form.Control>
                </Form.Group> */}

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

          {/* modalUpdate */}
          <Modal
            show={this.state.showModalUpdate}
            onHide={() =>
              this.setState({ ...this.state, showModalUpdate: false })
            }
          >
            <Modal.Header closeButton>
              <Modal.Title>Cập nhật thiết bị</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (this.state.deviceType == "moistureSensor") {
                    this.putData(
                      "http://localhost:8080/api/farms/" +
                        farmJSON.id.toString() +
                        "/moistureSensors/" +
                        this.state.formMoistureSensor.id.toString(),
                      this.state.formMoistureSensor
                    );
                  } else if (this.state.deviceType == "pump") {
                    this.putData(
                      "http://localhost:8080/api/farms/" +
                        farmJSON.id.toString() +
                        "/pumps/" +
                        this.state.formPump.id.toString(),
                      this.state.formPump
                    );
                  }

                  this.setState({ ...this.state, showModalUpdate: false });
                }}
              >
                <Form.Group controlId="deviceId2" className="my-3">
                  <Form.Label>ID thiết bị</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => {
                      e.preventDefault();
                      console.log(e.target.value);
                      if (this.state.deviceType == "moistureSensor") {
                        this.setState({
                          ...this.state,
                          formMoistureSensor: {
                            ...this.state.formMoistureSensor,
                            moistureSensorId: e.target.value,
                          },
                        });
                      } else if (this.state.deviceType == "pump") {
                        this.setState({
                          ...this.state,
                          formPump: {
                            ...this.state.formPump,
                            pumpId: e.target.value,
                          },
                        });
                      }
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="deviceName2" className="my-3">
                  <Form.Label>Tên</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => {
                      e.preventDefault();
                      console.log(e.target.value);
                      if (this.state.deviceType == "moistureSensor") {
                        this.setState({
                          ...this.state,
                          formMoistureSensor: {
                            ...this.state.formMoistureSensor,
                            name: e.target.value,
                          },
                        });
                      } else if (this.state.deviceType == "pump") {
                        this.setState({
                          ...this.state,
                          formPump: {
                            ...this.state.formPump,
                            name: e.target.value,
                          },
                        });
                      }
                    }}
                  />
                </Form.Group>

                {/* <Form.Group controlId="deviceType2" className="my-3">
                  <Form.Label>Loại thiết bị</Form.Label>
                  <Form.Control
                    as="select"
                    className="mr-sm-2"
                    custom
                    disabled
                    defaultValue={this.state.deviceType}
                  >
                    <option value="">Chọn...</option>
                    <option value="moistureSensor">Cảm biến độ ẩm</option>
                    <option value="pump">Máy bơm</option>
                  </Form.Control>
                </Form.Group> */}

                <Button variant="primary" type="submit" className="my-3">
                  Lưu
                </Button>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={() =>
                  this.setState({ ...this.state, showModalUpdate: false })
                }
              >
                Huỷ
              </Button>
            </Modal.Footer>
          </Modal>

          {/* modalDelete */}
          <Modal
            show={this.state.showModalDelete}
            onHide={() =>
              this.setState({ ...this.state, showModalDelete: false })
            }
          >
            <Modal.Header closeButton>
              <Modal.Title>Xoá thiết bị</Modal.Title>
            </Modal.Header>
            <Modal.Body>Bạn có chắc chắn muốn xoá thiết bị này?</Modal.Body>
            <Modal.Footer>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  if (this.state.deviceType == "moistureSensor") {
                    this.deleteData(
                      "http://localhost:8080/api/farms/" +
                        farmJSON.id.toString() +
                        "/moistureSensors/" +
                        this.state.formMoistureSensor.id.toString()
                    );
                  } else if (this.state.deviceType == "pump") {
                    this.deleteData(
                      "http://localhost:8080/api/farms/" +
                        farmJSON.id.toString() +
                        "/pumps/" +
                        this.state.formPump.id.toString()
                    );
                  }

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

          {/* tableMoisutureSensor */}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID thiết bị</th>
                <th>Tên thiết bị</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {moistureSensorsJSON.map((moistureSensor) => (
                <tr key={moistureSensor.id}>
                  <td>{moistureSensor.moistureSensorId}</td>
                  <td>{moistureSensor.name}</td>
                  <td>
                    <Button
                      className="me-3"
                      variant="warning"
                      onClick={(e) => {
                        e.preventDefault();
                        this.setState({
                          ...this.state,
                          showModalUpdate: true,
                          formMoistureSensor: {
                            ...this.state.formMoistureSensor,
                            id: moistureSensor.id,
                          },
                          deviceType: "moistureSensor",
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
                          formMoistureSensor: {
                            ...this.state.formMoistureSensor,
                            id: moistureSensor.id,
                          },
                          deviceType: "moistureSensor",
                        });
                      }}
                    >
                      Xoá
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <h4>Máy bơm</h4>
          <Button
            className="mb-3"
            onClick={() =>
              this.setState({
                ...this.state,
                showModalAdd: true,
                formPump: { ...this.state.formPump, id: 0 },
                deviceType: "pump",
              })
            }
          >
            Thêm máy bơm
          </Button>

          {/* tablePump */}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID thiết bị</th>
                <th>Tên thiết bị</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {pumpsJSON.map((pump) => (
                <tr key={pump.id}>
                  <td>{pump.pumpId}</td>
                  <td>{pump.name}</td>
                  <td>
                    <Button
                      className="me-3"
                      variant="warning"
                      onClick={(e) => {
                        e.preventDefault();
                        this.setState({
                          ...this.state,
                          showModalUpdate: true,
                          formPump: {
                            ...this.state.formPump,
                            id: pump.id,
                          },
                          deviceType: "pump",
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
                          formPump: {
                            ...this.state.formPump,
                            id: pump.id,
                          },
                          deviceType: "pump",
                        });
                      }}
                    >
                      Xoá
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
