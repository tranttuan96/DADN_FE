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
      formMoistureSensor: { id: "", name: "" },
      formPump: { id: "", name: "" },
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

    alert("Th??m thi???t b??? th??nh c??ng!");

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

    alert("C???p nh???t thi???t b??? th??nh c??ng!");

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

    alert("Xo?? thi???t b??? th??nh c??ng!");

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
                <h2>Th??ng tin n??ng tr???i</h2>
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
                <b>T??n:</b>
              </Col>
              <Col xs="5" sm="4" md="3" lg="2">
                {farmJSON.name}
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col xs="5" sm="4" md="3" lg="2">
                <b>V??? tr??:</b>
              </Col>
              <Col xs="5" sm="4" md="3" lg="2">
                {farmJSON.location}
              </Col>
            </Row>
          </Row>
          <hr></hr>
          <Row className="justify-content-center mb-3">
            <Col xs="10" sm="8" md="6" lg="4">
              <h3>Thi???t b??? trong n??ng tr???i</h3>
            </Col>
          </Row>
          <h4>C???m bi???n ????? ???m</h4>
          <Button
            className="mb-3"
            onClick={() =>
              this.setState({
                ...this.state,
                showModalAdd: true,
                deviceType: "moistureSensor",
              })
            }
          >
            Th??m c???m bi???n ????? ???m
          </Button>

          {/* modalAdd */}
          <Modal
            show={this.state.showModalAdd}
            onHide={() => this.setState({ ...this.state, showModalAdd: false, formMoistureSensor: {}, formPump: {} })}
          >
            <Modal.Header closeButton>
              <Modal.Title>Th??m thi???t b???</Modal.Title>
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

                  this.setState({ ...this.state, showModalAdd: false, formMoistureSensor: {}, formPump: {} });
                }}
              >
                <Form.Group controlId="deviceId1" className="my-3">
                  <Form.Label>ID thi???t b???</Form.Label>
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
                            id: e.target.value,
                          },
                        });
                      } else if (this.state.deviceType == "pump") {
                        this.setState({
                          ...this.state,
                          formPump: {
                            ...this.state.formPump,
                            id: e.target.value,
                          },
                        });
                      }
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="deviceName1" className="my-3">
                  <Form.Label>T??n</Form.Label>
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
                  <Form.Label>Lo???i thi???t b???</Form.Label>
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
                    <option value="">Ch???n...</option>
                    <option value="moistureSensor">C???m bi???n ????? ???m</option>
                    <option value="pump">M??y b??m</option>
                  </Form.Control>
                </Form.Group> */}

                <Button variant="primary" type="submit" className="my-3">
                  L??u
                </Button>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={() =>
                  this.setState({ ...this.state, showModalAdd: false, formMoistureSensor: {}, formPump: {} })
                }
              >
                Hu???
              </Button>
            </Modal.Footer>
          </Modal>

          {/* modalUpdate */}
          <Modal
            show={this.state.showModalUpdate}
            onHide={() =>
              this.setState({ ...this.state, showModalUpdate: false, formMoistureSensor: {}, formPump: {} })
            }
          >
            <Modal.Header closeButton>
              <Modal.Title>C???p nh???t thi???t b???</Modal.Title>
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

                  this.setState({ ...this.state, showModalUpdate: false, formMoistureSensor: {}, formPump: {} });
                }}
              >
                <Form.Group controlId="deviceId2" className="my-3">
                  <Form.Label>ID thi???t b???</Form.Label>
                  <Form.Control
                    type="text"
										disabled
										defaultValue={this.state.deviceType == "moistureSensor" ? this.state.formMoistureSensor.id : this.state.formPump.id}
                  />
                </Form.Group>

                <Form.Group controlId="deviceName2" className="my-3">
                  <Form.Label>T??n</Form.Label>
                  <Form.Control
                    type="text"
										defaultValue={this.state.deviceType == "moistureSensor" ? this.state.formMoistureSensor.name : this.state.formPump.name}
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
                  <Form.Label>Lo???i thi???t b???</Form.Label>
                  <Form.Control
                    as="select"
                    className="mr-sm-2"
                    custom
                    disabled
                    defaultValue={this.state.deviceType}
                  >
                    <option value="">Ch???n...</option>
                    <option value="moistureSensor">C???m bi???n ????? ???m</option>
                    <option value="pump">M??y b??m</option>
                  </Form.Control>
                </Form.Group> */}

                <Button variant="primary" type="submit" className="my-3">
                  L??u
                </Button>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={() =>
                  this.setState({ ...this.state, showModalUpdate: false, formMoistureSensor: {}, formPump: {} })
                }
              >
                Hu???
              </Button>
            </Modal.Footer>
          </Modal>

          {/* modalDelete */}
          <Modal
            show={this.state.showModalDelete}
            onHide={() =>
              this.setState({ ...this.state, showModalDelete: false, formMoistureSensor: {}, formPump: {} })
            }
          >
            <Modal.Header closeButton>
              <Modal.Title>Xo?? thi???t b???</Modal.Title>
            </Modal.Header>
            <Modal.Body>B???n c?? ch???c ch???n mu???n xo?? thi???t b??? n??y?</Modal.Body>
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

                  this.setState({ ...this.state, showModalDelete: false, formMoistureSensor: {}, formPump: {} });
                }}
              >
                Ch???c ch???n
              </Button>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  this.setState({ ...this.state, showModalDelete: false, formMoistureSensor: {}, formPump: {} });
                }}
              >
                Kh??ng
              </Button>
            </Modal.Footer>
          </Modal>

          {/* tableMoisutureSensor */}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID thi???t b???</th>
                <th>T??n thi???t b???</th>
                <th>H??nh ?????ng</th>
              </tr>
            </thead>
            <tbody>
              {moistureSensorsJSON.map((moistureSensor) => (
                <tr key={moistureSensor.id}>
                  <td>{moistureSensor.id}</td>
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
														name: moistureSensor.name,
                          },
                          deviceType: "moistureSensor",
                        });
                      }}
                    >
                      C???p nh???t
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
                      Xo??
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <h4>M??y b??m</h4>
          <Button
            className="mb-3"
            onClick={() =>
              this.setState({
                ...this.state,
                showModalAdd: true,
                deviceType: "pump",
              })
            }
          >
            Th??m m??y b??m
          </Button>

          {/* tablePump */}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID thi???t b???</th>
                <th>T??n thi???t b???</th>
                <th>H??nh ?????ng</th>
              </tr>
            </thead>
            <tbody>
              {pumpsJSON.map((pump) => (
                <tr key={pump.id}>
                  <td>{pump.id}</td>
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
														name: pump.name,
                          },
                          deviceType: "pump",
                        });
                      }}
                    >
                      C???p nh???t
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
                      Xo??
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
