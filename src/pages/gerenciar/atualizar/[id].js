import axios from "axios";
import Button from "@/components/Button";
import Text from "@/components/Text";
import Container from "@/components/Container";
import Label from "@/components/Label";
import Input from "@/components/Input";
import Textaera from "@/components/Textarea";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import { formatarDataInput } from "@/utils/mascaras";
import Link from "next/link";

export default function AtualizarEvento() {

  let router = useRouter();

  const [evento, setEvento] = useState();

  const [dados, setDados] = useState({
    titulo: "",
    local: "",
    dataInicial: "",
    dataFinal: "",
    descricao: "",
    imagem: "",
    aberto: ""
  })

  const [message, setMessage] = useState({
    type: "",
    content: ""
  })

  let id = router.query.id;

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3001/eventos/${id}`)
        .then(res => {
          setEvento(res.data)
        })
        .catch(error => console.log(error))
    }
  }, [router])

  useEffect(() => {
    if (evento) {
      setDados({
        titulo: evento?.titulo,
        local: evento?.local,
        dataInicial: formatarDataInput(evento?.dataInicial),
        dataFinal: formatarDataInput(evento?.dataFinal),
        descricao: evento?.descricao,
        imagem: evento?.imagem,
        aberto: evento?.aberto
      })
    }
  }, [evento])

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage({ type: "", message: "" });
      }, 5000)
    }
  }, [message.content])

  async function atualizarEvento(e) {
    e.preventDefault();
    axios.put(`http://localhost:3001/eventos/${id}`, {
      titulo: dados.titulo,
      local: dados.local,
      dataInicial: dados.dataInicial,
      dataFinal: dados.dataFinal,
      descricao: dados.descricao,
      imagem: dados.imagem,
      aberto: dados.aberto
    }).then(res => {
      setMessage({ type: "success", content: "Evento Atualizado com sucesso" })
      setTimeout(() => {
        router.push("/gerenciar")
      }, 2000)
    }).catch(error => setMessage({ type: "success", content: "Erro ao atualizar evento" }))
  }

  if (evento && dados) return (
    <>
      <Head>
        <title>Atualizar Evento</title>
      </Head>

      <form onSubmit={e => atualizarEvento(e)} style={{ display: "flex", justifyContent: "center" }}>
        <Container style={{ width: "25rem", marginTop: "2rem", gap: ".6rem" }}>
          <Text style={{ marginBottom: "2rem" }}>Atualizar evento</Text>
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
            <Input id="imagem" type="file" onChange={e => setDados((data) => ({ ...data, imagem: "/" + e.target.files[0]?.name }))} />
          </Container>
          <Button style={{ marginTop: "1rem" }}>Atualizar</Button>
        </Container>
      </form>
    </>
  )
  if (!evento) return (
    <>
      <Container style={{ marginLeft: "1rem", marginTop: "1rem", gap: "1rem" }}>
        <Text>Erro ao buscar evento</Text>
        <Link href="/">Voltar para página de eventos</Link>
      </Container>
    </>

  )
}
