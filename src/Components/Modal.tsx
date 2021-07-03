import React, { useState, useEffect } from "react";
import CustomCalendar from "./CustomCalendar";
import CustomTime from "./CustomTime";
import { TodoType, TodoStatus } from "./TodoTypes";
import moment from "moment";


const Modal = (props: { titleModal: string, showModal: boolean, closeModal: any; saveModal: any; todoObj: TodoType }) => {
  const { titleModal, showModal, closeModal, saveModal, todoObj } = props;
  const [todo, setTodo] = useState<TodoType>(todoObj);
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    setTodo(todoObj);
  }, [todoObj]);

  const todoTaskChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setTodo(prevState => ({ ...prevState, tasks: newValue }));
  };
  const todoStatusChange = (e: any) => {
    const newValue = e.target.value;
    setTodo(prevState => ({ ...prevState, status: +newValue }));
  };

  const todoDateChange = (e: any) => {
    setShowCalendar(false);
    const newValue = e;
    const date = (typeof newValue === "string") ? new Date(newValue) : newValue;
    setTodo(prevState => ({ ...prevState, date: date }));
  };
  const todoTimeChange = (e: any) => {
    const newValue = e;
    const time = (typeof newValue === "string") ? new Date(`2021 1 1 ${newValue}`) : newValue;
    setTodo(prevState => ({ ...prevState, time: time }));
  };
  const openCalendar = (e: any) => {
    setShowCalendar(true);
  }

  return (
    <>
      {showModal ? (
        <>
          <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
          >
            <div className="relative w-auto max-w-3xl mx-auto my-6">
              <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                <div className="flex items-start justify-between h-16 p-5 border-b border-solid rounded-t border-blueGray-200">
                  <h3 className="text-2xl font-semibold">
                    {titleModal}
                  </h3>
                </div>

                <div className="relative grid w-auto grid-cols-8 gap-1 mr-6 place-items-start">
                  <label htmlFor="task" className="col-span-2 pl-3 mt-3">Task Name: </label>
                  <input type="text" className="w-48 col-span-6 mt-3 border-2 border-gray-400 rounded" id="task" value={todo.tasks} onChange={todoTaskChange} placeholder="Task name" />

                  <label htmlFor="status" className="col-span-2 pl-3 mt-3 ">Status: </label>
                  <select className="w-48 col-span-6 mt-3 border-2 border-gray-400 rounded" id="status" value={todo.status} onChange={todoStatusChange}>
                    <option value="1">In Progress</option>
                    <option value="2">Paused</option>
                  </select>

                  <label className="col-span-2 pl-3 mt-3">Date: </label>
                  <div className="relative col-span-6 mt-3 ">
                    <button onClick={openCalendar} className="inline-flex w-48 px-1 py-1 font-bold text-gray-700 bg-white border-2 border-gray-400 rounded">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="pl-4">{todo.date.toDateString()}</span>
                    </button>
                    <div className={`w-80 absolute z-10 ${showCalendar ? "block" : "hidden"}`} >
                      <CustomCalendar initDate={todo.date} onChangeDate={todoDateChange} />
                    </div>
                  </div>

                  <label className="col-span-2 pl-3 mt-3">Time: </label>
                  <div className="col-span-6 mt-3">
                    <CustomTime initTime={todo.time} onChangeTime={todoTimeChange} />
                  </div>
                </div>
                <div className="flex items-center justify-end h-16 p-6 mt-3 border-t border-solid rounded-b border-blueGray-200">

                  <button
                    className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-gray-500 uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                    type="button"
                    onClick={() => saveModal(todo)}
                  >
                    Save Changes
                  </button>
                  <button
                    className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
                    type="button"
                    onClick={() => closeModal()}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null
      }
    </>
  );
}

export default Modal;