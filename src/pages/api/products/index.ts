import type { NextApiRequest, NextApiResponse } from 'next'
import { db, SHOP_CONSTANTS } from '../../../../database'
import { Product } from '../../../../models'
import { Iproducts } from '../../../../interfaces'

type Data = {
    message: string
} | Iproducts[]

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

    const { gender = 'all' } = req.query

    let condition = {}

    if (gender !== 'all' && SHOP_CONSTANTS.validGenders.includes(`${gender}`)) {
        condition = { gender }
    }

    await db.connect()
    const products = await Product.find(condition).select('images price slug inStock description title -_id').lean()
    await db.disconnect()
    return res.status(200).json(products)
}

