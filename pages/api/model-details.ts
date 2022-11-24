import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  success: boolean
  models?: any
}

const cache = {
  fetchTimestamp: 0,
  models: {}
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'GET') {
    return res.status(400).json({ success: false })
  }

  const timeDiff = Date.now() - cache.fetchTimestamp
  if (timeDiff <= 120000) {
    return res.send({
      success: true,
      models: { ...cache.models }
    })
  }

  try {
    const resp = await fetch(
      `https://raw.githubusercontent.com/Sygil-Dev/nataili-model-reference/main/db.json`,
      {
        method: 'GET'
      }
    )

    const data = await resp.json()

    cache.fetchTimestamp = Date.now()
    cache.models = { ...data }

    return res.send({
      success: true,
      models: data
    })
  } catch (err) {
    // eh, it's okay if nothing happens.
  }

  // Optimistically send model details if we already have the information.
  if (cache.fetchTimestamp > 0) {
    return res.send({
      success: true,
      models: { ...cache.models }
    })
  } else {
    return res.send({
      success: false
    })
  }
}
