
import { useSession, getSession } from 'next-auth/react'

export default function Upgrade(){
  const { data: session } = useSession()
  if (!session) return <main className="container"><p>Please sign in to upgrade.</p></main>
  return (
    <main className="container">
      <h2 className="subtitle">Upgrade to Pro</h2>
      <ul className="plans">
        <li><a className="plan" href={process.env.NEXT_PUBLIC_STRIPE_WEEKLY_LINK} target="_blank" rel="noreferrer">Weekly — $3.99</a></li>
        <li><a className="plan" href={process.env.NEXT_PUBLIC_STRIPE_MONTHLY_LINK} target="_blank" rel="noreferrer">Monthly — $11.99</a></li>
        <li><a className="plan" href={process.env.NEXT_PUBLIC_STRIPE_YEARLY_LINK} target="_blank" rel="noreferrer">Yearly — $49.99</a></li>
        <li><a className="plan" href={process.env.NEXT_PUBLIC_STRIPE_LIFETIME_LINK} target="_blank" rel="noreferrer">Lifetime — $150</a></li>
      </ul>
      <p className="muted">After payment completes, our webhook will mark your account Pro.</p>
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
