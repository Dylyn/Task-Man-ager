import React, { useState } from 'react';

function Todo({ todo, deleteHandler, updateHandler }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editFields, setEditFields] = useState({
        title: todo.title || '',
        description: todo.description || '',
        assignee: todo.assignee || '',
        status: todo.status || '',
        priority: todo.priority || '',
    });

    const handleEdit = () => setIsEditing(true);
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditFields(prev => ({ ...prev, [name]: value }));
    };
    const handleEditSubmit = (e) => {
        e.preventDefault();
        updateHandler({ ...todo, ...editFields });
        setIsEditing(false);
    };
    const handleEditCancel = () => setIsEditing(false);

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
            {isEditing && (
                <div className="sticky-note-modal-overlay">
                    <div className="sticky-note-modal">
                        <form onSubmit={handleEditSubmit} className="sticky-note-modal-form">
                            <div className="sticky-note-modal-title">Edit Task</div>
                            <label>
                                Title
                                <input
                                    type="text"
                                    name="title"
                                    value={editFields.title}
                                    onChange={handleEditChange}
                                    className="sticky-note-modal-input"
                                    required
                                />
                            </label>
                            <label>
                                Description
                                <textarea
                                    name="description"
                                    value={editFields.description}
                                    onChange={handleEditChange}
                                    className="sticky-note-modal-input"
                                    rows={2}
                                />
                            </label>
                            <label>
                                Assignee
                                <input
                                    type="text"
                                    name="assignee"
                                    value={editFields.assignee}
                                    onChange={handleEditChange}
                                    className="sticky-note-modal-input"
                                />
                            </label>
                            <label>
                                Move to column
                                <select
                                    name="status"
                                    value={editFields.status}
                                    onChange={handleEditChange}
                                    className="sticky-note-modal-input"
                                >
                                    <option value="design">Design</option>
                                    <option value="development">Development</option>
                                    <option value="testing">Testing</option>
                                    <option value="release">Release</option>
                                </select>
                            </label>
                            <label>
                                Priority
                                <select
                                    name="priority"
                                    value={editFields.priority}
                                    onChange={handleEditChange}
                                    className="sticky-note-modal-input"
                                >
                                    <option value="">Select priority</option>
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </label>
                            <div className="sticky-note-modal-actions">
                                <button type="submit" className="sticky-note-modal-save">Save</button>
                                <button type="button" className="sticky-note-modal-cancel" onClick={handleEditCancel}>Cancel</button>
                                <button onClick={() => deleteHandler(todo.id)} className="sticky-note-modal-delete">Delete</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Normal view */}
            {!isEditing && <>
                <div className="sticky-note-title">{todo.title}</div>
                <div className="sticky-note-btn-section">
                    <button
                        //onClick={handleView}
                        className="sticky-note-btn"
                        style={{ width: '75%' }}
                    >
                        View Task
                    </button>
                    <button
                        onClick={handleEdit}
                        className="sticky-note-btn"
                        style={{ width: '25%' }}
                    >
                        Edit
                    </button>
                </div>
                {todo.description && (
                    <div className="sticky-note-description">{todo.description}</div>
                )}
                <div className="sticky-note-meta-boxes"> 
                    {todo.assignee && (
                        <span className={`sticky-note-assignee-box`}>To: {todo.assignee}</span>
                    )}
                    {todo.priority && (
                        <span className={`sticky-note-priority-box ${getPriorityClass(todo.priority)}`}>{todo.priority}</span>
                    )}
                </div>
            </>}
        </div>
    );
}

export default Todo;