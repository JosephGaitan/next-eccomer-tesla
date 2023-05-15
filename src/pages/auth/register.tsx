import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthLayout } from '@/components/layout'
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material'
import NextLink from 'next/link'
import { validations } from '../../../utilities';
import { tesloApi } from '../../../api';
import { ErrorOutline } from '@mui/icons-material';
import { AuthContext } from '../../../context';
import { useRouter } from 'next/router';


type FormData = {
    name: string;
    email: string;
    password: string;
}


const RegisterPage = () => {

    const {registerUser} = useContext(AuthContext)

    const router = useRouter()

    const [showError, setShowError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onRegisterFrom = async({name,email,password}: FormData) => {
        
        setShowError(false)

        const {hashError, message} = await registerUser(name,email,password)
        if(hashError){
            setShowError(true)
            setErrorMessage(message || '')
            setTimeout(() => {
                setShowError(false)
            }, 3000);
            return
        } 

        router.replace('/')
    
    }


    return (
        <AuthLayout title={'Ingresar'} >
            <form
                onSubmit={handleSubmit(onRegisterFrom)}
                noValidate
            >
                <Box sx={{ width: 350, padding: '10px 20px' }}>
                    <Grid container flexDirection={'column'} spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h1' component='h1'>
                                Registrate
                            </Typography>
                            <Chip
                                sx={{ mt: 1, display: showError ? 'flex' : 'none' }}
                                label='Usuario ya existe'
                                color='error'
                                icon={<ErrorOutline />}
                                className='fadeIn'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label='Nombre Completo'
                                variant='filled'
                                fullWidth
                                {...register('name', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                                })}
                                error={!!errors.name}
                                helperText={errors.name?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField {...register('email', {
                                required: 'Este campo es requerido',
                                validate: validations.isEmail
                            })}
                                label='Correo'
                                variant='filled'
                                fullWidth
                                type='email'
                                error={!!errors.email}
                                helperText={errors.email?.message} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField {...register('password', {
                                required: 'Este campo es requerido',
                                minLength: { value: 5, message: 'Mínimo 5 caracteres' }
                            })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                variant='filled' fullWidth
                                label='Contraseña'
                                type='password'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button 
                            color='secondary' 
                            size='large' 
                            className='circular-btn' 
                            fullWidth
                            type='submit'
                            >
                                Registrarse
                            </Button>
                        </Grid>
                        <Grid item xs={12} display={'flex'} justifyContent={'end'}  >
                            <NextLink legacyBehavior href={'/auth/login'} passHref>
                                <Link underline='always'>
                                    ¿Ya tienes cuenta?
                                </Link>
                            </NextLink>
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    )
}

export default RegisterPage
