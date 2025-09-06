import cors from "cors";
import express from "express";
import { errorHandlerMiddleware } from "./middlewares/errorHandler";
import { leadsRoutes } from "./routes/leadsRoutes";
import { groupsRoutes } from "./routes/groupsRoutes";
import { campaignsRoutes } from "./routes/campaignsRoutes";
import { campaignsLeadsRoutes } from "./routes/campaignsLeadsRoutes";

const app = express();
app.use(express.json());

app.use(cors());

app.use("/api/", leadsRoutes);
app.use("/api/", groupsRoutes);
app.use("/api/", campaignsRoutes);
app.use("/api/", campaignsLeadsRoutes);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
