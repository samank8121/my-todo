import React, { useCallback } from "react";
import Modal from "./Components/Modal";
import { TodoType, TodoStatus } from "./Components/TodoTypes"

import Tab from "./Components/Tab";
import { useState } from "react";

let uniqueId: number = 0;
function App() {
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
      todo.id = ++uniqueId;
      addTodo(todo);
      setShowModal(false);
      setCurrentTodoDefault();
    }
  }, [showModal]);
  const addTodo = (todo: TodoType) => {
    todos.push(todo);
  }
  return (
    <div className="App">
      <header className="relative">
        <div className="ml-6 ">
          <Tab data={todos}></Tab>
        </div>
        <div className="absolute top-3 right-5">
          <button onClick={openModal} className="inline-flex px-4 py-2 font-bold text-white rounded ml bg-button-blue hover:bg-grey">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add</span>
          </button>
          <Modal titleModal="Add" showModal={showModal} closeModal={closeModal} saveModal={saveModal} todoObj={currentTodo} />
        </div>
      </header>
    </div>
  );
}

export default App;
