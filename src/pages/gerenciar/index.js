import axios from "axios";
import Head from "next/head";
import Table from "@/components/Table";
import Tr from "@/components/Tr";
import Td from "@/components/Td";
import Thead from "@/components/Thead";
import Tbody from "@/components/Tbody";
import Th from "@/components/Th";
import styles from "@/styles/Gerenciar.module.css"
import { useEffect, useState } from "react";
import { formatarData } from "@/utils/mascaras";
import Image from "next/image";
import ModalText from "@/components/ModalText";
import Button from "@/components/Button";
import Text from "@/components/Text";
import Link from "next/link";

export default function GerenciarEventos() {

  const [eventos, setEventos] = useState([]);

  const [evento, setEvento] = useState();

  const [modalDeletar, setModalDeletar] = useState(false);

  const [message, setMessage] = useState({
    type: "",
    content: ""
  });

  useEffect(() => {
    axios.get("http://localhost:3001/eventos").then(res => setEventos(res.data)).catch(error => console.log(error))
  }, [deletarEvento])

  async function deletarEvento() {
    axios.delete(`http://localhost:3001/eventos/${evento.id}`)
      .then(res => {
        setModalDeletar(false);
        setMessage({ type: "success", content: "Evento deletado com sucesso" })
      })
      .catch(error => setMessage({ type: "error", content: "Erro ao deletar evento" }))
  }

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage({ type: "", message: "" });
      }, 5000)
    }
  }, [message.content])

  return (
    <>
      {modalDeletar && (
        <ModalText isOpen={modalDeletar} onClose={setModalDeletar} modalText={"Tem certeza que deseja deletar este evento ?"}>
          <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
            <Button onClick={deletarEvento} width={"100%"}>Deletar</Button>
          </div>
        </ModalText>
      )}

      <Head>
        <title>Gerenciar Eventos</title>
      </Head>

      <div className={styles.containerTable}>

        <Link href="/gerenciar/cadastrar">
          <Button style={{ marginBottom: "1rem" }}>Cadastrar Evento</Button>
        </Link>

        {message.content && (
          <p
            className={styles.textMessage}
            style={{ color: "white", backgroundColor: message.type == "error" ? "red" : "green" }}>
            {message.content}
          </p>
        )}

        <Table>
          <Thead>
            <Tr>
              <Th>Titulo</Th>
              <Th>Local</Th>
              <Th>Data Inicial</Th>
              <Th>Data Final</Th>
              <Th>Aberto</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {eventos.map((evento) => (
              <Tr key={evento.id}>
                <Td>{evento.titulo}</Td>
                <Td>{evento.local}</Td>
                <Td>{formatarData(evento.dataInicial)}</Td>
                <Td>{formatarData(evento.dataFinal)}</Td>
                <Td>{evento.aberto ? "Sim" : "Não"}</Td>
                <Td>
                  <Image
                    src={"/trash.svg"}
                    width={25}
                    height={25}
                    alt="Imagem de lixeira"
                    title="Deletar evento"
                    onClick={() => {
                      setEvento(evento)
                      setModalDeletar(true)
                    }}
                    style={{ cursor: "pointer" }}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        {eventos.length == 0 && (<Text style={{ marginTop: "1rem" }}>Nenhum evento foi encontrado ❌ </Text>)}
      </div>

    </>
  )
}