import React from "react";
import styles from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import NavigationSubitem from "./NavigationSubitem/NavigationSubitem";

const navigationItems = (props) => {
  return (
    <div className={styles.NavigationItems}>
      <div className={styles.Submenu}>
        <NavigationItem text="Ciphers" />
        <ul className={styles.Items}>
          <NavigationSubitem link="/AES" text="AES" />
          <NavigationSubitem link="/RSA" text="RSA" />
          <NavigationSubitem link="/Camellia" text="Camellia" />
          <NavigationSubitem link="/Chacha20" text="Chacha20" />
          <NavigationSubitem link="/BlowFish" text="BlowFish" />
        </ul>
      </div>
      <div className={styles.Submenu}>
        <NavigationItem text="Hash" />
        <ul className={styles.Items}>
          <NavigationSubitem link="/SHA256" text="SHA-256" />
          <NavigationSubitem link="/MD5" text="MD5" />
        </ul>
      </div>
    </div>
  );
};

export default navigationItems;
