import React from "react";
import NavigationItems from "../components/Navigation/NavigationItems/NavigationItems";

const Layout = (props) => {
  return (
    <div>
      <NavigationItems />
      <main>{props.children}</main>
    </div>
  );
};

export default Layout;
