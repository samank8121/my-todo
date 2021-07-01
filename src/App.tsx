import React, { useCallback } from "react";
import "./App.css";
import CustomCalendar from "./Components/CustomCalendar";
import Modal from "./Components/Modal";
import { TodoType, TodoStatus } from "./Components/TodoTypes"
import TodoList from "./Components/TodoList";

function App() {
  const [showModal, setShowModal] = React.useState(false);
  const [todos, setTodos] = React.useState<TodoType[]>([]);

  const addTodo = (todo: TodoType) => {
    todos.push(todo);
  }
  const currentTodo = (isAdd: boolean) => {
    return ({
      id: 0,
      isChecked: false,
      tasks: "",
      status: TodoStatus.Paused,
      date: new Date(),
      time: new Date()
    });
  }

  const openModal = useCallback(() => {
    setShowModal(true)
  }, [showModal]);

  const closeModal = useCallback(() => {
    setShowModal(false)
  }, [showModal]);

  const saveModal = useCallback((todo: TodoType) => {
    if (todo.tasks && todo.tasks.length > 0) {
      addTodo(todo);
      setShowModal(false);
    }
  }, [showModal]);


  return (
    <div className="App">
      <header className="bg-red-500">
        <button
          className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-pink-500 rounded shadow outline-none active:bg-pink-600 hover:shadow-lg focus:outline-none"
          type="button"
          onClick={openModal}
        >
          Add
        </button>
        <Modal titleModal="Add" showModal={showModal} closeModal={closeModal} saveModal={saveModal} todoObj={currentTodo(true)} />
      </header>
      <section>
        <TodoList data={todos} />
      </section>
    </div>
  );
}

export default App;
