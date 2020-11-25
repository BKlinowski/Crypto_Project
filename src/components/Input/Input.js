import React, { useContext } from "react";

import styles from "./Input.module.css";

const Input = (props) => {
  return (
    <div className={styles.Div}>
      <div className={styles.ParagraphContainer}>
        <p className={styles.Paragraph}>Input</p>
      </div>
      <textarea maxLength={props.max} onChange={props.onTextAreaChange} value={props.areaValue} className={styles.TextArea}></textarea>
    </div>
  );
};

export default Input;
