import React from "react";

import Input from "../Input/Input";
import Output from "../Output/Output";
import Options from "../Options/Options";

import styles from "./DefaultMain.module.css";

const defaultMain = (props) => {
  return (
    <div className={styles.DefaultMain}>
      <Input onTextAreaChange={props.onTextAreaChange} areaValue={props.areaValue} max={props.max ? props.max : null} />
      <Output result={props.result} />
      <Options>{props.children}</Options>
    </div>
  );
};

export default defaultMain;
