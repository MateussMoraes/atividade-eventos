import styles from "./styles.module.css";

export default function Button({ children, width, ...props }) {
  return <button
    className={styles.button}
    style={{ width: width}}
    {...props}>
    {children}
  </button>
}