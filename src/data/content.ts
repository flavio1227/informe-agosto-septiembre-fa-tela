export const asset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

export type Photo = {
  src: string
  caption: string
}

const folder = (name: string, count: number, captions: string[]): Photo[] =>
  Array.from({ length: count }, (_, i) => ({
    src: asset(`photos/${name}/${String(i + 1).padStart(2, '0')}.jpg`),
    caption: captions[i] ?? captions[captions.length - 1] ?? '',
  }))

export const META = {
  pharmacy: 'Farmacias del Ahorro',
  zone: 'Zona Tela',
  stores: ['FA42', 'FA59'],
  period: 'Agosto · Septiembre',
  year: 2026,
  website: 'www.farmaciasdelahorro.hn',
}

export const MAPS_EMBED =
  'https://www.google.com/maps/d/embed?mid=1Oko3r9uBTRd-XLz5YMEIQEHCerKyFhQ&ll=15.74543070583967%2C-87.4645128198963&z=13'

// ---------- AGOSTO ----------
export const AGOSTO = [
  {
    id: 'ago-capacitacion',
    kicker: 'Agosto',
    title: 'Capacitación de Bioequivalencia',
    subtitle: 'FA42',
    description:
      'Capacitación en bioequivalencia para el equipo de FA42, fortaleciendo el conocimiento técnico en medicamentos.',
    photos: folder('ago-capacitacion', 1, ['Capacitación de bioequivalencia en FA42.']),
  },
  {
    id: 'ago-piel',
    kicker: 'Agosto',
    title: 'Jornada de piel',
    subtitle: 'Atención en sucursal',
    description: 'Jornada de cuidado de la piel con atención a clientes en sucursal.',
    photos: folder('ago-piel', 1, ['Jornada de piel en sucursal.']),
  },
  {
    id: 'ago-pajuiles',
    kicker: 'Agosto',
    title: 'Volanteo Pajuiles',
    subtitle: 'Comunidad',
    description:
      'Recorrido de volanteo en la comunidad de Pajuiles, llevando la marca y el servicio a domicilio casa por casa.',
    photos: folder('ago-pajuiles', 11, [
      'Volanteo en Pajuiles.',
      'Entrega de volantes en la comunidad.',
      'Recorrido casa por casa.',
      'Presencia de marca en Pajuiles.',
      'Contacto con vecinos.',
      'Volanteo en viviendas.',
      'Entrega de material impreso.',
      'Recorrido comunitario.',
      'Visita en la comunidad.',
      'Volanteo en Pajuiles.',
      'Equipo en la comunidad.',
    ]),
  },
  {
    id: 'ago-perifoneos',
    kicker: 'Agosto',
    title: 'Perifoneos',
    subtitle: 'Difusión en zona',
    description:
      'Perifoneo en la zona para anunciar promociones y el servicio a domicilio de Farmacias del Ahorro.',
    photos: folder('ago-perifoneos', 5, [
      'Perifoneo en la zona.',
      'Difusión de promociones.',
      'Perifoneo en comunidad.',
      'Anuncio de servicio a domicilio.',
      'Perifoneo en la zona.',
    ]),
  },
] as const

// ---------- SEPTIEMBRE ----------
export const SEPTIEMBRE = [
  {
    id: 'sep-nino',
    kicker: 'Septiembre',
    title: 'Celebración del Día del niño',
    subtitle: 'Sucursal',
    description:
      'Celebración del Día del niño en sucursal, compartiendo con las familias de la zona.',
    photos: folder('sep-nino', 9, [
      'Celebración del Día del niño.',
      'Actividad con niños en sucursal.',
      'Día del niño en Farmacias del Ahorro.',
      'Compartiendo con las familias.',
      'Celebración del Día del niño.',
      'Actividad infantil en sucursal.',
      'Día del niño.',
      'Celebración con los niños.',
      'Día del niño en sucursal.',
    ]),
  },
  {
    id: 'sep-jornada',
    kicker: 'Septiembre',
    title: 'Jornada Médica',
    subtitle: 'Consulta médica gratis',
    description:
      'Jornada médica general con consulta gratuita para la comunidad, generando acercamiento y venta.',
    photos: folder('sep-jornada', 9, [
      'Publicidad de la jornada médica.',
      'Jornada médica en sucursal.',
      'Atención médica a la comunidad.',
      'Consulta médica gratuita.',
      'Jornada médica general.',
      'Atención a pacientes.',
      'Jornada médica.',
      'Consulta médica gratis.',
      'Jornada médica en la zona.',
    ]),
  },
  {
    id: 'sep-plan',
    kicker: 'Septiembre',
    title: 'Plan de acción de septiembre',
    subtitle: 'Zona Tela',
    description: 'Plan de acción del mes de septiembre para la zona Tela.',
    photos: folder('sep-plan', 1, ['Plan de acción de septiembre.']),
  },
  {
    id: 'sep-fiesta',
    kicker: 'Septiembre',
    title: 'Presencia en fiesta patria',
    subtitle: '15 de septiembre',
    description:
      'Presencia de marca en las fiestas patrias del 15 de septiembre, participando con la comunidad.',
    photos: folder('sep-fiesta', 5, [
      'Presencia en fiestas patrias.',
      '15 de septiembre en la comunidad.',
      'Participación en fiesta patria.',
      'Marca presente en la celebración.',
      'Fiestas patrias.',
    ]),
  },
  {
    id: 'sep-vallas',
    kicker: 'Septiembre',
    title: 'Vallas publicitarias',
    subtitle: 'Presencia de marca',
    description:
      'Colocación de vallas publicitarias para fortalecer la presencia de Farmacias del Ahorro en la zona.',
    photos: folder('sep-vallas', 5, [
      'Valla publicitaria.',
      'Presencia de marca en la zona.',
      'Valla de Farmacias del Ahorro.',
      'Publicidad exterior.',
      'Valla publicitaria.',
    ]),
  },
] as const

// ---------- DEGUSTACIÓN DE COLÁGENO (Excel) ----------
export const COLAGENO = {
  title: 'Degustación de Colágeno',
  subtitle: 'Agosto y Septiembre · Adiuvo',
  description:
    'Degustación de Colágeno Adiuvo todos los miércoles, impulsando el producto y generando acercamiento con los clientes.',
  table: [
    { dia: 'Miércoles', fecha: '26 de agosto', cantidad: 90, cajas: 3 },
    { dia: 'Martes', fecha: '1 de septiembre', cantidad: 120, cajas: 4 },
    { dia: 'Miércoles', fecha: '2 de septiembre', cantidad: 60, cajas: 2 },
    { dia: 'Viernes', fecha: '4 de septiembre', cantidad: 30, cajas: 1 },
    { dia: 'Miércoles', fecha: '9 de septiembre', cantidad: 40, cajas: 1 },
  ],
  totalUnidades: 340,
  totalCajas: 11,
  photos: [
    ...Array.from({ length: 11 }, (_, i) => ({
      src: asset(`photos/colageno/${String(i + 1).padStart(2, '0')}.${[2, 3, 8, 9, 10].includes(i + 1) ? 'jpeg' : 'png'}`),
      caption: 'Degustación de Colágeno Adiuvo.',
    })),
    { src: asset('photos/colageno/extra.jpg'), caption: 'Colágeno Adiuvo.' },
  ],
}

// ---------- PLAN DE ACCIÓN (Excel) ----------
export const PLAN = {
  title: 'Plan de acción · Zona Tela',
  subtitle: 'Julio a Octubre 2026',
  description:
    'Plan de acción con enfoque en domicilio y venta local: volanteo, perifoneo, degustaciones y actividades en sucursal.',
  zonas: [
    { mes: 'Julio', zona: 'Colonia Terencio', fecha: 'Jueves 9/7', volantes: 1000, colaboradores: 5, estado: 'Ejecutado', habitantes: 1495 },
    { mes: 'Julio', zona: 'Colonia Hailand Creek', fecha: 'Martes 14/7', volantes: 1000, colaboradores: 5, estado: 'Ejecutado', habitantes: 1633 },
    { mes: 'Julio', zona: 'Aldea Hicaque', fecha: 'Jueves 16/7', volantes: 1000, colaboradores: 5, estado: 'Ejecutado', habitantes: 903 },
    { mes: 'Julio', zona: 'Aldea El Guano', fecha: 'Jueves 23/7', volantes: 900, colaboradores: 5, estado: 'Ejecutado', habitantes: 856 },
    { mes: 'Agosto', zona: 'Triunfo de la Cruz', fecha: 'Jueves 13/8', volantes: 1000, colaboradores: 5, estado: 'Ejecutado', habitantes: 2509 },
    { mes: 'Agosto', zona: 'Ensenada', fecha: 'Jueves 13/8', volantes: 300, colaboradores: 5, estado: 'Ejecutado', habitantes: 204 },
    { mes: 'Agosto', zona: 'Pajuiles', fecha: 'Martes 18/8', volantes: 1000, colaboradores: 5, estado: 'Ejecutado', habitantes: 1905 },
    { mes: 'Agosto', zona: 'Colonia 19 de Julio', fecha: 'Jueves 27/8', volantes: 1000, colaboradores: 5, estado: 'Programado', habitantes: 877 },
    { mes: 'Septiembre', zona: 'Barrio El Paraíso', fecha: 'Jueves 8/9', volantes: 1000, colaboradores: 5, estado: 'Programado', habitantes: 1852 },
    { mes: 'Septiembre', zona: 'Barrio 4 de Enero', fecha: 'Martes 15/9', volantes: 1000, colaboradores: 5, estado: 'Programado', habitantes: 954 },
    { mes: 'Septiembre', zona: 'Barrio El Retiro', fecha: 'Jueves 17/9', volantes: 1000, colaboradores: 5, estado: 'Programado', habitantes: 987 },
    { mes: 'Septiembre', zona: 'Barrio San José', fecha: 'Martes 22/9', volantes: 1000, colaboradores: 5, estado: 'Programado', habitantes: 2181 },
  ],
  presupuesto: [
    { mes: 'Agosto', items: [
      { concepto: 'Volantes', precio: 1.37, cantidad: 6000, valor: 8220 },
      { concepto: 'Perifoneos', precio: 537, cantidad: 12, valor: 6444 },
      { concepto: 'Jugo Natura / Degustaciones', precio: 80, cantidad: 4, valor: 320 },
      { concepto: 'Vasos cónicos', precio: 135, cantidad: 5, valor: 675 },
      { concepto: 'Compra de pan', precio: 45, cantidad: 16, valor: 720 },
      { concepto: 'Compra de café', precio: 341, cantidad: 2, valor: 682 },
    ], total: 17061 },
    { mes: 'Septiembre', items: [
      { concepto: 'Jugo Natura / Degustaciones', precio: 80, cantidad: 4, valor: 320 },
      { concepto: 'Vasos cónicos', precio: 135, cantidad: 5, valor: 675 },
      { concepto: 'Compra de pan', precio: 45, cantidad: 16, valor: 720 },
      { concepto: 'Compra de café', precio: 341, cantidad: 2, valor: 682 },
      { concepto: 'Tambito de agua con sticker (15 sept)', precio: 240, cantidad: 6, valor: 1440 },
      { concepto: 'Refrescos 15 de septiembre', precio: 300, cantidad: 6, valor: 1800 },
      { concepto: 'Microondas (sorteo)', precio: 3000, cantidad: 1, valor: 3000 },
    ], total: 8637 },
  ],
  photos: [
    { src: asset('photos/plan/01.png'), caption: 'Plan de acción zona Tela.' },
    { src: asset('photos/plan/02.png'), caption: 'Plan de acción zona Tela.' },
    { src: asset('photos/plan/03.png'), caption: 'Plan de acción zona Tela.' },
  ],
}

export const AGENDA = [
  { label: 'Resumen', index: 2 },
  { label: 'Agosto', index: 3 },
  { label: 'Septiembre', index: 8 },
  { label: 'Colágeno', index: 14 },
  { label: 'Plan de acción', index: 15 },
  { label: 'Mapa', index: 16 },
]
