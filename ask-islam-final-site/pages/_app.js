
import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { LangProvider } from '../components/LangContext'
import Navbar from '../components/Navbar'

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <LangProvider>
        <Navbar />
        <Component {...pageProps} />
      </LangProvider>
    </SessionProvider>
  )
}
