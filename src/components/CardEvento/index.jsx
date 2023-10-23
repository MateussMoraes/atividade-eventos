import styles from "./styles.module.css";
import { useRouter } from "next/router";

export default function CardEvento({ titulo, local, dataInicial, dataFinal, aberto, id }) {

  let router = useRouter();

  return (
      <div onClick={e => router.push(`/evento/${id}`)} className={styles.container}>
        <div className={styles.containerTitulo}>
          <p title={titulo}>{titulo}</p>
        </div>
        <div className={styles.containerInfos}>
          <div className={styles.containerInfosLocal}>
            <p>{local}</p>
          </div>
          <div className={styles.containerInfosDate}>
            <p>Data Inicial: {dataInicial}</p>
            <p>Data Final: {dataFinal}</p>
          </div>
          <div className={styles.containerAberto}>
            <p style={{ color: aberto ? "green" : "red" }}>{aberto ? "Aberto" : "Finalizado"}</p>
          </div>
        </div>
      </div>
  )
}