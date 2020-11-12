import React from "react";
import styles from "./NavigationItem.module.css";

const navigationItem = (props) => {
  return (
    <div className={styles.NavigationItem}>
      <p className={styles.Text}>{props.text}</p>
    </div>
  );
};

export default navigationItem;
