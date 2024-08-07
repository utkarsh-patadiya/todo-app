import { useEffect, useState, useRef } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import Delete_svg from "./components/Delete-svg";
import Edit_svg from "./components/Edit-svg";
import Tick_svg from "./components/Tick-svg";
import Add_svg from "./components/Add-svg";
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
      setisedit(false);
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

  return (
    <>
      <div className="h-10 bg-blue-700 font-thin text-2xl flex items-center justify-center transition-all text-blue-100 py-4 mb-10">
        Todo App
      </div>

      <div className="flex items-center justify-center">
        <div className="bg-blue-200 rounded-3xl text-xl min-w-[330px] w-4/6 max-w-[1000px] min-h-[500px] pb-5">
          <div className="m-6 flex justify-evenly md:justify-between">
            <input
              id="todobox"
              className="w-10/12 pl-2 p-2 rounded-2xl text-sm outline-none border focus:border-blue-400 bg-[#deedff] placeholder:text-gray-600"
              placeholder="Enter a Todo"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className={`group cursor-pointer outline-none hover:rotate-${
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
            <div className="mb-2 w-11/12 h-[0.25px] bg-blue-500" />

            {todos.map((todo) => (
              <div
                key={todo.id}
                className={`relative flex items-center justify-between rounded-l-lg rounded-r-[50px] text-sm mt-2 w-11/12 h-full
                  ${
                    isedit && editid === todo.id ? "bg-blue-500" : "bg-blue-300"
                  }`}
                x
              >
                <div className="flex items-center justify-center text-white font-bold absolute min-w-[50%] h-full bg-transparent text-[0px] hover:text-sm hover:bg-[#2950ff88] transition-all hover:backdrop-blur-sm rounded-r-full">
                  {todo.date}
                </div>
                <div className="m-2">{todo.txt}</div>
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
    </>
  );
}

export default App;
