import {createContext} from 'react'
import { IUser } from '../../interfaces';

interface ContextProps {
    isLoggedIn: boolean;
    user?: IUser;
     //methods
     loginUser: (email: string, password: string) => Promise<boolean>
     registerUser: (name: string, email: string, password: string) => Promise<{
        hashError: boolean;
        message?: string;
    }>;

}

export const AuthContext = createContext({} as ContextProps)