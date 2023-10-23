import styles from "./styles.module.css";

export default function Textaera({ children, ...props }) {
  return <textarea className={styles.label} cols="30" rows="10" {...props}>{children}</textarea>
}