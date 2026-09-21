'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Wallet,
  Scissors,
  LogOut,
  Menu,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

const links = [
  { href: '/dashboard', label: 'Visão geral', icon: LayoutDashboard },
  { href: '/dashboard/agenda', label: 'Agenda', icon: CalendarDays },
  { href: '/dashboard/clientes', label: 'Clientes', icon: Users },
  { href: '/dashboard/financeiro', label: 'Financeiro', icon: Wallet },
]

function Brand() {
  return (
    <Link href="/dashboard" className="flex items-center gap-2 px-2">
      <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
        <Scissors className="h-5 w-5" />
      </span>
      <span className="font-display text-base font-semibold uppercase tracking-widest">
        Navalha <span className="text-primary">&amp;</span> Cia
      </span>
    </Link>
  )
}

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar md:flex">
      <div className="flex h-16 items-center border-b border-sidebar-border">
        <Brand />
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3">
        {links.map((link) => {
          const active =
            pathname === link.href ||
            (link.href !== '/dashboard' && pathname.startsWith(link.href))
          const Icon = link.icon
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                active
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground',
              )}
            >
              <Icon className={cn('h-4.5 w-4.5', active && 'text-primary')} />
              {link.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <Button
          render={<Link href="/" />}
          nativeButton={false}
          variant="ghost"
          className="w-full justify-start text-muted-foreground"
        >
          <LogOut className="h-4 w-4" />
          Voltar ao site
        </Button>
      </div>
    </aside>
  )
}

export function DashboardMobileNav() {
  const pathname = usePathname()
  const current = links.find(
    (l) => pathname === l.href || (l.href !== '/dashboard' && pathname.startsWith(l.href)),
  )

  return (
    <div className="flex h-16 items-center justify-between border-b border-sidebar-border bg-sidebar px-4 md:hidden">
      <Brand />
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>
          <Menu className="h-4 w-4" />
          {current?.label ?? 'Menu'}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {links.map((link) => (
            <DropdownMenuItem key={link.href} render={<Link href={link.href} />}>
              <link.icon className="h-4 w-4" />
              {link.label}
            </DropdownMenuItem>
          ))}
          <DropdownMenuItem render={<Link href="/" />}>
            <LogOut className="h-4 w-4" />
            Voltar ao site
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
