import React from "react";
import styles from "./LoadingOverlay.module.scss";

const LoadingOverlay = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.spinner}>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
