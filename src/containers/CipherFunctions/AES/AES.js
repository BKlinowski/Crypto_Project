import React, { useState, useEffect } from "react";

import DefaultMain from "../../../components/DefaultMain/DefaultMain";
import OptionAES from "../../../components/Options/Option/OptionAES/OptionAES";

import aesFunction from "../../../scripts/aes";
import modeOfOperation from "../../../scripts/ModeOfOperation";

const AES = (props) => {
  const [areaValue, setAreaValue] = useState("");
  const [aesResult, setAESResult] = useState("");
  const [inputValue, setInputValue] = useState("AAAABBBBCCCCDDDD");
  const [switchMode, setSwitchMode] = useState(true);
  const [buttonText, setButtonText] = useState("Current: encryption");
  const [areaMaxVal, setAreaMaxVal] = useState();
  // const [encTimeout, setEncTimeout] = useState(null);

  useEffect(() => {
    if (inputValue.length !== 16) {
      setAESResult("Key must be 16 characters length!");
    } else {
      if (switchMode) {
        try {
          setAESResult(
            modeOfOperation.encrypt(
              areaValue,
              (message) => {
                return aesFunction.encrypt(message, inputValue)
              },
              (ciphertext) => {
                return aesFunction.decrypt(ciphertext, inputValue)
              },
              {
                modeOfOperation: modeOfOperation.MODE.CTR,
                nonce: "aaaaBBBB"
              }
            )
          );
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          setAESResult(
            modeOfOperation.decrypt(
              areaValue
                .split(",")
                .map((char) => +char)
                .flat(),
                (message) => {
                  return aesFunction.encrypt(message, inputValue)
                },
                (ciphertext) => {
                  return aesFunction.decrypt(ciphertext, inputValue)
                },
                {
                  modeOfOperation: modeOfOperation.MODE.CTR,
                  nonce: "aaaaBBBB"
                }
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
      setAreaMaxVal();
      setAreaValue("");
      setAESResult("");
      setButtonText("Current: encryption");
    } else {
      setAreaMaxVal();
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
