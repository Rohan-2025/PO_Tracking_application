import express from 'express';
import connectDB from './database/connection';
import routes from './routes'
import { responseFormatter } from './utils/reponseFormatter';
import UserService from './services/userService';
import RoleService from './services/roleService';
import { RoleInterface } from './interfaces/roleInterface';
const app = express();

app.use(express.json());
app.use(responseFormatter);
app.use('/api', routes);

connectDB();

const roles : RoleInterface[] = [
   {
    "name" : "ADMIN",
   },
   {
    "name" : "SCM_ADMIN",
   },
   {
    "name" : "CLIENT_ADMIN",
   },
   {
    "name" : "CLIENT_LOGISTICS",
   }
]

const userService = new UserService();
const roleService = new RoleService();
roleService.createRoles(roles);
userService.createAdmin(); 

export default app;
