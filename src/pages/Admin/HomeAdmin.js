import React from "react";

// export default function HomeAdmin() {
//     return (
//         <div>
//             Home Admin
//         </div>
//     )
// }

// function Square(props) {
//   return (
//     <button className="square" onClick={props.onClick}>
//       {props.value}
//     </button>
//   );
// }

// class Board extends React.Component {
//   renderSquare(i) {
//     return (
//       <Square
//         value={this.props.squares[i]}
//         onClick={() => this.props.onClick(i)}
//       />
//     );
//   }

//   render() {
//     return (
//       <div>
//         <div className="board-row">
//           {this.renderSquare(0)}
//           {this.renderSquare(1)}
//           {this.renderSquare(2)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(3)}
//           {this.renderSquare(4)}
//           {this.renderSquare(5)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(6)}
//           {this.renderSquare(7)}
//           {this.renderSquare(8)}
//         </div>
//       </div>
//     );
//   }
// }

// export default class Game extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       history: [
//         {
//           squares: Array(9).fill(null)
//         }
//       ],
//       stepNumber: 0,
//       xIsNext: true
//     };
//   }

//   handleClick(i) {
//     const history = this.state.history.slice(0, this.state.stepNumber + 1);
//     const current = history[history.length - 1];
//     const squares = current.squares.slice();
//     if (calculateWinner(squares) || squares[i]) {
//       return;
//     }
//     squares[i] = this.state.xIsNext ? "X" : "O";
//     this.setState({
//       history: history.concat([
//         {
//           squares: squares
//         }
//       ]),
//       stepNumber: history.length,
//       xIsNext: !this.state.xIsNext
//     });
//   }

//   jumpTo(step) {
//     this.setState({
//       stepNumber: step,
//       xIsNext: (step % 2) === 0
//     });
//   }

//   render() {
//     const history = this.state.history;
//     const current = history[this.state.stepNumber];
//     const winner = calculateWinner(current.squares);

//     const moves = history.map((step, move) => {
//       const desc = move ?
//         'Go to move #' + move :
//         'Go to game start';
//       return (
//         <li key={move}>
//           <button onClick={() => this.jumpTo(move)}>{desc}</button>
//         </li>
//       );
//     });

//     let status;
//     if (winner) {
//       status = "Winner: " + winner;
//     } else {
//       status = "Next player: " + (this.state.xIsNext ? "X" : "O");
//     }

//     return (
//       <div className="game">
//         <div className="game-board">
//           <Board
//             squares={current.squares}
//             onClick={i => this.handleClick(i)}
//           />
//         </div>
//         <div className="game-info">
//           <div>{status}</div>
//           <ol>{moves}</ol>
//         </div>
//       </div>
//     );
//   }
// }

// function calculateWinner(squares) {
//   const lines = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6]
//   ];
//   for (let i = 0; i < lines.length; i++) {
//     const [a, b, c] = lines[i];
//     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//       return squares[a];
//     }
//   }
//   return null;
// }

export default class MyComponent extends React.Component {
  myprop = 1;

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      warnings: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:8080/api/warnings/")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            warnings: result._embedded.warnings,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  getMoistureSensorId(warning) {
    let moistureSensorHref = warning._links.moistureSensor.href;
    fetch(moistureSensorHref)
      .then((res) => res.json())
      .then(
        (result) => {
          let moistureSensorId = result._links.self.href.split("/")[5];
          this.myprop = moistureSensorId;
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          // show error
          console.log("fetch error");
        }
      );
  }

  render() {
    const { error, isLoaded, warnings } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      this.getMoistureSensorId(warnings[0]);

      return (
        <table>
          <thead>
            <tr>
              <th>Moisture sensor id</th>
              <th>Warned at</th>
              <th>Repaired at</th>
            </tr>
          </thead>
          <tbody>
            {warnings.map((warning) => (
              <tr key={warning._links.self.href}>
                <td>{this.myprop}</td>
                <td>{warning.warnedAt}</td>
                <td>{warning.repairedAt}</td>
                <td>
                  <button>Đánh dấu đã xử lý</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        // <ul>
        //   {warnings.map(warning => (
        //     <li key={warning._links.self.href}>
        //       {warning.warnedAt} {warning.repairedAt}
        //     </li>
        //   ))}
        // </ul>
      );
    }
  }
}
