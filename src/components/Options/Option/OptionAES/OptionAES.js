import React from "react";

import styles from "./OptionAes.module.css";

const optionAES = (props) => {
  const buttonStyles = [styles.Button, props.switchMode ? styles.ButtonSuccess : styles.ButtonDanger].join(" ");

  const ivInput = (
    <>
      <label className={styles.Label} htmlFor="iv_key">
        IV:{" "}
      </label>
      <input maxLength={8} className={styles.Input} id="iv_key" value={props.nonceValue} onChange={props.onNonceChange} type="text" name="nonce_key" />
    </>
  );

  const nonceInput = (
    <>
      <label className={styles.Label} htmlFor="nonce_key">
        Nonce:{" "}
      </label>
      <input maxLength={8} className={styles.Input} id="nonce_key" value={props.nonceValue} onChange={props.onNonceChange} type="text" name="nonce_key" />
    </>
  );

  console.log(props.nonceMode);

  return (
    <div className={styles.Container}>
      <label className={styles.Label} htmlFor="aes_key">
        Key:{" "}
      </label>
      <input maxLength={16} className={styles.Input} id="aes_key" value={props.inputValue} onChange={props.onInputChange} type="text" name="aes_key" />

      {props.nonceMode === "IV" ? ivInput : props.nonceMode === "nonce" ? nonceInput : null}
      <label className={styles.Label} htmlFor="select">
        Tryb:{" "}
      </label>
      <select name="select" className={styles.Select} onChange={props.onModeChange} value={props.modeValue}>
        <option>ECB</option>
        <option>CBC</option>
        <option>CFB</option>
        <option>OFB</option>
        <option>CTR</option>
      </select>
      <button onClick={props.onButtonClick} className={buttonStyles}>
        {props.switchModeText}
      </button>
    </div>
  );
};

export default optionAES;
