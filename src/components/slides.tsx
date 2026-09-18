import { useRef, useState } from 'react'
import { Pause, Play, Volume2, VolumeX } from 'lucide-react'
import {
  AGENDA,
  AGOSTO,
  COLAGENO,
  MAPS_EMBED,
  META,
  PLAN,
  SEPTIEMBRE,
  asset,
  type Photo,
} from '../data/content'
import { Kicker, Lightbox, PhotoCard, Title, useLightbox } from './primitives'

type GoTo = (index: number) => void

function Gallery({ photos, cols = 4 }: { photos: Photo[]; cols?: number }) {
  const box = useLightbox(photos.length)
  return (
    <>
      <div
        className={`grid min-h-0 flex-1 gap-2 ${
          cols === 3 ? 'grid-cols-3' : cols === 5 ? 'grid-cols-5' : 'grid-cols-4'
        }`}
      >
        {photos.map((photo, i) => (
          <PhotoCard
            key={photo.src}
            src={photo.src}
            caption={photo.caption}
            onClick={() => box.open(i)}
          />
        ))}
      </div>
      {box.index !== null ? (
        <Lightbox
          photos={photos}
          index={box.index}
          onClose={box.close}
          onPrev={box.prev}
          onNext={box.next}
        />
      ) : null}
    </>
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
      <p className="mt-1 text-lg text-gold/90">{subtitle}</p>
      <p className="mt-2 max-w-3xl text-cream/75">{description}</p>
      <div className="mt-5 min-h-0 flex-1">
        <Gallery photos={photos} cols={photos.length <= 4 ? photos.length : 4} />
      </div>
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
          <img src={asset('logo-fa.png')} alt="Farmacias del Ahorro" className="h-12 w-12 rounded-md" />
          <div>
            <p className="text-sm font-medium tracking-[0.22em] text-leaf uppercase">
              {META.pharmacy}
            </p>
            <p className="text-xs text-mute">
              {META.zone} · {META.stores.join(' y ')}
            </p>
          </div>
        </div>
        <div className="max-w-3xl">
          <p className="text-[0.78rem] font-medium tracking-[0.32em] text-gold uppercase">
            Presentación ejecutiva
          </p>
          <h1 className="font-display mt-3 text-[clamp(3.2rem,7vw,6.1rem)] leading-[0.92] font-semibold">
            Informe de
            <br />
            actividades
          </h1>
          <p className="font-display mt-4 text-4xl text-leaf italic">{META.period} {META.year}</p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/80">
            Capacitación, jornadas, volanteo, degustación de colágeno y presencia de marca en la zona.
          </p>
        </div>
        <p className="text-xs tracking-[0.18em] text-mute uppercase">
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
      <p className="mt-3 max-w-2xl text-cream/70">
        Un recorrido por las actividades de agosto y septiembre. Pulse cualquier bloque para saltar.
      </p>
      <div className="mt-8 grid flex-1 grid-cols-2 gap-4 lg:grid-cols-3">
        {AGENDA.map((item, i) => (
          <button
            key={item.label}
            type="button"
            onClick={() => goTo(item.index)}
            className="group flex flex-col justify-between rounded-2xl border border-cream/10 bg-pine/70 p-6 text-left transition hover:border-leaf/50 hover:bg-forest"
          >
            <span className="font-display text-4xl text-gold/80">0{i + 1}</span>
            <span className="mt-8 text-xl font-medium text-cream group-hover:text-leaf">
              {item.label}
            </span>
          </button>
        ))}
      </div>
      <p className="mt-6 text-xs text-mute">
        Teclado: ← → espacio · F pantalla completa · M menú
      </p>
    </div>
  )
}

export function SummarySlide({ goTo }: { goTo: GoTo }) {
  return (
    <div className="slide-safe flex h-full flex-col">
      <Kicker>Resumen ejecutivo</Kicker>
      <Title>Dos meses de presencia en la zona</Title>
      <p className="mt-3 max-w-2xl text-cream/70">
        Agosto y septiembre: capacitación, jornadas, volanteo, degustación de colágeno y presencia de marca.
      </p>
      <div className="mt-6 grid flex-1 grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: 'Agosto', count: AGOSTO.length, index: 3 },
          { label: 'Septiembre', count: SEPTIEMBRE.length, index: 8 },
          { label: 'Colágeno', count: 1, index: 14 },
          { label: 'Plan de acción', count: 1, index: 15 },
        ].map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => goTo(item.index)}
            className="flex flex-col rounded-2xl border border-cream/10 bg-forest/80 p-6 text-left transition hover:border-leaf/40"
          >
            <p className="font-display text-5xl text-leaf">{item.count}</p>
            <p className="mt-2 text-lg text-cream">{item.label}</p>
            <p className="mt-1 text-sm text-mute">
              {item.count === 1 ? 'actividad' : 'actividades'}
            </p>
          </button>
        ))}
      </div>
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
  photo: string
}) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <img src={asset(photo)} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-ink/72" />
      <div className="slide-safe relative z-10 flex h-full flex-col justify-center">
        <p className="text-[0.78rem] tracking-[0.32em] text-gold uppercase">{month}</p>
        <h1 className="font-display mt-3 max-w-3xl text-[clamp(2.8rem,6vw,5rem)] leading-[1.02]">
          {title}
        </h1>
        <p className="mt-5 max-w-xl text-lg text-cream/80">{description}</p>
      </div>
    </div>
  )
}

export function ColagenoSlide() {
  const box = useLightbox(COLAGENO.photos.length)
  return (
    <div className="slide-safe grid h-full grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="flex flex-col">
        <Kicker>Agosto · Septiembre</Kicker>
        <Title>{COLAGENO.title}</Title>
        <p className="mt-1 text-lg text-gold/90">{COLAGENO.subtitle}</p>
        <p className="mt-3 text-cream/75">{COLAGENO.description}</p>
        <div className="mt-6 overflow-hidden rounded-2xl border border-cream/10">
          <table className="w-full text-sm">
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
                  <td className="px-4 py-2.5 text-cream/70">{row.fecha}</td>
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
      <div className="flex min-h-0 flex-col">
        <div className="grid min-h-0 flex-1 grid-cols-3 gap-2">
          {COLAGENO.photos.slice(0, 6).map((photo, i) => (
            <PhotoCard
              key={photo.src}
              src={photo.src}
              caption={photo.caption}
              onClick={() => box.open(i)}
            />
          ))}
        </div>
        <p className="mt-3 text-xs text-mute">
          {COLAGENO.photos.length} fotografías · clic para ampliar
        </p>
      </div>
      {box.index !== null ? (
        <Lightbox
          photos={COLAGENO.photos}
          index={box.index}
          onClose={box.close}
          onPrev={box.prev}
          onNext={box.next}
        />
      ) : null}
    </div>
  )
}

export function PlanSlide() {
  const box = useLightbox(PLAN.photos.length)
  return (
    <div className="slide-safe flex h-full flex-col">
      <Kicker>Plan de acción</Kicker>
      <Title>{PLAN.title}</Title>
      <p className="mt-1 text-lg text-gold/90">{PLAN.subtitle}</p>
      <p className="mt-2 max-w-3xl text-cream/75">{PLAN.description}</p>
      <div className="mt-5 grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="overflow-auto rounded-2xl border border-cream/10">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-pine">
              <tr className="text-left">
                <th className="px-3 py-2.5 font-medium text-cream/70">Zona</th>
                <th className="px-3 py-2.5 font-medium text-cream/70">Fecha</th>
                <th className="px-3 py-2.5 text-right font-medium text-cream/70">Volantes</th>
                <th className="px-3 py-2.5 text-right font-medium text-cream/70">Habitantes</th>
                <th className="px-3 py-2.5 font-medium text-cream/70">Estado</th>
              </tr>
            </thead>
            <tbody>
              {PLAN.zonas.map((z) => (
                <tr key={z.zona} className="border-t border-cream/8">
                  <td className="px-3 py-2">{z.zona}</td>
                  <td className="px-3 py-2 text-cream/70">{z.fecha}</td>
                  <td className="px-3 py-2 text-right">{z.volantes}</td>
                  <td className="px-3 py-2 text-right text-cream/70">{z.habitantes}</td>
                  <td className="px-3 py-2">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-[0.68rem] font-medium ${
                        z.estado === 'Ejecutado'
                          ? 'bg-fa/20 text-leaf'
                          : 'bg-gold/15 text-gold'
                      }`}
                    >
                      {z.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex min-h-0 flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            {PLAN.presupuesto.map((p) => (
              <div key={p.mes} className="rounded-2xl border border-cream/10 bg-pine/70 p-4">
                <p className="text-sm text-mute">Presupuesto {p.mes}</p>
                <p className="kpi-number mt-1 text-3xl text-leaf">
                  L {p.total.toLocaleString('es-HN')}
                </p>
                <p className="mt-2 text-xs text-cream/60">
                  {p.items.length} conceptos · volanteo, perifoneo, degustación y más
                </p>
              </div>
            ))}
          </div>
          <div className="grid min-h-0 flex-1 grid-cols-3 gap-2">
            {PLAN.photos.map((photo, i) => (
              <PhotoCard
                key={photo.src}
                src={photo.src}
                caption={photo.caption}
                onClick={() => box.open(i)}
              />
            ))}
          </div>
        </div>
      </div>
      {box.index !== null ? (
        <Lightbox
          photos={PLAN.photos}
          index={box.index}
          onClose={box.close}
          onPrev={box.prev}
          onNext={box.next}
        />
      ) : null}
    </div>
  )
}

export function MapSlide() {
  return (
    <div className="slide-safe flex h-full flex-col">
      <Kicker>Cobertura</Kicker>
      <Title>Zona de trabajo · Tela</Title>
      <p className="mt-2 max-w-2xl text-cream/70">
        Mapa de la zona de trabajo de Farmacias del Ahorro en Tela, Atlántida.
      </p>
      <div className="mt-5 min-h-0 flex-1 overflow-hidden rounded-2xl border border-cream/10">
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
          <img src={asset('logo-fa.png')} alt="" className="h-11 w-11 rounded-md" />
          <p className="tracking-[0.22em] text-leaf uppercase">{META.pharmacy}</p>
        </div>
        <div>
          <p className="text-[0.75rem] tracking-[0.28em] text-gold uppercase">
            {META.period} {META.year}
          </p>
          <h1 className="font-display mt-3 max-w-4xl text-[clamp(2.4rem,5vw,4.4rem)] leading-[1.05]">
            Zona Tela presente: sucursal, comunidad y marca.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-cream/80">
            Capacitación, jornadas de salud, volanteo, degustación de colágeno y presencia en fiestas patrias.
          </p>
          <div className="mt-8 flex gap-3">
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
        <p className="text-xs text-mute">
          {META.zone} · {META.stores.join(' y ')} · {META.website}
        </p>
      </div>
    </div>
  )
}

export function VideoSlide() {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const toggle = () => {
    const el = ref.current
    if (!el) return
    if (el.paused) void el.play()
    else el.pause()
  }
  return (
    <div className="slide-safe grid h-full grid-cols-1 gap-8 lg:grid-cols-[1.35fr_0.65fr]">
      <div className="relative flex min-h-0 items-center">
        <div className="relative w-full overflow-hidden rounded-2xl bg-pine">
          <video
            ref={ref}
            src={asset('video/sorteo.mp4')}
            className="aspect-video w-full bg-ink object-contain"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            playsInline
          />
          <div className="absolute right-4 bottom-4 left-4 flex items-center justify-between">
            <button
              type="button"
              onClick={toggle}
              className="flex items-center gap-2 rounded-full bg-fa px-5 py-2.5 text-sm font-medium text-white"
            >
              {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {playing ? 'Pausar' : 'Reproducir'}
            </button>
            <button
              type="button"
              onClick={() => {
                const el = ref.current
                if (!el) return
                el.muted = !el.muted
                setMuted(el.muted)
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-ink/70"
            >
              {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <Kicker>Registro en movimiento</Kicker>
        <Title>Video</Title>
        <p className="mt-4 leading-relaxed text-cream/75">
          Video de la actividad. Se reproduce dentro de la presentación.
        </p>
      </div>
    </div>
  )
}
