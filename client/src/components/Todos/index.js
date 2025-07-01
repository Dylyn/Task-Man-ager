import React, { useState, useEffect } from 'react';
import TodoForm from './todoForm';
import TodoList from './todoList';
import axios from 'axios';


function Todos() {
    const [todoList, setTodoList] = useState([]);
    console.log('app.js', todoList);

    useEffect(() => {
        axios.get('http://localhost:5000/tasks')
        .then(response => {
            console.log(response)
            setTodoList(response.data)
        })
        .catch(error => {
            console.log(error)
        })
    }, [])

    const deleteHandler = id => {
        axios.delete(`http://localhost:5000/tasks/${id}`)
        .then(response => {
            console.log(response)
            setTodoList(todoList.filter(item => item.id !== id))
        })
        .catch(error => {
            console.log(error)
        })
    }

    const updateHandler = todo => {
        axios.put(`http://localhost:5000/tasks/${todo.id}`, todo)
        .then(response => {
            console.log(response)
            setTodoList(todoList.map(item => item.id === todo.id ? response.data : item))
        })
        .catch(error => {
            console.log(error)
        })
    }

    return (
        <div>
            <TodoForm todos={todoList} setTodos={setTodoList}/>
            <TodoList todos={todoList} deleteHandler={deleteHandler} updateHandler={updateHandler} />
        </div>
    )
};

export default Todos;