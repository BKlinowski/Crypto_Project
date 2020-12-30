import React, { useState, useEffect } from "react";

import DefaultMain from "../../../components/DefaultMain/DefaultMain";
import OptionTwoFish from "../../../components/Options/Option/OptionTwoFish/OptionTwoFish";

import twofishFunction from "../../../scripts/twofish";

const TwoFish = (props) => {
  const [areaValue, setAreaValue] = useState("");
  const [twofishResult, setTwoFishResult] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [switchMode, setSwitchMode] = useState(true);
  const [buttonText, setButtonText] = useState("Current: encryption");
  const [areaMaxVal, setAreaMaxVal] = useState(16);
  // const [encTimeout, setEncTimeout] = useState(null);

  useEffect(() => {
    if (inputValue.length !== 16) {
      setTwoFishResult("Key must be 16 characters length!");
    } else {
      if (switchMode) {
        try {
          setTwoFishResult(twofishFunction.encrypt(areaValue, inputValue));
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          setTwoFishResult(
            twofishFunction.decrypt(
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
      setTwoFishResult("");
      setButtonText("Current: encryption");
    } else {
      setAreaMaxVal(64);
      setAreaValue("");
      setTwoFishResult("");
      setButtonText("Current: decryption");
    }
    setSwitchMode(!switchMode);
  };

  return (
    <DefaultMain max={areaMaxVal} onTextAreaChange={onTextAreaChange} areaValue={areaValue} result={twofishResult}>
      <OptionTwoFish switchMode={switchMode} switchModeText={buttonText} inputValue={inputValue} onInputChange={onInputChange} onButtonClick={onButtonClick} />
    </DefaultMain>
  );
};

export default TwoFish;
