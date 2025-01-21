import RoleRepository from "../database/repositories/roleRepository";
import UserRepository from "../database/repositories/userRepository";
import { ADMIN_EMAIL,ADMIN_USER,ADMIN_PASS } from "../config/config";
import { IUserCreate, IUserCreateReturn, IUserLogin } from "../interfaces/userInterface";
import { createToken, hashPassword, isMatch } from "../helpers/encrypt";
import { Response,Request } from "express";

class UserService{
    private userRepository: UserRepository;
    private roleRepository: RoleRepository;
    constructor(){
        this.userRepository = new UserRepository();
        this.roleRepository = new RoleRepository();
    }
    public async createAdmin() : Promise<void>{
        try {
            const role = await this.roleRepository.getIdByRole("ADMIN");
            if(role){
                const hashedPassword = await hashPassword(ADMIN_PASS);
                const needAdmin = await this.userRepository.getUserByRole(role._id);
                if(!needAdmin){
                    const user : IUserCreate = {
                    name : ADMIN_USER,
                    password : hashedPassword,
                    email : ADMIN_EMAIL,
                    role : role._id
                }
                    const newUser = await this.userRepository.createUser(user);
                    console.log(`Admin is Created with name ${newUser?.name}`);
                }else{
                    console.log(`Admin already exists`);
                }
            }else{
                console.log(`Admin creation failed`);
            }
        } catch (error: any) {
            throw new Error(`Error in Admin creation`);
        }
    }
    public async login(req : Request, res : Response){
        try {
            const user : IUserLogin = req.body;
            const userDetails :  IUserCreateReturn | null = await this.userRepository.getUserByName(user.name);
            if(!userDetails){
                return res.sendError(null,"User Not found",400);
            }else{
                const matchPassword = await isMatch(user.password,userDetails.password);
                if(!matchPassword){
                    return res.sendError(null,"Wrong password",400);
                }
                const accessToken = createToken({
                    _id : userDetails._id,
                    role    : userDetails.role.name,
                    name : userDetails.name,
                    email : userDetails.email
                });
                const userResponse = {
                    name : userDetails.name,
                    email : userDetails.email,
                    role : userDetails.role.name,
                    token : accessToken
                }
                return res.sendFormatted(userResponse,"User Details",200);
            }
        } catch (e) {
            throw new Error(`Error in Login`);
        }
    }
}


export default UserService;