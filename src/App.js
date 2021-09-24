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
  }

  //Adds inputed Numbers to display
  handleNumber(e) {
    let pushedButton = e.target.innerText;

    if (this.state.display === "0") {
      // If Display only shows 0 then erase 0 and show entered number
      this.setState({
        display: pushedButton,
      });
    } else if (pushedButton != ".") {
      //If display not zero & pushed button is a number push inputed text to current display
      this.setState((state, props) => ({
        display: `${this.state.display}${e.target.innerText}`,
      }));
      //Functionality if Decimal is pushed
    } else if (pushedButton == ".") {
      let operatorRegex = new RegExp(/[\*|\/|\+|\-]/, "i");
      let weAreOnTheFirstNumber = !operatorRegex.test(this.state.display);

      let decimalRegex = new RegExp(/\./, "i");
      let firstNumberHasDecimal = decimalRegex.test(this.state.display);

      //If there is only one number, then only add the decimal to the display if there are no decimals
      if (weAreOnTheFirstNumber) {
        if (!firstNumberHasDecimal) {
          this.setState((state, props) => ({
            display: `${this.state.display}${e.target.innerText}`,
          }));
        }
        //If we're on the 2nd number check the 2nd number & see if there is a decimal & add it if needed
      } else if (!weAreOnTheFirstNumber) {
        let operatorPosition = this.state.display.match(operatorRegex).index;
        let secondNumber = this.state.display.slice(operatorPosition + 1);
        let secondNumberHasDecimal = decimalRegex.test(secondNumber);

        if (!secondNumberHasDecimal) {
          this.setState((state, props) => ({
            display: `${this.state.display}${e.target.innerText}`,
          }));
        }
      }
    }
  }

  //Triggers when addition/division/multiplicaiton/subtraction is clicked
  handleOperator(e) {
    let pushedButton = e.target.innerText;

    let regex = new RegExp(/[0-9]+[\+|\*|\-|\/][0-9]+/, "gi");
    let thereAreTwoNumbers = regex.test(this.state.display);

    let operatorRegex = new RegExp(/[\*|\/|\+|\-]/, "i");
    let thereIsAlreadyAnOperator = operatorRegex.test(this.state.display);

    let twoOperatorsRegex = new RegExp(/[\*|\/|\+|\-]\-/, "i");
    let thereAreTwoOperators = twoOperatorsRegex.test(this.state.display);

    let firstNumberNegativeRegex = new RegExp(/^\-/);
    let firstNumberIsNegative = firstNumberNegativeRegex.test(
      this.state.display
    );

    if (thereAreTwoNumbers) {
      this.calculateExpression();
      this.setState((state) => ({
        display: state.display + pushedButton,
      }));
    }
    if (!thereAreTwoNumbers && !thereIsAlreadyAnOperator) {
      this.setState((state) => ({
        display: `${this.state.display}${pushedButton}`,
      }));
      //Handle operation type if two operations pushed consecutively
    }
    if (!thereAreTwoNumbers && thereIsAlreadyAnOperator) {
      if (firstNumberIsNegative) {
        this.setState((state) => ({
          display: `${this.state.display}${pushedButton}`,
        }));
      }
      //Functionality if '-' is pressed
      if (pushedButton === "-") {
        //If there's only one operator add the '-' which will make the number negative
        if (!thereAreTwoOperators) {
          this.setState((state) => ({
            display: `${this.state.display}${pushedButton}`,
          }));
        }
      } else if (thereAreTwoOperators) {
        //If any other operator symbol is pressed replace the two existing operators
        let newDisplay = this.state.display.slice(0, -2);
        this.setState((state) => ({
          display: `${newDisplay}${pushedButton}`,
        }));
      }
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
