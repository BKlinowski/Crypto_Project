import React, { useState, useEffect } from "react";

import DefaultMain from "../../../components/DefaultMain/DefaultMain";
import OptionAES from "../../../components/Options/Option/OptionAES/OptionAES";

import aesFunction from "../../../scripts/aes";

const AES = (props) => {
  const [areaValue, setAreaValue] = useState("");
  const [aesResult, setAESResult] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [switchMode, setSwitchMode] = useState(true);
  const [buttonText, setButtonText] = useState("Current: encryption");
  const [areaMaxVal, setAreaMaxVal] = useState(16);
  // const [encTimeout, setEncTimeout] = useState(null);

  useEffect(() => {
    if (inputValue.length !== 16) {
      setAESResult("Key must be 16 characters length!");
    } else {
      if (switchMode) {
        try {
          setAESResult(aesFunction.encrypt(areaValue, inputValue));
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          setAESResult(
            aesFunction.decrypt(
              areaValue
                .split(",")
                .map((char) => +char)
                .flat(),
              inputValue
            )
          );
        } catch (err) {
          console.log(err);
        }
      }
    }
  }, [areaValue, inputValue]);

  const onTextAreaChange = (event) => {
    setAreaValue(event.target.value);
  };

  const onInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const onButtonClick = () => {
    if (!switchMode) {
      setAreaMaxVal(16);
      setAreaValue("");
      setAESResult("");
      setButtonText("Current: encryption");
    } else {
      setAreaMaxVal(64);
      setAreaValue("");
      setAESResult("");
      setButtonText("Current: decryption");
    }
    setSwitchMode(!switchMode);
  };

  return (
    <DefaultMain max={areaMaxVal} onTextAreaChange={onTextAreaChange} areaValue={areaValue} result={aesResult}>
      <OptionAES switchMode={switchMode} switchModeText={buttonText} inputValue={inputValue} onInputChange={onInputChange} onButtonClick={onButtonClick} />
    </DefaultMain>
  );
};

export default AES;
