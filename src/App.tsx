import { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  Maximize,
  Menu,
  Minimize,
  X,
} from 'lucide-react'
import { NavLockProvider, useNavLock } from './components/primitives'
import {
  ActivitySlide,
  AgendaSlide,
  ClosingSlide,
  ColagenoSlide,
  CoverSlide,
  MapSlide,
  MonthDivider,
  PlanSlide,
  SepPlanSlide,
} from './components/slides'
import { AGENDA, AGOSTO, SEPTIEMBRE } from './data/content'

const TOTAL = 17

function useFullscreen() {
  const [on, setOn] = useState(false)
  useEffect(() => {
    const sync = () => setOn(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', sync)
    return () => document.removeEventListener('fullscreenchange', sync)
  }, [])
  const toggle = async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen()
    } else {
      await document.documentElement.requestFullscreen()
    }
  }
  return { on, toggle }
}

export default function App() {
  return (
    <NavLockProvider>
      <Presentation />
    </NavLockProvider>
  )
}

function Presentation() {
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)
  const [menu, setMenu] = useState(false)
  const [hint, setHint] = useState(true)
  const fs = useFullscreen()
  const { locked } = useNavLock()

  const goTo = useCallback((next: number) => {
    setIndex((current) => {
      const clamped = Math.max(0, Math.min(TOTAL - 1, next))
      setDir(clamped >= current ? 1 : -1)
      return clamped
    })
    setMenu(false)
  }, [])

  const next = useCallback(() => goTo(index + 1), [goTo, index])
  const prev = useCallback(() => goTo(index - 1), [goTo, index])

  useEffect(() => {
    const t = window.setTimeout(() => setHint(false), 4200)
    return () => window.clearTimeout(t)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      if (e.key === 'f' || e.key === 'F') {
        e.preventDefault()
        void fs.toggle()
        return
      }
      if (e.key === 'm' || e.key === 'M') {
        e.preventDefault()
        setMenu((v) => !v)
        return
      }
      if (e.key === 'Escape') {
        setMenu(false)
        return
      }
      if (locked) return
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault()
        next()
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault()
        prev()
      } else if (e.key === ' ') {
        e.preventDefault()
        next()
      } else if (e.key === 'Home') {
        e.preventDefault()
        goTo(0)
      } else if (e.key === 'End') {
        e.preventDefault()
        goTo(TOTAL - 1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [fs, goTo, locked, next, prev])

  const slides = useMemo(
    () => [
      <CoverSlide key="cover" />,
      <AgendaSlide key="agenda" goTo={goTo} />,
      <MonthDivider
        key="ago"
        month="Agosto 2026"
        title="Actividades de agosto"
        description="Capacitación, jornada de piel, volanteo y perifoneo en la zona."
        photo="photos/ago-pajuiles/01.jpg"
      />,
      ...AGOSTO.map((a) => <ActivitySlide key={a.id} {...a} />),
      <MonthDivider
        key="sep"
        month="Septiembre 2026"
        title="Actividades de septiembre"
        description="Día del niño, jornada médica, plan de acción, fiestas patrias y vallas."
        photo="photos/sep-fiesta/01.jpg"
      />,
      ...SEPTIEMBRE.slice(0, 2).map((a) => <ActivitySlide key={a.id} {...a} />),
      <SepPlanSlide key="sep-plan" />,
      ...SEPTIEMBRE.slice(2).map((a) => <ActivitySlide key={a.id} {...a} />),
      <ColagenoSlide key="colageno" />,
      <PlanSlide key="plan" />,
      <MapSlide key="map" />,
      <ClosingSlide key="close" goTo={goTo} />,
    ],
    [goTo],
  )

  const section =
    AGENDA.find((item, i) => {
      const start = item.index
      const end = AGENDA[i + 1]?.index ?? TOTAL
      return index >= start && index < end
    })?.label ?? (index === 0 ? 'Portada' : index === TOTAL - 1 ? 'Cierre' : '')

  return (
    <div className="relative h-dvh w-screen overflow-hidden bg-ink text-cream">
      <div className="absolute inset-0">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={index}
            custom={dir}
            initial={{ opacity: 0, x: dir * 36 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -28 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            {slides[index]}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between px-4 py-3 md:px-5 md:py-4">
        <p className="pointer-events-none text-[0.68rem] tracking-[0.2em] text-cream/45 uppercase">
          {String(index + 1).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')} · {section}
        </p>
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMenu(true)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 bg-ink/50"
            aria-label="Menú"
          >
            <Menu className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => void fs.toggle()}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 bg-ink/50"
            aria-label="Pantalla completa"
          >
            {fs.on ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div className="absolute right-3 bottom-3 left-3 z-20 flex items-center gap-3 md:right-5 md:bottom-5 md:left-5 md:gap-4">
        <button
          type="button"
          onClick={prev}
          disabled={index === 0}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cream/15 bg-ink/55 disabled:opacity-30 md:h-11 md:w-11"
          aria-label="Anterior"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex flex-1 items-center gap-1">
          {Array.from({ length: TOTAL }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              className={`progress-dot h-1 rounded-full ${
                i === index ? 'w-8 bg-leaf' : 'w-full bg-cream/20 hover:bg-cream/40'
              }`}
              aria-label={`Ir a diapositiva ${i + 1}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={next}
          disabled={index === TOTAL - 1}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cream/15 bg-ink/55 disabled:opacity-30 md:h-11 md:w-11"
          aria-label="Siguiente"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {hint ? (
        <div className="pointer-events-none absolute bottom-20 left-1/2 z-20 -translate-x-1/2 rounded-full border border-cream/10 bg-ink/70 px-4 py-2 text-xs text-cream/70">
          ← → navegar · F pantalla completa · M menú
        </div>
      ) : null}

      {menu ? (
        <div className="absolute inset-0 z-40 overflow-y-auto bg-ink/92 px-5 py-10 md:px-10 md:py-16">
          <div className="mx-auto flex h-full max-w-5xl flex-col">
            <div className="flex items-center justify-between">
              <p className="text-[0.7rem] tracking-[0.28em] text-gold uppercase">Menú principal</p>
              <button
                type="button"
                onClick={() => setMenu(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/15"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-3">
              <button
                type="button"
                onClick={() => goTo(0)}
                className="rounded-2xl border border-cream/10 bg-pine p-6 text-left hover:border-leaf/40"
              >
                <p className="text-gold">00</p>
                <p className="mt-6 text-xl">Portada</p>
              </button>
              {AGENDA.map((item, i) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => goTo(item.index)}
                  className="rounded-2xl border border-cream/10 bg-pine p-6 text-left hover:border-leaf/40"
                >
                  <p className="text-gold">{String(i + 1).padStart(2, '0')}</p>
                  <p className="mt-6 text-xl">{item.label}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
