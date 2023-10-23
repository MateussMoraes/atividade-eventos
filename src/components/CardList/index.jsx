import styles from "./styles.module.css";

export default function CardList({ children }) {
  return (
    <section className={styles.container}>
      {children}
    </section>
  )
}