import styles from "./styles.module.css";

export default function Table({ children, ...props}) {
  return <table className={styles.table} {...props}>{children}</table>
  
}