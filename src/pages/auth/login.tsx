import { AuthLayout } from '@/components/layout'
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material'
import NextLink from 'next/link'

const LoginPage = () => {
    return (
        <AuthLayout title={'Ingresar'} >
            <Box  sx={{ width: 350, padding: '10px 20px' }}>
                <Grid container flexDirection={'column'} spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h1' component='h1'>
                            Iniciar Sesión
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label='Correo' type='email' variant='filled' fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label='Contraseña' type='password' variant='filled' fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <Button color='secondary' size='large' className='circular-btn' fullWidth>
                            Ingresar
                        </Button>
                    </Grid>
                    <Box mt={1} display={'flex'} justifyContent={'space-around'}>
                        <Grid item >
                            <NextLink legacyBehavior href={'/auth/register'} passHref>
                                <Link underline='always'>
                                    Olvidé mi contraseña
                                </Link>
                            </NextLink>
                        </Grid>
                        <Grid item   >
                            <NextLink legacyBehavior href={'/auth/register'} passHref>
                                <Link  underline='always'>
                                    ¿No tienes cuenta?
                                </Link>
                            </NextLink>
                        </Grid>
                    </Box>
                </Grid>
            </Box>
        </AuthLayout>
    )
}

export default LoginPage
