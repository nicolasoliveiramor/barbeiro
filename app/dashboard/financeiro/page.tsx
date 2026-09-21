import { Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { StatCard } from '@/components/dashboard/stat-card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { transacoes, resumoFinanceiro, formatarBRL } from '@/lib/barbearia'

const formaLabel: Record<string, string> = {
  pix: 'Pix',
  cartao: 'Cartão',
  dinheiro: 'Dinheiro',
}

export default function FinanceiroPage() {
  const { receita, despesa, lucro } = resumoFinanceiro()

  const receitas = transacoes.filter((t) => t.tipo === 'receita')
  const porForma = ['pix', 'cartao', 'dinheiro'].map((forma) => {
    const total = receitas
      .filter((t) => t.formaPagamento === forma)
      .reduce((s, t) => s + t.valor, 0)
    return { forma, total, pct: receita > 0 ? Math.round((total / receita) * 100) : 0 }
  })

  const ordenadas = [...transacoes].sort((a, b) => a.descricao.localeCompare(b.descricao))

  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-8">
        <h1 className="font-display text-3xl font-bold uppercase tracking-tight">Financeiro</h1>
        <p className="mt-1 text-muted-foreground">
          Entradas e saídas do dia, com fechamento automático.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          titulo="Receita"
          valor={formatarBRL(receita)}
          icone={ArrowUpRight}
          detalhe={`${receitas.length} atendimentos pagos`}
          tom="positivo"
        />
        <StatCard
          titulo="Despesas"
          valor={formatarBRL(despesa)}
          icone={ArrowDownRight}
          detalhe="Insumos e contas"
          tom="negativo"
        />
        <StatCard
          titulo="Lucro do dia"
          valor={formatarBRL(lucro)}
          icone={Wallet}
          detalhe="Receita menos despesas"
          tom="positivo"
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-5">
        <Card className="border-border/60 bg-card p-6 lg:col-span-2">
          <h2 className="mb-5 font-display text-lg font-semibold uppercase tracking-wide">
            Formas de pagamento
          </h2>
          <div className="flex flex-col gap-5">
            {porForma.map((f) => (
              <div key={f.forma} className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{formaLabel[f.forma]}</span>
                  <span className="text-muted-foreground">
                    {formatarBRL(f.total)} · {f.pct}%
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${f.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="border-border/60 bg-card p-0 lg:col-span-3">
          <div className="border-b border-border/60 px-6 py-4">
            <h2 className="font-display text-lg font-semibold uppercase tracking-wide">
              Movimentações
            </h2>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Descrição</TableHead>
                <TableHead className="hidden sm:table-cell">Forma</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ordenadas.map((t) => (
                <TableRow key={t.id}>
                  <TableCell>
                    <p className="font-medium">{t.descricao}</p>
                    <p className="text-xs text-muted-foreground">{t.cliente ?? 'Despesa'}</p>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {t.formaPagamento ? (
                      <Badge variant="outline" className="border-border/60 text-muted-foreground">
                        {formaLabel[t.formaPagamento]}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell
                    className={
                      t.tipo === 'receita'
                        ? 'text-right font-medium text-primary'
                        : 'text-right font-medium text-destructive'
                    }
                  >
                    {t.tipo === 'receita' ? '+' : '−'}
                    {formatarBRL(t.valor)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  )
}
