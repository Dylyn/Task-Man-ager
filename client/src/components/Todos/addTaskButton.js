import React, { useState } from 'react';
import axios from 'axios';

function AddTaskButton({ onAddTask }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskFields, setTaskFields] = useState({
        title: '',
        description: '',
        assignee: '',
        status: 'design',
        priority: '',
    });

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTaskFields({
            title: '',
            description: '',
            assignee: '',
            status: 'design',
            priority: '',
        });
    };

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setTaskFields(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTask = {
            ...taskFields,
            id: Date.now(),
        };
        onAddTask(newTask);
        handleCloseModal();
    };

    return (
        <>
            <button 
                onClick={handleOpenModal}
                className="add-task-button"
            >
                + Add New Task
            </button>

            {isModalOpen && (
                <div className="sticky-note-modal-overlay">
                    <div className="sticky-note-modal">
                        <form onSubmit={handleSubmit} className="sticky-note-modal-form">
                            <div className="sticky-note-modal-title">Create New Task</div>
                            <label>
                                Title
                                <input
                                    type="text"
                                    name="title"
                                    value={taskFields.title}
                                    onChange={handleFieldChange}
                                    className="sticky-note-modal-input"
                                    maxLength={100}
                                    required
                                />
                            </label>
                            <label>
                                Description
                                <textarea
                                    name="description"
                                    value={taskFields.description}
                                    onChange={handleFieldChange}
                                    className="sticky-note-modal-input"
                                    rows={10}
                                    maxLength={500}
                                />
                            </label>
                            <label>
                                Assignee
                                <input
                                    type="text"
                                    name="assignee"
                                    value={taskFields.assignee}
                                    onChange={handleFieldChange}
                                    className="sticky-note-modal-input"
                                />
                            </label>
                            <label>
                                Priority
                                <select
                                    name="priority"
                                    value={taskFields.priority}
                                    onChange={handleFieldChange}
                                    className="sticky-note-modal-input"
                                >
                                    <option value="">Select priority</option>
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </label>
                            <div className="sticky-note-modal-actions">
                                <button type="submit" className="sticky-note-modal-save">Create Task</button>
                                <button type="button" className="sticky-note-modal-cancel" onClick={handleCloseModal}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default AddTaskButton; 