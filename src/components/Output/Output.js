import React from "react";

import styles from "./Output.module.css";

const output = (props) => {
  return (
    <div className={styles.Div}>
      <div className={styles.ParagraphContainer}>
        <p className={styles.Paragraph}>Output</p>
      </div>
      <textarea readOnly className={styles.TextArea}></textarea>
    </div>
  );
};

export default output;
