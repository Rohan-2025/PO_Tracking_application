import { Request,Response,NextFunction } from "express";
import { verifyToken } from "../helpers/encrypt";

class UserMiddleware{
    constructor(){}
    public async createUser(req: Request, res: Response,next : NextFunction){
        try{
            const {name,email,password,role} = req.body;
            if(!name || !email || !password || !role){
                return res.sendError(null,"Invalid fields",400);
            }
            next();
        }catch(e){
            throw new Error(`Error while creating user ${e}`);
        }
    }
    public async verifyAdmin(req : Request,res : Response,next : NextFunction){
        try {
            const authHeader = req.headers['authorization'];
            if (!authHeader) {
                return res.sendError(null,"Invalid authorization header",400);
            }
            const token = authHeader.split(' ')[1];
            const  { role }: any  = await verifyToken(token);
            console.log(role);
            if(role === "ADMIN"){
                next();
            }else{
                return res.sendError(null,"Only Admin Create Users",400);
            }
        } catch (error : any) {
            throw new Error(`Error while Verifying`);
        }
    }
    public async login(req : Request, res : Response,next : NextFunction){
        try {
            const {name,password}  =  req.body;
            if(!name || !password){
                return res.sendError(null,"Invalid fields",400);
            }
            next();
        } catch (e : any) {
            throw new Error(`Error while logging user ${e}`);
        }
    }
}
export default UserMiddleware;