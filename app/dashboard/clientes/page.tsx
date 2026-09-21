import { Users, Star, TrendingUp } from 'lucide-react'
import { StatCard } from '@/components/dashboard/stat-card'
import { ClientesTable } from '@/components/dashboard/clientes-table'
import { clientes, formatarBRL } from '@/lib/barbearia'

export default function ClientesPage() {
  const ordenados = [...clientes].sort((a, b) => b.totalGasto - a.totalGasto)
  const totalGasto = clientes.reduce((s, c) => s + c.totalGasto, 0)
  const maisFiel = ordenados[0]

  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-8">
        <h1 className="font-display text-3xl font-bold uppercase tracking-tight">Clientes</h1>
        <p className="mt-1 text-muted-foreground">
          Histórico e preferências de quem passa pela cadeira.
        </p>
      </header>

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard titulo="Total de clientes" valor={String(clientes.length)} icone={Users} />
        <StatCard
          titulo="Cliente mais fiel"
          valor={maisFiel.nome.split(' ')[0]}
          icone={Star}
          detalhe={`${maisFiel.totalVisitas} visitas`}
          tom="positivo"
        />
        <StatCard
          titulo="Receita da base"
          valor={formatarBRL(totalGasto)}
          icone={TrendingUp}
          detalhe="Acumulado de todos os clientes"
        />
      </div>

      <ClientesTable clientes={ordenados} />
    </div>
  )
}
