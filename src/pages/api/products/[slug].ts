import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../../database'
import { Product } from '../../../../models'
import { Iproducts } from '../../../../interfaces'

type Data = | { message: string } | Iproducts;

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    switch (req.method) {
        case 'GET':
            return getProducts(req, res)

        default:
            return res.status(400).json({
                message: 'Bad request'
            })
    }
}
async function getProducts(req: NextApiRequest, res: NextApiResponse<Data>) {


    await db.connect()
    const { slug } = req.query
    const product = await Product.findOne({ slug }).lean()
    await db.disconnect()

    if (!product) {
        return res.status(404).json({ message: 'No hay nada aquí' })
    }

    return res.json(product)
}

