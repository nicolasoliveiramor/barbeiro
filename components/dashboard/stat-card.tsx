import type { LucideIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type StatCardProps = {
  titulo: string
  valor: string
  icone: LucideIcon
  detalhe?: string
  tom?: 'padrao' | 'positivo' | 'negativo'
}

export function StatCard({ titulo, valor, icone: Icon, detalhe, tom = 'padrao' }: StatCardProps) {
  return (
    <Card className="flex flex-col gap-3 border-border/60 bg-card p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{titulo}</span>
        <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Icon className="h-4.5 w-4.5" />
        </span>
      </div>
      <span className="font-display text-3xl font-bold tracking-tight">{valor}</span>
      {detalhe ? (
        <span
          className={cn(
            'text-xs',
            tom === 'positivo' && 'text-primary',
            tom === 'negativo' && 'text-destructive',
            tom === 'padrao' && 'text-muted-foreground',
          )}
        >
          {detalhe}
        </span>
      ) : null}
    </Card>
  )
}
