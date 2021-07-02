import React, { useState, useEffect } from "react";
import { TodoType, TodoStatus } from "./TodoTypes"
import moment from "moment";

export default function TodoList(props: { data: TodoType[], isDone: boolean, editTodo: any, deleteTodo: any, doneTodo: any, sortByField: any }) {
    const { data: todos, editTodo, deleteTodo, doneTodo, isDone, sortByField } = props;

    const setDate = (date: Date) => {
        return `${moment(date).format("DD MMMM YYYY")}`;
    }
    const setTime = (date: Date) => {
        if (typeof date === "string")
            date = new Date(`2021 1 1 ${date}`);
        return `${moment(date).format("hh:mm A")}`;
    }

    return (
        <div>
            <div className="flex flex-col mx-6">
                <div className="flex items-center justify-between w-auto mt-2 border-b border-grid-seperator">
                    <div className="w-14"></div>
                    <button className="pl-5 text-center w-52 text-grid-header" onClick={() => sortByField("tasks")}>Tasks</button>
                    <button className="pl-5 text-center w-52 text-grid-header" onClick={() => sortByField("status")}>Status</button>
                    <button className="pl-5 text-center w-52 text-grid-header" onClick={() => sortByField("date")}>Date</button>
                    <button className="pl-5 text-center w-52 text-grid-header" onClick={() => sortByField("time")}>Time</button>
                    <div className="w-28"></div>
                </div>
            </div>
            <div className="flex flex-col mx-6">
                {
                    todos.filter(t => t.isChecked === isDone).map(t => {
                        return (<div key={t.id.toString()} className="flex items-center justify-between w-auto mt-2 border-b border-grid-seperator">
                            <input key={`done_${t.id}`} name={`${t.id}`} type="checkbox" className={isDone ? "hidden" : "w-10 text-center"} checked={t.isChecked} onChange={doneTodo}></input>
                            <input key={`task_${t.id}`} type="text" readOnly className="pl-5 text-center w-52" value={t.tasks}></input>
                            <div key={`status_${t.id}`} className={`px-6 py-1 rounded-full text-center h-8 w-52 text-white bg-${(t.status === 1) ? "inprogress " : "paused "}`}>{(t.status === 1) ? "In Progress" : "Paused"}</div>
                            <label key={`date_${t.id}`} className="pl-5 text-center w-52">{setDate(t.date)}</label>
                            <label key={`itime_${t.id}`} className="pl-5 text-center w-52">{setTime(t.time)}</label>
                            <div className="flex">
                                <button key={`btn_i_${t.id}`} className={isDone ? "hidden" : "block p-3 text-button-blue"}
                                    onClick={() => editTodo(t)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                </button>
                                <button key={`btn_d_${t.id}`} className={isDone ? "hidden" : "block p-3 text-delete-red"} value="D"
                                    onClick={() => deleteTodo(t)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>)
                    })
                }
            </div>
        </div>
    );
}