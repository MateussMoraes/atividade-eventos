import styles from "./styles.module.css";

export default function Th({ children, ...props}) {
  return <th className={styles.th} {...props}>{children}</th>
}