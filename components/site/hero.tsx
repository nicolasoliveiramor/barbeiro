import { Clock, MapPin, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/barbearia-hero.png"
          alt="Interior da barbearia Navalha & Cia"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
        <div className="max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <Star className="h-3.5 w-3.5 fill-primary text-primary" />
            <span>Avaliação 4,9 · mais de 1.200 cortes por ano</span>
          </div>

          <h1 className="font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight text-balance sm:text-6xl lg:text-7xl">
            Estilo afiado,
            <br />
            <span className="text-primary">na medida certa</span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground text-pretty">
            Corte, barba e cuidados masculinos com atendimento de verdade. Agende
            online em segundos e chegue na hora certa, sem fila.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              render={<a href="#agendar" />}
              nativeButton={false}
              size="lg"
              className="text-base"
            >
              Agendar meu horário
            </Button>
            <Button
              render={<a href="#servicos" />}
              nativeButton={false}
              size="lg"
              variant="outline"
              className="text-base"
            >
              Ver serviços
            </Button>
          </div>

          <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-4 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <dd className="text-muted-foreground">Ter a Sáb · 09h às 19h</dd>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <dd className="text-muted-foreground">Rua das Palmeiras, 210 — Centro</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
