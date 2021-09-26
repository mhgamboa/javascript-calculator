import React from "react";
import "./App.css";

import { evaluate } from "mathjs";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "0",
    };
    this.handleNumber = this.handleNumber.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.calculateExpression = this.calculateExpression.bind(this);
    this.handleKeyboard = this.handleKeyboard.bind(this);
  }

  //Adds inputed Numbers to display
  handleNumber(e) {
    let pushedButton = typeof e === "object" ? e.target.innerText : e;

    if (this.state.display === "0") {
      // If Display only shows 0 then erase 0 and show entered number
      this.setState({
        display: pushedButton,
      });
    } else if (pushedButton !== ".") {
      //If display not zero & pushed button is a number push inputed text to current display
      this.setState((state, props) => ({
        display: `${this.state.display}${pushedButton}`,
      }));
      //Functionality if Decimal is pushed
    } else if (pushedButton === ".") {
      let operatorRegex = new RegExp(/[\*|\/|\+|\-]/, "i");
      let weAreOnTheFirstNumber = !operatorRegex.test(this.state.display);

      let decimalRegex = new RegExp(/\./, "i");
      let firstNumberHasDecimal = decimalRegex.test(this.state.display);

      //If there is only one number, then only add the decimal to the display if there are no decimals
      if (weAreOnTheFirstNumber) {
        if (!firstNumberHasDecimal) {
          this.setState((state, props) => ({
            display: `${this.state.display}${pushedButton}`,
          }));
        }
        //If we're on the 2nd number check the 2nd number & see if there is a decimal & add it if needed
      } else if (!weAreOnTheFirstNumber) {
        let operatorPosition = this.state.display.match(operatorRegex).index;
        let secondNumber = this.state.display.slice(operatorPosition + 1);
        let secondNumberHasDecimal = decimalRegex.test(secondNumber);

        if (!secondNumberHasDecimal) {
          this.setState((state, props) => ({
            display: `${this.state.display}${pushedButton}`,
          }));
        }
      }
    }
  }

  //Triggers when addition/division/multiplicaiton/subtraction is clicked
  handleOperator(e) {
    let pushedButton = typeof e === "object" ? e.target.innerText : e;

    let operationDoneReg = new RegExp(
      /^-*[0-9]*\.*[0-9]*[\+|\-|\/|\*|]-*[0-9]*\.*[0-9]*$/,
      "gi"
    );
    let operationIsCompleted = operationDoneReg.test(this.state.display);

    let oneNumberNoSymbolsReg = new RegExp(/^-*[0-9]*\.*[0-9]*$/, "gi");
    let oneNumberNoSymbol = oneNumberNoSymbolsReg.test(this.state.display);

    let oneNumOneSymReg = new RegExp(/^-*[0-9]*\.*[0-9]*[\+|\-|\/|\*|]$/, "gi");
    let oneNumberOneSymbol = oneNumOneSymReg.test(this.state.display);

    let oneNum2SymReg = new RegExp(/^-*[0-9]*\.*[0-9]*[\+|\-|\/|\*|]-$/, "gi");
    let oneNumberTwoSymbols = oneNum2SymReg.test(this.state.display);

    if (oneNumberNoSymbol) {
      this.setState((state) => ({
        display: `${this.state.display}${pushedButton}`,
      }));
    }

    if (oneNumberOneSymbol) {
      if (pushedButton === "-") {
        this.setState((state) => ({
          display: `${this.state.display}${pushedButton}`,
        }));
      } else {
        let newDisplay = this.state.display.slice(0, -1);
        this.setState((state) => ({
          display: `${newDisplay}${pushedButton}`,
        }));
      }
    } else if (oneNumberTwoSymbols) {
      let newDisplay = this.state.display.slice(0, -2);
      this.setState((state) => ({
        display: `${newDisplay}${pushedButton}`,
      }));
    } else if (operationIsCompleted) {
      this.calculateExpression();
      this.setState((state) => ({
        display: state.display + pushedButton,
      }));
    }
  }

  calculateExpression() {
    let result = evaluate(this.state.display);
    this.setState({
      display: result,
    });
  }

  //Clears out all logic
  handleClear() {
    this.setState({
      display: "0",
    });
  }

  handleKeyboard(e) {
    let numbersArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    let operationArray = ["/", "*", "-", "+"];
    if (numbersArray.includes(e.key)) {
      this.handleNumber(e.key);
    }
    if (operationArray.includes(e.key)) {
      this.handleOperator(e.key);
    }
    if (e.key === "Enter" || e.key === "=") {
      this.calculateExpression();
    }
    if (e.key === "Escape") {
      this.handleClear();
    }
  }

  componentDidMount() {
    //add functionality for number buttons
    const numberButtons = document.querySelectorAll(".numberButton");
    numberButtons.forEach((button) => {
      button.addEventListener("click", this.handleNumber);
    });
    //Add functionality for operator symbols(\*,-,+,=)
    const operatorButtons = document.querySelectorAll(".operatorButton");
    operatorButtons.forEach((button) => {
      button.addEventListener("click", this.handleOperator);
    });
    // Add functionality for keyboard presses
    document.addEventListener("keyup", this.handleKeyboard);
  }

  componentWillUnmount() {
    //Remove functionality for number buttons
    const numberButtons = document.querySelectorAll(".numberButton");
    numberButtons.forEach((button) => {
      button.removeEventListener("click", this.handleNumber);
    });
    //Remove functionality for operator symbols(\*,-,+,=)
    const operatorButtons = document.querySelectorAll(".operatorButton");
    operatorButtons.forEach((button) => {
      button.removeEventListener("click", this.handleOperator);
    });

    document.removeEventListener("keyup", this.handleKeyboard);
  }

  render() {
    return (
      <div className="base">
        <div className="calculatorContainer">
          <div id="display" className="display">
            {this.state.display}
          </div>
          {/*Clear*/}
          <div id="clear" className="gridItem" onClick={this.handleClear}>
            A/C
          </div>
          {/*Operator Symbols*/}
          <div id="divide" className="gridItem operatorButton">
            /
          </div>
          <div id="multiply" className="gridItem operatorButton">
            *
          </div>
          <div id="subtract" className="gridItem operatorButton">
            -
          </div>
          <div id="add" className="gridItem operatorButton">
            +
          </div>
          {/*Numbers*/}
          <div id="nine" className="gridItem numberButton">
            9
          </div>
          <div id="eight" className="gridItem numberButton">
            8
          </div>
          <div id="seven" className="gridItem numberButton">
            7
          </div>
          <div id="six" className="gridItem numberButton">
            6
          </div>
          <div id="five" className="gridItem numberButton">
            5
          </div>
          <div id="four" className="gridItem numberButton">
            4
          </div>
          <div id="three" className="gridItem numberButton">
            3
          </div>
          <div id="two" className="gridItem numberButton">
            2
          </div>
          <div id="one" className="gridItem numberButton">
            1
          </div>
          <div id="zero" className="gridItem numberButton">
            0
          </div>
          <div id="decimal" className="gridItem numberButton">
            .
          </div>
          {/*Equal Button*/}
          <div
            id="equals"
            className="gridItem"
            onClick={this.calculateExpression}
          >
            =
          </div>
        </div>
      </div>
    );
  }
}

export default App;
