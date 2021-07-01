import React, { useState } from "react";
import TodoList from "./TodoList";
import { TodoType } from "./TodoTypes"

const Tabs = (props: { data: TodoType[] }) => {
    const { data } = props;
    const [openTab, setOpenTab] = useState(1);
    const [todos, setTodos] = useState<TodoType[]>(data ? data : []);

    return (
        <>
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
                                    <TodoList data={todos} isDone={false} />
                                </div>
                                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                    <TodoList data={todos} isDone={true} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Tabs;