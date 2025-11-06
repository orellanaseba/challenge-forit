import express from "express";
import taskRouter from "./routes/tasksRouter.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/tasks", taskRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));