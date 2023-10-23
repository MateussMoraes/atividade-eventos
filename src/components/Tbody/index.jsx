import styles from "./styles.module.css";

export default function Tbody({ children, ...props}) {
  return <tbody className={styles.tbody} {...props}>{children}</tbody>
}