import React from "react";

import styles from "./auxiliary-bar.module.css";//
//const styles = require('./auxiliary-bar.module.css');//

export const AuxiliaryBar = ({}) => {
  return (
    <div className={styles.auxiliaryBar}>
      <div className={styles.messageArea}>Drag a view here to display.</div>
    </div>
  );
};
