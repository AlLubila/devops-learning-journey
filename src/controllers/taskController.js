const taskModel = require('../models/taskModel');

async function createTask(req, res, next) {
  try {
    const { title, description, completed } = req.body;

    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return res.status(400).json({ error: 'title is required and must be a non-empty string' });
    }

    const task = await taskModel.createTask({
      title: title.trim(),
      description,
      completed,
    });

    return res.status(201).json(task);
  } catch (error) {
    return next(error);
  }
}

async function getAllTasks(req, res, next) {
  try {
    const tasks = await taskModel.getAllTasks();
    return res.status(200).json(tasks);
  } catch (error) {
    return next(error);
  }
}

async function updateTask(req, res, next) {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id) || id <= 0) {
      return res.status(400).json({ error: 'Invalid task id' });
    }

    const { title, description, completed } = req.body;

    if (title !== undefined && (typeof title !== 'string' || title.trim().length === 0)) {
      return res.status(400).json({ error: 'title must be a non-empty string when provided' });
    }

    if (completed !== undefined && typeof completed !== 'boolean') {
      return res.status(400).json({ error: 'completed must be a boolean when provided' });
    }

    const updatedTask = await taskModel.updateTaskById(id, {
      title: title === undefined ? undefined : title.trim(),
      description,
      completed,
    });

    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    return res.status(200).json(updatedTask);
  } catch (error) {
    return next(error);
  }
}

async function deleteTask(req, res, next) {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id) || id <= 0) {
      return res.status(400).json({ error: 'Invalid task id' });
    }

    const deleted = await taskModel.deleteTaskById(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Task not found' });
    }

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
};
