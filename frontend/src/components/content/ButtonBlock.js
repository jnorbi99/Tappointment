import React from "react";

import Button from "../UI/Button";
import classes from "./ButtonBlock.module.css";

const btnValues = [
  ["C", "M+", "MR", "/"],
  [7, 8, 9, "*"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

const ButtonBlock = (props) => {
  return (
    <div className={classes.block}>
      {btnValues.flat().map((btn, i) => {
        return (
          <Button
            key={i}
            className={btn === "=" ? classes.equal : ""}
            value={btn}
            onClick={props.onClick}
          >
            {btn}
          </Button>
        );
      })}
    </div>
  );
};

export default ButtonBlock;
