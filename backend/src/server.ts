import express from "express";
import taskRouter from "./routes/tasksRouter.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/tasks", taskRouter);

const PORT = process.env.PORT || 3000;
const URL = process.env.URL || "localhost";
app.listen(PORT, () => console.log(`http://${URL}:${PORT}`));