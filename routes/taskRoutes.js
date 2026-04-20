const taskController = require('../controllers/taskController');
const { send } = require('../utils/response');

const router = (req, res) => {
  const method = req.method;

  // BUG 1 FIX: Strip query string from path so routes like
  // /api/tasks?completed=true still match '/api/tasks'
  const path = req.path.split('?')[0];

  // BUG 2 FIX: /api/tasks/stats must be checked BEFORE the
  // generic /:id regex, otherwise "stats" is treated as an ID
  if (method === 'GET' && path === '/api/tasks/stats') {
    return taskController.getTaskStats(req, res);
  }

  if (method === 'GET' && path === '/api/tasks') {
    return taskController.getAllTasks(req, res);
  }

  if (method === 'POST' && path === '/api/tasks') {
    return taskController.createTask(req, res);
  }

  const idMatch = path.match(/^\/api\/tasks\/([^\/]+)$/);
  if (idMatch) {
    req.params = { id: idMatch[1] };

    if (method === 'GET')    return taskController.getTaskById(req, res);
    if (method === 'PUT')    return taskController.updateTask(req, res);
    if (method === 'DELETE') return taskController.deleteTask(req, res);
  }

  send(res, 404, { error: 'Route not found' });
};

module.exports = { router };