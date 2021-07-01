import React, { useState, useEffect } from "react";
import { TodoType, TodoStatus } from "./TodoTypes"
import moment from "moment";

export default function TodoList(props: { data: TodoType[], isDone: boolean }) {
    const { data, isDone } = props;
    const [todos, setTodos] = useState<TodoType[]>(data ? data : []);

    useEffect(() => {
        setTodos(data);
    }, [isDone]);

    const editTodo = (todo: TodoType) => {
        let tempTodos = todos.filter(s => s.id !== todo.id);
        if (todo) {
            setTodos([...tempTodos, todo]);
        }
    };
    const deleteTodo = (todo: TodoType) => {
        let tempTodos = todos.filter(s => s.id !== todo.id);
        setTodos(tempTodos);
    }
    const handleDoneInputChange = (event: any) => {
        const target = event.target;
        const value = target.checked;
        const id = +target.name;
        let tempTodos = todos.filter(s => s.id !== id);
        let todo = todos.find(t => t.id === id);
        if (todo) {
            todo.isChecked = value;
            setTodos([...tempTodos, todo]);
        }
    }
    const setDate = (date: Date) => {
        return `${moment(date).format("DD MMMM YYYY")}`;
    }
    const setTime = (date: Date) => {
        if (typeof date === "string")
            return date;
        return `${moment(date).format("hh:mm A")}`;
    }

    return (
        <div className="flex flex-col mx-6">
            {
                todos.filter(t => t.isChecked === isDone).map(t => {
                    return (<div id={t.id.toString()} className="flex items-center justify-center w-auto mt-2 border-2 border-gray-500 rounded">
                        <input id={`done_${t.id}`} name={`${t.id}`} type="checkbox" className={isDone ? "hidden" : "w-10 text-center"} checked={t.isChecked} onChange={handleDoneInputChange}></input>
                        <input id={`task_${t.id}`} type="text" readOnly className="pl-5 text-center w-52" value={t.tasks}></input>
                        <input id={`status_${t.id}`} type="button" readOnly className="pl-5 text-center w-52 " value={t.status}></input>
                        <label id={`date_${t.id}`} className="pl-5 text-center w-52">{setDate(t.date)}</label>
                        <label id={`itime_${t.id}`} className="pl-5 text-center w-52">{setTime(t.time)}</label>

                        <input id={`btn_i_${t.id}`} type="button" className={isDone ? "hidden" : "block p-3 text-gray-800 bg-gray-100"} value="E"
                            onClick={() => editTodo(t)}></input>
                        <input id={`btn_d_${t.id}`} type="button" className={isDone ? "hidden" : "block p-3 text-gray-800 bg-gray-100"} value="D"
                            onClick={() => deleteTodo(t)}></input>
                    </div>)
                })
            }
        </div>
    );
}