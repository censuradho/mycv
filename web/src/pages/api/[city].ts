import { cityService } from '@/services/local-api/city'
import { NextApiResponse, NextApiRequest } from 'next'

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(404).send('Not found')

  const { city } = req.query

  const { data } = await cityService.findByName(String(city))

  return res.json(data)
}