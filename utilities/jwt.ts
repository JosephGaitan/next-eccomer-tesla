import jwt from 'jsonwebtoken'
import { resolve } from 'path'

export const signToken = (_id: string,  email: string) => {

    if (!process.env.JWT_SECRET_SEED){
        throw new Error('JWT_SECRET_SEED is not defined')
    }
    return jwt.sign(
        {_id, email},
        process.env.JWT_SECRET_SEED,
        {expiresIn: '30d'},
    )
}


export const isValidToken = (token: string):Promise<string> => {
    if (!process.env.JWT_SECRET_SEED){
        throw new Error('JWT_SECRET_SEED is not defined')
    }
    return new Promise((resolve, reject)=>{
        try {
            jwt.verify(token, process.env.JWT_SECRET_SEED || '', (err, payload)=>{
                if (err) return reject('Jwt no es valido');

                const {_id} = payload as {_id: string};
                
                resolve(_id)
            } )
            resolve(token)
        } catch (error) {
            reject('Jwt no es valido')
        }
    })
}
