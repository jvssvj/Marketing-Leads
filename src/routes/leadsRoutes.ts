import { Router } from "express";
import { LeadsController } from "../controllers/leadsControllers";

const leadsRoutes = Router()
const leadsControllers = new LeadsController()

leadsRoutes.get('/leads', leadsControllers.index)
leadsRoutes.post('/leads', leadsControllers.create)
leadsRoutes.get('/leads/:id', leadsControllers.show)
leadsRoutes.put('/leads/:id', leadsControllers.update)
leadsRoutes.delete('/leads/:id', leadsControllers.delete)

export { leadsRoutes }