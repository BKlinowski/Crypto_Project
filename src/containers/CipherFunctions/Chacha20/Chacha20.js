import React, { useState, useEffect } from "react";

import DefaultMain from "../../../components/DefaultMain/DefaultMain";
import OptionChacha20 from "../../../components/Options/Option/OptionChacha20/OptionChacha20";

import chacha20Function from "../../../scripts/chacha20";

const Chacha20 = (props) => {
  const [areaValue, setAreaValue] = useState("");
  const [chacha20Result, setChacha20Result] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [input2Value, setInput2Value] = useState("");
  const [switchMode, setSwitchMode] = useState(true);
  const [buttonText, setButtonText] = useState("Current: encryption");
  const [areaMaxVal, setAreaMaxVal] = useState("");

  useEffect(() => {
    if (inputValue.length !== 32) {
      setChacha20Result("Key must be 32 characters length!");
    } else if (input2Value.length !== 12) {
      setChacha20Result("Nonce must be 12 characters length!");
    } else {
      if (switchMode) {
        try {
          setChacha20Result(chacha20Function.encrypt(areaValue, inputValue, input2Value));
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          setChacha20Result(
            chacha20Function.decrypt(
              areaValue
                .split(",")
                .map((char) => +char)
                .flat(),
              inputValue,
              input2Value
            )
          );
        } catch (err) {
          console.log(err);
        }
      }
    }
  }, [areaValue, inputValue, input2Value]);

  const onTextAreaChange = (event) => {
    setAreaValue(event.target.value);
  };

  const onInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const onInput2Change = (event) => {
    setInput2Value(event.target.value);
  };

  const onButtonClick = () => {
    if (!switchMode) {
      setAreaMaxVal("");
      setAreaValue("");
      setChacha20Result("");
      setButtonText("Current: encryption");
    } else {
      setAreaMaxVal("");
      setAreaValue("");
      setChacha20Result("");
      setButtonText("Current: decryption");
    }
    setSwitchMode(!switchMode);
  };

  return (
    <DefaultMain max={areaMaxVal} onTextAreaChange={onTextAreaChange} areaValue={areaValue} result={chacha20Result}>
      <OptionChacha20 switchMode={switchMode} switchModeText={buttonText} inputValue={inputValue} input2Value={input2Value} onInputChange={onInputChange} onInput2Change={onInput2Change} onButtonClick={onButtonClick} />
    </DefaultMain>
  );
};

export default Chacha20;
