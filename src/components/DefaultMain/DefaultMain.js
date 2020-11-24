import React from "react";

import Input from "../Input/Input";
import Output from "../Output/Output";
import Options from "../Options/Options";

import styles from "./DefaultMain.module.css";

const defaultMain = (props) => {
  return (
    <div className={styles.DefaultMain}>
      <Input />
      <Output />
      <Options>{props.children}</Options>
    </div>
  );
};

export default defaultMain;
