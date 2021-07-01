import React from "react";
import CustomCalendar from "./CustomCalendar";
import CustomTime from "./CustomTime";
import { TodoType, TodoStatus } from "./TodoTypes"


const Modal = (props: { titleModal: string, showModal: boolean, closeModal: any; saveModal: any; todoObj: TodoType }) => {
  const { titleModal, showModal, closeModal, saveModal, todoObj } = props;
  const [todo, setTodo] = React.useState<TodoType>(todoObj);

  const todoTaskChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setTodo(prevState => ({ ...prevState, tasks: newValue }));
  };
  const todoDateChange = (e: any) => {
    const newValue = e;
    setTodo(prevState => ({ ...prevState, date: newValue }));
  };
  const todoTimeChange = (e: any) => {
    const newValue = e;
    setTodo(prevState => ({ ...prevState, time: newValue }));
  };
  return (
    <>
      {showModal ? (
        <>
          <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
          >
            <div className="relative w-auto max-w-3xl mx-auto my-6">
              <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
                  <h3 className="text-3xl font-semibold">
                    {titleModal}
                  </h3>
                </div>
                <div className="relative grid w-auto grid-cols-8 gap-1 mr-6 place-items-start">

                  <label htmlFor="task" className="col-span-2 pl-3 ">Task Name: </label>
                  <input type="text" className="col-span-6" id="task" value={todo.tasks} onChange={todoTaskChange} placeholder="Task name" />

                  <label className="col-span-2 pl-3 mt-6">Date: </label>
                  <div className="col-span-6 mt-6">
                    <CustomCalendar initDate={todo.date} onChangeDate={todoDateChange} />
                  </div>

                  <label className="col-span-2 pl-3 mt-6">Date: </label>
                  <div className="col-span-6 mt-6">
                    <CustomTime initTime={todo.time} onChangeTime={todoTimeChange} />
                  </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-blueGray-200">

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
                    onClick={() => {
                      console.log("close");
                      closeModal();
                    }
                    }
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
    </>
  );
}

export default Modal;