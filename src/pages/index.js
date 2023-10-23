import CardEvento from '@/components/CardEvento'
import CardList from '@/components/CardList';
import axios from 'axios';
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { formatarData } from '@/utils/mascaras';
import Text from '@/components/Text';

export default function Home() {

  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/eventos").then(res => setEventos(res.data)).catch(error => console.log(error))
  }, [])

  return (
    <>
      <Head>
        <title>Plataforma de Eventos</title>
      </Head>

      <CardList>
        {eventos.map((evento) => (
          <CardEvento
            key={evento.id}
            titulo={evento.titulo}
            local={evento.local}
            dataInicial={formatarData(evento.dataInicial)}
            dataFinal={formatarData(evento.dataFinal)}
            aberto={evento.aberto}
            id={evento.id}
          />
        ))}
      </CardList>

      {eventos.length == 0 && ( <Text style={{ marginLeft: "1rem"}}>Nenhum evento foi encontrado ❌</Text>)}
    </>
  )
}
