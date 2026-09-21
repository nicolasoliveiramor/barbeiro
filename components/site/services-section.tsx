import { Clock } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { servicos, formatarBRL } from '@/lib/barbearia'

export function ServicesSection() {
  return (
    <section id="servicos" className="border-t border-border/60 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            Nossos serviços
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight text-balance sm:text-5xl">
            Cuidado do jeito que você merece
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty">
            Preços justos e transparentes. Escolha o serviço na hora de agendar.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {servicos.map((servico) => (
            <Card
              key={servico.id}
              className="group flex flex-col gap-4 border-border/60 bg-card p-6 transition-colors hover:border-primary/50"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-xl font-semibold uppercase tracking-wide">
                  {servico.nome}
                </h3>
                <span className="whitespace-nowrap font-display text-xl font-bold text-primary">
                  {formatarBRL(servico.preco)}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {servico.descricao}
              </p>
              <div className="mt-auto flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                <span>{servico.duracaoMin} min</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
