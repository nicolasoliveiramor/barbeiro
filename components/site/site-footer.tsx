import { Scissors, MapPin, Phone, Clock } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer id="contato" className="border-t border-border/60 bg-sidebar">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Scissors className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-semibold uppercase tracking-widest">
              Navalha <span className="text-primary">&amp;</span> Cia
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Tradição e estilo em cada corte. Atendimento com hora marcada para você
            não perder tempo.
          </p>
        </div>

        <div className="space-y-3 text-sm">
          <h3 className="font-display font-semibold uppercase tracking-wide">Contato</h3>
          <p className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" /> Rua das Palmeiras, 210 — Centro
          </p>
          <p className="flex items-center gap-2 text-muted-foreground">
            <Phone className="h-4 w-4 text-primary" /> (11) 4002-8922
          </p>
        </div>

        <div className="space-y-3 text-sm">
          <h3 className="font-display font-semibold uppercase tracking-wide">Horário</h3>
          <p className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4 text-primary" /> Terça a Sábado · 09h às 19h
          </p>
          <p className="text-muted-foreground">Domingo e Segunda · Fechado</p>
        </div>
      </div>

      <div className="border-t border-border/60 py-6">
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Navalha &amp; Cia. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
