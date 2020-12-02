import React, { useState, useEffect } from "react";

import DefaultMain from "../../../components/DefaultMain/DefaultMain";
import OptionCamellia from "../../../components/Options/Option/OptionCamellia/OptionCamellia";
import Camellia from "../../../scripts/camellia/camellia";

import camelliaFunction from "../../../scripts/camellia/camellia";

const AES = (props) => {
  const [areaValue, setAreaValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [switchMode, setSwitchMode] = useState(true);
  const [buttonText, setButtonText] = useState("Current: encryption");
  const [camelliaResult, setCamelliaResult] = useState("");
  const [camellia, setCamellia] = useState(null);
  const [areaMaxVal, setAreaMaxVal] = useState(16);

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
      setCamelliaResult(camellia.encrypt(areaValue));
    } else if (!switchMode && inputValue && areaValue) {
      setCamelliaResult(camellia.decrypt(areaValue));
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
      setAreaMaxVal(16);
      setButtonText("Current: encryption");
    } else {
      setAreaValue("");
      setAreaMaxVal(32);
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
