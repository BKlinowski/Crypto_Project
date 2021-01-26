import React from "react";
import NavigationItems from "../components/Navigation/NavigationItems/NavigationItems";
import styles from "./Layout.module.css";

import LayoutContext from "../context/layout-context";

import useAsyncState from "../customHooks/asyncState";

const Layout = (props) => {
  const [backdrop, setBackdrop] = useAsyncState(false);
  console.log("Render");
  const switchBackdrop = async (val) => {
    await setBackdrop(val);
  };

  return (
    <>
      {backdrop ? (
        <div className={styles.Backdrop}>
          <h1 className={styles.Text}>Generating keys, please wait...</h1>
          <div className={styles["sk-chase"]}>
            <div className={styles["sk-chase-dot"]}></div>
            <div className={styles["sk-chase-dot"]}></div>
            <div className={styles["sk-chase-dot"]}></div>
            <div className={styles["sk-chase-dot"]}></div>
            <div className={styles["sk-chase-dot"]}></div>
            <div className={styles["sk-chase-dot"]}></div>
          </div>
        </div>
      ) : null}
      <LayoutContext.Provider value={{ switchBackdrop }}>
        <div className={styles.Layout}>
          <NavigationItems />
          <main>{props.children}</main>
        </div>
      </LayoutContext.Provider>
    </>
  );
};

export default Layout;
