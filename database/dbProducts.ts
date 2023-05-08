import { db } from "."
import { Iproducts } from "../interfaces";
import { Product } from "../models"

export const getProductBySlug = async (slug: string): Promise<Iproducts | null> => {
    await db.connect();
    const product = await Product.findOne({ slug }).lean();
    await db.disconnect();

    if (!product) {
        return null
    }

    return JSON.parse(JSON.stringify(product))

}

interface productSlug {
    slug: string
}

export const getAllProductSlug = async (): Promise<productSlug[]> => {
    await db.connect()
    const slugs = await Product.find().select('slug -_id').lean()
    await db.disconnect()

    return slugs
}

export const getProductsByTerm = async (term: string):Promise<Iproducts[]> => {
    term = term.toString().toLowerCase()

    await db.connect()
    const products = await Product.find({
        $text: { $search: term }
    }).select('slug price images inStock title -_id').lean()
    await db.disconnect()

    return products
}

export const getAllProducts = async ():Promise<Iproducts[]> => {
    await db.connect()
    const products = await Product.find().lean()
    await db.disconnect()
    return JSON.parse(JSON.stringify(products))
}