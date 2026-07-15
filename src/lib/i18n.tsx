import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type Lang = 'pt' | 'en'

export type Dict = Record<Lang, string>

const LANG_STORAGE_KEY = 'lift-lang'

export const t = {
  // Header / nav
  nav_team: { pt: 'Equipa', en: 'Team' },
  nav_services: { pt: 'Serviços', en: 'Services' },
  nav_reviews: { pt: 'Avaliações', en: 'Reviews' },
  nav_visit: { pt: 'Visite-nos', en: 'Visit' },
  nav_contact: { pt: 'Contacto', en: 'Contact' },
  nav_cta: { pt: 'Junte-se Já', en: 'Join Now' },

  // Hero
  hero_eyebrow: { pt: 'Performance // Fitness', en: 'Performance // Fitness' },
  hero_headline_1: { pt: 'Treina mais forte.', en: 'Train harder.' },
  hero_headline_2: { pt: 'Vive melhor.', en: 'Live better.' },
  hero_subheadline: {
    pt: 'Treino personalizado e em grupo em Esposende. Coaching real, resultados reais, uma comunidade que te leva mais longe.',
    en: 'Personal and group training in Esposende. Real coaching, real results, a community that pushes you further.',
  },
  hero_cta_primary: { pt: 'Começa o Teu Trial Grátis', en: 'Start Your Free Trial' },
  hero_cta_secondary: { pt: 'Ver Horários', en: 'See Hours' },
  hero_stat_rating: { pt: 'no Google', en: 'on Google' },
  hero_stat_reviews: { pt: 'avaliações', en: 'reviews' },

  // Team
  team_eyebrow: { pt: 'A Nossa Equipa', en: 'Our Team' },
  team_title: { pt: 'Conhece os Coaches', en: 'Meet the Coaches' },
  team_subtitle: {
    pt: 'Profissionais qualificados e apaixonados que te acompanham em cada treino.',
    en: 'Qualified, passionate professionals who guide every single session.',
  },

  // Services
  services_eyebrow: { pt: 'O Que Oferecemos', en: 'What We Offer' },
  services_title: { pt: 'Programas Feitos Para Ti', en: 'Programs Built For You' },
  services_subtitle: {
    pt: 'Do treino individual às aulas de grupo, temos o caminho certo para os teus objetivos.',
    en: 'From one-on-one coaching to group classes, we have the right path to your goals.',
  },

  // Reviews
  reviews_eyebrow: { pt: 'Avaliações', en: 'Reviews' },
  reviews_title: { pt: 'Resultados Que Falam Por Nós', en: 'Results That Speak For Themselves' },
  reviews_stat_rating_label: { pt: 'Avaliação Google', en: 'Google Rating' },
  reviews_stat_members_label: { pt: 'Membros Ativos', en: 'Active Members' },
  reviews_stat_years_label: { pt: 'Anos em Esposende', en: 'Years in Esposende' },
  reviews_stat_classes_label: { pt: 'Aulas por Semana', en: 'Classes per Week' },
  reviews_leave: { pt: 'Deixar uma Avaliação Google', en: 'Leave a Google Review' },
  reviews_see_all: { pt: 'Ver Todas no Google', en: 'See All on Google' },

  // Visit
  visit_eyebrow: { pt: 'Visite-nos', en: 'Visit Us' },
  visit_title: { pt: 'Encontra-nos em Esposende', en: 'Find Us in Esposende' },
  hours_title: { pt: 'Horário', en: 'Hours' },
  hours_open_now: { pt: 'Aberto agora', en: 'Open now' },
  hours_closed_now: { pt: 'Fechado agora', en: 'Closed now' },
  day_mon_fri: { pt: 'Segunda a Sexta-feira', en: 'Monday – Friday' },
  day_sat: { pt: 'Sábado', en: 'Saturday' },
  day_sun: { pt: 'Domingo', en: 'Sunday' },
  closed: { pt: 'Encerrado', en: 'Closed' },
  address_label: { pt: 'Morada', en: 'Address' },
  address_value: {
    pt: 'Tv. da Carfer Nº47, 4740-010 Esposende, Portugal',
    en: 'Tv. da Carfer Nº47, 4740-010 Esposende, Portugal',
  },
  visit_directions: { pt: 'Como Chegar', en: 'Get Directions' },
  visit_call: { pt: 'Ligar Agora', en: 'Call Now' },
  visit_instagram: { pt: 'Instagram', en: 'Instagram' },
  visit_review: { pt: 'Deixar Avaliação Google', en: 'Leave a Google Review' },
  visit_find_google: { pt: 'Encontra-nos no Google', en: 'Find Us on Google' },

  // Contact form
  contact_eyebrow: { pt: 'Contacto', en: 'Contact' },
  contact_title: { pt: 'Pronto Para Começar?', en: 'Ready to Get Started?' },
  contact_subtitle: {
    pt: 'Deixa os teus dados e entramos em contacto para marcar a tua primeira aula grátis.',
    en: "Leave your details and we'll reach out to book your first free class.",
  },
  contact_name: { pt: 'Nome', en: 'Name' },
  contact_email: { pt: 'Email', en: 'Email' },
  contact_phone: { pt: 'Telefone', en: 'Phone' },
  contact_message: { pt: 'Mensagem', en: 'Message' },
  contact_message_placeholder: {
    pt: 'Conta-nos os teus objetivos...',
    en: 'Tell us about your goals...',
  },
  contact_submit: { pt: 'Enviar Pedido', en: 'Send Request' },
  contact_submitting: { pt: 'A enviar...', en: 'Sending...' },
  contact_success: {
    pt: 'Obrigado! A nossa equipa vai entrar em contacto em breve.',
    en: "Thank you! Our team will be in touch shortly.",
  },
  contact_error_required: { pt: 'Campo obrigatório', en: 'This field is required' },
  contact_error_email: { pt: 'Email inválido', en: 'Invalid email' },
  contact_error_phone: { pt: 'Telefone inválido', en: 'Invalid phone number' },

  // Final CTA
  final_cta_title: { pt: 'A Tua Melhor Versão Começa Aqui.', en: 'Your Best Self Starts Here.' },
  final_cta_subtitle: {
    pt: 'Junta-te à comunidade LIFT e sente a diferença desde o primeiro treino.',
    en: 'Join the LIFT community and feel the difference from your very first session.',
  },
  final_cta_button: { pt: 'Ligar', en: 'Call' },

  // Footer
  footer_tagline: {
    pt: 'Personal e treino em grupo, em Esposende.',
    en: 'Personal and group training, Esposende based.',
  },
  footer_rights: { pt: 'Todos os direitos reservados.', en: 'All rights reserved.' },
  footer_quick_links: { pt: 'Links Rápidos', en: 'Quick Links' },

  // Mobile call bar
  mobile_call_cta: { pt: 'Ligar Agora', en: 'Call Now' },
} satisfies Record<string, Dict>

export type TKey = keyof typeof t

type LanguageContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  tr: (key: TKey) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function getInitialLang(): Lang {
  if (typeof window === 'undefined') return 'pt'
  const stored = window.localStorage.getItem(LANG_STORAGE_KEY)
  return stored === 'en' || stored === 'pt' ? stored : 'pt'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang)

  useEffect(() => {
    window.localStorage.setItem(LANG_STORAGE_KEY, lang)
    document.documentElement.lang = lang
  }, [lang])

  const setLang = (next: Lang) => setLangState(next)

  const tr = useMemo(() => {
    return (key: TKey) => t[key][lang]
  }, [lang])

  const value = useMemo(() => ({ lang, setLang, tr }), [lang, tr])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used within a LanguageProvider')
  return ctx
}
