import { Request, Response} from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'secret_key';

const loginController = (req:Request,res: Response)=>{
    const user ={id :7};
    const token = jwt.sign(user, SECRET_KEY);

    return res.status(200).json({
            result: token
        });
}

export {
    loginController
}