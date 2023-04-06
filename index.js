const express = require("express");
const tasks = require("./routes/tasks");
const app = express();
const connectDB = require("./db/connect");
require('dotenv').config()

// Middleware
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("Task Manager App");
});

app.use("/api/v1/tasks", tasks);

// app.get('/api/v1/tasks')         -get all the tasks
// app.post('/ap/v1/tasks')         -create new task
// app.get('/api/v1/tasks/:id')     -get single task
// app.patch('/api/v1/tsks/:id')    -update task
// app.delete('/api/v1/tasks/:id')  -delete task

const PORT = 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () =>
      console.log(`Server is listeneing on port:${PORT}...`)
    );
  } catch (error) {
    console.log(error)
  }
};

start()