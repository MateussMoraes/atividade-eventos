import styles from "./styles.module.css";

export default function Tr({ children, ...props}) {
  return <tr className={styles.tr} {...props}>{children}</tr>
  
}