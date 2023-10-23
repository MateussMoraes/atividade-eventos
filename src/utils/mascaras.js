export const formatarData = (data) => {
  const [ano, mes, final] = data.split('-')
  const [dia, ] = final.split('T')
  
  return `${dia}/${mes}/${ano}`
}

export const formatarDataInput = (data) => {
  const [ano, mes, resto] = data.split('-')
  const [dia, ] = resto.split('T')
  
  return `${ano}-${mes}-${dia}`
}
