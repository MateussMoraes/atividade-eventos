import React from "react";
import styles from "./styles.module.css";

function Input({ ...props }, ref) {
  return <input className={styles.input} {...props} ref={ref} />
}

export default React.forwardRef(Input);