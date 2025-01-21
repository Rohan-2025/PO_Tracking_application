import mongoose from "mongoose";
import { IUserCreate } from "../../interfaces/userInterface";
import User from "../models/userModel";

class UserRepository{
    public async createUser(user : IUserCreate) : Promise<IUserCreate | null> {
        try{
            const newUser: IUserCreate = await User.create(user);
            return newUser;
        }catch(error : any){
            throw new Error(error);
        }
    }
    public async getUserByRole(role : mongoose.Schema.Types.ObjectId) : Promise<boolean>{
        try {
            const user = await User.findOne({ role } );
            return user ? true : false;
        } catch (error: any) {
            throw new Error(error);
        }
    }
    public async getUserByName(name : string) : Promise<any | null> {
        try{
            const user = await User.findOne({ name } ).populate('role').lean();
            return user;
        }catch(error : any){
            throw new Error("No user found");
        }
    }
}
export default UserRepository;