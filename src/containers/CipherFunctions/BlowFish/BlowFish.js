import React, { useState, useEffect } from "react";

import DefaultMain from "../../../components/DefaultMain/DefaultMain";
import OptionBlowFish from "../../../components/Options/Option/OptionBlowFish/OptionBlowFish";

import blowfishFunction from "../../../scripts/blowfish";

const BlowFish = (props) => {
  const [areaValue, setAreaValue] = useState("");
  const [blowfishResult, setBlowFishResult] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [switchMode, setSwitchMode] = useState(true);
  const [buttonText, setButtonText] = useState("Current: encryption");
  const [areaMaxVal, setAreaMaxVal] = useState(8);
  // const [encTimeout, setEncTimeout] = useState(null);

  useEffect(() => {
    if (inputValue.length < 4 || inputValue.length > 56) {
      setBlowFishResult("Key must be 4-56 characters length!");
    } else {
      if (switchMode) {
        try {
          setBlowFishResult(blowfishFunction.encrypt(areaValue, inputValue));
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          setBlowFishResult(
            blowfishFunction.decrypt(
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
      setAreaMaxVal(8);
      setAreaValue("");
      setBlowFishResult("");
      setButtonText("Current: encryption");
    } else {
      setAreaMaxVal();
      setAreaValue("");
      setBlowFishResult("");
      setButtonText("Current: decryption");
    }
    setSwitchMode(!switchMode);
  };

  return (
    <DefaultMain max={areaMaxVal} onTextAreaChange={onTextAreaChange} areaValue={areaValue} result={blowfishResult}>
      <OptionBlowFish switchMode={switchMode} switchModeText={buttonText} inputValue={inputValue} onInputChange={onInputChange} onButtonClick={onButtonClick} />
    </DefaultMain>
  );
};

export default BlowFish;
