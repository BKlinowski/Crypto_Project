import React, { useState, useEffect } from "react";

import DefaultMain from "../../../components/DefaultMain/DefaultMain";
import OptionBlowFish from "../../../components/Options/Option/OptionBlowFish/OptionBlowFish";

import blowfishFunction from "../../../scripts/blowfish";
import modeOfOperation from "../../../scripts/ModeOfOperation";

const BlowFish = (props) => {
  const [areaValue, setAreaValue] = useState("");
  const [blowfishResult, setBlowFishResult] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [switchMode, setSwitchMode] = useState(true);
  const [buttonText, setButtonText] = useState("Current: encryption");
  const [areaMaxVal, setAreaMaxVal] = useState();
  const [modeValue, setModeValue] = useState("ECB");
  const [nonceValue, setNonceValue] = useState("");
  const [nonceMode, setNonceMode] = useState("");
  // const [encTimeout, setEncTimeout] = useState(null);

  useEffect(() => {
    if (inputValue.length < 4 || inputValue.length > 56) {
      setBlowFishResult("Key must be 4-56 characters length!");
    } else if (modeValue !== "ECB" && nonceValue.length !== 8) {
      setBlowFishResult("Nonce value must be 8 characters length!");
    } else {
      if (switchMode) {
        try {
          setBlowFishResult(
            modeOfOperation.encrypt(
              areaValue,
              (message) => {
                return blowfishFunction.encrypt(message, inputValue);
              },
              (ciphertext) => {
                return blowfishFunction.decrypt(ciphertext, inputValue);
              },
              {
                paddingType: modeOfOperation.PADDING_TYPE.ISO10126_2,
                modeOfOperation: modeOfOperation.MODE.nonceMode,
                nonce: nonceValue,
                blockSize: 8,
              }
            )
          );
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          setBlowFishResult(
            modeOfOperation.decrypt(
              areaValue
                .split(",")
                .map((char) => +char)
                .flat(),
              (message) => {
                return blowfishFunction.encrypt(message, inputValue);
              },
              (ciphertext) => {
                return blowfishFunction.decrypt(ciphertext, inputValue);
              },
              {
                paddingType: modeOfOperation.PADDING_TYPE.ISO10126_2,
                modeOfOperation: modeOfOperation.MODE.nonceMode,
                nonce: nonceValue,
                blockSize: 8,
                storageTypeSize: 4, //BlowFish ciphertext is stored as 4 bytes integers
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
    setBlowFishResult("");
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
      setAreaMaxVal(8);
      setAreaValue("");
      setBlowFishResult("");
      setNonceValue("");
      setButtonText("Current: encryption");
    } else {
      setAreaMaxVal();
      setAreaValue("");
      setBlowFishResult("");
      setNonceValue("");
      setButtonText("Current: decryption");
    }
    setSwitchMode(!switchMode);
  };

  return (
    <DefaultMain max={areaMaxVal} onTextAreaChange={onTextAreaChange} areaValue={areaValue} result={blowfishResult}>
      <OptionBlowFish switchMode={switchMode} switchModeText={buttonText} inputValue={inputValue} onInputChange={onInputChange} onButtonClick={onButtonClick} onModeChange={onModeChange} modeValue={modeValue} nonceMode={nonceMode} onNonceChange={onNonceChange} />
    </DefaultMain>
  );
};

export default BlowFish;
