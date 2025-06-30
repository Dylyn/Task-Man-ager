import React, { useState } from 'react';

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
        setTodo(initialState)
    }

    return (
        <form onSubmit={handleSubmit}>
            < input 
                type="text"
                name="todo"
                value={todo.title}
                placeholder="enter item"
                onChange={handleChange}
            />
            <button type='submit'>add task</button>
        </form>
    )
};

export default TodoForm;