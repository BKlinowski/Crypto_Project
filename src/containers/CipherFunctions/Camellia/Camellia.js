import React, { useState, useEffect } from "react";

import DefaultMain from "../../../components/DefaultMain/DefaultMain";
import OptionCamellia from "../../../components/Options/Option/OptionCamellia/OptionCamellia";
import Camellia from "../../../scripts/camellia/camellia";

import camelliaFunction from "../../../scripts/camellia/camellia";
import modeOfOperation from "../../../scripts/ModeOfOperation";

const AES = (props) => {
  const [areaValue, setAreaValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [switchMode, setSwitchMode] = useState(true);
  const [buttonText, setButtonText] = useState("Current: encryption");
  const [camelliaResult, setCamelliaResult] = useState("");
  const [camellia, setCamellia] = useState(null);
  const [areaMaxVal, setAreaMaxVal] = useState();

  useEffect(() => {
    if (inputValue.length == 32) {
      setCamelliaResult("");
      setCamellia(new camelliaFunction(inputValue));
    } else {
      setCamelliaResult("Key must be 32 characters length!");
    }
  }, [inputValue]);

  useEffect(() => {
    if (switchMode && inputValue && areaValue) {
      setCamelliaResult(
        modeOfOperation.encrypt(
          areaValue,
          (message) => {
            return camellia.encrypt(message)
          },
          (ciphertext) => {
            return camellia.decrypt(ciphertext[0])
          },
          {
            paddingType: modeOfOperation.PADDING_TYPE.ISO10126_2,
            modeOfOperation: modeOfOperation.MODE.ECB,
            blockSize: 16,
          }
        )
      );
    } else if (!switchMode && inputValue && areaValue) {
      setCamelliaResult(
        modeOfOperation.decrypt(
          areaValue.split(","),
          (message) => {
            return camellia.encrypt(message)
          },
          (ciphertext) => {
            return camellia.decrypt(ciphertext[0])
          },
          {
            paddingType: modeOfOperation.PADDING_TYPE.ISO10126_2,
            modeOfOperation: modeOfOperation.MODE.ECB,
            blockSize: 4,
          }
        )
      );
    } else {
      setCamelliaResult("Just type some characters");
    }
  }, [areaValue]);

  const onTextAreaChange = (event) => {
    setAreaValue(event.target.value);
  };

  const onInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const onButtonClick = () => {
    if (!switchMode) {
      setAreaValue("");
      setAreaMaxVal();
      setButtonText("Current: encryption");
    } else {
      setAreaValue("");
      setAreaMaxVal();
      setButtonText("Current: decryption");
    }
    setSwitchMode(!switchMode);
  };

  return (
    <DefaultMain max={areaMaxVal} onTextAreaChange={onTextAreaChange} areaValue={areaValue} result={camelliaResult}>
      <OptionCamellia switchMode={switchMode} switchModeText={buttonText} inputValue={inputValue} onInputChange={onInputChange} onButtonClick={onButtonClick} />
    </DefaultMain>
  );
};

export default AES;
