import express from "express";
import taskRouter from "./routes/tasksRouter.js";

const app = express();

app.use(express.json());

app.use("/api/tasks", taskRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));