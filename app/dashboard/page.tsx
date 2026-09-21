import { Wallet, CalendarDays, Users, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { StatCard } from '@/components/dashboard/stat-card'
import { StatusBadge } from '@/components/dashboard/status-badge'
import {
  agendamentos,
  clientes,
  transacoes,
  servicoPorId,
  resumoFinanceiro,
  formatarBRL,
} from '@/lib/barbearia'

export default function DashboardPage() {
  const { receita, lucro } = resumoFinanceiro()
  const totalHoje = agendamentos.length
  const concluidos = agendamentos.filter((a) => a.status === 'concluido').length
  const ticketMedio = receita / transacoes.filter((t) => t.tipo === 'receita').length

  const proximos = agendamentos
    .filter((a) => a.status === 'confirmado' || a.status === 'pendente')
    .sort((a, b) => a.hora.localeCompare(b.hora))

  const movimentacoes = [...transacoes].sort((a, b) => b.valor - a.valor).slice(0, 6)

  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-8">
        <h1 className="font-display text-3xl font-bold uppercase tracking-tight">Visão geral</h1>
        <p className="mt-1 text-muted-foreground">
          Resumo do movimento de hoje, {new Date().toLocaleDateString('pt-BR', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
          })}
          .
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          titulo="Faturamento de hoje"
          valor={formatarBRL(receita)}
          icone={Wallet}
          detalhe={`Lucro líquido ${formatarBRL(lucro)}`}
          tom="positivo"
        />
        <StatCard
          titulo="Agendamentos hoje"
          valor={String(totalHoje)}
          icone={CalendarDays}
          detalhe={`${concluidos} concluídos · ${totalHoje - concluidos} restantes`}
        />
        <StatCard
          titulo="Clientes cadastrados"
          valor={String(clientes.length)}
          icone={Users}
          detalhe="Base de clientes ativa"
        />
        <StatCard
          titulo="Ticket médio"
          valor={formatarBRL(ticketMedio)}
          icone={TrendingUp}
          detalhe="Por atendimento"
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-5">
        <Card className="border-border/60 bg-card p-6 lg:col-span-3">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold uppercase tracking-wide">
              Próximos atendimentos
            </h2>
            <span className="text-sm text-muted-foreground">{proximos.length} na fila</span>
          </div>
          <ul className="flex flex-col divide-y divide-border/60">
            {proximos.map((a) => {
              const servico = servicoPorId(a.servicoId)
              return (
                <li key={a.id} className="flex items-center gap-4 py-3">
                  <span className="w-14 shrink-0 font-display text-lg font-semibold text-primary">
                    {a.hora}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{a.cliente}</p>
                    <p className="truncate text-sm text-muted-foreground">
                      {servico?.nome} · {servico?.duracaoMin} min
                    </p>
                  </div>
                  <StatusBadge status={a.status} />
                </li>
              )
            })}
          </ul>
        </Card>

        <Card className="border-border/60 bg-card p-6 lg:col-span-2">
          <h2 className="mb-5 font-display text-lg font-semibold uppercase tracking-wide">
            Movimentações do dia
          </h2>
          <ul className="flex flex-col divide-y divide-border/60">
            {movimentacoes.map((t) => (
              <li key={t.id} className="flex items-center gap-3 py-3">
                <span
                  className={
                    t.tipo === 'receita'
                      ? 'flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary'
                      : 'flex h-8 w-8 items-center justify-center rounded-full bg-destructive/10 text-destructive'
                  }
                >
                  {t.tipo === 'receita' ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{t.descricao}</p>
                  {t.cliente ? (
                    <p className="truncate text-xs text-muted-foreground">{t.cliente}</p>
                  ) : (
                    <p className="truncate text-xs text-muted-foreground">Despesa</p>
                  )}
                </div>
                <span
                  className={
                    t.tipo === 'receita'
                      ? 'font-medium text-primary'
                      : 'font-medium text-destructive'
                  }
                >
                  {t.tipo === 'receita' ? '+' : '−'}
                  {formatarBRL(t.valor)}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  )
}
