import Button from "@/components/Button";
import Container from "@/components/Container";
import Input from "@/components/Input";
import Label from "@/components/Label";
import Text from "@/components/Text";
import Textaera from "@/components/Textarea";
import { useState } from "react";

export default function CadastrarEvento() {

  const [image, setImagem] = useState("");

  const [dados, setDados] = useState({
    titulo: "",
    local: "",
    dataInicial: "",
    dataFinal: "",
    descricao: "",
    imagem: "",
    aberto: false
  });

  function handleImage(e) {
    let file = e.target.files[0];

    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setDados({ ...dados, imagem: imgUrl })
    }
  }

  console.log(dados.imagem)
  return (
    <>
      <form style={{ display: "flex", justifyContent: "center" }}>
        <Container style={{ width: "20rem", marginTop: "2rem", gap: ".6rem" }}>
          <Text style={{ marginBottom: "2rem" }}>Cadastrar Evento</Text>
          <Container>
            <Label htmlFor="titulo">Titulo:</Label>
            <Input type="text" value={dados.titulo} onChange={e => setDados((dados) => ({ ...dados, titulo: e.target.value }))} />
          </Container>
          <Container>
            <Label htmlFor="local">Local:</Label>
            <Input type="text" value={dados.local} onChange={e => setDados((dados) => ({ ...dados, local: e.target.value }))} />
          </Container>
          <Container>
            <Label htmlFor="dataInicial">Data inicial:</Label>
            <Input type="date" value={dados.dataInicial} onChange={e => setDados((dados) => ({ ...dados, dataInicial: e.target.value }))} />
          </Container>
          <Container>
            <Label htmlFor="dataFinal">Data final:</Label>
            <Input type="date" value={dados.dataFinal} onChange={e => setDados((dados) => ({ ...dados, dataFinal: e.target.value }))} />
          </Container>
          <Container>
            <Label htmlFor="descricao">Descricao:</Label>
            <Textaera cols="30" rows="5" value={dados.descricao} onChange={e => setDados((dados) => ({ ...dados, descricao: e.target.value }))} />
          </Container>
          <Container style={{ flexDirection: "row" }}>
            <Label style={{ marginRight: "1rem" }} htmlFor="aberto">Aberto</Label>
            <Input type="checkbox" checked={dados.aberto} onChange={e => setDados((dados) => ({ ...dados, aberto: e.target.checked }))} />
          </Container>
          <Container>
            <Label htmlFor="imagem">Imagem:</Label>
            <Input type="file" onChange={e => handleImage(e)} />
          </Container>
          <Button style={{ marginTop: "1rem" }}>Cadastrar</Button>
        </Container>
      </form>
    </>
  )
}