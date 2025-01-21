import { Router } from "express";
import RoleService from "../services/roleService";
import RoleMiddleware from "../middleware/roleMiddleware";


const router = Router();
const roleService = new RoleService();
const roleMiddleware = new RoleMiddleware();

router.post('/',
    roleMiddleware.createRole.bind(roleMiddleware),
    roleService.createRole.bind(roleService)
);
router.get('/:name',
    roleMiddleware.getRole.bind(roleMiddleware),
    roleService.getRoleId.bind(roleService),
)
export default router;