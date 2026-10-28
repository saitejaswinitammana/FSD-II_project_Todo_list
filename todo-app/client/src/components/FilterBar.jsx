import React from 'react';

export default function FilterBar({ currentFilter, onFilterChange }) {
  const filters = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Completed', value: 'completed' },
  ];

  return (
    <div className="filter-tabs">
      {filters.map((f) => (
        <button
          key={f.value}
          className={`filter-btn ${currentFilter === f.value ? 'active' : ''}`}
          onClick={() => onFilterChange(f.value)}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
