import React, { useState } from "react";

function Todo({ todo, deleteHandler, updateHandler }) {

    const [isEditing, setIsEditing] = useState(false);
    const [updatedTodo, setUpdatedTodo] = useState();

    const updateTodoState = e => {

        setUpdatedTodo({
            id: todo.id,
            title: e.target.value
        })
    }

    const updateAndReset = (input, e) => {
        e.preventDefault()
        updateHandler(input)
        setIsEditing(false)
    }

    return (
        <div>
            {isEditing ? 
                <form onSubmit={e => updateAndReset(updatedTodo, e)}>
                    <input 
                        type="text"
                        defaultValue={todo.title}
                        onChange={updateTodoState}
                    /> 
                </form>
                : 
                <p onDoubleClick={() => setIsEditing(true)}>{todo.title}</p>
            }
            <button onClick={() => deleteHandler(todo.id)}> X </button>
        </div>
    )
}

export default Todo;