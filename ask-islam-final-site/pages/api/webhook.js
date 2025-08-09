
import { buffer } from 'micro'
import Stripe from 'stripe'

export const config = { api: { bodyParser: false } }

export default async function handler(req, res){
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).end('Method Not Allowed')
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2023-10-16' })
  const sig = req.headers['stripe-signature']

  try {
    const buf = await buffer(req)
    const event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET || '')

    if (event.type === 'checkout.session.completed') {
      // TODO: look up the user by metadata/email and mark them Pro (DB not included here).
      console.log('✅ Stripe checkout completed; mark user Pro in your DB.')
    }

    return res.json({ received: true })
  } catch (err){
    console.error('Webhook error', err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }
}
