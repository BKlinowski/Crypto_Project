import React from "react";
import styles from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import NavigationSubitem from "./NavigationSubitem/NavigationSubitem";

const navigationItems = (props) => {
  return (
    <div className={styles.NavigationItems}>
      <div className={styles.Submenu}>
        <NavigationItem text="Encrypt" />
        <NavigationSubitem text="AES" />
        <NavigationSubitem text="RSA" />
        <NavigationSubitem text="Blowfish" />
        <NavigationSubitem text="Twofish" />
        <NavigationSubitem text="Camellia" />
        <NavigationSubitem text="Salsa20" />
      </div>
      <div className={styles.Submenu}>
        <NavigationItem text="Hash" />
        <NavigationSubitem text="SHA-256" />
        <NavigationSubitem text="MD5" />
      </div>
    </div>
  );
};

export default navigationItems;
