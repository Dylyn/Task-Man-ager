import React, { useState } from 'react';
import axios from 'axios';

function TodoForm({ todos, setTodos }) {

    const initialState = {
        title:'',
        id:'',
    }

    const [todo, setTodo] = useState(initialState);

    const handleChange = e => {
        setTodo({
            title: e.target.value,
            id: Date.now()  
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        setTodos([ todo, ...todos ])
        axios.post('http://localhost:5000/tasks', todo)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
        setTodo(initialState)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                name="todo"
                value={todo.title}
                placeholder="Add new task"
                onChange={handleChange}
                style={{ fontSize: '1.2rem', padding: '0.75rem', width: '80%' }}
            />
            <button type='submit'>add task</button>
        </form>
    )
};

export default TodoForm;