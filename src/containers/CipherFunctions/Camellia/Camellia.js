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
  const [modeValue, setModeValue] = useState("ECB");
  const [nonceValue, setNonceValue] = useState("");
  const [nonceMode, setNonceMode] = useState("");

  useEffect(() => {
    if (inputValue.length == 32) {
      setCamelliaResult("");
      setCamellia(new camelliaFunction(inputValue));
    } else {
      setCamelliaResult("Key must be 32 characters length!");
    }
  }, [inputValue]);

  useEffect(() => {
    console.log(modeValue);
    if (inputValue.length !== 32) {
      setCamelliaResult("Key must be 32 characters length!");
    } else if (modeValue !== "ECB" && nonceValue.length !== 8) {
      setCamelliaResult("Nonce value must be 8 characters length!");
    } else {
      if (switchMode) {
        try {
          console.log(nonceValue);
          setCamelliaResult(
            modeOfOperation.encrypt(
              areaValue,
              (message) => {
                return camellia.encrypt(areaValue);
              },
              (ciphertext) => {
                return camellia.decrypt(areaValue);
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
          setCamelliaResult(
            modeOfOperation.decrypt(
              areaValue
                .split(",")
                .map((char) => +char)
                .flat(),
              (message) => {
                return camellia.encrypt(areaValue);
              },
              (ciphertext) => {
                return camellia.decrypt(areaValue);
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

  /* useEffect(() => {
    if (switchMode && inputValue && areaValue) {
      setCamelliaResult(camellia.encrypt(areaValue));
    } else if (!switchMode && inputValue && areaValue) {
      setCamelliaResult(camellia.decrypt(areaValue));
    } else {
      setCamelliaResult("Just type some characters");
    }
  }, [areaValue]); */

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
    setCamelliaResult("");
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
      setAreaValue("");
      setNonceValue("");
      setCamelliaResult("");
      setButtonText("Current: encryption");
    } else {
      setAreaValue("");
      setNonceValue("");
      setCamelliaResult("");
      setButtonText("Current: decryption");
    }
    setSwitchMode(!switchMode);
  };

  return (
    <DefaultMain max={areaMaxVal} onTextAreaChange={onTextAreaChange} areaValue={areaValue} result={camelliaResult}>
      <OptionCamellia switchMode={switchMode} switchModeText={buttonText} inputValue={inputValue} onInputChange={onInputChange} onButtonClick={onButtonClick} onModeChange={onModeChange} modeValue={modeValue} nonceMode={nonceMode} onNonceChange={onNonceChange} />
    </DefaultMain>
  );
};

export default AES;
