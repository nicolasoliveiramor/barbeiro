import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { StatusAgendamento } from '@/lib/barbearia'

const config: Record<StatusAgendamento, { label: string; className: string }> = {
  confirmado: {
    label: 'Confirmado',
    className: 'border-primary/40 bg-primary/10 text-primary',
  },
  pendente: {
    label: 'Pendente',
    className: 'border-border bg-muted text-muted-foreground',
  },
  concluido: {
    label: 'Concluído',
    className: 'border-transparent bg-secondary text-secondary-foreground',
  },
  cancelado: {
    label: 'Cancelado',
    className: 'border-destructive/40 bg-destructive/10 text-destructive',
  },
}

export function StatusBadge({ status }: { status: StatusAgendamento }) {
  const { label, className } = config[status]
  return (
    <Badge variant="outline" className={cn('font-medium', className)}>
      {label}
    </Badge>
  )
}
