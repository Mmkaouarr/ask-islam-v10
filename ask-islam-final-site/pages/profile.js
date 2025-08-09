
import { useSession, getSession } from 'next-auth/react'
import { useState } from 'react'

export default function Profile(){
  const { data: session } = useSession()
  const [avatar, setAvatar] = useState(null)

  if (!session) return <main className="container"><p>Please sign in.</p></main>

  const user = session.user || {}
  const onFile = (e) => {
    const f = e.target.files?.[0]
    if (f) setAvatar(URL.createObjectURL(f))
  }
  return (
    <main className="container">
      <h2 className="subtitle">Your Profile</h2>
      <p>Email: {user.email}</p>
      <p>Status: <strong>{user.pro ? 'Pro' : 'Free'}</strong></p>
      {avatar && <img src={avatar} alt="Avatar" width="96" height="96" style={{borderRadius: '50%', margin:'1rem 0'}}/>}
      <input type="file" onChange={onFile} />
    </main>
  )
}

export async function getServerSideProps(ctx){
  const session = await getSession(ctx)
  if (!session){
    return { redirect: { destination: '/', permanent: false } }
  }
  return { props: {} }
}
