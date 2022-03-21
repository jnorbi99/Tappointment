import React, { useState } from "react";

import Card from "../UI/Card";
import ButtonBlock from "./ButtonBlock";
import "./Calculator.module.css";

//Operators list
const operators = ["+", "-", "*", "/"];
//Operands list
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];

const Calculator = () => {
  //Textarea value store
  const [value, setValue] = useState("");
  const [operator, setOperator] = useState({ isEntered: false, value: "" });
  const [firstOperand, setFirstOperand] = useState("");
  const [secondOperand, setSecondOperand] = useState("");

  //Fetch memo data
  const fetchMemorizedNumber = async () => {
    try {
      const response = await fetch("/api/result");

      const data = await response.json();

      console.log("Fecth");
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(async () => {
  //   const lastNumber = await fetchMemorizedNumber();
  //   setMemorizedNumber(lastNumber);
  //   console.log('UseEffect');
  // }, []);

  //ButtonClick
  const buttonClick = async (event) => {
    //Get the button value
    const pressedButton = event.target.lastChild.data;

    //Set the operator
    if (operators.includes(pressedButton) && !operator.isEntered) {
      setOperator({ isEntered: true, value: pressedButton });
      setValue((prevState) => prevState.concat(pressedButton));
    }

    //Evaluate function trigger
    if (pressedButton === "=" && firstOperand !== "" && secondOperand !== "") {
      evaluate();
    }

    //Delete textarea value
    if (pressedButton === "C") {
      setValue("");
      setOperator({ isEntered: false, value: "" });
      setFirstOperand("");
      setSecondOperand("");
    }

    //Separate the two operands
    if (numbers.includes(pressedButton) && !operator.isEntered) {
      setFirstOperand((prevState) => prevState.concat(pressedButton));
      setValue((prevState) => prevState.concat(pressedButton));
    }

    if (numbers.includes(pressedButton) && operator.isEntered) {
      setSecondOperand((prevState) => prevState.concat(pressedButton));
      setValue((prevState) => prevState.concat(pressedButton));
    }

    //Get the last memorized item via fetchMemorizedNumber
    if (pressedButton === "MR") {
      const data = await fetchMemorizedNumber();

      console.log("SetNumber");
      //Different setting
      if (!operator.isEntered) {
        setFirstOperand(data);
        setValue(data);
      } else {
        setSecondOperand(data);
        setValue((prevState) => prevState.concat(data));
      }
    }

    //Set Memory value button press
    if (pressedButton === "M+" && !operator.isEntered && value !== "") {
      postMemoryValue(value);
    }
  };

  //Post method
  async function postMemoryValue(v) {
    const item = JSON.stringify({ value: v });

    await fetch("/api/result", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: item,
    }).then((res) => console.log(res.statusText));
  }

  //Evaluate method
  const evaluate = () => {
    //Calculate the value and store it in the result variable
    const result = calculate();

    //Set the states
    setValue(result.toString());
    setFirstOperand(result.toString());
    setSecondOperand("");
    setOperator({ isEntered: false, value: "" });
  };

  const calculate = () => {
    //This code can be harmful by vscode (injection)
    //const result = eval(firstOperand + operator.value + secondOperand);

    //Parse the result to float
    let result = null;
    const firstOperandInt = parseFloat(firstOperand);
    const secondOperandInt = parseFloat(secondOperand);
    console.log(firstOperandInt);

    //Operator selector
    switch (operator.value) {
      case "+":
        result = firstOperandInt + secondOperandInt;
        break;
      case "-":
        result = firstOperandInt - secondOperandInt;
        break;
      case "*":
        result = firstOperandInt * secondOperandInt;
        break;
      case "/":
        result = firstOperandInt / secondOperandInt;
        break;
      default:
        result = null;
    }

    // .toFixed(2)
    return result;
  };

  //JSX
  return (
    <Card>
      <textarea rows="1" readOnly value={value} />
      <ButtonBlock onClick={buttonClick} />
    </Card>
  );
};

export default Calculator;
