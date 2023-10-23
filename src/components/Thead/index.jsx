import styles from "./styles.module.css";

export default function Thead({ children, ...props}) {
  return <thead className={styles.thead} {...props}>{children}</thead>
}