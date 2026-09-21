'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { type Cliente, servicoPorId, formatarBRL } from '@/lib/barbearia'

function iniciais(nome: string) {
  return nome
    .split(' ')
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase()
}

export function ClientesTable({ clientes }: { clientes: Cliente[] }) {
  const [busca, setBusca] = useState('')

  const filtrados = clientes.filter((c) => {
    const termo = busca.toLowerCase().trim()
    if (!termo) return true
    return c.nome.toLowerCase().includes(termo) || c.telefone.includes(termo)
  })

  return (
    <Card className="border-border/60 bg-card p-0">
      <div className="border-b border-border/60 p-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por nome ou telefone"
            aria-label="Buscar por nome ou telefone"
            className="pl-9"
          />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Cliente</TableHead>
            <TableHead className="hidden sm:table-cell">Telefone</TableHead>
            <TableHead className="hidden md:table-cell">Último serviço</TableHead>
            <TableHead className="text-center">Visitas</TableHead>
            <TableHead className="text-right">Total gasto</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtrados.map((c) => (
            <TableRow key={c.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary/10 text-xs font-medium text-primary">
                      {iniciais(c.nome)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="truncate font-medium">{c.nome}</p>
                    {c.observacao ? (
                      <p className="truncate text-xs text-muted-foreground">{c.observacao}</p>
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        Cliente desde {new Date(c.desde + 'T00:00:00').getFullYear()}
                      </p>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden text-muted-foreground sm:table-cell">
                {c.telefone}
              </TableCell>
              <TableCell className="hidden text-muted-foreground md:table-cell">
                {servicoPorId(c.ultimoServicoId)?.nome}
              </TableCell>
              <TableCell className="text-center">{c.totalVisitas}</TableCell>
              <TableCell className="text-right font-medium">
                {formatarBRL(c.totalGasto)}
              </TableCell>
            </TableRow>
          ))}
          {filtrados.length === 0 && (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={5} className="py-10 text-center text-muted-foreground">
                Nenhum cliente encontrado para “{busca}”.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  )
}
