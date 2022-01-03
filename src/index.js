import React from 'react';
import ReactDOM from 'react-dom';
import {Title, Signature} from './title.js';
import './index.css';
import winGif from './media/fireworks.gif';
import tieJPG from './media/tie.jpg';

function ResetObj(props) {
  return (
    <button className="reset" onClick={props.onClick}>
      {'reset'}
    </button>
  )
}

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}
         style={{color: props.value === 'X' ? '#8aeeb7' : '#ee8a8a'}}> 
          {props.value}
        </button>
    );
}

class Board extends React.Component {

  renderSquare(i) {
    return (
        <Square
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
        />
    );  // ^ example for event handler
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
}

handleRestartClick() {
  this.setState(() => ({
    history: [{
      squares: Array(9).fill(null),
    }],
    stepNumber: 0,
    xIsNext: true,
  }));
}

handleSquareClick(i) {
  const history = this.state.history.slice(0, this.state.stepNumber + 1);
  const current = history[history.length - 1];
  const squares = current.squares.slice();
  
  console.log('click ' + i);

  if(calculateWinner(squares) || squares[i]) {
    return;
  }

  squares[i] = this.state.xIsNext ? 'X' : 'O';
  this.setState({
    history: history.concat([{
      squares: squares,
    }]),
    stepNumber: history.length,
    xIsNext: !this.state.xIsNext,
  });
}
  
jumpTo(step) {
  this.setState({
    stepNumber : step,
    xIsNext: (step % 2) === 0,
  });
}

render() {
  const history = this.state.history;
  const current = history[this.state.stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = history.map((step, move) => {
    const desc = move ?
      'Go to move #' + move :
      'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => this.jumpTo(move)}>{desc}</button>
      </li>
    );
  });
  
  let status;
  let tie = this.state.stepNumber > 8;
  var finImg;

  if(winner) {
    status = 'Winner: ' + winner;
    finImg = winGif;
  } else if(tie) {
    status = 'It\'s a TIE!';  
    finImg = tieJPG;
  } else {
    status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    finImg = null;
    console.log(this.state.stepNumber);
  }

  return (
    <div className="game-page">
      <div className="game-header">
        <Title/>
        <img className="game-finish" 
              src={finImg} 
              alt={""}/>
      </div>
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleSquareClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
        <div className="game-footer">
          <ResetObj
            onClick={() => this.handleRestartClick()}
          />
          <Signature/>
        </div>
      </div>
    </div>
  );
}
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  
  for (let i of lines) {
    const [a, b, c] = i;
    
    if(squares[a] && squares[a] === squares[b] && squares[b] === squares[c])
    {
      return squares[a];
    }
  }
  
  return null; 
}