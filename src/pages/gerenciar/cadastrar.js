import Button from "@/components/Button";
import Container from "@/components/Container";
import Input from "@/components/Input";
import Label from "@/components/Label";
import Text from "@/components/Text";
import Textaera from "@/components/Textarea";
import axios from "axios";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";

export default function CadastrarEvento() {

  const [message, setMessage] = useState({
    type: "",
    content: ""
  });

  const [dados, setDados] = useState({
    titulo: "",
    local: "",
    dataInicial: "",
    dataFinal: "",
    descricao: "",
    imagem: "",
    aberto: false
  });

  let inputImg = useRef();

  async function cadastrarEvento(e) {
    e.preventDefault();

    axios.post("http://localhost:3001/eventos", {
      titulo: dados.titulo,
      local: dados.local,
      dataInicial: dados.dataInicial,
      dataFinal: dados.dataFinal,
      descricao: dados.descricao,
      imagem: dados.imagem,
      aberto: dados.aberto
    })
      .then(res => {
        setMessage({ type: "success", content: "Evento cadastrado com sucesso" })
        setDados({
          titulo: "",
          local: "",
          dataInicial: "",
          dataFinal: "",
          descricao: "",
          imagem: "",
          aberto: false
        })
        // limpar o input de img
        if (inputImg.current) {
          inputImg.current.value = ""
        }
      })
      .catch(error => setMessage({ type: "error", content: "Erro ao cadastrar evento" }))
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
      <Head>
        <title>Cadastrar Evento</title>
      </Head>
      
      <form onSubmit={e => cadastrarEvento(e)} style={{ display: "flex", justifyContent: "center" }}>
        <Container style={{ width: "25rem", marginTop: "2rem", gap: ".6rem" }}>
          <Text style={{ marginBottom: "2rem" }}>Cadastrar Evento</Text>
          {message.content && (
            <Text style={{ color: "white", backgroundColor: message.type == "error" ? "red" : "green", padding: "12px" }}>
              {message.content}
            </Text>
          )}
          <Container>
            <Label htmlFor="titulo">Titulo:</Label>
            <Input id="titulo" type="text" value={dados.titulo} onChange={e => setDados((dados) => ({ ...dados, titulo: e.target.value }))} />
          </Container>
          <Container>
            <Label htmlFor="local">Local:</Label>
            <Input type="text" id="local" value={dados.local} onChange={e => setDados((dados) => ({ ...dados, local: e.target.value }))} />
          </Container>
          <Container>
            <Label htmlFor="dataInicial">Data inicial:</Label>
            <Input type="date" id="dataInicial" value={dados.dataInicial} onChange={e => setDados((dados) => ({ ...dados, dataInicial: e.target.value }))} />
          </Container>
          <Container>
            <Label htmlFor="dataFinal">Data final:</Label>
            <Input type="date" id="dataFinal" value={dados.dataFinal} onChange={e => setDados((dados) => ({ ...dados, dataFinal: e.target.value }))} />
          </Container>
          <Container>
            <Label htmlFor="descricao">Descricao:</Label>
            <Textaera id="descricao" cols="30" rows="5" value={dados.descricao} onChange={e => setDados((dados) => ({ ...dados, descricao: e.target.value }))} />
          </Container>
          <Container style={{ flexDirection: "row" }}>
            <Label style={{ marginRight: "1rem" }} htmlFor="aberto">Aberto</Label>
            <Input id="aberto" type="checkbox" checked={dados.aberto} onChange={e => setDados((dados) => ({ ...dados, aberto: e.target.checked }))} />
          </Container>
          <Container>
            <Label htmlFor="imagem">Imagem:</Label>
            <Input id="imagem" type="file" ref={inputImg} onChange={e => setDados((data) => ({ ...data, imagem: "/" + e.target.files[0]?.name }))} />
          </Container>
          <Button style={{ marginTop: "1rem" }}>Cadastrar</Button>
        </Container>
      </form>
    </>
  )
}