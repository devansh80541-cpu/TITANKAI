import React from "react";
import LoadingSvg from "@/public/assets/Eclipse-1s-200px.svg";
import styles from "./component.module.css";

function LoadingPageContainer() {
  return (
    <div id={styles.container}>
      <div id={styles.content_container}>
        <div id={styles.brand_container}>
          <span id={styles.brand_en}>TITANKAI</span>
          <span id={styles.brand_ja}>タイタンカイ</span>
        </div>

        <LoadingSvg width={64} height={82} alt="Loading" />

        <p>Loading...</p>
      </div>
    </div>
  );
}

export default LoadingPageContainer;
