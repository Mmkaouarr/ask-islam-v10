
import { useSession, getSession } from 'next-auth/react'
import { useState } from 'react'

export default function Chat(){
  const { data: session } = useSession()
  const [q, setQ] = useState('')
  const [a, setA] = useState('')
  const [loading, setLoading] = useState(false)

  const ask = async () => {
    if (!q.trim()) return
    setLoading(true)
    setA('')
    try {
      const res = await fetch('/api/gpt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q })
      })
      const data = await res.json()
      setA(data.answer || 'No answer.')
    } catch(e){
      setA('Sorry, an error occurred.')
    } finally {
      setLoading(false)
    }
  }

  if (!session) return <main className="container"><p>Please sign in to use the chat.</p></main>

  return (
    <main className="container">
      <h2 className="subtitle">Ask a Question</h2>
      <textarea className="input" rows="4" value={q} onChange={e=>setQ(e.target.value)} placeholder="e.g., Is XYZ halal or haram? How do I improve my prayer?"></textarea>
      <button className="primary" onClick={ask} disabled={loading}>{loading ? 'Thinking…' : 'Ask'}</button>
      {a && <div className="answer"><pre>{a}</pre></div>}
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
