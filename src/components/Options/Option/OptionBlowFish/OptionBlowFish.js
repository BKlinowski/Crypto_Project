import React from "react";

import styles from "./OptionBlowFish.module.css";

const optionBlowFish = (props) => {
  const buttonStyles = [styles.Button, props.switchMode ? styles.ButtonSuccess : styles.ButtonDanger].join(" ");

  return (
    <div className={styles.Container}>
      <label className={styles.Label} htmlFor="blowfish_key">
        Key:{" "}
      </label>
      <input maxLength={16} className={styles.Input} id="blowfish_key" value={props.inputValue} onChange={props.onInputChange} type="text" name="blowfish_key" />
      <button onClick={props.onButtonClick} className={buttonStyles}>
        {props.switchModeText}
      </button>
    </div>
  );
};

export default optionBlowFish;
