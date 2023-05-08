import { ShopLayout } from "@/components/layout";
import { Box, Typography } from "@mui/material";
import type { NextPage, GetServerSideProps } from "next";

import { ProductList } from "@/components/products";
import { db, dbProducts } from "../../../database";
import { Iproducts } from "../../../interfaces";

interface Props {
    products: Iproducts[]
    foundProducts: boolean
    query: string
}

const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {



    return (
        <ShopLayout
            title={"Teslo Shop - Search"}
            pageDescription={"Encuentra los mejores precios en la tienda de tesla"}
        >
            <Typography variant="h1" component="h1">
                Buscar Producto
            </Typography>

            {
                foundProducts ?
                    (
                        <>
                        <Box display={'flex'}>
                            <Typography variant="h2" sx={{ mb: 1 }}>
                                Resultados por: 
                            </Typography>
                            <Typography
                                textTransform={'capitalize'}
                                variant="h2"
                                color='secondary'
                                sx={{ ml: 1 }}> "{query}"
                            </Typography>
                        </Box>
                    </>
                    ) : (
                        <>
                            <Box display={'flex'}>
                                <Typography variant="h2" sx={{ mb: 1 }}>
                                    No encontramos nada por: 
                                </Typography>
                                <Typography
                                    textTransform={'capitalize'}
                                    variant="h2"
                                    color='secondary'
                                    sx={{ ml: 1 }}> "{query}"
                                </Typography>
                            </Box>
                        </>
                    )
            }

            <ProductList products={products} />

        </ShopLayout >
    );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    const { query = '' } = params as { query: string }

    if (query.length === 0) return {
        redirect: {
            destination: '/',
            permanent: false
        }
    }

    let products = await dbProducts.getProductsByTerm(query)

    const foundProducts = products.length > 0

    if (!foundProducts) {
        products = await dbProducts.getAllProducts()
    }

    return {
        props: {
            products,
            foundProducts,
            query
        }
    }
}

export default SearchPage;
