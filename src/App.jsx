import { useEffect, useState, useRef } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import Delete_svg from "./components/Delete-svg";
import Edit_svg from "./components/Edit-svg";
import Tick_svg from "./components/Tick-svg";
import Add_svg from "./components/Add-svg";
import Input from "postcss/lib/input";
function App() {
  const formatDateTime = (date) => {
    return `${String(date.getMonth() + 1).padStart(2, "0")}/${String(
      date.getDate()
    ).padStart(2, "0")}/${date.getFullYear()} ${String(
      date.getHours()
    ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  };

  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isedit, setisedit] = useState(false);
  const [editid, seteditid] = useState("");
  async function addTodo() {
    if (inputValue !== "" && !isedit)
      setTodos([
        {
          id: uuidv4(),
          txt: inputValue,
          is_edited: false,
          date: formatDateTime(new Date()),
          is_checked: false,
        },
        ...todos,
      ]);
    setInputValue("");
    if (isedit) {
      setTodos((todos) =>
        todos.map((todo) =>
          todo.id !== editid ? todo : { ...todo, id: editid, txt: inputValue }
        )
      );
      if (inputValue !== "") setisedit(false);
    }
  }

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handleDel(id) {
    if (!isedit) setTodos((todos) => todos.filter((todo) => todo.id !== id));
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission or other default actions
      addTodo(); // Call the addTodo function
    }
  };

  function handleEdit(todo) {
    setisedit(true);
    setInputValue(todo.txt);
    seteditid(todo.id);
    document.getElementById("todobox").focus();
  }

  const handleCheckboxChange = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, is_checked: !todo.is_checked } : todo
      )
    );
  };

  const [showchecked, setShowchecked] = useState(true);

  return (
    <>
      <div id="content">
        <div className="h-10 bg-transparent backdrop-blur-md font-thin text-2xl flex items-center justify-center transition-all text-blue-100 py-4 mb-10">
          Todo App
        </div>

        <div className="flex items-center justify-center">
          <div className="bg-[#00000099] border-[0.1px] border-[#ffffff3f] backdrop-blur-3xl rounded-xl text-xl min-w-[330px] w-4/6 max-w-[1000px] min-h-[500px] pb-5 shadow-[0_35px_60px_-40px_rgba(255,255,255,0.5)]">
            <div className="m-6 flex justify-evenly md:justify-between">
              <input
                id="todobox"
                className="text-white mx-4 w-full pl-2 p-2 rounded-sm text-sm outline-none border border-gray-500 focus:border-gray-400 bg-[#333f] placeholder:text-gray-400"
                placeholder="Enter a Todo"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
              />

              <button
                className={`transition-all group cursor-pointer outline-none hover:rotate-${
                  isedit ? "0" : "90"
                } duration-300`}
                title="Add New"
                onClick={() => {
                  addTodo();
                }}
              >
                {isedit ? <Tick_svg color="green" /> : <Add_svg />}
              </button>
            </div>
            <div className="flex flex-col items-center justify-center w-full">
              <div className="mt-4 relative mb-2 w-11/12 h-[0.25px] bg-gray-400">
                <label className="left-2 checkbox-container absolute top-[-28px] ">
                  <input
                    type="checkbox"
                    checked={showchecked}
                    onChange={() => {
                      setShowchecked(!showchecked);
                      console.log(showchecked);
                    }}
                  />
                  <div className="topcheckmark"></div>
                  <div className="absolute w-max text-white text-sm left-7">
                    Show Completed
                  </div>
                </label>
              </div>

              {todos.map((todo) => (
                <div 
                  key={todo.id}
                  className={`text-white border border-[#fff2] hover:border-green-500 relative flex items-center justify-between rounded-l-lg rounded-r-[50px] text-sm mt-2 w-11/12 h-full transition-all
                  ${
                    isedit && editid === todo.id ? "bg-gray-500" : "bg-[#1118]"
                  } ${
                    showchecked||!todo.is_checked ? "" : "hidden"
                  }`}
                  x
                >
                  <div className="flex items-center justify-center text-white font-bold absolute right-10 min-w-[50%] h-full bg-transparent text-[0px] hover:text-sm hover:bg-[#2950ff88] transition-all hover:backdrop-blur-sm rounded-full">
                    {todo.date}
                  </div>
                  <div className="m-2 flex">
                    <label key={todo.id} className="checkboxcontainer">
                      <input
                        type="checkbox"
                        checked={todo.is_checked}
                        onChange={() => handleCheckboxChange(todo.id)}
                      />
                      <div className="checkmark"></div>
                    </label>
                    <div className="w-[0.25px] mr-2 bg-blue-500" />
                    <div >
                      <div
                        className={`ml-2 ${
                          todo.is_checked ? "text-red-500 line-through" : ""
                        }`}
                      >
                        {todo.txt}
                      </div>
                    </div>
                  </div>
                  <div className="max-w-36 flex items-center justify-end">
                    <div className="h-6 w-[0.25px] mr-2 bg-blue-500" />
                    <div className="w-3/12 mr-3">
                      <button
                        onClick={() => handleEdit(todo)}
                        className="w-8 h-8 edit-button"
                      >
                        <Edit_svg />
                      </button>
                    </div>
                    <div className="w-3/12 mr-3">
                      <button
                        onClick={() => handleDel(todo.id)}
                        className={`button ${isedit ? "w-0 h-0" : "w-8 h-8"}`}
                      >
                        <Delete_svg />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
