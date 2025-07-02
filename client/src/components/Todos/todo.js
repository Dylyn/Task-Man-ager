import React, { useState } from 'react';

function Todo({ todo, deleteHandler, updateHandler }) {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState(todo.title);

    const handleEdit = () => setIsEditing(true);
    const handleEditChange = (e) => setUpdatedTitle(e.target.value);
    const handleEditSubmit = (e) => {
        e.preventDefault();
        updateHandler({ ...todo, title: updatedTitle });
        setIsEditing(false);
    };

    // Helper for status and priority color classes
    const getStatusClass = (status) => {
        switch ((status || '').toLowerCase()) {
            case 'pending': return 'status-pending';
            case 'in progress': return 'status-inprogress';
            case 'complete': return 'status-complete';
            default: return '';
        }
    };
    const getPriorityClass = (priority) => {
        switch ((priority || '').toLowerCase()) {
            case 'low': return 'priority-low';
            case 'medium': return 'priority-medium';
            case 'high': return 'priority-high';
            default: return '';
        }
    };

    return (
        <div className="sticky-note">
            {/* Delete X button */}
            <button
                onClick={() => deleteHandler(todo.id)}
                className="sticky-note-delete"
                aria-label="Delete task"
            >
                ×
            </button>

            {/* Edit mode */}
            {isEditing ? (
                <form onSubmit={handleEditSubmit} className="sticky-note-edit-form">
                    <input
                        type="text"
                        value={updatedTitle}
                        onChange={handleEditChange}
                        className="sticky-note-edit-input"
                        autoFocus
                    />
                    <button type="submit" className="sticky-note-edit-save">Save</button>
                </form>
            ) : (
                <>
                    <div className="sticky-note-title">{todo.title}</div>
                    <button
                        onClick={handleEdit}
                        className="sticky-note-edit-btn"
                    >
                        Edit
                    </button>
                </>
            )}
            {todo.description && (
                <div className="sticky-note-description">{todo.description}</div>
            )}
            <div className="sticky-note-meta-boxes">
                {todo.status && (
                    <span className={`sticky-note-status-box ${getStatusClass(todo.status)}`}>{todo.status}</span>
                )}
                {todo.priority && (
                    <span className={`sticky-note-priority-box ${getPriorityClass(todo.priority)}`}>{todo.priority}</span>
                )}
            </div>
        </div>
    );
}

export default Todo;