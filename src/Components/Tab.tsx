import React, { useState, useEffect, useCallback } from "react";
import TodoList from "./TodoList";
import { TodoType, TodoStatus, FieldTodoTypes } from "./TodoTypes";
import * as Constants from "../Constants"
import Modal from "./Modal";
import _ from "lodash";
import ErrorAlert from "./ErrorAlert";


const Tabs = () => {
    const [openTab, setOpenTab] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [modalTitle, setModalTitle] = useState(Constants.AddModalTitle);
    const [todos, setTodos] = useState<TodoType[]>([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [showErrorMessage, setShowErrorMessage] = useState(false);
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
    const addClicked = useCallback(() => {
        setModalTitle(Constants.AddModalTitle);
        setShowModal(true);
        setDeleteModal(false);
    }, [showModal]);

    const closeModal = useCallback(() => {
        setShowModal(false);
        setCurrentTodoDefault();
    }, [showModal]);

    const todoValidation = (todo: TodoType) => {
        if (!(todo.tasks && todo.tasks.length > 0)) {
            setErrorMessage(Constants.msgTaskTitleEmpty);
            setShowErrorMessage(true);
            return false;
        }
        else if (todo.id === 0 && todos.findIndex(t => t.tasks == todo.tasks) !== -1) {
            setErrorMessage(Constants.msgTaskTitleDuplicate);
            setShowErrorMessage(true);
            return false;
        }
        else
            return true;
    };
    const saveModal = useCallback((todo: TodoType) => {
        if (deleteModal) {
            let tempTodos = todos.filter(s => s.id !== todo.id);
            setTodos(tempTodos);
        }
        else if (todoValidation(todo)) {
            if (todo && todo.id === 0) {
                todo.id = idGenerator();
                addTodo(todo);
            }
            else {
                let editedTodoIndex = todos.findIndex(t => t.id === todo.id);
                todos[editedTodoIndex] = todo;
                setTodos(todos);
            }
        }
        setShowModal(false);
        setCurrentTodoDefault();
    }, [showModal]);

    const addTodo = (todo: TodoType) => {
        todos.push(todo);
        setTodos([...todos]);
    };
    const editTodo = useCallback((todo: TodoType) => {
        setCurrentTodo(todo);
        setModalTitle(Constants.EditModalTitle);
        setShowModal(true);
        setDeleteModal(false);
    }, [todos, Constants.EditModalTitle]);
    const deleteTodo = useCallback((todo: TodoType) => {
        setCurrentTodo(todo);
        setModalTitle(Constants.DeleteModalTitle);
        setShowModal(true);
        setDeleteModal(true);
    }, [todos, Constants.DeleteModalTitle]);
    const doneTodo = useCallback((event: any) => {
        const target = event.target;
        const value = target.checked;
        const id = +target.name;
        let tempTodos = todos.filter(s => s.id !== id);
        let todo = todos.find(t => t.id === id);
        if (todo) {
            todo.isChecked = value;
            setTodos([...tempTodos, todo]);
        }
    }, [todos]);

    const sortByField = useCallback((field: string, isDone: boolean) => {
        const orderDir = (orderDirectionTodos[field] === "asc") ? "desc" : "asc";
        let tempTodos = todos.filter(s => s.isChecked === isDone);
        tempTodos = _.orderBy(tempTodos, [field], [orderDir]);
        setOrderDirectionTodos({ ...orderDirectionTodos, [field]: orderDir });
        setTodos(tempTodos);
    }, [todos, orderDirectionTodos]);

    return (
        <>
            <div className="font-sans">
                {showErrorMessage ?
                    <ErrorAlert errorMessage={errorMessage} setShowErrorMessage={setShowErrorMessage} />
                    : null}
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
                                                "text-15 border-2 border-b-0 border-tab-border px-5 py-3  rounded block leading-normal " +
                                                (openTab === 1
                                                    ? "text-tab-text bg-white font-bold"
                                                    : "text-tab-inactive-text bg-tab-inactive-bg text-opacity-50 font-normal")
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
                                                "text-15 px-5 py-3 border-2 border-b-0 border-l-0 border-tab-border rounded block leading-normal " +
                                                (openTab === 2
                                                    ? "text-tab-text bg-white font-bold"
                                                    : "text-tab-inactive-text bg-tab-inactive-bg text-opacity-50 font-normal")
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
                        <button onClick={addClicked} className="inline-flex px-4 py-2 font-bold text-white rounded ml bg-button-blue hover:bg-grey">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-width="2" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            <span>Add</span>
                        </button>
                        <Modal titleModal={modalTitle} showModal={showModal} closeModal={closeModal} saveModal={saveModal} todoObj={currentTodo} isDelete={deleteModal} />


                    </div>
                </div>
            </div >
        </>
    );
};

export default Tabs;