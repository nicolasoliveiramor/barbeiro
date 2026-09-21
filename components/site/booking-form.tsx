'use client'

import { useState } from 'react'
import { CircleCheckBig, Clock } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { servicos, horariosDisponiveis, formatarBRL, servicoPorId } from '@/lib/barbearia'

function hojeISO() {
  return new Date().toISOString().slice(0, 10)
}

export function BookingForm() {
  const [servicoId, setServicoId] = useState<string>('')
  const [data, setData] = useState<string>(hojeISO())
  const [hora, setHora] = useState<string>('')
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [enviado, setEnviado] = useState(false)

  const servicoSelecionado = servicoPorId(servicoId)
  const formValido = servicoId && data && hora && nome.trim() && telefone.trim()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!formValido) {
      toast.error('Preencha todos os campos para confirmar.')
      return
    }
    setEnviado(true)
    toast.success('Horário reservado! Enviaremos a confirmação por WhatsApp.')
  }

  if (enviado && servicoSelecionado) {
    return (
      <section id="agendar" className="border-t border-border/60 py-20 sm:py-24">
        <div className="mx-auto max-w-xl px-4 sm:px-6">
          <Card className="flex flex-col items-center gap-4 border-primary/40 bg-card p-8 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-primary">
              <CircleCheckBig className="h-7 w-7" />
            </span>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide">
              Horário reservado!
            </h2>
            <p className="text-muted-foreground text-pretty">
              {nome.split(' ')[0]}, seu horário de{' '}
              <span className="text-foreground">{servicoSelecionado.nome}</span> está
              marcado para{' '}
              <span className="text-foreground">
                {new Date(data + 'T00:00:00').toLocaleDateString('pt-BR')}
              </span>{' '}
              às <span className="text-foreground">{hora}</span>.
            </p>
            <p className="text-sm text-muted-foreground">
              Você receberá a confirmação no WhatsApp {telefone}.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setEnviado(false)
                setServicoId('')
                setHora('')
                setNome('')
                setTelefone('')
              }}
            >
              Fazer outro agendamento
            </Button>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section id="agendar" className="border-t border-border/60 py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mb-10 text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            Agendamento
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight text-balance sm:text-5xl">
            Reserve seu horário
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty">
            Leva menos de um minuto. Escolha o serviço, o dia e o horário.
          </p>
        </div>

        <Card className="border-border/60 bg-card p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <fieldset className="flex flex-col gap-3">
              <legend className="mb-1 text-sm font-medium">1. Escolha o serviço</legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {servicos.map((servico) => (
                  <button
                    key={servico.id}
                    type="button"
                    onClick={() => setServicoId(servico.id)}
                    className={cn(
                      'flex items-center justify-between rounded-lg border p-4 text-left transition-colors',
                      servicoId === servico.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border/60 hover:border-primary/40',
                    )}
                  >
                    <span>
                      <span className="block text-sm font-medium">{servico.nome}</span>
                      <span className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" /> {servico.duracaoMin} min
                      </span>
                    </span>
                    <span className="font-display font-semibold text-primary">
                      {formatarBRL(servico.preco)}
                    </span>
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="flex flex-col gap-3">
              <legend className="mb-1 text-sm font-medium">2. Escolha o dia e horário</legend>
              <div className="grid gap-4 sm:grid-cols-[200px_1fr]">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="data">Data</Label>
                  <Input
                    id="data"
                    type="date"
                    min={hojeISO()}
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label>Horário</Label>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {horariosDisponiveis.map((h) => (
                      <button
                        key={h}
                        type="button"
                        onClick={() => setHora(h)}
                        className={cn(
                          'rounded-md border py-2 text-sm transition-colors',
                          hora === h
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-border/60 hover:border-primary/40',
                        )}
                      >
                        {h}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </fieldset>

            <fieldset className="flex flex-col gap-3">
              <legend className="mb-1 text-sm font-medium">3. Seus dados</legend>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="nome">Nome completo</Label>
                  <Input
                    id="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Seu nome"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="telefone">WhatsApp</Label>
                  <Input
                    id="telefone"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    placeholder="(11) 90000-0000"
                  />
                </div>
              </div>
            </fieldset>

            <div className="flex flex-col items-center gap-3 border-t border-border/60 pt-6 sm:flex-row sm:justify-between">
              <p className="text-sm text-muted-foreground">
                {servicoSelecionado ? (
                  <>
                    Total:{' '}
                    <span className="font-display text-lg font-semibold text-foreground">
                      {formatarBRL(servicoSelecionado.preco)}
                    </span>
                  </>
                ) : (
                  'Selecione um serviço para ver o valor.'
                )}
              </p>
              <Button type="submit" size="lg" disabled={!formValido} className="w-full sm:w-auto">
                Confirmar agendamento
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </section>
  )
}
