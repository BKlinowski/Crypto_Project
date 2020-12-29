import React from "react";

import styles from "./OptionChacha20.module.css";

const optionChacha20 = (props) => {
  const buttonStyles = [styles.Button, props.switchMode ? styles.ButtonSuccess : styles.ButtonDanger].join(" ");

  return (
    <div className={styles.Container}>
      <label className={styles.Label} htmlFor="chacha20_key">
        Key:{" "}
      </label>
      <input maxLength={32} className={styles.Input} id="chacha20_key" value={props.inputValue} onChange={props.onInputChange} type="text" name="chacha20_key" />
      
      <label className={styles.Label} htmlFor="chacha20_nonce">
        Nonce:{" "}
      </label>
      <input maxLength={12} className={styles.Input} id="chacha20_nonce" value={props.input2Value} onChange={props.onInput2Change} type="text" name="chacha20_nonce" />
      
      <button onClick={props.onButtonClick} className={buttonStyles}>
        {props.switchModeText}
      </button>
    </div>
  );
};

export default optionChacha20;
