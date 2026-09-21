// Camada de dados da barbearia.
// Estes dados são de demonstração (seed). Na próxima etapa serão substituídos
// por consultas a um banco de dados real quando a integração estiver conectada.

export type Servico = {
  id: string
  nome: string
  descricao: string
  duracaoMin: number
  preco: number
}

export type StatusAgendamento = 'confirmado' | 'pendente' | 'concluido' | 'cancelado'

export type Agendamento = {
  id: string
  cliente: string
  servicoId: string
  data: string // ISO date (yyyy-mm-dd)
  hora: string // HH:mm
  status: StatusAgendamento
}

export type Cliente = {
  id: string
  nome: string
  telefone: string
  desde: string // yyyy-mm-dd
  totalVisitas: number
  totalGasto: number
  ultimoServicoId: string
  observacao?: string
}

export type Transacao = {
  id: string
  descricao: string
  cliente?: string
  tipo: 'receita' | 'despesa'
  valor: number
  data: string // yyyy-mm-dd
  formaPagamento?: 'pix' | 'cartao' | 'dinheiro'
}

export const servicos: Servico[] = [
  {
    id: 'corte',
    nome: 'Corte de Cabelo',
    descricao: 'Corte na tesoura ou máquina, finalizado com styling.',
    duracaoMin: 40,
    preco: 45,
  },
  {
    id: 'barba',
    nome: 'Barba Terapia',
    descricao: 'Toalha quente, navalha e hidratação da pele.',
    duracaoMin: 30,
    preco: 35,
  },
  {
    id: 'combo',
    nome: 'Corte + Barba',
    descricao: 'O combo completo para renovar o visual.',
    duracaoMin: 70,
    preco: 70,
  },
  {
    id: 'pezinho',
    nome: 'Pezinho / Acabamento',
    descricao: 'Retoque rápido do contorno entre os cortes.',
    duracaoMin: 15,
    preco: 20,
  },
  {
    id: 'sobrancelha',
    nome: 'Sobrancelha',
    descricao: 'Design e alinhamento na navalha.',
    duracaoMin: 15,
    preco: 20,
  },
  {
    id: 'platinado',
    nome: 'Platinado / Coloração',
    descricao: 'Descoloração e tonalização profissional.',
    duracaoMin: 120,
    preco: 160,
  },
]

export const horariosDisponiveis = [
  '09:00',
  '09:40',
  '10:20',
  '11:00',
  '13:00',
  '13:40',
  '14:20',
  '15:00',
  '15:40',
  '16:20',
  '17:00',
  '17:40',
]

const hoje = new Date().toISOString().slice(0, 10)

export const agendamentos: Agendamento[] = [
  { id: 'a1', cliente: 'Rafael Menezes', servicoId: 'combo', data: hoje, hora: '09:00', status: 'concluido' },
  { id: 'a2', cliente: 'Diego Prado', servicoId: 'corte', data: hoje, hora: '09:40', status: 'concluido' },
  { id: 'a3', cliente: 'Lucas Oliveira', servicoId: 'barba', data: hoje, hora: '10:20', status: 'confirmado' },
  { id: 'a4', cliente: 'Bruno Farias', servicoId: 'corte', data: hoje, hora: '11:00', status: 'confirmado' },
  { id: 'a5', cliente: 'Anderson Lima', servicoId: 'combo', data: hoje, hora: '13:00', status: 'confirmado' },
  { id: 'a6', cliente: 'Marcelo Souza', servicoId: 'pezinho', data: hoje, hora: '13:40', status: 'pendente' },
  { id: 'a7', cliente: 'Thiago Rocha', servicoId: 'platinado', data: hoje, hora: '14:20', status: 'confirmado' },
  { id: 'a8', cliente: 'Gustavo Alves', servicoId: 'corte', data: hoje, hora: '17:00', status: 'pendente' },
]

export const clientes: Cliente[] = [
  { id: 'c1', nome: 'Rafael Menezes', telefone: '(11) 98812-3345', desde: '2023-02-10', totalVisitas: 28, totalGasto: 1820, ultimoServicoId: 'combo', observacao: 'Prefere degradê baixo.' },
  { id: 'c2', nome: 'Diego Prado', telefone: '(11) 99123-8890', desde: '2023-06-04', totalVisitas: 19, totalGasto: 940, ultimoServicoId: 'corte' },
  { id: 'c3', nome: 'Lucas Oliveira', telefone: '(11) 97744-1120', desde: '2024-01-18', totalVisitas: 12, totalGasto: 540, ultimoServicoId: 'barba', observacao: 'Alérgico a produtos com álcool.' },
  { id: 'c4', nome: 'Bruno Farias', telefone: '(11) 98800-4521', desde: '2024-03-22', totalVisitas: 9, totalGasto: 405, ultimoServicoId: 'corte' },
  { id: 'c5', nome: 'Anderson Lima', telefone: '(11) 99655-7710', desde: '2022-11-30', totalVisitas: 41, totalGasto: 2870, ultimoServicoId: 'combo', observacao: 'Cliente fiel, sempre às sextas.' },
  { id: 'c6', nome: 'Thiago Rocha', telefone: '(11) 98432-0091', desde: '2024-08-09', totalVisitas: 5, totalGasto: 620, ultimoServicoId: 'platinado' },
  { id: 'c7', nome: 'Marcelo Souza', telefone: '(11) 97123-4455', desde: '2024-05-14', totalVisitas: 7, totalGasto: 210, ultimoServicoId: 'pezinho' },
  { id: 'c8', nome: 'Gustavo Alves', telefone: '(11) 98999-1234', desde: '2024-09-01', totalVisitas: 3, totalGasto: 135, ultimoServicoId: 'corte' },
]

export const transacoes: Transacao[] = [
  { id: 't1', descricao: 'Corte + Barba', cliente: 'Rafael Menezes', tipo: 'receita', valor: 70, data: hoje, formaPagamento: 'pix' },
  { id: 't2', descricao: 'Corte de Cabelo', cliente: 'Diego Prado', tipo: 'receita', valor: 45, data: hoje, formaPagamento: 'cartao' },
  { id: 't3', descricao: 'Compra de lâminas e produtos', tipo: 'despesa', valor: 90, data: hoje },
  { id: 't4', descricao: 'Barba Terapia', cliente: 'Lucas Oliveira', tipo: 'receita', valor: 35, data: hoje, formaPagamento: 'dinheiro' },
  { id: 't5', descricao: 'Platinado', cliente: 'Thiago Rocha', tipo: 'receita', valor: 160, data: hoje, formaPagamento: 'cartao' },
  { id: 't6', descricao: 'Corte de Cabelo', cliente: 'Bruno Farias', tipo: 'receita', valor: 45, data: hoje, formaPagamento: 'pix' },
  { id: 't7', descricao: 'Rateio diário de contas fixas', tipo: 'despesa', valor: 60, data: hoje },
]

export function servicoPorId(id: string): Servico | undefined {
  return servicos.find((s) => s.id === id)
}

export function formatarBRL(valor: number): string {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function resumoFinanceiro() {
  const receita = transacoes.filter((t) => t.tipo === 'receita').reduce((s, t) => s + t.valor, 0)
  const despesa = transacoes.filter((t) => t.tipo === 'despesa').reduce((s, t) => s + t.valor, 0)
  return { receita, despesa, lucro: receita - despesa }
}
