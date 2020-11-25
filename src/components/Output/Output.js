import React, { useContext } from "react";

import styles from "./Output.module.css";

const Output = (props) => {
  return (
    <div className={styles.Div}>
      <div className={styles.ParagraphContainer}>
        <p className={styles.Paragraph}>Output</p>
      </div>
      <textarea value={props.result} readOnly className={styles.TextArea}></textarea>
    </div>
  );
};

export default Output;
