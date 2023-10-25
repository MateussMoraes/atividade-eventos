import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import styles from "@/styles/EventoID.module.css";
import Container from "@/components/Container";
import Text from "@/components/Text";
import Link from "next/link";

export default function EventoPorID() {

  let router = useRouter();

  const [evento, setEvento] = useState();

  let id = router.query.id;

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3001/eventos/${id}`)
        .then(res => setEvento(res.data))
        .catch(error => console.log(error))
    }
  }, [router])

  if (evento) return (
    <>
      <Head>
        <title>{evento.titulo}</title>
      </Head>

      <div className={styles.containerImagem} style={{ backgroundImage: `url(${evento.imagem})` }}></div>

      <div className={styles.containerPages}>
        <Container className={styles.containerInfos}>
          <h1>{evento.titulo}</h1>
          <Text>{evento.descricao}</Text>
          <Text>📍 Local: {evento.local} </Text>
          <Text>🗓 Data Inicial: {evento.dataInicial}</Text>
          <Text>🗓 Data Final: {evento.dataFinal}</Text>
          <Text style={{ color: evento.aberto ? "green" : "red" }} >{evento.aberto ? "Aberto" : "Finalizado"}</Text>
        </Container>
      </div>
    </>
  )
}


