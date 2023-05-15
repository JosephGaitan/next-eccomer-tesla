import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../database";
import { jwt } from '../../../../utilities';
import { User } from '../../../../models';


type Data = 
    |  {message: string}
    | {
        token: string
        user: {
            email:string
            role: string
            name: string
        }
    }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch(req.method) {
        case 'GET':
            return checkJWT(req, res)
        default:
            res.status(400).json({ message: 'Bad request' })
    
    }
}

async function checkJWT(req: NextApiRequest, res: NextApiResponse<Data>) {
    const {token=''} = req.cookies;
    
    let userId = '';

    try {
        userId = await jwt.isValidToken(token);
    } catch (error) {
        return res.status(401).json({ message: 'Token not valid' })
    }

    await db.connect()
    const user = await User.findById(userId).lean();
    await db.disconnect()
    
    if(!user) { 
        return res.status(400).json({ message: 'User not found by that id' })
    }    

    const {role, name, _id, email} = user


    return res.status(200).json({
        token:jwt.signToken(_id, email),
        user: {
            email,role,name
        }
    })
}


