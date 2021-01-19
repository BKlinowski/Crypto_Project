import React from "react";

import styles from "./OptionRsa.module.css";

const optionRSA = (props) => {
  const buttonStyles = [styles.Button, props.switchMode ? styles.ButtonSuccess : styles.ButtonDanger].join(" ");

  return (
    <div className={styles.Container}>
      <label className={styles.Label} htmlFor="rsa_key">
        Key:{" "}
      </label>

      <div>
        <input className={(styles.InputKeySize, styles.Input)} value={props.keyLenValue} onChange={props.onKeyLenValueChange} type="text" />
        <button onClick={props.onKeyGenClick} className={styles.InputButton}>
          Generate new keypair
        </button>
      </div>

      <br />
      <textarea className={styles.Area} id="rsa_key" rows="5" value={props.inputValue} onChange={props.onInputChange} type="text" name="rsa_key" />
      <button onClick={props.onButtonClick} className={buttonStyles}>
        {props.switchModeText}
      </button>
    </div>
  );
};

export default optionRSA;
