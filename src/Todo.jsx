import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Todo.css";

export default function Todo() {
    let [Todos, setlist] = useState([{ task: "Sample Task", id: uuidv4(), isDone: false }]);
    let [newTodo, setnewTodo] = useState("");

    let updateList = () => {
        if (newTodo.trim() === "") return;
        setlist((pretodos) => [...pretodos, { task: newTodo, id: uuidv4(), isDone: false }]);
        setnewTodo("");
    };

    let updateTodoVal = (event) => {
        setnewTodo(event.target.value);
    };

    let deleteTask = (id) => {
        setlist((pretodos) => pretodos.filter((todo) => todo.id !== id));
    };

    let upparcaseAll = () => {
        setlist((preTodos) => preTodos.map((todo) => ({ ...todo, task: todo.task.toUpperCase() })));
    };

    let UpparcaseOne = (id) => {
        setlist((preTodos) =>
            preTodos.map((todo) => (todo.id === id ? { ...todo, task: todo.task.toUpperCase() } : todo))
        );
    };

    const done = (id) => {
        setlist((prevTodos) =>
            prevTodos.map((todo) => (todo.id === id ? { ...todo, isDone: true } : todo))
        );
    };

    return (
        <div className="todo-container">
            <div className="todo-box">
                <h1 className="todo-title">Todo App</h1>
                <div className="todo-input-section">
                    <input
                        type="text"
                        className="todo-input"
                        placeholder="Add a task"
                        value={newTodo}
                        onChange={updateTodoVal}
                    />
                    <button onClick={updateList} className="todo-button">Add</button>
                </div>
                <hr className="divider" />
                <h2 className="task-title">Tasks</h2>
                <ul className="task-list">
                    {Todos.map((todo) => (
                        <li key={todo.id} className="task-item">
                            <span className={todo.isDone ? "task-done" : "task-text"}>{todo.task}</span>
                            <div className="button-group">
                                <button onClick={() => deleteTask(todo.id)} className="delete-button">Delete</button>
                                <button onClick={() => UpparcaseOne(todo.id)} className="up-button">Up</button>
                                {!todo.isDone && <button onClick={() => done(todo.id)} className="done-button">Done</button>}
                            </div>
                        </li>
                    ))}
                </ul>
                <button onClick={upparcaseAll} className="uppercase-all-button">Uppercase All</button>
            </div>
        </div>
    );
}
