import React, { useState, useEffect, useCallback } from "react";
import TodoList from "./TodoList";
import { TodoType, TodoStatus, FieldTodoTypes } from "./TodoTypes";
import Modal from "./Modal";
import _ from "lodash";

const Tabs = () => {
    const [openTab, setOpenTab] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [todos, setTodos] = useState<TodoType[]>([]);
    const [currentTodo, setCurrentTodo] = useState<TodoType>({
        id: 0,
        isChecked: false,
        tasks: "",
        status: TodoStatus.Paused,
        date: new Date(),
        time: new Date()
    });

    const [orderDirectionTodos, setOrderDirectionTodos] = useState<FieldTodoTypes>({
        tasks: "asc",
        status: "asc",
        date: "asc",
        time: "asc"
    });

    const setCurrentTodoDefault = () => {
        setCurrentTodo(
            {
                id: 0,
                isChecked: false,
                tasks: "",
                status: TodoStatus.Paused,
                date: new Date(),
                time: new Date()
            }
        );
    }
    const idGenerator = () => {
        return (todos && todos.length > 0) ? todos.reduce(
            (max, character) => (character.id > max ? character.id : max),
            todos[0].id
        ) + 1 : 1;
    };
    const openModal = useCallback(() => {
        setShowModal(true);
    }, [showModal]);

    const closeModal = useCallback(() => {
        setShowModal(false);
        setCurrentTodoDefault();
    }, [showModal]);

    const todoValidation = (todo: TodoType) => {
        if (todo.tasks && todo.tasks.length > 0)
            return true;
        else
            return false;
    }
    const saveModal = useCallback((todo: TodoType) => {
        if (todoValidation(todo)) {
            if (todo && todo.id === 0) {
                todo.id = idGenerator();
                addTodo(todo);
            }
            else {
                let editedTodoIndex = todos.findIndex(t => t.id === todo.id);
                todos[editedTodoIndex] = todo;
                setTodos(todos);
            }
            setShowModal(false);
            setCurrentTodoDefault();
        }
    }, [showModal]);

    const addTodo = (todo: TodoType) => {
        todos.push(todo);
        setTodos([...todos]);
    }
    const editTodo = (todo: TodoType) => {
        setCurrentTodo(todo);
        setShowModal(true);
    };
    const deleteTodo = (todo: TodoType) => {
        let tempTodos = todos.filter(s => s.id !== todo.id);
        setTodos(tempTodos);
    }
    const doneTodo = (event: any) => {
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

    const sortByField = (field: string) => {
        const orderDir = (orderDirectionTodos[field] === "asc") ? "desc" : "asc";
        let tempTodos = [...todos];
        tempTodos = _.orderBy(tempTodos, [field], [orderDir]);
        setOrderDirectionTodos({ ...orderDirectionTodos, [field]: orderDir });
        setTodos(tempTodos);
    }

    return (
        <>
            <div className="relative">
                <div className="ml-6 ">
                    <div className="flex flex-wrap ">
                        <div className="w-full mb-0">
                            <ul
                                className="flex flex-row flex-wrap pt-3 mb-0 list-none w-80"
                                role="tablist"
                            >
                                <li className="flex-auto -mb-px text-center last:mr-0">
                                    <a
                                        className={
                                            "text-xs font-bold border-2 border-b-0 border-tab-border px-5 py-3  rounded block leading-normal " +
                                            (openTab === 1
                                                ? "text-tab-text bg-white"
                                                : "text-tab-inactive-text bg-tab-inactive-bg")
                                        }
                                        onClick={e => {
                                            e.preventDefault();
                                            setOpenTab(1);
                                        }}
                                        data-toggle="tab"
                                        href="#link1"
                                        role="tablist"
                                    >
                                        To Do
                                    </a>
                                </li>
                                <li className="flex-auto mr-2 -mb-px text-center last:mr-0 ">
                                    <a
                                        className={
                                            "text-xs font-bold px-5 py-3 border-2 border-b-0 border-l-0 border-tab-border rounded block leading-normal " +
                                            (openTab === 2
                                                ? "text-tab-text bg-white"
                                                : "text-tab-inactive-text bg-tab-inactive-bg")
                                        }
                                        onClick={e => {
                                            e.preventDefault();
                                            setOpenTab(2);
                                        }}
                                        data-toggle="tab"
                                        href="#link2"
                                        role="tablist"
                                    >
                                        Done Tasks
                                    </a>
                                </li>
                            </ul>
                            <div className="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white border-t-2 border-tab-border">
                                <div className="flex-auto px-4 py-5">
                                    <div className="tab-content tab-space">
                                        <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                                            <TodoList data={todos} isDone={false} editTodo={editTodo} deleteTodo={deleteTodo}
                                                doneTodo={doneTodo} sortByField={sortByField} />
                                        </div>
                                        <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                            <TodoList data={todos} isDone={true} editTodo={editTodo} deleteTodo={deleteTodo}
                                                doneTodo={doneTodo} sortByField={sortByField} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute top-3 right-5">
                    <button onClick={openModal} className="inline-flex px-4 py-2 font-bold text-white rounded ml bg-button-blue hover:bg-grey">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-width="2" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span>Add</span>
                    </button>
                    <Modal titleModal="Modal" showModal={showModal} closeModal={closeModal} saveModal={saveModal} todoObj={currentTodo} />
                </div>
            </div >
        </>
    );
};

export default Tabs;