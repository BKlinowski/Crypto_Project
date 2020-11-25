import React from "react";

const SHA256Context = React.createContext({
  onTextAreaChange: () => {},
  sha256Result: null,
  areaValue: null,
});

export default SHA256Context;
