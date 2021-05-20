import React from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import moment from "moment";
// npm install react-bootstrap bootstrap
// npm install moment

export default class MyComponent extends React.Component {
  interval = null;

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      warnings: [],
    };
  }

  // componentDidMount() {
  //   fetch("http://localhost:8080/api/warnings/")
  //     .then((res) => res.json())
  //     .then(
  //       (result) => {
  //         this.setState({
  //           isLoaded: true,
  //           warnings: result._embedded.warnings,
  //         });
  //       },
  //       // Note: it's important to handle errors here
  //       // instead of a catch() block so that we don't swallow
  //       // exceptions from actual bugs in components.
  //       (error) => {
  //         this.setState({
  //           isLoaded: true,
  //           error,
  //         });
  //       }
  //     );
  // }

  async fetchJSON(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
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
    return response2;
  }

  componentDidMount() {
    // let newWarnings = [];

    // this.fetchJSON("http://localhost:8080/api/warnings/")
    //   .then((data) => {
    //     let warnings = data._embedded.warnings;

    //     warnings.forEach((warning) => {
    //       let newWarning = warning;
    //       let moistureSensorHref = newWarning._links.moistureSensor.href;
    //       this.fetchJSON(moistureSensorHref)
    //         .then((data2) => {
    //           let moistureSensorId = data2._links.self.href.split("/")[5];
    //           let moistureSensorName = data2.name;
    //           newWarning.moistureSensorId = moistureSensorId;
    //           newWarning.moistureSensorName = moistureSensorName;
    //           newWarnings.push(newWarning);

    //           this.setState({
    //             // isLoaded: true,
    //             warnings: newWarnings.sort((w1, w2) =>
    //               w1.warnedAt.localeCompare(w2.warnedAt)
    //             ),
    //           });
    //         })
    //         .catch((e) => {
    //           console.log(e);
    //           this.setState({
    //             isLoaded: true,
    //             e,
    //           });
    //         });
    //     });

    //     // this.interval = setInterval(this.fetchJSON.bind(this), 2000);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //     this.setState({
    //       isLoaded: true,
    //       e,
    //     });
    //   });

    this.intervalId = setInterval(() => {
      this.fetchJSON("http://localhost:8080/api/warnings/notRepairedWarnings")
        .then((data) => {
          this.setState({
            isLoaded: true,
            warnings: data.sort((w1, w2) =>
              w1.warnedAt.localeCompare(w2.warnedAt)
            ),
          });
        })
        .catch((e) => {
          console.log(e);
          this.setState({
            isLoaded: true,
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
    const { error, isLoaded, warnings } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <Container className="my-5">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên</th>
                <th>Cảnh báo lúc</th>
                {/* <th>Repaired at</th> */}
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {warnings.map((warning) => (
                <tr key={warning.id}>
                  <td>{warning.moistureSensor.id}</td>
                  <td>{warning.moistureSensor.name}</td>
                  <td>{warning.warnedAt}</td>
                  {/* <td>{warning.repairedAt}</td> */}
                  <td>
                    <Button
                      onClick={() => {
                        this.putData(
                          "http://localhost:8080/api/warnings/" + warning.id,
                          {
                            repairedAt: moment().format("HH:mm:ss D/MM/yyyy"),
                          }
                        );
                        alert("Đã xử lý!");
                      }}
                    >
                      Đánh dấu đã xử lý
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
