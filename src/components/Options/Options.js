import React from "react";

import styles from "./Options.module.css";

const options = (props) => {
  return (
    <div className={styles.Div}>
      <div className={styles.ParagraphContainer}>
        <p className={styles.Paragraph}>Options</p>
      </div>
      <div className={styles.Option}>{props.children}</div>
    </div>
  );
};

export default options;
