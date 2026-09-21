import Link from 'next/link'
import { Scissors } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Scissors className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-semibold uppercase tracking-widest">
            Navalha <span className="text-primary">&amp;</span> Cia
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#servicos" className="transition-colors hover:text-foreground">
            Serviços
          </a>
          <a href="#agendar" className="transition-colors hover:text-foreground">
            Agendar
          </a>
          <a href="#contato" className="transition-colors hover:text-foreground">
            Contato
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            render={<Link href="/dashboard" />}
            nativeButton={false}
            variant="ghost"
            size="sm"
            className="hidden sm:inline-flex"
          >
            Área do barbeiro
          </Button>
          <Button render={<a href="#agendar" />} nativeButton={false} size="sm">
            Agendar horário
          </Button>
        </div>
      </div>
    </header>
  )
}
