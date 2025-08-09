
import { createContext, useContext, useEffect, useState } from 'react'

const LangContext = createContext({ rtl:false, toggle:()=>{} })

export function LangProvider({ children }) {
  const [rtl, setRtl] = useState(false)
  useEffect(() => {
    const saved = localStorage.getItem('rtl') === 'true'
    setRtl(saved)
    document.documentElement.dir = saved ? 'rtl' : 'ltr'
  }, [])
  const toggle = () => {
    setRtl(prev => {
      const next = !prev
      localStorage.setItem('rtl', String(next))
      document.documentElement.dir = next ? 'rtl' : 'ltr'
      return next
    })
  }
  return <LangContext.Provider value={{ rtl, toggle }}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)
