import { Router } from "express";
import UserMiddleware from "../middleware/userMiddleware";
import UserService from "../services/userService";

const router = Router();
const userMiddleware  = new UserMiddleware();
const userService = new UserService();

router.post('/login',userMiddleware.login.bind(userMiddleware),userService.login.bind(userService));

export default router;