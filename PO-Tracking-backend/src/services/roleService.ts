import {RoleInterface}  from "../interfaces/roleInterface";
import RoleRepository from "../database/repositories/roleRepository";
import { Response,Request } from "express";

class RoleService{
    private roleRepository: RoleRepository;
    constructor(){
        this.roleRepository = new RoleRepository;
    }
    public async createRole(req : Request, res : Response){
        try{
            const role : RoleInterface  = req.body;
            const existingRole = await this.roleRepository.findRoleByName(role.name);
            if (existingRole) {
                return res.sendError(null,"Role Already Exists",400);
            }
            const newrole = await this.roleRepository.createRole(role);
            return  res.sendFormatted(newrole);
        }catch(e){
            return res.sendError(null,"Error while creating role",400);
           // throw new Error(`Error while creating role`);
        }
    }
    public async updateRole(req : Request, res : Response){
        try {
            
        } catch (e) {
            
        }
    }
    public async getRoleId(req : Request, res : Response){
        try {
            const { name }  = req.params;
            console.log(name);
            const role = await this.roleRepository.getIdByRole(name);
            console.log(`Role ${role}`);
            return res.sendFormatted(role);
        } catch (error) {
            return res.sendError(null,"Error while getting the role",400);
        }
    }
    public async deleteRole(req : Request, res : Response){
        try {
            const { name } : RoleInterface = req.body;
            const deleteRole = await this.roleRepository.deleteRole(name);
            return res.sendFormatted(deleteRole);
        } catch (e) {
            throw new Error(`Error while deleting role`);
        }
    }
    public async createRoles(names: RoleInterface[]): Promise<void> {
    try {
        for (const role of names) {
            const existingRole = await this.roleRepository.findRoleByName(role.name); 
            if (existingRole) {
                console.log(`Role '${role.name}' already exists`);
            } else {
                await this.roleRepository.createRole(role);
                console.log(`Role '${role.name}' created successfully`);
            }
        }
    } catch (error: any) {
        console.error('Error while creating roles:', error.message);
    }
    }

}

export default RoleService;
