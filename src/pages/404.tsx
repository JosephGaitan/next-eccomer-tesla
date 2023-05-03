import { ShopLayout } from '@/components/layout'
import { Box, Typography } from '@mui/material'
import React from 'react'


const Custom404 = () => {
    return (
        <>
            <ShopLayout title={'Page Not Found'} pageDescription={'Aquí no hay nada'}>
                <Box
                sx={{flexDirection: {xs:'column', sm:'row'}}} 
                display='flex' 
                justifyContent='center'
                alignItems='center' 
                height='calc(100vh - 200px)'>
                    <Typography variant="h1" component='h1' fontSize={80} fontWeight={200}>404 |</Typography>
                    <Typography marginLeft={2}>Ups! Aquí no hay nada</Typography>
                </Box>

            </ShopLayout>
        </>
    )
}

export default Custom404
