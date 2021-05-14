import React from "react";
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
// npm install react-bootstrap bootstrap

export default class MyComponent extends React.Component {
  myprop = 19;

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

  compare(a, b) {
    if (a.warnedAt < b.last_nom) {
      return -1;
    }
    if (a.last_nom > b.last_nom) {
      return 1;
    }
    return 0;
  }

  componentDidMount() {
    let newWarnings = [];

    this.fetchJSON("http://localhost:8080/api/warnings/")
      .then((data) => {
        let warnings = data._embedded.warnings;

        warnings.forEach((warning) => {
          let newWarning = warning;
          let moistureSensorHref = newWarning._links.moistureSensor.href;
          this.fetchJSON(moistureSensorHref)
            .then((data2) => {
              let moistureSensorId = data2._links.self.href.split("/")[5];
              let moistureSensorName = data2.name;
              newWarning.moistureSensorId = moistureSensorId;
              newWarning.moistureSensorName = moistureSensorName;
              newWarnings.push(newWarning);

              this.setState({
                // isLoaded: true,
                warnings: newWarnings.sort((w1, w2) =>
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
        });
      })
      .catch((e) => {
        console.log(e);
        this.setState({
          isLoaded: true,
          e,
        });
      });

    this.setState({
      isLoaded: true,
      // warnings: newWarnings.sort((w1, w2) =>
      //   w1.warnedAt.localeCompare(w2.warnedAt)
      // ),
    });
  }

  render() {
    const { error, isLoaded, warnings, newWarnings } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Moisture sensor id</th>
              <th>Moisture sensor name</th>
              <th>Warned at</th>
              {/* <th>Repaired at</th> */}
            </tr>
          </thead>
          <tbody>
            {warnings.map((warning) => (
              <tr key={warning._links.self.href}>
                <td>{warning.moistureSensorId}</td>
                <td>{warning.moistureSensorName}</td>
                <td>{warning.warnedAt}</td>
                {/* <td>{warning.repairedAt}</td> */}
                <td>
                  <Button>Đánh dấu đã xử lý</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      );
    }
  }
}
