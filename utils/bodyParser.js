const parseBody = (req, callback) => {
  let raw = '';

  req.on('data', (chunk) => {
    raw += chunk.toString();
  });

  req.on('end', () => {
    if (raw) {
      try {
        req.body = JSON.parse(raw);
      } catch {
        req.body = {};
      }
    } else {
      req.body = {};
    }
    callback();
  });
};

module.exports = { parseBody };
