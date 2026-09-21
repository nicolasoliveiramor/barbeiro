import { CalendarDays, Clock } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { StatusBadge } from '@/components/dashboard/status-badge'
import { agendamentos, horariosDisponiveis, servicoPorId, formatarBRL } from '@/lib/barbearia'

export default function AgendaPage() {
  const ordenados = [...agendamentos].sort((a, b) => a.hora.localeCompare(b.hora))
  const ocupados = new Set(ordenados.map((a) => a.hora))
  const livres = horariosDisponiveis.filter((h) => !ocupados.has(h))

  const hoje = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  })

  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold uppercase tracking-tight">Agenda</h1>
          <p className="mt-1 flex items-center gap-2 text-muted-foreground">
            <CalendarDays className="h-4 w-4 text-primary" />
            <span className="capitalize">{hoje}</span>
          </p>
        </div>
        <div className="flex gap-3 text-sm">
          <span className="rounded-md border border-border/60 bg-card px-3 py-1.5">
            {ordenados.length} agendados
          </span>
          <span className="rounded-md border border-border/60 bg-card px-3 py-1.5 text-muted-foreground">
            {livres.length} horários livres
          </span>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-border/60 bg-card p-0 lg:col-span-2">
          <ul className="flex flex-col divide-y divide-border/60">
            {ordenados.map((a) => {
              const servico = servicoPorId(a.servicoId)
              return (
                <li key={a.id} className="flex items-center gap-4 p-4 sm:px-6">
                  <div className="flex w-16 shrink-0 flex-col items-center">
                    <span className="font-display text-xl font-bold text-primary">{a.hora}</span>
                    <span className="text-xs text-muted-foreground">{servico?.duracaoMin}min</span>
                  </div>
                  <div className="h-10 w-px bg-border/60" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{a.cliente}</p>
                    <p className="truncate text-sm text-muted-foreground">{servico?.nome}</p>
                  </div>
                  <span className="hidden font-display font-semibold sm:block">
                    {servico ? formatarBRL(servico.preco) : ''}
                  </span>
                  <StatusBadge status={a.status} />
                </li>
              )
            })}
          </ul>
        </Card>

        <Card className="h-fit border-border/60 bg-card p-6">
          <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold uppercase tracking-wide">
            <Clock className="h-4 w-4 text-primary" />
            Horários livres
          </h2>
          {livres.length > 0 ? (
            <div className="grid grid-cols-3 gap-2">
              {livres.map((h) => (
                <span
                  key={h}
                  className="rounded-md border border-border/60 py-2 text-center text-sm text-muted-foreground"
                >
                  {h}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Agenda lotada por hoje.</p>
          )}
        </Card>
      </div>
    </div>
  )
}
