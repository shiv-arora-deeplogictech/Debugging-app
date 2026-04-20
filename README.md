# Task Manager API

A simple RESTful Task Manager API built with **core Node.js only** — no frameworks, no external libraries.

---

## Prerequisites

- Node.js v18 or higher

---

## Getting Started

```bash
# Clone or enter the project directory
cd DebuggingTest

# No dependencies to install — pure Node.js

# Start the server
node server.js
```

The server starts at `http://localhost:3000`.

---

## API Endpoints

| Method | Path                  | Description              |
|--------|-----------------------|--------------------------|
| GET    | `/api/tasks`          | Get all tasks            |
| GET    | `/api/tasks?completed=true` | Filter tasks by status |  not working 
| GET    | `/api/tasks/stats`    | Get task statistics      |      not working 
| GET    | `/api/tasks/:id`      | Get a task by ID         |
| POST   | `/api/tasks`          | Create a new task        |      not working 
| PUT    | `/api/tasks/:id`      | Update a task            |
| DELETE | `/api/tasks/:id`      | Delete a task            |

---

## Example Requests

**Get all tasks**
```bash
curl http://localhost:3000/api/tasks
```

**Create a task**
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Fix all the bugs", "priority": "high"}'
```

**Update a task**
```bash
curl -X PUT http://localhost:3000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

**Delete a task**
```bash
curl -X DELETE http://localhost:3000/api/tasks/1
```

**Get task stats**
```bash
curl http://localhost:3000/api/tasks/stats
```

---

## Project Structure

```
.
├── server.js                  # HTTP server entry point
├── routes/
│   └── taskRoutes.js          # Route definitions and dispatcher
├── controllers/
│   └── taskController.js      # Request handlers / business logic
├── middleware/
│   └── logger.js              # Request logger
└── utils/
    ├── bodyParser.js          # Parses JSON request body from stream
    └── response.js            # JSON response helper
```
