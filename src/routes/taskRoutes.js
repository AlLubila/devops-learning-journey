const express = require('express');
const taskController = require('../controllers/taskController');

const router = express.Router();

router.post('/tasks', taskController.createTask);
router.get('/tasks', taskController.getAllTasks);
router.put('/tasks/:id', taskController.updateTask);
router.delete('/tasks/:id', taskController.deleteTask);

module.exports = router;
