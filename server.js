const http        = require('http');
const url         = require('url');
const { router }  = require('./routes/taskRoutes');
const logger      = require('./middleware/logger');
const { parseBody } = require('./utils/bodyParser');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url, true);
  req.query    = parsed.query;
  req.path     = req.url;

  logger(req);

  parseBody(req, () => {
    router(req, res);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
