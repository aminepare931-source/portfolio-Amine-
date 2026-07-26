import React, { createContext, useContext, useState, useEffect } from 'react'

export type Language = 'fr' | 'en'

interface LanguageContextType {
  lang: Language
  setLang: (lang: Language) => void
  toggleLang: () => void
  t: (fr: string, en: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('amine_portfolio_lang')
    if (saved === 'fr' || saved === 'en') return saved
    return 'fr'
  })

  const setLang = (newLang: Language) => {
    setLangState(newLang)
    localStorage.setItem('amine_portfolio_lang', newLang)
  }

  const toggleLang = () => {
    const next = lang === 'fr' ? 'en' : 'fr'
    setLang(next)
  }

  const t = (fr: string, en: string) => (lang === 'fr' ? fr : en)

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
