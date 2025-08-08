import { Router } from "express";
import { GroupsControllers } from "../controllers/groupsControllers";

const groupsRoutes = Router()
const groupsControllers = new GroupsControllers()

groupsRoutes.get('/groups', groupsControllers.index)
groupsRoutes.post('/groups', groupsControllers.create)
groupsRoutes.get('/groups/:id', groupsControllers.show)
groupsRoutes.put('/groups/:id', groupsControllers.update)
groupsRoutes.delete('/groups/:id', groupsControllers.delete)

export { groupsRoutes }