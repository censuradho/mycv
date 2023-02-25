import { withMethodsGuard } from '@/hoc'
import { cityService } from '@/services/ninja/city'
import { NextApiRequest, NextApiResponse } from 'next'

async function handler (req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') return res.status(404).send('Not found')

    const { name } = req.query
  
    const { data } = await cityService.findByName(name as string)
  
    return res.json(data)
  } catch (err) {
    return res.status(500).send(err)
  }
}

export default withMethodsGuard(handler, ['GET'])