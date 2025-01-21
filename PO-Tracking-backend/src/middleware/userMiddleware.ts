import { Request,Response,NextFunction } from "express";

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