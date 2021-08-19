const { Router } = require("express");
const router = Router();

const Task = require("../models/task-model");

// read DB
router.get("/", async (req, res) => {
  const foundTasks = await Task.find();
  res.json(foundTasks);
});

router.get("/:id", async (req, res) => {
  const foundTask = await Task.findById(req.params.id);
	res.json(foundTask);
});

// create DB
router.post("/", async (req, res) => {
  const { title, description } = req.body;
  newTask = new Task({
    title: title,
    description: description,
  });
  await newTask.save();
  res.json({
    message: "Received!",
  });
});

// update DB
router.put("/:id", async (req, res) => {
  const { title, description } = req.body;
  const newTask = { title: title, description: description };
  await Task.findByIdAndUpdate(req.params.id, newTask);
  res.json({
    message: "updated!",
  });
});

// delete DB
router.delete("/:id", async (req, res) => {
  await Task.findByIdAndRemove(req.params.id);
  res.json({
    message: "deleted!",
  });
});

module.exports = router;
