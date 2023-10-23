import styles from "./styles.module.css";

export default function Td({ children, ...props}) {
  return <td className={styles.td} {...props}>{children}</td>
  
}