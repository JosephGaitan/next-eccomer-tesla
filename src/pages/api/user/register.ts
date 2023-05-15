import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../database";
import { jwt, validations } from '../../../../utilities';
import { User } from '../../../../models';


type Data =
    | { message: string }
    | {
        token: string
        user: {
            email: string
            role: string
            name: string
        }
    }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'POST':
            return registerUser(req, res)
        default:
            res.status(400).json({ message: 'Bad request' })

    }
}

async function registerUser(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { email = '', password = '', name = '' } = req.body as { email: string, password: string, name: string }

    if (password.length < 5) {
        return res.status(400).json({ message: 'Password must be at least 5 characters' })
    }

    //todo validar email

    if (name.length < 2) {
        return res.status(400).json({ message: 'Name must be at least 2 characters' })
    }

    if (!validations.isValidEmail(email)) {
        return res.status(400).json({ message: 'Formato de correo invalido.  Usar formato: abc@abc.abc' })
    }
    

    await db.connect()
    const user = await User.findOne({ email })

    if (user) {
        await db.disconnect()
        return res.status(400).json({ message: 'Email already exists' })
    }


    const newUser = new User({
        email: email.toLocaleLowerCase(),
        password: bcrypt.hashSync(password, 10),
        role: 'client',
        name
    })
    
    try {
        await newUser.save({validateBeforeSave:true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Check server logs ' })

    }

    const { _id } = newUser

    const token = jwt.signToken(_id, email)

    return res.status(200).json({
        token,
        user: {
            email, role:'client', name
        }
    })
}

