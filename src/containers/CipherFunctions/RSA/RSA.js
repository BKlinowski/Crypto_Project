import React, { useState, useEffect } from "react";

import DefaultMain from "../../../components/DefaultMain/DefaultMain";
import OptionRSA from "../../../components/Options/Option/OptionRSA/OptionRSA";

import rsaFunction from "../../../scripts/rsa";

const RSA = (props) => {
  const [areaValue, setAreaValue] = useState("");
  const [aesResult, setRSAResult] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [switchMode, setSwitchMode] = useState(true);
  const [buttonText, setButtonText] = useState("Current: encryption");
  //const [areaMaxVal, setAreaMaxVal] = useState(16);
  // const [encTimeout, setEncTimeout] = useState(null);
  const [keyLenValue, setKeyLenValue] = useState("256 bit");

  useEffect(() => {
    let key = inputValue;

    let pubOrPriv = (switchMode ? 'Public' : 'Private');
    if(key.indexOf(pubOrPriv) >= 0){
      key = key.substr( key.indexOf(pubOrPriv)+1 );
      key = key.substr( key.indexOf("\n")+1 );
      key = key.substr( 0, key.indexOf("\n") );
    }

    key = key.substr(key.indexOf('('));
    key = key.substr(0, key.lastIndexOf(')') + 1);

    if (
      key[0] != '(' 
      || key[key.length-1] != ')'
      ||  key.split(',').length != 2
    ) {
      if(switchMode){
        setRSAResult("Bad key format. Should be: (n, e).");
      }else{
        setRSAResult("Bad key format. Should be: (n, d).");
      }
    } else {
      if (switchMode) {
        try {
          setRSAResult(rsaFunction.encrypt(areaValue, key));
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          console.log("areaValue:", areaValue);
          setRSAResult(
            rsaFunction.decrypt(
              areaValue
                .split(",")
                .flat(),
              key
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

  const onKeyGenClick = (event) => { 
    let keys = rsaFunction.generateKeys(parseInt(keyLenValue));
    let value = "Private:\n";
    value += keys.private + "\n";
    value += "Public:\n";
    value += keys.public + "\n";
    setInputValue(value);
  };

  const onKeyLenValueChange = (event) => {
    setKeyLenValue(event.target.value);
  };

  const onInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const onButtonClick = () => {
    if (!switchMode) {
      //setAreaMaxVal(16);
      setAreaValue("");
      setRSAResult("");
      setButtonText("Current: encryption");
    } else {
      //setAreaMaxVal(64);
      setAreaValue("");
      setRSAResult("");
      setButtonText("Current: decryption");
    }
    setSwitchMode(!switchMode);
  };

  return (
    <DefaultMain /*max={areaMaxVal}*/ onTextAreaChange={onTextAreaChange} areaValue={areaValue} result={aesResult}>
      <OptionRSA switchMode={switchMode} switchModeText={buttonText} onKeyGenClick={onKeyGenClick} keyLenValue={keyLenValue} onKeyLenValueChange={onKeyLenValueChange} inputValue={inputValue} onInputChange={onInputChange} onButtonClick={onButtonClick} />
    </DefaultMain>
  );
};

export default RSA;
