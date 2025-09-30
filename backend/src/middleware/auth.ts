import type {Request,Response,NextFunction} from "express"
import jwt, {  type JwtPayload } from "jsonwebtoken"

const JWT_SECRET=process.env.JWT_SECRET



export default async function auth(req:Request,res:Response,next:NextFunction) {
    const token=req.cookies.token;
    if(!token){
        return res.status(401).json("token is missing at auth page")
    }

    try {
        if(!JWT_SECRET) throw new Error("JWT secret is missing")
        const decodeToken=await jwt.verify(token,JWT_SECRET) as JwtPayload
        console.log("got the payload from token");
        
        req.user={id:decodeToken.id,...decodeToken}
        console.log("auth page req data",req.user.id)
        return next()
    } catch (error) {
        return res.status(501).json("internal server error furing auth middleware")
    }

}