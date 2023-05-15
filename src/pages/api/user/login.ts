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
        case 'POST':
            return loginUser(req, res)
        default:
            res.status(400).json({ message: 'Bad request' })
    
    }
}

async function loginUser(req: NextApiRequest, res: NextApiResponse<Data>) {
    const {email ='', password = ''} = req.body
    await db.connect()
    const user = await User.findOne({ email })
    await db.disconnect()
    
    if(!user) { 
        return res.status(400).json({ message: 'User not found' })
    }

    if (!bcrypt.compareSync(password, user.password!)) {
        return res.status(400).json({ message: 'Invalid password' })
    }

    

    const {role, name, _id} = user

    const token = jwt.signToken(_id, email)

    return res.status(200).json({
        token,
        user: {
            email,role,name
        }
    })
}

