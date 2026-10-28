const crypto = require('crypto');

function generateMongoId() {
  return crypto.randomBytes(12).toString('hex');
}

let issues = [
  {
    _id: "6addb5b2f6a92ceef7b14abd",
    title: "Poor sanitation in washrooms",
    category: "Sanitation",
    location: "2nd floor",
    description: "The girl's waiting hall in 2nd floor in terms of sanitation is very poor.",
    status: "Pending",
    priority: "High",
    createdAt: "2026-10-25T07:54:26.834Z",
    updatedAt: "2026-10-25T07:54:26.834Z",
    __v: 0
  },
  {
    _id: "6addb5c5f6a92ceef7b14abe",
    title: "Projector not working in Room 304",
    category: "IT Support",
    location: "Room 304",
    description: "HDMI connection does not project video to the screen.",
    status: "In Progress",
    priority: "Medium",
    createdAt: "2026-10-25T08:12:10.120Z",
    updatedAt: "2026-10-25T08:30:00.000Z",
    __v: 0
  },
  {
    _id: "6addb5d9f6a92ceef7b14abf",
    title: "Water cooler leakage",
    category: "Maintenance",
    location: "Cafeteria Ground Floor",
    description: "Continuous water leaking near cafeteria entrance.",
    status: "Resolved",
    priority: "Low",
    createdAt: "2026-10-25T09:00:15.540Z",
    updatedAt: "2026-10-25T11:15:22.000Z",
    __v: 0
  }
];

// GET /api/issues
exports.getIssues = (req, res) => {
  const { status, priority, category } = req.query;
  let result = [...issues];

  if (status) {
    result = result.filter(i => i.status.toLowerCase() === status.toLowerCase());
  }
  if (priority) {
    result = result.filter(i => i.priority.toLowerCase() === priority.toLowerCase());
  }
  if (category) {
    result = result.filter(i => i.category.toLowerCase() === category.toLowerCase());
  }

  res.json({
    success: true,
    count: result.length,
    data: result
  });
};

// GET /api/issues/:id
exports.getIssueById = (req, res) => {
  const { id } = req.params;
  const issue = issues.find(i => i._id === id);

  if (!issue) {
    return res.status(404).json({
      success: false,
      error: 'Issue not found'
    });
  }

  res.json({
    success: true,
    data: issue
  });
};

// POST /api/issues
exports.createIssue = (req, res, next) => {
  try {
    const { title, category = "General", location = "General", description = "", priority = "Medium", status = "Pending" } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Title is required'
      });
    }

    const newIssue = {
      _id: generateMongoId(),
      title: title.trim(),
      category: category.trim(),
      location: location.trim(),
      description: description.trim(),
      status,
      priority,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      __v: 0
    };

    issues.unshift(newIssue);

    res.status(201).json({
      success: true,
      data: newIssue
    });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/issues/:id
exports.updateIssue = (req, res) => {
  const { id } = req.params;
  const index = issues.findIndex(i => i._id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: 'Issue not found'
    });
  }

  issues[index] = {
    ...issues[index],
    ...req.body,
    updatedAt: new Date().toISOString()
  };

  res.json({
    success: true,
    data: issues[index]
  });
};

// DELETE /api/issues/:id
exports.deleteIssue = (req, res) => {
  const { id } = req.params;
  const initialLength = issues.length;
  issues = issues.filter(i => i._id !== id);

  if (issues.length === initialLength) {
    return res.status(404).json({
      success: false,
      error: 'Issue not found'
    });
  }

  res.json({
    success: true,
    message: 'Issue deleted successfully'
  });
};
