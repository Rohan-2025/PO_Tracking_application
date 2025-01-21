import Role from "../models/roleModel"
import { RoleInterface, RoleInterfaceGet } from "../../interfaces/roleInterface";
import mongoose from "mongoose";

class RoleRepository{
  public async createRole(role : RoleInterface) : Promise<RoleInterface | null>{
    try{
      const newRole =  await Role.create(role); 
      return newRole;
    }catch(e){
      throw new Error(`New Error while creating role ${e}`);
    }
  }
  public async findRoleByName(name : string) : Promise<boolean> {
    try {
      const role = await Role.findOne({ name }).lean();
      return role ? true : false;
    } catch (e) {
      return false;
    }
  }
  public async deleteRole(name : string) : Promise<RoleInterface | null> {
    try {
      const role = await Role.findOneAndDelete({ name }).lean();
      return role;
    } catch (e) {
      throw new Error(`New Error while deleting role ${e}`);
    }
  }
  public async getIdByRole(name : string) : Promise<any | null> {
    try{
        const role = await Role.findOne({ name }).lean();
        return role;
    }catch (e){
        throw new Error(`Error while getting role ${name}`);
    }
  }
}

export default RoleRepository;