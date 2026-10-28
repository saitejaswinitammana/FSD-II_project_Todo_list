const crypto = require('crypto');

function generateMongoId() {
  return crypto.randomBytes(12).toString('hex');
}

// Initial seed data with Mongoose / MongoDB schema format
let todos = [
  {
    _id: "6addb5b2f6a92ceef7b14ab1",
    title: "Set up React frontend with Vite",
    category: "Development",
    status: "Completed",
    completed: true,
    priority: "High",
    createdAt: "2026-10-25T07:54:26.834Z",
    updatedAt: "2026-10-25T07:54:26.834Z",
    __v: 0
  },
  {
    _id: "6addb5b2f6a92ceef7b14ab2",
    title: "Build Express REST API routes",
    category: "Backend",
    status: "Completed",
    completed: true,
    priority: "High",
    createdAt: "2026-10-25T08:10:00.000Z",
    updatedAt: "2026-10-25T08:15:00.000Z",
    __v: 0
  },
  {
    _id: "6addb5b2f6a92ceef7b14ab3",
    title: "Connect client to API endpoints",
    category: "Fullstack",
    status: "Pending",
    completed: false,
    priority: "Medium",
    createdAt: "2026-10-25T09:00:00.000Z",
    updatedAt: "2026-10-25T09:00:00.000Z",
    __v: 0
  }
];

exports.getTodos = (req, res) => {
  const { completed, status, priority } = req.query;
  let result = [...todos];

  if (completed !== undefined) {
    const isCompleted = completed === 'true';
    result = result.filter(item => item.completed === isCompleted);
  }

  if (status) {
    result = result.filter(item => item.status.toLowerCase() === status.toLowerCase());
  }

  if (priority) {
    result = result.filter(item => item.priority.toLowerCase() === priority.toLowerCase());
  }

  res.json({
    success: true,
    count: result.length,
    data: result
  });
};

exports.getTodoById = (req, res) => {
  const { id } = req.params;
  const todo = todos.find(t => t._id === id || t.id === id);

  if (!todo) {
    return res.status(404).json({
      success: false,
      error: 'Todo not found'
    });
  }

  res.json({
    success: true,
    data: todo
  });
};

exports.createTodo = (req, res, next) => {
  try {
    const { title, category = "General", priority = "Medium" } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Title is required'
      });
    }

    const newTodo = {
      _id: generateMongoId(),
      title: title.trim(),
      category: category.trim(),
      status: "Pending",
      completed: false,
      priority,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      __v: 0
    };

    todos.unshift(newTodo);

    res.status(201).json({
      success: true,
      data: newTodo
    });
  } catch (err) {
    next(err);
  }
};

exports.updateTodo = (req, res) => {
  const { id } = req.params;
  const index = todos.findIndex(t => t._id === id || t.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: 'Todo not found'
    });
  }

  const existing = todos[index];
  const { title, completed, status, priority, category } = req.body;

  const nextCompleted = completed !== undefined ? Boolean(completed) : existing.completed;
  const nextStatus = status !== undefined ? status : (nextCompleted ? "Completed" : "Pending");

  const updated = {
    ...existing,
    ...(title !== undefined && { title: title.trim() }),
    ...(category !== undefined && { category: category.trim() }),
    completed: nextCompleted,
    status: nextStatus,
    ...(priority !== undefined && { priority }),
    updatedAt: new Date().toISOString()
  };

  todos[index] = updated;

  res.json({
    success: true,
    data: updated
  });
};

exports.deleteTodo = (req, res) => {
  const { id } = req.params;
  const initialCount = todos.length;
  todos = todos.filter(t => t._id !== id && t.id !== id);

  if (todos.length === initialCount) {
    return res.status(404).json({
      success: false,
      error: 'Todo not found'
    });
  }

  res.json({
    success: true,
    message: 'Todo deleted successfully'
  });
};
