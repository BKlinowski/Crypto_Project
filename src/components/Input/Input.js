import React from "react";
import classes from "./Input.module.css";

import styles from "./Input.module.css";

const input = (props) => {
  return (
    <div className={styles.Div}>
      <div className={styles.ParagraphContainer}>
        <p className={styles.Paragraph}>Input</p>
      </div>
      <textarea className={styles.TextArea}></textarea>
    </div>
  );
};

export default input;
