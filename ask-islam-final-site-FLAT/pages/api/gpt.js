
export default async function handler(req, res){
  try {
    const { question } = req.body || {}
    const prompt = [
      { role: 'system', content: 'You are a Sunni Muslim assistant. Always begin with "Assalamu alaykum". Favor evidence and adab, and when possible, include references or links from IslamQA.info and IslamWeb.net. If the question is sensitive or needs a qualified scholar, suggest seeking local scholarly guidance.' },
      { role: 'user', content: String(question || '').slice(0, 2000) }
    ]

    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: prompt,
        temperature: 0.2
      })
    })
    const data = await r.json()
    const answer = data?.choices?.[0]?.message?.content || 'Sorry, I could not generate an answer.'
    res.status(200).json({ answer })
  } catch (e){
    res.status(500).json({ error: 'GPT error', detail: String(e) })
  }
}
