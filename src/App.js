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
    let decimalRegex = new RegExp(/\./, 'gi');
    let regex = new RegExp(/[0-9]+[\+|x|\—|\/][0-9]+/, 'gi');
    let operatorRegex = new RegExp(/[X|\/|\+|\—]/, 'i')
    let pushedButton = e.target.innerText;
    
    if (this.state.display === "0") {
      // If Display only shows 0 then erase 0 and show entered number
      this.setState({
        display: pushedButton
      });
    } else if (pushedButton != '.') {
      //If display not zero & pushed button is a number add inputed text to current display
      this.setState((state, props) => ({
        display: `${this.state.display}${e.target.innerText}`
      }));
    } else if (pushedButton == '.') {
      
    }
  }
  

  //Triggers when addition/division/multiplicaiton/subtraction is clicked
  handleOperator(e) {
    let regex = new RegExp(/[0-9]+[\+|x|\—|\/][0-9]+/, 'gi');
    let operatorRegex = new RegExp(/[X|\/|\+|\—]/, 'i')
    let thereAreTwoNumbers = regex.test(this.state.display);
    let thereIsAlreadyAnOperator = operatorRegex.test(this.state.display);

    if (thereAreTwoNumbers) {
      this.calculateExpression()
      this.setState(state => ({
        display: state.display + e.target.innerText
      }))
    } if (!thereAreTwoNumbers && !thereIsAlreadyAnOperator) {
      this.setState(state => ({
        display: `${this.state.display}${e.target.innerText}`
      })) 
      //Change operation type if two operations pushed consecutively
    } if (!thereAreTwoNumbers && thereIsAlreadyAnOperator) {
      let newDisplay = this.state.display.slice(0, -1);
      this.setState(state => ({
        display: `${newDisplay}${e.target.innerText}`
      })) 
    }
  }

  calculateExpression() {
    //Splits display into an array [numberOne, operator, numberTwo]
    let display = this.state.display.match(/\-*[0-9]+\.*[0-9]*|[|\+|\—|X|\/]|\-*[0-9]+\.*[0-9]*/gi);

    let firstNumber = Number(display[0]);
    let operator = display[1]
    let secondNumber = Number(display[2]);
    let result;

    //Bassed on the Operator calculate the function
    switch(operator) {
      case '+':
        result = (firstNumber + secondNumber);
        break;
      case '—':
        result = (firstNumber - secondNumber);
        break;
      case 'X':
        result = (firstNumber * secondNumber);
        break;
      case '/':
        result = (firstNumber / secondNumber);
        break;
      default:
        result = this.state.display;
        break;
    }

    this.setState({
      display: result
    })
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
    //Add functionality for operator symbols(X,—,+,=)
    const operatorButtons = document.querySelectorAll(".operatorButton");
    operatorButtons.forEach((button) => {
      button.addEventListener("click", this.handleOperator);
    });
  }

  componentWillUnmount() {
    //Remove functionality for number buttons
    const numberButtons = document.querySelectorAll(".numberButton");
    numberButtons.forEach((button) => {
      button.removeEventListener("click", this.handleNumber);
    });
    //Remove functionality for operator symbols(X,—,+,=)
    const operatorButtons = document.querySelectorAll(".operatorButton");
    operatorButtons.forEach((button) => {
      button.removeEventListener("click", this.handleOperator);
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
