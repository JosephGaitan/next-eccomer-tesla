
import type { NextApiRequest, NextApiResponse } from 'next'
import { db, seedDataBase } from '../../../database'
import { Product } from '../../../models'

type Data = {
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    if (process.env.NODE_ENV === 'production') {
        return res.status(401).json({ message: 'No tiene acceso a esta API' })
    }

    await db.connect()
    await Product.deleteMany()
    await db.disconnect()
    await Product.insertMany(seedDataBase.initialData.products)

    res.status(200).json({ message: 'done' })
}
