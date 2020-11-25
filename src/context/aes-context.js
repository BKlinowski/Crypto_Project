import React from "react";

const AESContext = React.createContext({
  onTextAreaChange: () => {},
  onInputChange: () => {},
  inputValue: null,
  aesResult: null,
  areaValue: null,
});

export default AESContext;
