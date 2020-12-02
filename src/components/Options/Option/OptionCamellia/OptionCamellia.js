import React from "react";

import styles from "./OptionCamellia.module.css";

const optionAES = (props) => {
  const buttonStyles = [styles.Button, props.switchMode ? styles.ButtonSuccess : styles.ButtonDanger].join(" ");

  return (
    <div className={styles.Container}>
      <label className={styles.Label} htmlFor="aes_key">
        Key:{" "}
      </label>
      <input maxLength={32} className={styles.Input} id="aes_key" value={props.inputValue} onChange={props.onInputChange} type="text" name="aes_key" />
      <button onClick={props.onButtonClick} className={buttonStyles}>
        {props.switchModeText}
      </button>
    </div>
  );
};

export default optionAES;
