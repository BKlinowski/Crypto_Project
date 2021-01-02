import React from "react";

import styles from "./OptionTwoFish.module.css";

const optionTwoFish = (props) => {
  const buttonStyles = [styles.Button, props.switchMode ? styles.ButtonSuccess : styles.ButtonDanger].join(" ");

  return (
    <div className={styles.Container}>
      <label className={styles.Label} htmlFor="twofish_key">
        Key:{" "}
      </label>
      <input maxLength={16} className={styles.Input} id="twofish_key" value={props.inputValue} onChange={props.onInputChange} type="text" name="twofish_key" />
      <button onClick={props.onButtonClick} className={buttonStyles}>
        {props.switchModeText}
      </button>
    </div>
  );
};

export default optionTwoFish;
