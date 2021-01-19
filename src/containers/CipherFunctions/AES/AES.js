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
  const [modeValue, setModeValue] = useState("ECB");
  const [nonceValue, setNonceValue] = useState("");
  const [nonceMode, setNonceMode] = useState("");
  // const [encTimeout, setEncTimeout] = useState(null);

  useEffect(() => {
    console.log(modeValue);
    if (inputValue.length !== 16) {
      setAESResult("Key must be 16 characters length!");
    } else if (modeValue !== "ECB" && nonceValue.length !== 8) {
      setAESResult("Nonce value must be 8 characters length!");
    } else {
      if (switchMode) {
        try {
          console.log(nonceValue);
          setAESResult(
            modeOfOperation.encrypt(
              areaValue,
              (message) => {
                return aesFunction.encrypt(message, inputValue);
              },
              (ciphertext) => {
                return aesFunction.decrypt(ciphertext, inputValue);
              },
              {
                paddingType: modeOfOperation.PADDING_TYPE.ISO10126_2,
                modeOfOperation: modeOfOperation.MODE.nonceMode,
                nonce: nonceValue,
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
                return aesFunction.encrypt(message, inputValue);
              },
              (ciphertext) => {
                return aesFunction.decrypt(ciphertext, inputValue);
              },
              {
                paddingType: modeOfOperation.PADDING_TYPE.ISO10126_2,
                modeOfOperation: modeOfOperation.MODE.nonceMode,
                nonce: nonceValue,
              }
            )
          );
        } catch (err) {
          console.log(err);
        }
      }
    }
  }, [areaValue, inputValue, nonceValue, modeValue, switchMode]);

  useEffect(() => {
    // console.log(nonceMode);
    switch (modeValue) {
      case "ECB": {
        setNonceMode("");
        break;
      }
      case "CBC": {
        setNonceMode("IV");
        break;
      }
      case "CFB": {
        setNonceMode("IV");
        break;
      }
      case "OFB": {
        setNonceMode("IV");
        break;
      }
      case "CTR": {
        setNonceMode("nonce");
        break;
      }
      default: {
        setNonceMode("");
        break;
      }
    }
  }, [modeValue, setNonceMode]);

  const onNonceChange = (event) => {
    setNonceValue(event.target.value);
  };

  const onModeChange = (event) => {
    setAESResult("");
    setModeValue(event.target.value);
  };

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
      setNonceValue("");
      setButtonText("Current: encryption");
    } else {
      setAreaMaxVal();
      setAreaValue("");
      setAESResult("");
      setNonceValue("");
      setButtonText("Current: decryption");
    }
    setSwitchMode(!switchMode);
  };

  return (
    <DefaultMain max={areaMaxVal} onTextAreaChange={onTextAreaChange} areaValue={areaValue} result={aesResult}>
      <OptionAES switchMode={switchMode} switchModeText={buttonText} inputValue={inputValue} onInputChange={onInputChange} onButtonClick={onButtonClick} onModeChange={onModeChange} modeValue={modeValue} nonceMode={nonceMode} onNonceChange={onNonceChange} />
    </DefaultMain>
  );
};

export default AES;
