import React from "react";
import styles from "./NavigationSubitem.module.css";

const navigationSubitem = (props) => {
  return (
    <div className={styles.NavigationSubitem}>
      <p className={styles.Text}>{props.text}</p>
    </div>
  );
};

export default navigationSubitem;
