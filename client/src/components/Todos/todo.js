import React, { useState } from 'react';

function Todo({ todo, deleteHandler, updateHandler }) {
    const [isEditing, setIsEditing] = useState(false);
    const [isViewing, setIsViewing] = useState(false);
    const [editFields, setEditFields] = useState({
        title: todo.title || '',
        description: todo.description || '',
        assignee: todo.assignee || '',
        status: todo.status || '',
        priority: todo.priority || '',
    });

    const handleView = () => setIsViewing(true);
    const handleViewCancel = () => setIsViewing(false);

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

            {isViewing && (
                <div className="sticky-note-modal-overlay">
                    <div className="sticky-note-modal">
                        <div className="sticky-note-modal-title">View Task</div>
                        <div className="sticky-note-modal-form">
                            <div className="sticky-note-view-field">
                                <div className="sticky-note-view-value-title">{todo.title}</div>
                            </div>
                            <div className="sticky-note-view-row">
                                <div className="sticky-note-view-field">
                                    <label>Assignee</label>
                                    <div className="sticky-note-view-value">{todo.assignee || 'Unassigned'}</div>
                                </div>
                                <div className="sticky-note-view-field">
                                    <label>Status</label>
                                    <div className="sticky-note-view-value">{todo.status || 'Not set'}</div>
                                </div>
                                <div className="sticky-note-view-field">
                                    <label>Priority</label>
                                    <span className={`sticky-note-priority-box ${getPriorityClass(todo.priority)}`}>{todo.priority}</span>
                                </div>
                                <div className="sticky-note-view-field">
                                    <label>Task ID</label>
                                    <div className="sticky-note-view-value">{todo.id}</div>
                                </div>
                            </div>
                            
                            <div className="sticky-note-view-field">
                                <label>Description</label>
                                <div className="sticky-note-view-value">{todo.description || 'No description provided'}</div>
                            </div>
                            <div className="sticky-note-view-field">
                                <label>Attachments</label>
                                <div className="sticky-note-attachments-section">
                                    <div className="sticky-note-attachments-placeholder">No attachments</div>
                                    <button type="button" className="sticky-note-attachment-btn">Add Attachment</button>
                                </div>
                            </div>
                        </div>
                        <div className="sticky-note-modal-actions">
                            <button type="button" className="sticky-note-modal-cancel" onClick={handleViewCancel}>Back</button>
                        </div>
                    </div>
                </div>
            )}
             
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
                                    maxLength={100}
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
                                    rows={10}
                                    maxLength={750}
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

            {!isEditing && !isViewing && <>
                <div className="sticky-note-title">{todo.title}</div>
                <div className="sticky-note-btn-section">
                    <button
                        onClick={handleView}
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