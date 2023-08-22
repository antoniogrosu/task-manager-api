const Task = require("../models/Task");
const aysncWrapper = require("../middleware/async");
const {
  creatCustomError,
  createCustomError,
} = require("../errors/custom-error");

//get all the tasks
const getAllTasks = aysncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(201).json({ tasks });
});

//create a task
const createTask = aysncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

//get a certain task
const getTask = aysncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    return next(createCustomError("No task id", 404));
    return res.status(404).json({ msg: `No task with id ${taskID}` });
  }
  return res.status(200).json({ task });
});

//delete a task
const deleteTask = aysncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return res.status(404).json({ msg: `No task found with id ${taskID}` });
  }
  return res.status(200).json({ task });
});

//update a task
const updateTask = aysncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return res.status(404).json({ msg: `No task found with id ${taskID}` });
  }
  return res.status(200).json({ task });
});

//mandatory
module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
