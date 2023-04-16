const Task = require("../Models/Task");
const asyncWrapper = require("../middlewares/async");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
  // res.status(200).json({ status: "success", data: { tasks, nbHits: tasks.length } });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getSingleTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params; //find id in the params
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    return res.status(404).json({ msg: `No task with id: ${taskID}` }); //Alaways return
  }
  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });

  if (!task) {
    return res.status(400).json({ msg: `No task with id: ${taskID}` });
  }
  // types of responses you might get back
  res.status(200).json({ task });
  // res.status(200).send()
  // res.status(200).json({task:null, status: 'success'})

  res.send("Delete task");
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true, //returns the new updated items
    runValidators: true,
  });

  // res.status(200).json({ id: taskID, data: req.body });
  if (!task) {
    res.status(404).json({ msg: `No task with id ${taskID}` });
  }
});

module.exports = {
  getAllTasks,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
};
