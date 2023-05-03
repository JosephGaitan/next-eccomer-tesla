import { AuthLayout } from '@/components/layout'
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material'
import NextLink from 'next/link'

const RegisterPage = () => {
    return (
        <AuthLayout title={'Ingresar'} >
            <Box  sx={{ width: 350, padding: '10px 20px' }}>
                <Grid container flexDirection={'column'} spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h1' component='h1'>
                            Registrate
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label='Nombre Completo' variant='filled' fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label='Correo' type='email' variant='filled' fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label='Contraseña' type='password' variant='filled' fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <Button color='secondary' size='large' className='circular-btn' fullWidth>
                            Registrarse
                        </Button>
                    </Grid>
                    <Grid item xs={12} display={'flex'} justifyContent={'end'}  >
                            <NextLink legacyBehavior href={'/auth/login'} passHref>
                                <Link  underline='always'>
                                    ¿Ya tienes cuenta?
                                </Link>
                            </NextLink>
                        </Grid>
                </Grid>
            </Box>
        </AuthLayout>
    )
}

export default RegisterPage
