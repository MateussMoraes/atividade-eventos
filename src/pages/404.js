import Container from "@/components/Container";
import Text from "@/components/Text";
import Link from "next/link";

export default function Pagina404() {
  return (
    <>
      <Container style={{ marginLeft: "1rem", marginTop: "1rem", gap: "1rem" }}>
        <Text>Oppsss, essa página não existe !</Text>
        <Link href="/">Voltar para página de eventos</Link>
      </Container>
    </>
  )
}