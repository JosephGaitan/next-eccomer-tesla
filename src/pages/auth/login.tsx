import { useContext, useState } from 'react';
import { AuthContext } from '../../../context';
import NextLink from 'next/link'
import { AuthLayout } from '@/components/layout'
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form';
import { validations } from '../../../utilities';

import { ErrorOutline } from '@mui/icons-material';
import { useRouter } from 'next/router';

type FormData = {
    email: string;
    password: string;
}

const LoginPage = () => {

    const router = useRouter()

    const { loginUser } = useContext(AuthContext)

    const [showError, setShowError] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onLoginUser = async ({ email, password }: FormData) => {

        setShowError(false)

        const isValidLogin = await loginUser(email, password)

        if (!isValidLogin) {
            setShowError(true)
            setTimeout(() => {
                setShowError(false)
            }, 3000);
            return;
        }


        router.replace('/')
    }

    return (
        <AuthLayout title={'Ingresar'} >
            <form
                onSubmit={handleSubmit(onLoginUser)}
                noValidate
            >
                <Box sx={{ width: 350, padding: '10px 20px' }}>
                    <Grid container flexDirection={'column'} spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h1' component='h1'>
                                Iniciar Sesión
                            </Typography>
                            <Chip
                                sx={{ mt: 1, display: showError ? 'flex' : 'none' }}
                                label='No reconocemos el usuario o contraseña'
                                color='error'
                                icon={<ErrorOutline />}
                                className='fadeIn'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                {...register('email', {
                                    required: 'Este campo es requerido',
                                    validate: validations.isEmail
                                })}
                                label='Correo'
                                variant='filled'
                                fullWidth
                                type='email'
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                {...register('password', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 5, message: 'Mínimo 5 caracteres' }
                                })}
                                label='Contraseña'
                                type='password'
                                variant='filled' fullWidth
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type='submit'
                                color='secondary'
                                size='large'
                                className='circular-btn'
                                fullWidth
                            >
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
                                    <Link underline='always'>
                                        ¿No tienes cuenta?
                                    </Link>
                                </NextLink>
                            </Grid>
                        </Box>
                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    )
}

export default LoginPage
