import React, { useState, useMemo } from 'react';
import { useTodos } from './hooks/useTodos';
import TodoForm from './components/TodoForm';
import FilterBar from './components/FilterBar';
import TodoList from './components/TodoList';

export default function App() {
  const { todos, loading, error, addTodo, toggleTodo, deleteTodo } = useTodos();
  const [filter, setFilter] = useState('all');

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true;
    });
  }, [todos, filter]);

  const completedCount = useMemo(() => {
    return todos.filter((t) => t.completed).length;
  }, [todos]);

  return (
    <div className="todo-card">
      <header className="header">
        <div>
          <h1>To-Do Taskmaster</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
            React + Express Full-Stack App
          </p>
        </div>
        <div className="stats-badge">
          {completedCount} / {todos.length} Done
        </div>
      </header>

      {error && (
        <div style={{ color: '#ef4444', background: '#fee2e2', padding: '0.75rem', borderRadius: 8, marginBottom: '1rem', fontSize: '0.9rem' }}>
          ⚠️ {error}
        </div>
      )}

      <TodoForm onAdd={addTodo} />

      <FilterBar currentFilter={filter} onFilterChange={setFilter} />

      <TodoList
        todos={filteredTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        loading={loading}
      />
    </div>
  );
}
