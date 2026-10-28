import { useState, useEffect, useCallback } from 'react';

const API_URL = '/api/todos';

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Failed to fetch tasks');
      const responseData = await res.json();
      // Handle both { success: true, data: [...] } and raw [...]
      const items = Array.isArray(responseData) ? responseData : (responseData.data || []);
      setTodos(items);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const addTodo = async (title, priority = 'Medium') => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, priority }),
      });
      if (!res.ok) throw new Error('Failed to create task');
      const result = await res.json();
      const created = result.data || result;
      setTodos(prev => [created, ...prev]);
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleTodo = async (id, currentStatus) => {
    const nextStatus = !currentStatus;
    // Optimistic UI update
    setTodos(prev =>
      prev.map(t => ((t._id === id || t.id === id) ? { ...t, completed: nextStatus, status: nextStatus ? 'Completed' : 'Pending' } : t))
    );

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: nextStatus, status: nextStatus ? 'Completed' : 'Pending' }),
      });
      if (!res.ok) throw new Error('Failed to toggle task');
    } catch (err) {
      // Revert if network fails
      setTodos(prev =>
        prev.map(t => ((t._id === id || t.id === id) ? { ...t, completed: currentStatus } : t))
      );
      setError(err.message);
    }
  };

  const deleteTodo = async (id) => {
    const backup = todos;
    // Optimistic deletion
    setTodos(prev => prev.filter(t => t._id !== id && t.id !== id));

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete task');
    } catch (err) {
      setTodos(backup);
      setError(err.message);
    }
  };

  return {
    todos,
    loading,
    error,
    addTodo,
    toggleTodo,
    deleteTodo,
    refetch: fetchTodos,
  };
}
