import React, { useState } from "react";

import DefaultMain from "../../../components/DefaultMain/DefaultMain";

import sha256 from "../../../scripts/sha256/sha256";

const SHA256 = (props) => {
  const [areaValue, setAreaValue] = useState("");
  const [encTimeout, setEncTimeout] = useState(null);
  const [sha256Result, setSHA256Result] = useState("");

  const onTextAreaChange = (event) => {
    if (encTimeout) clearTimeout(encTimeout);
    setEncTimeout(
      setTimeout(() => {
        console.time("time-sha256");
        setSHA256Result(sha256(event.target.value));
        console.timeEnd("time-sha256");
      }, 1)
    );
    setAreaValue(event.target.value);
  };

  return <DefaultMain onTextAreaChange={onTextAreaChange} areaValue={areaValue} result={sha256Result}></DefaultMain>;
};
export default SHA256;
