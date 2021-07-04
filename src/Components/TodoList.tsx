import React, { memo, useState, useEffect } from "react";
import { TodoType, FieldTodoTypes } from "./TodoTypes"
import moment from "moment";
import * as Constants from "../Constants"
import _ from "lodash";

function TodoList(props: { data: TodoType[], isDone: boolean, editTodo: any, deleteTodo: any, doneTodo: any }) {
    const { data: srcTodos, editTodo, deleteTodo, doneTodo, isDone } = props;

    const [timeFilterBy, setTimeFilterBy] = useState(Constants.DAY);
    const [todos, setTodos] = useState(srcTodos);

    const setDate = (date: Date) => {
        return `${moment(date).format("DD MMMM YYYY")}`;
    }
    const setTime = (date: Date) => {
        if (typeof date === "string")
            date = new Date(`2021 1 1 ${date}`);
        return `${moment(date).format("hh:mm A")}`;
    }
    const [orderDirectionTodos, setOrderDirectionTodos] = useState<FieldTodoTypes>({
        tasks: Constants.ASC,
        status: Constants.ASC,
        date: Constants.ASC,
        time: Constants.ASC
    });


    useEffect(() => {
        timeFilter(timeFilterBy, srcTodos)
    }, [srcTodos]);

    console.log("render todo");

    const sortByField = (field: string) => {
        const orderDir = (orderDirectionTodos[field] === Constants.ASC) ? Constants.DESC : Constants.ASC;
        let tempTodos = _.orderBy(todos, [field], [orderDir]);
        setOrderDirectionTodos({ ...orderDirectionTodos, [field]: orderDir });
        setTodos(tempTodos);
    };
    const timeFilter = (filterBy: string, data: TodoType[]) => {

        if (filterBy === Constants.DAY) {
            let now = new Date();
            let start = new Date(now.getFullYear()
                , now.getMonth()
                , now.getDate()
                , 0, 0, 0);
            let end = new Date(now.getFullYear()
                , now.getMonth()
                , now.getDate()
                , 23, 59, 59);
            setTodos(data.filter(t => t.date >= start && t.date < end));
        }
        else if (filterBy === Constants.WEEK) {
            let [start, end] = getWeekDates();
            setTodos(data.filter(t => t.date >= start && t.date < end));
        }
        else {
            let now = new Date();
            let year = now.getFullYear();
            let month = now.getMonth();
            let start = new Date(year, month, 1, 0, 0, 0);
            let end = new Date(year, month + 1, 0, 0, 0, 0);
            debugger
            setTodos(data.filter(t => t.date >= start && t.date <= end));
        }
        setTimeFilterBy(filterBy);
    };
    const getWeekDates = () => {
        let now = new Date();
        let dayOfWeek = now.getDay();
        let numDay = now.getDate();

        let start = new Date(now);
        start.setDate(numDay - dayOfWeek);
        start.setHours(0, 0, 0, 0);

        let end = new Date(now);
        end.setDate(numDay + (7 - dayOfWeek));
        end.setHours(0, 0, 0, 0);

        return [start, end];
    }

    return (
        <div className="font-medium" >
            <div className="flex justify-end pt-8 ">
                <span className="inline-flex rounded-md shadow-sm ">
                    <button type="button" onClick={() => timeFilter(Constants.MONTH, srcTodos)}
                        className={(timeFilterBy == Constants.MONTH ? "" : "text-opacity-50 ") + "inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-gray-700 bg-white border border-gray-300 rounded-l-md hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700"}>
                        Month
                    </button>
                    <button type="button" onClick={() => timeFilter(Constants.WEEK, srcTodos)}
                        className={(timeFilterBy == Constants.WEEK ? "" : "text-opacity-50 ") + "inline-flex items-center px-4 py-2 -ml-px text-sm font-medium leading-5 text-gray-700  bg-white border border-gray-300 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700"}>
                        Week
                    </button>
                    <button type="button" onClick={() => timeFilter(Constants.DAY, srcTodos)}
                        className={(timeFilterBy == Constants.DAY ? "" : "text-opacity-50 ") + "inline-flex items-center px-4 py-2 -ml-px text-sm font-medium leading-5 text-gray-700  bg-white border border-gray-300 rounded-r-md hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700"}>
                        Day
                    </button>
                </span>
            </div>
            <div className="flex flex-col mx-6 text-19">
                <div className="flex items-center justify-between w-auto mt-2 border-b border-grid-seperator">
                    <div className={isDone ? "hidden" : "block w-14"}></div>
                    <button className="pl-5 text-center w-52 text-grid-header focus:outline-none" onClick={() => sortByField("tasks")}>Tasks</button>
                    {
                        isDone ? <div className="hidden"></div> :
                            <button className="block px-6 py-1 text-center w-52 text-grid-header focus:outline-none" onClick={() => sortByField("status")}>Status</button>

                    }
                    <button className="pl-5 text-center w-52 text-grid-header focus:outline-none" onClick={() => sortByField("date")}>Date</button>
                    <button className="pl-5 text-center w-52 text-grid-header focus:outline-none" onClick={() => sortByField("time")}>Time</button>
                    <div className={isDone ? "w-min" : "w-1/12"}></div>
                </div>
            </div>
            <div className="flex flex-col mx-6 text-19">
                {
                    todos.filter(t => t.isChecked === isDone).map(t => {
                        return (<div key={t.id.toString()} className="flex items-center justify-between w-auto mt-2 border-b border-grid-seperator">
                            <input key={`done_${t.id}`} name={`${t.id}`} type="checkbox" className={isDone ? "hidden" : "w-10 text-center focus:outline-none"} checked={t.isChecked} onChange={doneTodo}></input>
                            <label key={`task_${t.id}`} className="pl-5 text-center w-52">{t.tasks}</label>
                            <div key={`status_${t.id}`} className={isDone ? "hidden" : `block px-6 py-1 rounded-full text-center font-bold h-8 w-52 text-lg text-white bg-${(t.status === 1) ? "inprogress " : "paused "}`}>{(t.status === 1) ? "In Progress" : "Paused"}</div>
                            <label key={`date_${t.id}`} className="pl-5 text-center w-52">{setDate(t.date)}</label>
                            <label key={`itime_${t.id}`} className="pl-5 text-center w-52">{setTime(t.time)}</label>
                            <div className="flex">
                                <button key={`btn_i_${t.id}`} className={isDone ? "hidden" : "block p-3 text-button-blue focus:outline-none"}
                                    onClick={() => editTodo(t)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                </button>
                                <button key={`btn_d_${t.id}`} className={isDone ? "hidden" : "block p-3 text-delete-red focus:outline-none"} value="D"
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


export default memo(TodoList);