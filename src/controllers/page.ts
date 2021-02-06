import { Request, Response } from 'express';

export const page = (req:Request,res:Response)=>{
    res.end('<html><body><h1>Rocket already in Space!</h1></body></html>');
}