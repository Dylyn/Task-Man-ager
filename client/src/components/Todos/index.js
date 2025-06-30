import React, { useState } from 'react';
import TodoForm from './todoForm';
import TodoList from './todoList';

const initialState = [
    {   id          : 1,
        title       : 'Test Task',
        description : 'This is a test task',
        status      : 'pending',
        priority    : 'high',
        assignee    : 'John Doe',
        created_at  : '2025-06-29 16:05:19',
        updated_at  : '2025-06-29 16:05:19',
    },
    {   id          : 2,
        title       : 'Team Lunch',
        description : 'eat lunch with the team',
        status      : 'pending',
        priority    : 'low',
        assignee    : 'Larry Bird',
        created_at  : '2025-06-28 16:05:19',
        updated_at  : '2025-06-28 16:05:19',
    },
    {   id          : 3,
        title       : 'update figma',
        description : 'update the figma template',
        status      : 'pending',
        priority    : 'med',
        assignee    : 'Lebron James',
        created_at  : '2025-06-24 16:05:19',
        updated_at  : '2025-06-25 16:05:19',
    }
]

function Todos() {
    const [todoList, setTodoList] = useState(initialState);
    console.log('app.js', todoList);

    const deleteHandler = id => {
        const newTodos = todoList.filter(item => {
            return item.id !== id
        })
        setTodoList(newTodos) 
    }

    const updateHandler = todo => {
        setTodoList(todoList.map(item => {
            if (item.id === todo.id) {
                return{
                    ...item,
                    title: todo.title
                } 
            } else {
                return item
            }
        }))
    }

    return (
        <div>
            <TodoForm todos={todoList} setTodos={setTodoList}/>
            <TodoList todos={todoList} deleteHandler={deleteHandler} updateHandler={updateHandler} />
        </div>
    )
};

export default Todos;