import React from 'react';
import Todo from './todo';

const COLUMN_CONFIG = [
  { key: 'design', label: 'Design', headerColor: 'kanban-header-design' },
  { key: 'development', label: 'Development', headerColor: 'kanban-header-development' },
  { key: 'testing', label: 'Testing', headerColor: 'kanban-header-testing' },
  { key: 'release', label: 'Release', headerColor: 'kanban-header-release' },
];

function TodoList({ todos, deleteHandler, updateHandler }) {
  // Group todos by status (case-insensitive)
  const columns = COLUMN_CONFIG.map(col =>
    todos.filter(todo => (todo.status || '').toLowerCase() === col.key)
  );

  return (
    <div className="kanban-columns">
      {COLUMN_CONFIG.map((col, idx) => (
        <div
          key={col.key}
          className={`kanban-column ${'kanban-bg-white'}`}
        >
          <div
            className={`kanban-header ${col.headerColor}`}
          >
            {col.label}
          </div>
          <div className="kanban-tasks">
            {columns[idx].map(todo => (
              <Todo
                key={todo.id}
                todo={todo}
                deleteHandler={deleteHandler}
                updateHandler={updateHandler}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TodoList;