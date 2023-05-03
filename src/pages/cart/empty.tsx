import NextLink from 'next/link'
import { ShopLayout } from '@/components/layout'
import { RemoveShoppingCartOutlined } from '@mui/icons-material'
import { Box, Link, Typography } from '@mui/material'

const empty = () => {
    return (
        <ShopLayout title={'Carrito Vacío'} pageDescription='No hay artículos en el carrito'>
            <Box
                sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
                display='flex'
                justifyContent='center'
                alignItems='center'
                height='calc(100vh - 200px)'>
                <Box>
                    <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
                </Box>
                <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                    <Typography fontSize={30}>
                        | Su carrito está vacío
                    </Typography>
                    <NextLink href='/' passHref legacyBehavior>
                        <Link typography={'h4'} color={'secondary'}>
                            Regresar
                        </Link>
                    </NextLink>
                </Box>
            </Box>
        </ShopLayout>
    )
}

export default empty
