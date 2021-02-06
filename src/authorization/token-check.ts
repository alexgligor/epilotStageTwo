import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
const SECRET_KEY = 'secret_key';
export const tokenCheck = (req: Request, res:Response , next: NextFunction)=>{
    const token = req.headers['authorization'];
    if(token){
        jwt.verify(token,SECRET_KEY,(err)=>{
            if(err)
               res.sendStatus(203);
            else
                next();
        })
    }
    else
        res.sendStatus(203);
 
}