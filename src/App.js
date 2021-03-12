import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "0"
    };
    this.handleNumber = this.handleNumber.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.calculateExpression = this.calculateExpression.bind(this);
  }
  
  //Adds inputed Numbers to display
  handleNumber(e) {
    // If Display only shows 0 then erase 0 and show entered number
    if (this.state.display === "0") {
      this.setState({
        display: e.target.innerText
      });
    } else {
      //If display not zero add inputed text to current display
      this.setState((state, props) => ({
        display: `${this.state.display}${e.target.innerText}`
      }));
    }
  }
  
  //Triggers when addition/division/multiplicaiton/subtraction is clicked
  handleOperator(e) {
    let regex = new RegExp(/[0-9]+[\+|x|\—|\/][0-9]+/, 'gi');
    let thereAreTwoNumbers = regex.test(this.state.display);

    if (thereAreTwoNumbers) {
      this.calculateExpression()
      this.setState(state => ({
        display: state.display + e.target.innerText
      }))
    } else {
      this.setState(state => ({
        display: `${this.state.display}${e.target.innerText}`
      }))
      
    }
  }

  calculateExpression() {
    console.log('CALCULATING');
    //Splits display into an array around the operator
    let display = this.state.display.match(/\-*[0-9]+\.*[0-9]*|[|\+|\—|X|\/]|\-*[0-9]+\.*[0-9]*/gi);
    console.log(display);

    let firstNumber = Number(display[0]);
    let operator = display[1]
    let secondNumber = Number(display[2]);
    let result;

    switch(operator) {
      case '+':
        result = firstNumber + secondNumber;
        break;
      case '—':
        result = firstNumber - secondNumber;
        break;
      case 'X':
        result = firstNumber * secondNumber;
        break;
      case '/':
        result = firstNumber / secondNumber;
        break;
    }
    result = result.toFixed(2); //Round number to two decimal places

    this.setState({
      display: result
    })
  }

  //To debug
  componentDidUpdate() {
  }


  //Clears out all logic
  handleClear() {
    this.setState({
      display: "0"
    });
  }

  componentDidMount() {
    //add functionality for number buttons
    const numberButtons = document.querySelectorAll(".numberButton");
    numberButtons.forEach((button) => {
      button.addEventListener("click", this.handleNumber);
    });
    //Functionality for operator symbols(X,—,+,=)
    const operatorButtons = document.querySelectorAll(".operatorButton");
    operatorButtons.forEach((button) => {
      button.addEventListener("click", this.handleOperator);
    });
  }

  render() {
    return (
      <div className="base">
        <div className="calculatorContainer">
        <div id="display" className="display">{this.state.display}</div>
        {/*Clear*/}
        <div id="clear" className="gridItem" onClick={this.handleClear}>A/C</div>
        {/*Operator Symbols*/}
        <div id="divide" className="gridItem operatorButton">/</div>
        <div id="multiply" className="gridItem operatorButton">X</div>
        <div id="subtract" className="gridItem operatorButton">—</div>
        <div id="add" className="gridItem operatorButton">+</div>
        {/*Numbers*/}
        <div id="nine" className="gridItem numberButton">9</div>
        <div id="eight" className="gridItem numberButton">8</div>
        <div id="seven" className="gridItem numberButton">7</div>
        <div id="six" className="gridItem numberButton">6</div>
        <div id="five" className="gridItem numberButton">5</div>
        <div id="four" className="gridItem numberButton">4</div>
        <div id="three" className="gridItem numberButton">3</div>
        <div id="two" className="gridItem numberButton">2</div>
        <div id="one" className="gridItem numberButton">1</div>
        <div id="zero" className="gridItem numberButton">0</div>
        <div id="decimal" className="gridItem numberButton">.</div>
        {/*Equal Button*/}
        <div id="equals" className="gridItem" onClick={this.calculateExpression}>=</div>
        </div>
      </div>
    );
  }
}

export default App;