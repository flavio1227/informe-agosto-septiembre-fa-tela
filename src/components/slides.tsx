import { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Expand } from 'lucide-react'
import {
  AGENDA,
  COLAGENO,
  MAPS_EMBED,
  META,
  OCT_ACT,
  NOV_ACT,
  PLAN,
  SEP_PLAN,
  asset,
  type Photo,
} from '../data/content'
import { Kicker, Lightbox, Title, useLightbox } from './primitives'

type GoTo = (index: number) => void

// ---------- Carrusel de fotografías ----------
export function Carousel({ photos, className = '' }: { photos: Photo[]; className?: string }) {
  const [i, setI] = useState(0)
  const [dir, setDir] = useState(1)
  const box = useLightbox(photos.length)
  const total = photos.length
  const go = useCallback(
    (next: number) => {
      setDir(next >= i ? 1 : -1)
      setI(((next % total) + total) % total)
    },
    [i, total],
  )
  const photo = photos[i]

  return (
    <div className={`flex min-h-0 flex-col ${className}`}>
      <div className="group/car relative min-h-0 flex-1 overflow-hidden rounded-2xl bg-ink">
        <AnimatePresence mode="popLayout" custom={dir} initial={false}>
          <motion.div
            key={photo.src}
            custom={dir}
            initial={{ opacity: 0, x: dir * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -60 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <img
              src={photo.src}
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full scale-110 object-cover opacity-35 blur-2xl"
            />
            <img
              src={photo.src}
              alt={photo.caption}
              className="absolute inset-0 m-auto max-h-full max-w-full cursor-zoom-in object-contain"
              onClick={() => box.open(i)}
            />
          </motion.div>
        </AnimatePresence>
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink/85 via-transparent to-ink/25" />

        {total > 1 ? (
          <>
            <button
              type="button"
              onClick={() => go(i - 1)}
              aria-label="Foto anterior"
              className="absolute top-1/2 left-3 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-ink/60 text-cream backdrop-blur transition hover:bg-ink/85 md:h-11 md:w-11"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(i + 1)}
              aria-label="Foto siguiente"
              className="absolute top-1/2 right-3 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-ink/60 text-cream backdrop-blur transition hover:bg-ink/85 md:h-11 md:w-11"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        ) : null}

        <div className="absolute right-4 bottom-4 left-4 z-10 flex items-end justify-between gap-3">
          <p className="min-w-0 flex-1 text-sm leading-snug text-cream/95 md:text-base">
            {photo.caption}
          </p>
          <button
            type="button"
            onClick={() => box.open(i)}
            aria-label="Ampliar foto"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink/60 text-cream backdrop-blur transition hover:bg-ink/85"
          >
            <Expand className="h-4 w-4" />
          </button>
        </div>

        {total > 1 ? (
          <p className="absolute top-4 right-4 z-10 rounded-full bg-ink/60 px-3 py-1 text-xs font-medium text-cream/90 backdrop-blur">
            {i + 1} / {total}
          </p>
        ) : null}
      </div>

      {total > 1 ? (
        <div className="mt-3 flex items-center justify-center gap-1.5">
          {photos.map((p, d) => (
            <button
              key={p.src}
              type="button"
              onClick={() => go(d)}
              aria-label={`Ir a foto ${d + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                d === i ? 'w-6 bg-leaf' : 'w-1.5 bg-cream/25 hover:bg-cream/45'
              }`}
            />
          ))}
        </div>
      ) : null}

      {box.index !== null ? (
        <Lightbox
          photos={photos}
          index={box.index}
          onClose={box.close}
          onPrev={box.prev}
          onNext={box.next}
        />
      ) : null}
    </div>
  )
}

export function ActivitySlide({
  kicker,
  title,
  subtitle,
  description,
  photos,
}: {
  kicker: string
  title: string
  subtitle: string
  description: string
  photos: Photo[]
}) {
  return (
    <div className="slide-safe flex h-full flex-col">
      <Kicker>{kicker}</Kicker>
      <Title>{title}</Title>
      <p className="mt-1 text-base text-gold/90 md:text-lg">{subtitle}</p>
      <p className="mt-2 max-w-3xl text-sm text-cream/75 md:text-base">{description}</p>
      <Carousel photos={photos} className="mt-4 flex-1 md:mt-5" />
    </div>
  )
}

export function CoverSlide() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <img
        src={asset('photos/sep-fiesta/01.jpg')}
        alt="Farmacias del Ahorro zona Tela"
        className="absolute inset-0 h-full w-full object-cover object-[center_25%]"
      />
      <div className="absolute inset-0 bg-linear-to-r from-ink via-ink/80 to-ink/30" />
      <div className="absolute inset-0 bg-linear-to-t from-ink/90 via-transparent to-ink/25" />
      <div className="slide-safe relative z-10 flex h-full flex-col justify-between">
        <div className="flex items-center gap-3">
          <img src={asset('logo-fa.png')} alt="Farmacias del Ahorro" className="h-10 w-10 rounded-md md:h-12 md:w-12" />
          <div>
            <p className="text-xs font-medium tracking-[0.22em] text-leaf uppercase md:text-sm">
              {META.pharmacy}
            </p>
            <p className="text-[0.68rem] text-mute md:text-xs">
              {META.zone} · {META.stores.join(' y ')}
            </p>
          </div>
        </div>
        <div className="max-w-3xl">
          <p className="text-[0.7rem] font-medium tracking-[0.32em] text-gold uppercase md:text-[0.78rem]">
            Presentación ejecutiva
          </p>
          <h1 className="font-display mt-3 text-[clamp(2.6rem,7vw,6.1rem)] leading-[0.95] font-semibold">
            Informe de
            <br />
            actividades
          </h1>
          <p className="font-display mt-4 text-2xl text-leaf italic md:text-4xl">
            {META.period} {META.year}
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-cream/80 md:mt-6 md:text-base">
            Capacitación, jornadas, volanteo, degustación de colágeno y presencia de marca, con el plan hasta noviembre.
          </p>
        </div>
        <p className="text-[0.65rem] tracking-[0.18em] text-mute uppercase md:text-xs">
          FA {META.stores.join(' · ')} · Tela, Honduras
        </p>
      </div>
    </div>
  )
}

export function AgendaSlide({ goTo }: { goTo: GoTo }) {
  return (
    <div className="slide-safe flex h-full flex-col">
      <Kicker>{META.period}</Kicker>
      <Title>Agenda</Title>
      <p className="mt-3 max-w-2xl text-sm text-cream/70 md:text-base">
        Un recorrido por las actividades de agosto a noviembre. Pulse cualquier bloque para saltar.
      </p>
      <div className="mt-6 grid flex-1 grid-cols-2 gap-3 md:mt-8 md:gap-4 lg:grid-cols-3">
        {AGENDA.map((item, i) => (
          <button
            key={item.label}
            type="button"
            onClick={() => goTo(item.index)}
            className="group flex flex-col justify-between rounded-2xl border border-cream/10 bg-pine/70 p-4 text-left transition hover:border-leaf/50 hover:bg-forest md:p-6"
          >
            <span className="font-display text-3xl text-gold/80 md:text-4xl">0{i + 1}</span>
            <span className="mt-6 text-base font-medium text-cream group-hover:text-leaf md:mt-8 md:text-xl">
              {item.label}
            </span>
          </button>
        ))}
      </div>
      <p className="mt-4 hidden text-xs text-mute md:mt-6 md:block">
        Teclado: ← → espacio · F pantalla completa · M menú
      </p>
    </div>
  )
}

export function MonthDivider({
  month,
  title,
  description,
  photo,
}: {
  month: string
  title: string
  description: string
  photo?: string
}) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {photo ? (
        <img src={asset(photo)} alt="" className="absolute inset-0 h-full w-full object-cover" />
      ) : null}
      <div
        className={`absolute inset-0 ${
          photo ? 'bg-ink/72' : 'bg-linear-to-br from-pine via-ink to-forest'
        }`}
      />
      <div className="slide-safe relative z-10 flex h-full flex-col justify-center">
        <p className="text-[0.7rem] tracking-[0.32em] text-gold uppercase md:text-[0.78rem]">{month}</p>
        <h1 className="font-display mt-3 max-w-3xl text-[clamp(2.2rem,6vw,5rem)] leading-[1.02]">
          {title}
        </h1>
        <p className="mt-4 max-w-xl text-base text-cream/80 md:mt-5 md:text-lg">{description}</p>
      </div>
    </div>
  )
}

function StatusPill({ estado }: { estado: string }) {
  const done = estado === 'Ejecutado' || estado === 'Completado'
  return (
    <span
      className={`inline-flex rounded-full px-2 py-0.5 text-[0.65rem] font-medium whitespace-nowrap md:text-[0.68rem] ${
        done ? 'bg-fa/20 text-leaf' : 'bg-gold/15 text-gold'
      }`}
    >
      {estado}
    </span>
  )
}

export function SepPlanSlide() {
  const docPhoto: Photo[] = [
    { src: asset('photos/sep-plan/01.jpg'), caption: 'Documento del plan de acción de septiembre.' },
  ]
  return (
    <div className="slide-safe flex h-full flex-col overflow-y-auto">
      <Kicker>Septiembre</Kicker>
      <Title>{SEP_PLAN.title}</Title>
      <p className="mt-1 text-base text-gold/90 md:text-lg">{SEP_PLAN.subtitle}</p>
      <div className="mt-4 grid min-h-0 flex-1 grid-cols-1 gap-4 md:mt-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="min-w-0 overflow-auto rounded-2xl border border-cream/10">
          <table className="tbl w-full">
            <thead className="sticky top-0 bg-pine">
              <tr className="text-left">
                <th className="px-3 py-2.5 font-medium text-cream/70">Zona a volantear</th>
                <th className="px-3 py-2.5 font-medium text-cream/70">Fecha</th>
                <th className="px-3 py-2.5 text-right font-medium text-cream/70">Volantes</th>
                <th className="hidden px-3 py-2.5 text-right font-medium text-cream/70 sm:table-cell">Habitantes</th>
                <th className="px-3 py-2.5 font-medium text-cream/70">Estado</th>
              </tr>
            </thead>
            <tbody>
              {SEP_PLAN.zonas.map((z) => (
                <tr key={z.zona} className="border-t border-cream/8">
                  <td className="px-3 py-2">{z.zona}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-cream/70">{z.fecha}</td>
                  <td className="px-3 py-2 text-right">{z.volantes.toLocaleString('es-HN')}</td>
                  <td className="hidden px-3 py-2 text-right text-cream/70 sm:table-cell">
                    {z.habitantes != null ? z.habitantes.toLocaleString('es-HN') : '—'}
                  </td>
                  <td className="px-3 py-2"><StatusPill estado={z.estado} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="border-t border-cream/10 px-3 py-3">
            <p className="mb-2 text-[0.68rem] font-medium tracking-[0.2em] text-gold uppercase">
              Actividades adicionales · FA42
            </p>
            <ul className="space-y-1.5">
              {SEP_PLAN.actividades.map((a) => (
                <li key={a.nombre} className="flex items-start justify-between gap-3 text-sm">
                  <span className="min-w-0">
                    <span className="text-cream">{a.nombre}</span>
                    <span className="block text-xs text-cream/55">{a.detalle}</span>
                  </span>
                  <StatusPill estado={a.estado} />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Carousel photos={docPhoto} className="min-h-[220px]" />
      </div>
    </div>
  )
}

export function OctPlanSlide() {
  const zonas = PLAN.zonas.filter((z) => z.mes === 'Octubre')
  const presupuesto = PLAN.presupuesto.find((p) => p.mes === 'Octubre')
  return (
    <div className="slide-safe flex h-full flex-col overflow-y-auto">
      <Kicker>Octubre</Kicker>
      <Title>Plan de acción · octubre</Title>
      <p className="mt-1 text-base text-gold/90 md:text-lg">
        Zona Tela Atlántida · Enfoque domicilio y venta local
      </p>
      <div className="mt-4 grid min-h-0 flex-1 grid-cols-1 gap-4 md:mt-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="min-w-0 overflow-auto rounded-2xl border border-cream/10">
          <table className="tbl w-full">
            <thead className="sticky top-0 bg-pine">
              <tr className="text-left">
                <th className="px-3 py-2.5 font-medium text-cream/70">Zona a volantear</th>
                <th className="px-3 py-2.5 font-medium text-cream/70">Fecha</th>
                <th className="px-3 py-2.5 text-right font-medium text-cream/70">Volantes</th>
                <th className="hidden px-3 py-2.5 text-right font-medium text-cream/70 sm:table-cell">Habitantes</th>
                <th className="px-3 py-2.5 font-medium text-cream/70">Estado</th>
              </tr>
            </thead>
            <tbody>
              {zonas.map((z) => (
                <tr key={z.zona} className="border-t border-cream/8">
                  <td className="px-3 py-2">{z.zona}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-cream/70">{z.fecha}</td>
                  <td className="px-3 py-2 text-right">{z.volantes.toLocaleString('es-HN')}</td>
                  <td className="hidden px-3 py-2 text-right text-cream/70 sm:table-cell">
                    {z.habitantes != null ? z.habitantes.toLocaleString('es-HN') : '—'}
                  </td>
                  <td className="px-3 py-2"><StatusPill estado={z.estado} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="border-t border-cream/10 px-3 py-3">
            <p className="mb-2 text-[0.68rem] font-medium tracking-[0.2em] text-gold uppercase">
              Actividades adicionales · FA42
            </p>
            <ul className="space-y-1.5">
              {OCT_ACT.map((a) => (
                <li key={a.nombre} className="flex items-start justify-between gap-3 text-sm">
                  <span className="min-w-0">
                    <span className="text-cream">{a.nombre}</span>
                    <span className="block text-xs text-cream/55">
                      {a.fecha} · {a.detalle}
                    </span>
                  </span>
                  <StatusPill estado={a.estado} />
                </li>
              ))}
            </ul>
          </div>
        </div>
        {presupuesto ? (
          <div className="min-w-0 overflow-auto rounded-2xl border border-cream/10">
            <div className="bg-pine px-4 py-3">
              <p className="text-xs text-mute">Presupuesto octubre 2026</p>
              <p className="kpi-number mt-0.5 text-2xl text-leaf md:text-3xl">
                L {presupuesto.total.toLocaleString('es-HN')}
              </p>
            </div>
            <table className="tbl w-full">
              <thead>
                <tr className="bg-pine/60 text-left">
                  <th className="px-4 py-2.5 font-medium text-cream/70">Concepto</th>
                  <th className="px-4 py-2.5 text-right font-medium text-cream/70">P. unitario</th>
                  <th className="px-4 py-2.5 text-right font-medium text-cream/70">Cantidad</th>
                  <th className="px-4 py-2.5 text-right font-medium text-cream/70">Valor</th>
                </tr>
              </thead>
              <tbody>
                {presupuesto.items.map((it) => (
                  <tr key={it.concepto} className="border-t border-cream/8">
                    <td className="px-4 py-2">{it.concepto}</td>
                    <td className="px-4 py-2 text-right text-cream/70">L {it.precio.toLocaleString('es-HN')}</td>
                    <td className="px-4 py-2 text-right text-cream/70">{it.cantidad}</td>
                    <td className="px-4 py-2 text-right font-medium">L {it.valor.toLocaleString('es-HN')}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-leaf/30 bg-fa/10">
                  <td className="px-4 py-2.5 font-medium" colSpan={3}>Total</td>
                  <td className="px-4 py-2.5 text-right font-semibold text-leaf">
                    L {presupuesto.total.toLocaleString('es-HN')}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export function NovPlanSlide() {
  const zonas = PLAN.zonas.filter((z) => z.mes === 'Noviembre')
  return (
    <div className="slide-safe flex h-full flex-col overflow-y-auto">
      <Kicker>Noviembre</Kicker>
      <Title>Plan de acción · noviembre</Title>
      <p className="mt-1 text-base text-gold/90 md:text-lg">
        Zona Tela Atlántida · Enfoque domicilio y venta local
      </p>
      <div className="mt-4 grid min-h-0 flex-1 grid-cols-1 gap-4 md:mt-5 lg:grid-cols-2">
        <div className="min-w-0 overflow-auto rounded-2xl border border-cream/10">
          <table className="tbl w-full">
            <thead className="sticky top-0 bg-pine">
              <tr className="text-left">
                <th className="px-3 py-2.5 font-medium text-cream/70">Zona a volantear</th>
                <th className="px-3 py-2.5 font-medium text-cream/70">Fecha</th>
                <th className="px-3 py-2.5 text-right font-medium text-cream/70">Volantes</th>
                <th className="px-3 py-2.5 text-right font-medium text-cream/70">Colab.</th>
                <th className="px-3 py-2.5 font-medium text-cream/70">Estado</th>
              </tr>
            </thead>
            <tbody>
              {zonas.map((z) => (
                <tr key={z.zona} className="border-t border-cream/8">
                  <td className="px-3 py-2">{z.zona}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-cream/70">{z.fecha}</td>
                  <td className="px-3 py-2 text-right">{z.volantes.toLocaleString('es-HN')}</td>
                  <td className="px-3 py-2 text-right text-cream/70">{z.colaboradores}</td>
                  <td className="px-3 py-2"><StatusPill estado={z.estado} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="min-w-0 overflow-auto rounded-2xl border border-cream/10">
          <div className="bg-pine px-4 py-3">
            <p className="text-[0.68rem] font-medium tracking-[0.2em] text-gold uppercase">
              Actividades adicionales · FA42
            </p>
          </div>
          <ul className="space-y-0">
            {NOV_ACT.map((a) => (
              <li
                key={a.nombre}
                className="flex items-start justify-between gap-3 border-t border-cream/8 px-4 py-3 text-sm first:border-t-0"
              >
                <span className="min-w-0">
                  <span className="text-cream">{a.nombre}</span>
                  <span className="block text-xs text-cream/55">
                    {a.fecha} · {a.detalle}
                  </span>
                </span>
                <StatusPill estado={a.estado} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export function ColagenoSlide() {
  return (
    <div className="slide-safe grid h-full grid-cols-1 gap-5 overflow-y-auto lg:grid-cols-[0.9fr_1.1fr] lg:gap-6">
      <div className="flex flex-col">
        <Kicker>Agosto · Septiembre</Kicker>
        <Title>{COLAGENO.title}</Title>
        <p className="mt-1 text-base text-gold/90 md:text-lg">{COLAGENO.subtitle}</p>
        <p className="mt-3 text-sm text-cream/75 md:text-base">{COLAGENO.description}</p>
        <div className="mt-5 overflow-x-auto rounded-2xl border border-cream/10 md:mt-6">
          <table className="tbl w-full">
            <thead>
              <tr className="bg-pine text-left">
                <th className="px-4 py-3 font-medium text-cream/70">Día</th>
                <th className="px-4 py-3 font-medium text-cream/70">Fecha</th>
                <th className="px-4 py-3 text-right font-medium text-cream/70">Cantidad C/U</th>
                <th className="px-4 py-3 text-right font-medium text-cream/70">Cajas</th>
              </tr>
            </thead>
            <tbody>
              {COLAGENO.table.map((row) => (
                <tr key={row.fecha} className="border-t border-cream/8">
                  <td className="px-4 py-2.5">{row.dia}</td>
                  <td className="px-4 py-2.5 whitespace-nowrap text-cream/70">{row.fecha}</td>
                  <td className="px-4 py-2.5 text-right font-medium text-leaf">{row.cantidad}</td>
                  <td className="px-4 py-2.5 text-right">{row.cajas}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-leaf/30 bg-fa/10">
                <td className="px-4 py-3 font-medium" colSpan={2}>Total</td>
                <td className="px-4 py-3 text-right font-semibold text-leaf">{COLAGENO.totalUnidades}</td>
                <td className="px-4 py-3 text-right font-semibold">{COLAGENO.totalCajas}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <Carousel photos={COLAGENO.photos} className="min-h-[260px] lg:min-h-0" />
    </div>
  )
}

export function PlanSlide() {
  return (
    <div className="slide-safe flex h-full flex-col overflow-y-auto">
      <Kicker>Plan de acción</Kicker>
      <Title>{PLAN.title}</Title>
      <p className="mt-1 text-base text-gold/90 md:text-lg">{PLAN.subtitle}</p>
      <p className="mt-2 max-w-3xl text-sm text-cream/75 md:text-base">{PLAN.description}</p>
      <div className="mt-4 grid min-h-0 flex-1 grid-cols-1 gap-4 md:mt-5 lg:grid-cols-2">
        <div className="min-w-0 overflow-auto rounded-2xl border border-cream/10">
          <table className="tbl w-full">
            <thead className="sticky top-0 bg-pine">
              <tr className="text-left">
                <th className="px-3 py-2.5 font-medium text-cream/70">Zona</th>
                <th className="px-3 py-2.5 font-medium text-cream/70">Fecha</th>
                <th className="px-3 py-2.5 text-right font-medium text-cream/70">Volantes</th>
                <th className="hidden px-3 py-2.5 text-right font-medium text-cream/70 sm:table-cell">Habitantes</th>
                <th className="px-3 py-2.5 font-medium text-cream/70">Estado</th>
              </tr>
            </thead>
            <tbody>
              {PLAN.zonas.map((z) => (
                <tr key={z.zona} className="border-t border-cream/8">
                  <td className="px-3 py-2">{z.zona}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-cream/70">{z.fecha}</td>
                  <td className="px-3 py-2 text-right">{z.volantes.toLocaleString('es-HN')}</td>
                  <td className="hidden px-3 py-2 text-right text-cream/70 sm:table-cell">
                    {z.habitantes != null ? z.habitantes.toLocaleString('es-HN') : '—'}
                  </td>
                  <td className="px-3 py-2"><StatusPill estado={z.estado} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex min-h-0 flex-col gap-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {PLAN.presupuesto.map((p) => (
              <div key={p.mes} className="rounded-2xl border border-cream/10 bg-pine/70 p-4">
                <p className="text-xs text-mute md:text-sm">Presupuesto {p.mes}</p>
                <p className="kpi-number mt-1 text-2xl text-leaf md:text-3xl">
                  L {p.total.toLocaleString('es-HN')}
                </p>
                <p className="mt-2 text-[0.68rem] text-cream/60 md:text-xs">
                  {p.items.length} conceptos · volanteo, perifoneo, degustación y más
                </p>
              </div>
            ))}
          </div>
          <Carousel photos={PLAN.photos} className="min-h-[200px] flex-1" />
        </div>
      </div>
    </div>
  )
}

export function MapSlide() {
  return (
    <div className="slide-safe flex h-full flex-col">
      <Kicker>Cobertura</Kicker>
      <Title>Zona de trabajo · Tela</Title>
      <p className="mt-2 max-w-2xl text-sm text-cream/70 md:text-base">
        Mapa de la zona de trabajo de Farmacias del Ahorro en Tela, Atlántida.
      </p>
      <div className="mt-4 min-h-0 flex-1 overflow-hidden rounded-2xl border border-cream/10 md:mt-5">
        <iframe
          src={MAPS_EMBED}
          title="Mapa zona Tela"
          className="h-full w-full"
          loading="lazy"
          allowFullScreen
        />
      </div>
    </div>
  )
}

export function ClosingSlide({ goTo }: { goTo: GoTo }) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <img
        src={asset('photos/sep-vallas/01.jpg')}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-ink/78" />
      <div className="slide-safe relative z-10 flex h-full flex-col justify-between">
        <div className="flex items-center gap-3">
          <img src={asset('logo-fa.png')} alt="" className="h-10 w-10 rounded-md md:h-11 md:w-11" />
          <p className="text-xs tracking-[0.22em] text-leaf uppercase md:text-sm">{META.pharmacy}</p>
        </div>
        <div>
          <p className="text-[0.7rem] tracking-[0.28em] text-gold uppercase md:text-[0.75rem]">
            {META.period} {META.year}
          </p>
          <h1 className="font-display mt-3 max-w-4xl text-[clamp(1.9rem,5vw,4.4rem)] leading-[1.05]">
            Zona Tela presente: sucursal, comunidad y marca.
          </h1>
          <p className="mt-4 max-w-xl text-base text-cream/80 md:mt-5 md:text-lg">
            Capacitación, jornadas de salud, volanteo, degustación de colágeno y presencia en fiestas patrias.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 md:mt-8">
            <button
              type="button"
              onClick={() => goTo(0)}
              className="rounded-full bg-fa px-6 py-2.5 text-sm font-medium"
            >
              Volver al inicio
            </button>
            <button
              type="button"
              onClick={() => goTo(1)}
              className="rounded-full border border-cream/25 px-6 py-2.5 text-sm"
            >
              Menú
            </button>
          </div>
        </div>
        <p className="text-[0.65rem] text-mute md:text-xs">
          {META.zone} · {META.stores.join(' y ')} · {META.website}
        </p>
      </div>
    </div>
  )
}
