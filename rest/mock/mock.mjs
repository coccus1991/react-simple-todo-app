import express from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();

function getUnixTime() {
  return (Date.now() / 1000) | 0;
}

app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, Authorization"
  );
  next();
});

let tasks = [
  {
    id: "d5f21471-d27e-4ae6-b7ea-92e6245bba0c",
    name: "Clean the car",
    created_date: getUnixTime(),
    description: "You have to clean the dirty car",
    completed: false,
  },
];

const apiRouter = express.Router();

apiRouter.get("/task", (req, res) => {
  res.json(tasks);
});

apiRouter.put("/task", (req, res) => {
  const task = req.body;

  const index = tasks.findIndex((elem) => elem.id === task.id);

  if (index < 0) return res.status(404).json();

  tasks[index] = task;

  return res.json(task);
});

apiRouter.post("/task", (req, res) => {
  let task = {
    ...req.body,
    id: uuidv4(),
    created_date: getUnixTime(),
  };

  tasks.push(task);

  res.json(task);
});

apiRouter.delete("/task/:id", (req, res) => {
  tasks = tasks.filter((elem) => elem.id !== req.params.id);
  res.send("");
});

app.use("/api", apiRouter);

app.listen(8000, () => console.log("Server listening on port 8000"));
