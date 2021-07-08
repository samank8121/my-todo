import React, { useState, useCallback, ChangeEvent } from 'react';
import TodoList from './TodoList';
import { TodoType, TodoStatus } from './TodoTypes';
import * as Constants from './Constants';
import Modal from './Modal';
import ErrorAlert from './ErrorAlert';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Tabs = () => {
  const [openTab, setOpenTab] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [modalTitle, setModalTitle] = useState(Constants.AddModalTitle);
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<TodoType>({
    id: 0,
    isChecked: false,
    tasks: '',
    status: TodoStatus.Paused,
    date: new Date(),
    time: new Date(),
  });

  const setCurrentTodoDefault = () => {
    setCurrentTodo({
      id: 0,
      isChecked: false,
      tasks: '',
      status: TodoStatus.Paused,
      date: new Date(),
      time: new Date(),
    });
  };

  const idGenerator = () => {
    return todos && todos.length > 0 ? todos.reduce((max, character) => (character.id > max ? character.id : max), todos[0].id) + 1 : 1;
  };

  const closeModal = useCallback(() => {
    setShowModal(false);
    setCurrentTodoDefault();
  }, []);

  const todoValidation = (todo: TodoType) => {
    if (!(todo.tasks && todo.tasks.length > 0)) {
      setErrorMessage(Constants.msgTaskTitleEmpty);
      setShowErrorMessage(true);
      return false;
    } else if (todo.id === 0 && todos.findIndex(t => t.tasks == todo.tasks) !== -1) {
      setErrorMessage(Constants.msgTaskTitleDuplicate);
      setShowErrorMessage(true);
      return false;
    } else return true;
  };
  const saveModal = useCallback(
    (todo: TodoType) => {
      if (deleteModal) {
        const tempTodos = todos.filter(s => s.id !== todo.id);
        setTodos(tempTodos);
        setShowModal(false);
        setCurrentTodoDefault();
      } else if (todoValidation(todo)) {
        if (todo && todo.id === 0) {
          todo.id = idGenerator();
          if (todo.time.toDateString() !== new Date(2021, 1, 1).toDateString()) {
            todo.time = new Date(2021, 1, 1, todo.time.getHours(), todo.time.getMinutes(), todo.time.getSeconds());
          }
          addTodo(todo);
        } else {
          editTodo(todo);
        }
        setShowModal(false);
        setCurrentTodoDefault();
      }
    },
    [currentTodo],
  );

  const addTodo = (todo: TodoType) => {
    todos.push(todo);
    setTodos([...todos]);
  };
  const editTodo = (todo: TodoType) => {
    const editedTodoIndex = todos.findIndex(t => t.id === todo.id);
    todos[editedTodoIndex] = todo;
    setTodos([...todos]);
  };
  const addClicked = useCallback(() => {
    setCurrentTodo({
      id: 0,
      isChecked: false,
      tasks: '',
      status: TodoStatus.Paused,
      date: new Date(),
      time: new Date(),
    });
    setModalTitle(Constants.AddModalTitle);
    setShowModal(true);
    setDeleteModal(false);
  }, []);
  const editTodoModal = useCallback((todo: TodoType) => {
    setCurrentTodo(todo);
    setModalTitle(Constants.EditModalTitle);
    setShowModal(true);
    setDeleteModal(false);
  }, []);

  const deleteTodo = useCallback((todo: TodoType) => {
    // eslint-disable-next-line no-debugger
    debugger;
    setCurrentTodo(todo);
    setModalTitle(Constants.DeleteModalTitle);
    setShowModal(true);
    setDeleteModal(true);
  }, []);
  const doneTodo = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const target = event.target;
      const value = target.checked;
      const id = +target.name;
      const tempTodos = todos.filter(t => t.id !== id);
      const todo = todos.find(t => t.id === id);
      if (todo) {
        todo.isChecked = value;
        setTodos([...tempTodos, todo]);
      }
    },
    [todos],
  );

  return (
    <>
      <div className='font-sans'>
        {showErrorMessage ? <ErrorAlert errorMessage={errorMessage} setShowErrorMessage={setShowErrorMessage} /> : null}
        <div className='relative'>
          <div className='ml-6 '>
            <div className='flex flex-wrap '>
              <div className='w-full mb-0'>
                <ul className='flex flex-row flex-wrap pt-3 mb-0 list-none w-80 ' role='tablist'>
                  <li className='flex-auto -mb-px text-center last:mr-0'>
                    <a
                      className={
                        'text-15 border-2 border-b-0 border-tab-border px-5 py-3  rounded block leading-normal ' +
                        (openTab === 1
                          ? 'text-tab-text bg-white font-bold focus:outline-none'
                          : 'text-tab-inactive-text bg-tab-inactive-bg text-opacity-50 font-normal focus:outline-none')
                      }
                      onClick={e => {
                        e.preventDefault();
                        setOpenTab(1);
                      }}
                    >
                      To Do
                    </a>
                  </li>
                  <li className='flex-auto mr-2 -mb-px text-center last:mr-0 '>
                    <a
                      className={
                        'text-15 px-5 py-3 border-2 border-b-0 border-l-0 border-tab-border rounded block leading-normal ' +
                        (openTab === 2
                          ? 'text-tab-text bg-white font-bold focus:outline-none'
                          : 'text-tab-inactive-text bg-tab-inactive-bg text-opacity-50 font-normal focus:outline-none')
                      }
                      onClick={e => {
                        e.preventDefault();
                        setOpenTab(2);
                      }}
                    >
                      Done Tasks
                    </a>
                  </li>
                </ul>
                <div className='relative flex flex-col w-full min-w-0 mb-6 break-words bg-white border-t-2 border-tab-border'>
                  <div className='flex-auto px-4 py-5'>
                    <TodoList data={todos} isDone={openTab === 2} editTodo={editTodoModal} deleteTodo={deleteTodo} doneTodo={doneTodo} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='absolute top-3 right-5'>
            <button
              onClick={addClicked}
              className='inline-flex px-4 py-2 font-bold text-white rounded ml bg-button-blue focus:outline-none hover:bg-grey'
            >
              <svg xmlns='http://www.w3.org/2000/svg' className='w-6 h-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeWidth='2' strokeLinejoin='round' d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
              </svg>
              <span>Add</span>
            </button>
            <Modal
              titleModal={modalTitle}
              showModal={showModal}
              closeModal={closeModal}
              saveModal={saveModal}
              todoObj={currentTodo}
              isDelete={deleteModal}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Tabs;
