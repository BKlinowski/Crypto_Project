import React from "react";
import NavigationItems from "../components/Navigation/NavigationItems/NavigationItems";
import styles from "./Layout.module.css";

const Layout = (props) => {
  return (
    <div className={styles.Layout}>
      <NavigationItems />
      <main>{props.children}</main>
    </div>
  );
};

export default Layout;
