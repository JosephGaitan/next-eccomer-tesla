
import { Box, Button, Chip, Grid, Typography } from '@mui/material'
import { dbProducts } from '../../../database'
import { initialData } from '../../../database/products'
import { Iproducts } from '../../../interfaces'
import { ItemCounter } from '@/components/ui'
import { NextPage, GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next'
import { ProductSlideShow } from '@/components/products/ProductSlideShow'
import { redirect } from 'next/dist/server/api-utils'
import { ShopLayout } from '@/components/layout'
import { SizeSelector } from '@/components/products'
import React from 'react'


interface Props {
  product: Iproducts
}

const ProductPage: NextPage<Props> = ({ product }) => {
  //const router = useRouter()
  //const  {products: product, isLoading, isError} = useProducts(`/product/${router.query.slug}`)


  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideShow
            images={product.images} />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Box display='flex' flexDirection='column'>
            <Typography variant='h1' component='h1'>
              {product.title}
            </Typography>
            <Typography variant='subtitle1' component='h2'>
              {`$${product.price}`}
            </Typography>
            <Box sx={{ my: 2 }}>
              <Typography variant='subtitle2'>
                Cantidad
              </Typography>
              <ItemCounter />
              <SizeSelector selectedSize={product.sizes[2]} sizes={product.sizes} />
            </Box>
            <Button color='secondary' className='circular-btn'>
              Agregar al Carrito
            </Button>
            {/*<Chip label='No hay disponibles' color='error' variant='outlined'/>*/}

            <Box
              sx={{ mt: 3 }}
            >
              <Typography variant='subtitle2'>
                Descripción
              </Typography>
              <Typography variant='body2'>
                {product.description}
              </Typography>
            </Box>

          </Box>

        </Grid>
      </Grid>

    </ShopLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  
  const productSlugs = await dbProducts.getAllProductSlug();

  return {
    paths: productSlugs.map(({slug}) =>({
      params: {
        slug
      }
    })),
    fallback: "blocking"
  }
} 

export const getStaticProps: GetStaticProps = async ({params}) => {
  const {slug = ''} = params as { slug: string}
  const product = await dbProducts.getProductBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24
  }
}

//SSR no usar

/**export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { slug } = params as { slug: string }
  const product = await dbProducts.getProductBySlug(slug)
  
  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product
    }
  }
} */


export default ProductPage
