import { FC, useEffect, useReducer, useState } from 'react'
import { AuthContext, authReducer } from './'
import { IUser } from '../../interfaces';
import { tesloApi } from '../../api';
import Cookies from 'js-cookie';
import axios from 'axios';
import { db } from '../../database';
import { User } from '../../models';

export interface AuthState {
    isLoggedIn: boolean;
    user?: IUser
}

interface Props {
    children: React.ReactNode
}

const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined

}

export const AuthProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

    useEffect(() => {
        checkToken();
    },[])

    const checkToken = async () => {
        try {
            const { data } = await tesloApi.get('/user/validate-token');
            const { token, user } = data;
            Cookies.set('token', token);
            dispatch({ type: '[Auth] - Login', payload: user });
        } catch (error) {
            Cookies.remove('token');
        }
    }

    const loginUser = async (email: string, password: string): Promise<boolean> => {
        try {
            const { data } = await tesloApi.post('/user/login', { email, password });
            const { token, user } = data;
            Cookies.set('token', token);
            dispatch({ type: '[Auth] - Login', payload: user });
            return true

        } catch (error) {
            return false
        }
    }

    const registerUser = async (name: string, email: string, password: string): Promise<{ hashError: boolean, message?: string }> => {
        try {
            const { data } = await tesloApi.post('/user/register', { name, email, password });
            const { token, user } = data;
            Cookies.set('token', token);
            dispatch({ type: '[Auth] - Login', payload: user });
            return {
                hashError: false,
                message: 'User created successfully'
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return {
                    hashError: true,
                    message: error.response?.data.message
                }
            }
            return {
                hashError: true,
                message: 'Something went wrong creating new user'
            }
        }

    }

    return (
        <AuthContext.Provider value={{
            ...state,
            loginUser,
            registerUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}