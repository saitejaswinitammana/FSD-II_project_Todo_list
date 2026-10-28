import React from 'react';

export default function TodoItem({ todo, onToggle, onDelete }) {
  const id = todo._id || todo.id;
  return (
    <li className="todo-item">
      <div className="todo-left">
        <input
          type="checkbox"
          className="checkbox-custom"
          checked={todo.completed}
          onChange={() => onToggle(id, todo.completed)}
        />
        <span className={`todo-title ${todo.completed ? 'completed' : ''}`}>
          {todo.title}
        </span>
      </div>
      <div className="todo-right">
        {todo.category && (
          <span style={{ fontSize: '0.75rem', color: '#6b7280', background: '#f3f4f6', padding: '0.2rem 0.4rem', borderRadius: 4 }}>
            {todo.category}
          </span>
        )}
        <span className={`badge badge-${todo.priority.toLowerCase()}`}>
          {todo.priority}
        </span>
        <button
          className="btn-delete"
          title="Delete task"
          onClick={() => onDelete(id)}
        >
          ✕
        </button>
      </div>
    </li>
  );
}
