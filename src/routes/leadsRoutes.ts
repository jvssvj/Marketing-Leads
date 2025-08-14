import { Router } from "express";
import { LeadsControllers } from "../controllers/LeadsControllers";

const leadsRoutes = Router()
const leadsControllers = new LeadsControllers()

leadsRoutes.get('/leads', leadsControllers.index)
leadsRoutes.post('/leads', leadsControllers.create)
leadsRoutes.get('/leads/:id', leadsControllers.show)
leadsRoutes.put('/leads/:id', leadsControllers.update)
leadsRoutes.delete('/leads/:id', leadsControllers.delete)

export { leadsRoutes }