import React, { useState } from "react";

import DefaultMain from "../../../components/DefaultMain/DefaultMain";

import md5 from "../../../scripts/md5/md5";

const MD5 = (props) => {
  const [areaValue, setAreaValue] = useState("");
  const [encTimeout, setEncTimeout] = useState(null);
  const [MD5Result, setMD5Result] = useState("");

  const onTextAreaChange = (event) => {
    if (encTimeout) clearTimeout(encTimeout);
    setEncTimeout(
      setTimeout(() => {
        console.time("time-md5");
        setMD5Result(md5(event.target.value));
        console.timeEnd("time-md5");
      }, 1)
    );
    console.log(MD5Result);
    setAreaValue(event.target.value);
  };

  return <DefaultMain onTextAreaChange={onTextAreaChange} areaValue={areaValue} result={MD5Result}></DefaultMain>;
};
export default MD5;
