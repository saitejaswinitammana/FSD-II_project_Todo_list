import React from 'react';
import TodoItem from './TodoItem';

export default function TodoList({ todos, onToggle, onDelete, loading }) {
  if (loading) {
    return <div className="loading-state">Loading your tasks...</div>;
  }

  if (todos.length === 0) {
    return <div className="empty-state">No tasks to display! Create one above.</div>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo._id || todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
