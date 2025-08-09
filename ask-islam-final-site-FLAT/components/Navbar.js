
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useLang } from './LangContext'

export default function Navbar(){
  const { data: session } = useSession()
  const { rtl, toggle } = useLang()
  return (
    <nav className="nav">
      <div className="nav-left">
        <Link href="/"><span className="brand">Ask Islam</span></Link>
      </div>
      <div className="nav-right">
        <button className="toggle" onClick={toggle}>{rtl ? 'AR' : 'EN'}</button>
        {session ? (
          <>
            <Link href="/chat"><button className="link">Chat</button></Link>
            <Link href="/upgrade"><button className="link">Upgrade</button></Link>
            <Link href="/profile"><button className="link">Profile</button></Link>
            <button className="primary" onClick={() => signOut()}>Sign Out</button>
          </>
        ) : (
          <button className="primary" onClick={() => signIn()}>Sign In</button>
        )}
      </div>
    </nav>
  )
}
