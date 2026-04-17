const { send } = require('../utils/response');

let tasks = [
  { id: 1, title: 'Setup development environment', completed: false, priority: 'high' },
  { id: 2, title: 'Read project documentation',   completed: true,  priority: 'medium' },
  { id: 3, title: 'Write unit tests',              completed: false, priority: 'low' },
];
let nextId = 4;

const getAllTasks = (req, res) => {
  const { completed } = req.query;

  if (completed !== undefined) {
    const filtered = tasks.filter((task) => task.completed === completed);
    return send(res, 200, filtered);
  }

  send(res, 200, tasks);
};

const getTaskById = (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return send(res, 404, { error: 'Task not found' });
  }

  send(res, 200, task);
};

const getTaskStats = (req, res) => {
  const total     = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending   = total - completed;

  send(res, 200, { total, completed, pending });
};

const createTask = (req, res) => {
  const { title, priority } = req.body;

  if (!title) {
    return send(res, 400, { error: 'Title is required' });
  }

  const newTask = {
    id: nextId++,
    tittle: title,
    completed: false,
    priority: priority || 'medium',
  };

  tasks.push(newTask);
  send(res, 201, newTask);
};

const updateTask = (req, res) => {
  const id    = parseInt(req.params.id);
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    return send(res, 404, { error: 'Task not found' });
  }

  tasks[index] = { ...tasks[index], ...req.body, id };
  send(res, 200, tasks[index]);
};

const deleteTask = (req, res) => {
  const id    = parseInt(req.params.id);
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    send(res, 404, { error: 'Task not found' });
  }

  tasks.splice(index, 1);
  send(res, 200, { message: 'Task deleted successfully' });
};

module.exports = {
  getAllTasks,
  getTaskById,
  getTaskStats,
  createTask,
  updateTask,
  deleteTask,
};
