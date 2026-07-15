import { useEffect, useMemo, useState } from 'react'
import { useLang, type Lang } from '../lib/i18n'
import { useReveal } from '../hooks/useReveal'
import {
  IconClock,
  IconDumbbell,
  IconFlame,
  IconInstagram,
  IconMapPin,
  IconMenu,
  IconPhone,
  IconSearch,
  IconStar,
  IconUser,
  IconUsers,
  IconX,
} from '../components/icons'
import planDuoImg from '../assets/team/plan-duo.jpg'
import coachJoaoImg from '../assets/team/coach-joao.jpg'
import coachGabrielImg from '../assets/team/coach-gabriel.jpg'
import coachMiguelImg from '../assets/team/coach-miguel.jpg'
import teamGroupImg from '../assets/team/team-group.jpg'

// ---------------------------------------------------------------------------
// Business constants — swap these (and the images below) to re-theme this
// template for a different fitness client.
// ---------------------------------------------------------------------------
const BUSINESS_NAME = 'LIFT'
const BUSINESS_FULL_NAME = 'LIFT - Performance and Fitness'
const PHONE_DISPLAY = '964 888 681'
const PHONE_TEL = '+351964888681'
const ADDRESS_LINE = 'LIFT - Performance and Fitness, Tv. da Carfer, 4740-010 Esposende'
const INSTAGRAM_HANDLE = '@lift.esposende'
const INSTAGRAM_URL = 'https://www.instagram.com/lift.esposende/'
const GOOGLE_RATING = 5.0
const GOOGLE_REVIEWS_COUNT = 31

const MAPS_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADDRESS_LINE)}`
const MAPS_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS_LINE)}&output=embed`
const GOOGLE_SEARCH_URL = `https://www.google.com/search?q=${encodeURIComponent(`${BUSINESS_FULL_NAME} Esposende`)}`
const GOOGLE_REVIEW_URL =
  'https://www.google.com/search?sca_esv=b95d1611b6ab2c1b&sxsrf=APpeQnsw84i9xmBsHchN7M-mBq5Fh-BXVQ:1784120641260&si=APenkKm7iecQ4G6P-TsbSMFKIQtv3EFIqRAFw-i8uEbk55Z-_0k_3qJB0u685Fmf2SzXJWFZnwgBP1wfKJnu1DlHjgmUcXv_4si8QG5kRY7vjyT2HBVh4tjmiAcsHivuI_pl8fiIa5W-i_PYpWznQv3pFZXwHzDvkRkirPSaowvd9Ma7vR3mRps%3D&q=LIFT+-+Performance+and+Fitness+Cr%C3%ADticas&sa=X&ved=2ahUKEwi_3ruo39SVAxVLV0EAHfO1OP0Q0bkNegQIRBAF&biw=1920&bih=953&dpr=1'

type HourRow = {
  dayKey: 'day_mon_fri' | 'day_sat' | 'day_sun'
  days: number[] // 0 = Sunday ... 6 = Saturday
  open?: string // "HH:MM"
  close?: string
}

const HOURS: HourRow[] = [
  { dayKey: 'day_mon_fri', days: [1, 2, 3, 4, 5], open: '07:00', close: '22:00' },
  { dayKey: 'day_sat', days: [6], open: '08:00', close: '13:00' },
  { dayKey: 'day_sun', days: [0] },
]

type Bilingual = { pt: string; en: string }

// Straight from the "Us" Instagram highlight — the studio's actual 3 training formats.
const PLANS: { icon: typeof IconDumbbell; title: Bilingual; tagline: Bilingual; quote: Bilingual; photo?: string }[] = [
  {
    icon: IconUser,
    title: { pt: 'Individual', en: 'Individual' },
    tagline: {
      pt: '100% personalizado. O PT contigo, do primeiro ao último movimento.',
      en: 'Your coach with you, from the first rep to the last.',
    },
    quote: {
      pt: 'O teu ritmo, o teu foco, a tua evolução.',
      en: 'Your pace, your focus, your progress.',
    },
  },
  {
    icon: IconUsers,
    title: { pt: 'Duo', en: 'Duo' },
    tagline: {
      pt: 'Treino acompanhado, energia a dobrar.',
      en: 'Trained together, energy doubled.',
    },
    quote: {
      pt: 'Partilha o foco, mantém a motivação.',
      en: 'Share the focus, keep the motivation.',
    },
    photo: planDuoImg,
  },
  {
    icon: IconFlame,
    title: { pt: 'Trio', en: 'Trio' },
    tagline: {
      pt: 'Motivação em grupo, acompanhamento individual.',
      en: 'Group motivation, individual attention.',
    },
    quote: {
      pt: 'Mais dinâmica, mais ritmo, o mesmo foco no resultado.',
      en: 'More dynamic, more rhythm, same focus on results.',
    },
  },
]

// Roles/bios are a neutral placeholder until confirmed per coach — names are real.
const TEAM: { name: string; role: Bilingual; bio: Bilingual; initials: string; photo?: string }[] = [
  {
    name: 'João Miranda',
    role: { pt: 'Coach LIFT', en: 'LIFT Coach' },
    bio: {
      pt: 'Parte da equipa LIFT, pronto para te acompanhar em cada treino.',
      en: 'Part of the LIFT team, ready to support you in every session.',
    },
    initials: 'JM',
    photo: coachJoaoImg,
  },
  {
    name: 'Jorge Azevedo',
    role: { pt: 'Coach LIFT', en: 'LIFT Coach' },
    bio: {
      pt: 'Parte da equipa LIFT, pronto para te acompanhar em cada treino.',
      en: 'Part of the LIFT team, ready to support you in every session.',
    },
    initials: 'JA',
  },
  {
    name: 'Gabriel Silva',
    role: { pt: 'Coach LIFT', en: 'LIFT Coach' },
    bio: {
      pt: 'Parte da equipa LIFT, pronto para te acompanhar em cada treino.',
      en: 'Part of the LIFT team, ready to support you in every session.',
    },
    initials: 'GS',
    photo: coachGabrielImg,
  },
  {
    name: 'Miguel Rosa',
    role: { pt: 'Coach LIFT', en: 'LIFT Coach' },
    bio: {
      pt: 'Parte da equipa LIFT, pronto para te acompanhar em cada treino.',
      en: 'Part of the LIFT team, ready to support you in every session.',
    },
    initials: 'MR',
    photo: coachMiguelImg,
  },
]

const TESTIMONIALS: Bilingual[] = [
  {
    pt: 'Criei uma verdadeira rotina aqui — mesmo nos treinos bem cedo, é o momento do dia que mais espero.',
    en: "I've built a real routine here — even on the earliest sessions, it's the part of my day I look forward to most.",
  },
  {
    pt: 'A Lift é muito mais do que um lugar para treinar. É um espaço onde nos sentimos genuinamente bem, física e ambientalmente.',
    en: "Lift is so much more than a place to train. It's a space where you genuinely feel good, both physically and in the atmosphere.",
  },
  {
    pt: 'A equipa de coaches é simpática e presente — saio de cada sessão a sentir-me muito melhor do que entrei.',
    en: 'The coaching team is friendly and supportive — I leave every session feeling far better than when I walked in.',
  },
  {
    pt: 'Equipamento bem cuidado e uma equipa qualificada e dedicada — treinar aqui é seguro e confortável.',
    en: 'Well-maintained equipment and a qualified, dedicated staff make training feel safe and comfortable.',
  },
]

const STATS: { value: string; labelKey: 'reviews_stat_rating_label' | 'reviews_stat_members_label' | 'reviews_stat_years_label' | 'reviews_stat_classes_label' }[] = [
  { value: '5.0★', labelKey: 'reviews_stat_rating_label' },
  { value: '150+', labelKey: 'reviews_stat_members_label' },
  { value: '5+', labelKey: 'reviews_stat_years_label' },
  { value: '20+', labelKey: 'reviews_stat_classes_label' },
]

const NAV_LINKS: { key: 'nav_team' | 'nav_services' | 'nav_reviews' | 'nav_visit'; href: string }[] = [
  { key: 'nav_team', href: '#team' },
  { key: 'nav_services', href: '#services' },
  { key: 'nav_reviews', href: '#reviews' },
  { key: 'nav_visit', href: '#visit' },
]

function useOpenNow() {
  const [isOpen, setIsOpen] = useState<boolean | null>(null)

  useEffect(() => {
    function check() {
      const now = new Date()
      const parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/Lisbon',
        weekday: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23',
      }).formatToParts(now)

      const weekdayMap: Record<string, number> = {
        Sun: 0,
        Mon: 1,
        Tue: 2,
        Wed: 3,
        Thu: 4,
        Fri: 5,
        Sat: 6,
      }
      const weekdayStr = parts.find((p) => p.type === 'weekday')?.value ?? 'Mon'
      const hour = Number(parts.find((p) => p.type === 'hour')?.value ?? '0')
      const minute = Number(parts.find((p) => p.type === 'minute')?.value ?? '0')
      const day = weekdayMap[weekdayStr]
      const minutesNow = hour * 60 + minute

      const row = HOURS.find((r) => r.days.includes(day))
      if (!row || !row.open || !row.close) {
        setIsOpen(false)
        return
      }
      const [openH, openM] = row.open.split(':').map(Number)
      const [closeH, closeM] = row.close.split(':').map(Number)
      const openMinutes = openH * 60 + openM
      const closeMinutes = closeH * 60 + closeM
      setIsOpen(minutesNow >= openMinutes && minutesNow < closeMinutes)
    }

    check()
    const interval = setInterval(check, 60_000)
    return () => clearInterval(interval)
  }, [])

  return isOpen
}

function useCurrentDayKey() {
  return useMemo(() => {
    const weekdayStr = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Lisbon',
      weekday: 'short',
    }).format(new Date())
    const weekdayMap: Record<string, number> = {
      Sun: 0,
      Mon: 1,
      Tue: 2,
      Wed: 3,
      Thu: 4,
      Fri: 5,
      Sat: 6,
    }
    const day = weekdayMap[weekdayStr]
    return HOURS.find((r) => r.days.includes(day))?.dayKey
  }, [])
}

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Team />
        <Services />
        <Reviews />
        <Visit />
        <FinalCta />
      </main>
      <Footer />
      <MobileCallBar />
    </>
  )
}

function LangToggle() {
  const { lang, setLang } = useLang()

  const options: { value: Lang; label: string }[] = [
    { value: 'pt', label: 'PT' },
    { value: 'en', label: 'EN' },
  ]

  return (
    <div className="flex items-center gap-1 rounded-full border border-white/15 bg-white/5 p-1">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          aria-pressed={lang === opt.value}
          onClick={() => setLang(opt.value)}
          className={`rounded-full px-2.5 py-1 text-xs font-bold tracking-wide transition-colors ${
            lang === opt.value
              ? 'bg-lift-lime text-ink'
              : 'text-white/60 hover:text-white'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

function Header() {
  const { tr } = useLang()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-ink/80 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top" className="text-xl font-black tracking-tight text-white">
          {BUSINESS_NAME}
          <span className="text-lift-lime">.</span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="text-sm font-semibold text-white/70 transition-colors hover:text-white"
            >
              {tr(link.key)}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LangToggle />
          <a
            href={`tel:${PHONE_TEL}`}
            className="rounded-full bg-lift-lime px-5 py-2.5 text-sm font-bold text-ink transition-transform hover:scale-105"
          >
            {tr('nav_cta')}
          </a>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <LangToggle />
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white"
          >
            {menuOpen ? <IconX className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-white/10 bg-ink px-5 py-4 lg:hidden">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.key}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-base font-semibold text-white/80"
              >
                {tr(link.key)}
              </a>
            ))}
            <a
              href={`tel:${PHONE_TEL}`}
              onClick={() => setMenuOpen(false)}
              className="mt-2 rounded-full bg-lift-lime px-5 py-3 text-center text-sm font-bold text-ink"
            >
              {tr('nav_cta')}
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}

function Hero() {
  const { tr } = useLang()

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-lift-lime/20 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/3 -right-32 h-80 w-80 rounded-full bg-lift-lime/10 blur-[100px]" />

      <div className="relative mx-auto flex min-h-[92svh] max-w-6xl flex-col justify-center px-5 py-24 sm:px-8">
        <p className="mb-5 text-sm font-bold tracking-[0.25em] text-lift-lime uppercase">
          {tr('hero_eyebrow')}
        </p>
        <h1 className="max-w-3xl text-5xl leading-[0.95] font-black text-white sm:text-7xl">
          {tr('hero_headline_1')}
          <br />
          <span className="text-lift-lime">{tr('hero_headline_2')}</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-white/70 normal-case">
          {tr('hero_subheadline')}
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <a
            href={`tel:${PHONE_TEL}`}
            className="rounded-full bg-lift-lime px-7 py-4 text-sm font-bold text-ink transition-transform hover:scale-105"
          >
            {tr('hero_cta_primary')}
          </a>
          <a
            href="#visit"
            className="rounded-full border border-white/25 px-7 py-4 text-sm font-bold text-white transition-colors hover:border-white/60"
          >
            {tr('hero_cta_secondary')}
          </a>
        </div>

        <div className="mt-12 flex items-center gap-3 text-white">
          <div className="flex text-lift-lime">
            {Array.from({ length: 5 }).map((_, i) => (
              <IconStar key={i} className="h-4 w-4" />
            ))}
          </div>
          <p className="text-sm font-semibold text-white/70">
            {GOOGLE_RATING.toFixed(1)} {tr('hero_stat_rating')} · {GOOGLE_REVIEWS_COUNT}{' '}
            {tr('hero_stat_reviews')}
          </p>
        </div>
      </div>
    </section>
  )
}

function Team() {
  const { tr, lang } = useLang()
  const ref = useReveal<HTMLDivElement>()
  const groupPhotoRef = useReveal<HTMLDivElement>()

  return (
    <section id="team" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={tr('team_eyebrow')}
          title={tr('team_title')}
          subtitle={tr('team_subtitle')}
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-charcoal p-7">
            <p className="text-xs font-bold tracking-wide text-lift-lime uppercase">
              {tr('team_story_label')}
            </p>
            <p className="mt-3 text-base leading-relaxed text-white/70 normal-case">
              {tr('team_story_body')}
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-charcoal p-7">
            <p className="text-xs font-bold tracking-wide text-lift-lime uppercase">
              {tr('team_why_label')}
            </p>
            <p className="mt-3 text-lg leading-relaxed text-white italic normal-case">
              {tr('team_why_body')}
            </p>
          </div>
        </div>

        <div ref={ref} className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member) => (
            <div
              key={member.name}
              data-reveal
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-charcoal p-6 transition-colors hover:border-lift-lime/40"
            >
              {member.photo ? (
                <img
                  src={member.photo}
                  alt={member.name}
                  className="h-16 w-16 rounded-2xl object-cover"
                />
              ) : (
                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-lift-lime/10 text-lg font-black text-lift-lime">
                  {member.initials}
                </div>
              )}
              <h3 className="mt-5 text-lg font-bold tracking-tight text-white normal-case">
                {member.name}
              </h3>
              <p className="mt-1 text-xs font-bold tracking-wide text-lift-lime uppercase">
                {member.role[lang]}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/60 normal-case opacity-0 max-h-0 transition-all duration-300 group-hover:max-h-40 group-hover:opacity-100">
                {member.bio[lang]}
              </p>
            </div>
          ))}
        </div>

        <div ref={groupPhotoRef} className="mt-6 overflow-hidden rounded-3xl border border-white/10">
          <img src={teamGroupImg} alt={BUSINESS_FULL_NAME} className="w-full object-cover" />
        </div>
      </div>
    </section>
  )
}

function Services() {
  const { tr, lang } = useLang()
  const ref = useReveal<HTMLDivElement>()

  return (
    <section id="services" className="relative bg-charcoal py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={tr('services_eyebrow')}
          title={tr('services_title')}
          subtitle={tr('services_subtitle')}
        />

        <div ref={ref} className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PLANS.map((plan) => {
            const Icon = plan.icon
            return (
              <div
                key={plan.title.en}
                data-reveal
                className="overflow-hidden rounded-3xl border border-white/10 bg-ink transition-all hover:-translate-y-1 hover:border-lift-lime/40"
              >
                {plan.photo && (
                  <img
                    src={plan.photo}
                    alt={plan.title[lang]}
                    className="h-48 w-full object-cover"
                  />
                )}
                <div className="p-7">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-lift-lime text-ink">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-white normal-case">
                    {plan.title[lang]}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60 normal-case">
                    {plan.tagline[lang]}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-lift-lime italic normal-case">
                    {plan.quote[lang]}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Reviews() {
  const { tr, lang } = useLang()
  const ref = useReveal<HTMLDivElement>()

  return (
    <section id="reviews" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={tr('reviews_eyebrow')}
          title={tr('reviews_title')}
        />

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.labelKey}
              className="rounded-2xl border border-white/10 bg-charcoal py-6 text-center"
            >
              <p className="text-3xl font-black text-lift-lime">{stat.value}</p>
              <p className="mt-1 text-xs font-semibold tracking-wide text-white/60 uppercase">
                {tr(stat.labelKey)}
              </p>
            </div>
          ))}
        </div>

        <div ref={ref} className="mt-10 grid gap-6 sm:grid-cols-2">
          {TESTIMONIALS.map((quote, i) => (
            <blockquote
              key={i}
              data-reveal
              className="rounded-3xl border border-white/10 bg-charcoal p-7"
            >
              <div className="flex text-lift-lime">
                {Array.from({ length: 5 }).map((_, j) => (
                  <IconStar key={j} className="h-4 w-4" />
                ))}
              </div>
              <p className="mt-4 text-base leading-relaxed text-white/80 normal-case">
                “{quote[lang]}”
              </p>
            </blockquote>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-lift-lime px-6 py-3.5 text-sm font-bold text-ink transition-transform hover:scale-105"
          >
            {tr('reviews_leave')}
          </a>
          <a
            href={GOOGLE_SEARCH_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/25 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:border-white/60"
          >
            {tr('reviews_see_all')}
          </a>
        </div>
      </div>
    </section>
  )
}

function Hours() {
  const { tr } = useLang()
  const isOpen = useOpenNow()
  const currentDayKey = useCurrentDayKey()

  return (
    <div className="rounded-3xl border border-white/10 bg-ink p-7">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-lg font-bold text-white normal-case">
          <IconClock className="h-5 w-5 text-lift-lime" />
          {tr('hours_title')}
        </h3>
        {isOpen !== null && (
          <span
            className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold normal-case ${
              isOpen ? 'bg-lift-lime/15 text-lift-lime' : 'bg-white/10 text-white/60'
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${isOpen ? 'bg-lift-lime' : 'bg-white/40'}`}
            />
            {isOpen ? tr('hours_open_now') : tr('hours_closed_now')}
          </span>
        )}
      </div>

      <ul className="mt-5 divide-y divide-white/10">
        {HOURS.map((row) => (
          <li
            key={row.dayKey}
            className={`flex items-center justify-between py-3 text-sm normal-case ${
              currentDayKey === row.dayKey ? 'text-lift-lime' : 'text-white/70'
            }`}
          >
            <span className="font-semibold">{tr(row.dayKey)}</span>
            <span className="font-medium">
              {row.open && row.close ? `${row.open} – ${row.close}` : tr('closed')}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Visit() {
  const { tr } = useLang()
  const ref = useReveal<HTMLDivElement>()

  const actions = [
    {
      key: 'visit_directions',
      href: MAPS_DIRECTIONS_URL,
      icon: <IconMapPin className="h-4 w-4" />,
    },
    {
      key: 'visit_call',
      href: `tel:${PHONE_TEL}`,
      icon: <IconPhone className="h-4 w-4" />,
    },
    {
      key: 'visit_instagram',
      href: INSTAGRAM_URL,
      icon: <IconInstagram className="h-4 w-4" />,
    },
    {
      key: 'visit_review',
      href: GOOGLE_REVIEW_URL,
      icon: <IconStar className="h-4 w-4" />,
    },
    {
      key: 'visit_find_google',
      href: GOOGLE_SEARCH_URL,
      icon: <IconSearch className="h-4 w-4" />,
    },
  ] as const

  return (
    <section id="visit" className="relative bg-charcoal py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow={tr('visit_eyebrow')} title={tr('visit_title')} />

        <div ref={ref} className="mt-14 grid gap-6 lg:grid-cols-2">
          <div data-reveal className="flex flex-col gap-6">
            <Hours />

            <div className="rounded-3xl border border-white/10 bg-ink p-7">
              <p className="text-xs font-bold tracking-wide text-lift-lime uppercase">
                {tr('address_label')}
              </p>
              <p className="mt-2 text-base font-semibold text-white normal-case">
                {ADDRESS_LINE}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {actions.map((action) => (
                  <a
                    key={action.key}
                    href={action.href}
                    target={action.href.startsWith('tel:') ? undefined : '_blank'}
                    rel={action.href.startsWith('tel:') ? undefined : 'noreferrer'}
                    className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-xs font-bold text-white transition-colors hover:border-lift-lime/50 hover:text-lift-lime"
                  >
                    {action.icon}
                    {tr(action.key)}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div
            data-reveal
            className="min-h-[360px] overflow-hidden rounded-3xl border border-white/10"
          >
            <iframe
              title={`${BUSINESS_FULL_NAME} — Google Maps`}
              src={MAPS_EMBED_URL}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-[360px] w-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function FinalCta() {
  const { tr } = useLang()
  const ref = useReveal<HTMLDivElement>()

  return (
    <section className="px-5 py-24 sm:px-8 sm:py-32">
      <div
        ref={ref}
        data-reveal
        className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-charcoal px-8 py-16 text-center sm:px-16"
      >
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-lift-lime/20 blur-[100px]" />
        <div className="pointer-events-none absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-lift-lime/20 blur-[100px]" />

        <div className="relative">
          <h2 className="text-4xl font-black text-white sm:text-5xl">{tr('final_cta_title')}</h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-white/70 normal-case">
            {tr('final_cta_subtitle')}
          </p>
          <a
            href={`tel:${PHONE_TEL}`}
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-lift-lime px-8 py-4 text-lg font-bold text-ink transition-transform hover:scale-105"
          >
            <IconPhone className="h-5 w-5" />
            {tr('final_cta_button')} · {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const { tr } = useLang()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 px-5 py-12 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:justify-between sm:text-left">
        <div>
          <p className="text-xl font-black text-white">
            {BUSINESS_NAME}
            <span className="text-lift-lime">.</span>
          </p>
          <p className="mt-2 max-w-xs text-sm text-white/50 normal-case">{tr('footer_tagline')}</p>
        </div>

        <div>
          <p className="text-xs font-bold tracking-wide text-white/40 uppercase">
            {tr('footer_quick_links')}
          </p>
          <nav className="mt-3 flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className="text-sm text-white/60 transition-colors hover:text-lift-lime"
              >
                {tr(link.key)}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col items-center gap-3 sm:items-end">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-sm font-semibold text-white/70 transition-colors hover:text-lift-lime"
          >
            <IconInstagram className="h-4 w-4" />
            {INSTAGRAM_HANDLE}
          </a>
          <a
            href={`tel:${PHONE_TEL}`}
            className="flex items-center gap-2 text-sm font-semibold text-white/70 transition-colors hover:text-lift-lime"
          >
            <IconPhone className="h-4 w-4" />
            {PHONE_DISPLAY}
          </a>
        </div>
      </div>

      <p className="mt-10 text-center text-xs text-white/30 normal-case">
        © {year} {BUSINESS_FULL_NAME}. {tr('footer_rights')}
      </p>
    </footer>
  )
}

function MobileCallBar() {
  const { tr } = useLang()

  return (
    <a
      href={`tel:${PHONE_TEL}`}
      className="fixed inset-x-4 bottom-4 z-50 flex items-center justify-center gap-2 rounded-full bg-lift-lime py-4 text-sm font-bold text-ink shadow-[0_10px_30px_rgba(0,0,0,0.4)] sm:hidden"
    >
      <IconPhone className="h-4 w-4" />
      {tr('mobile_call_cta')}
    </a>
  )
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string
  title: string
  subtitle?: string
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs font-bold tracking-[0.25em] text-lift-lime uppercase">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-4 text-base text-white/60 normal-case">{subtitle}</p>}
    </div>
  )
}
