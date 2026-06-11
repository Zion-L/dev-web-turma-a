const token = "44500557bd68c3589922d306b5540a8c"
const BASE = 'https://v3.football.api-sports.io'


async function buscar(endpoint) {
  const res = await fetch(`${BASE}${endpoint}`, {
    method: 'GET',
    headers: { 'x-apisports-key': token }
  })
  const dados = await res.json()

  if (dados.errors && Object.keys(dados.errors).length > 0) {
    throw new Error(JSON.stringify(dados.errors))
  }
  return dados.response
}


async function buscarComCache(chaveCache, endpoint) {
  const salvo = localStorage.getItem(chaveCache)
  if (salvo) {
    console.log(`[cache] usando ${chaveCache} salvo`)
    return JSON.parse(salvo)
  }
  const dados = await buscar(endpoint)
  localStorage.setItem(chaveCache, JSON.stringify(dados))
  return dados
}


export async function carregarPaises() {
  return await buscarComCache('cache_paises', '/teams/countries')
}


export async function descobrirIdDoTime(nomePais) {
  const chave = `cache_time_${nomePais}`
  const times = await buscarComCache(chave, `/teams?name=${nomePais.toLowerCase()}`)
  if (!times.length) {
    throw new Error(`Nenhuma seleção encontrada para "${nomePais}"`)
  }
  return times[0].team.id
}


export async function carregarElenco(teamId) {
  const chave = `cache_elenco_${teamId}`
  const squads = await buscarComCache(chave, `/players/squads?team=${teamId}`)
  if (!squads.length) {
    throw new Error('Elenco não encontrado pra essa seleção')
  }
  return squads[0].players // [{ id, name, age, number, position, photo }]
}