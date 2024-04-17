import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import "../css/todo.css";
import { FaPlus } from "react-icons/fa6";
import AddIcon from "@mui/icons-material/Add";
function Todo() {
  const [allTodos, setAllTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  function handleAddTodo(data) {
    data.status = false;
    // console.log(data);
    setAllTodos([...allTodos, data]);
    reset();
  }
  const handleDelete = (targetIndex) => {
    // console.log(targetIndex);

    setAllTodos(allTodos.filter((element, i) => i !== targetIndex));
    // console.log(allTodos);
  };
  function changeTodoStatus(todo) {
    const updatedTodos = allTodos.map((item) => {
      if (todo.todoItem === item.todoItem) {
        return { ...item, status: !item.status };
      }
      return item;
    });
    setAllTodos(updatedTodos);
  }
  const filteredTodos = allTodos.filter((todo) => {
    if (filter === "all") {
      return true;
    } else if (filter === "completed") {
      return todo.status;
    } else if (filter === "active") {
      return !todo.status;
    }
  });



  return (
    <div className="mainContainer">
      <form
        action=""
        onSubmit={handleSubmit(handleAddTodo)}
        className="TodoContainer"
      >
        <h1 className="text-4xl font-medium text-center pt-12 text-white">
          To-do
        </h1>
        <div className="inputRow">
          <input
            placeholder="Add a new item"
            className="mt-8 border-0 rounded-full p-3 w-[80%] h-[60px] flex mr-0 justify-start mx-auto"
            {...register("todoItem", { required: true })}
          />
          {errors.username && <span>Todo item required</span>}

          <div className="addbt text-3xl addBtn1  addBtn rounded-full mt-8 p-3 mr-auto text-center  font-bold">
            <input className=" text-4xl mb-2 " type="submit" value="+" />
          </div>
        </div>
      </form>
      <div className="TaskContainer">
        <h2 className="text-3xl ">Tasks</h2>
        <div className="flex gap-1 p-3 flex-wrap">
          <button
            className={`${
              filter === "all" ? "bg-green-500" : ""
            } py-2 px-5 rounded-lg`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`${
              filter === "completed" ? "bg-green-500" : ""
            } py-2 px-3 rounded-lg`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
          <button
            className={`${
              filter === "active" ? "bg-green-500" : ""
            } py-2 px-3 rounded-lg`}
            onClick={() => setFilter("active")}
          >
            Active
          </button>
        </div>
        {filteredTodos.length > 0 ? (
          filteredTodos.map((todo, index) => {
            return (
              <TodoItem
                Item={todo}
                key={todo.todoItem}
                index={index}
                onDelete={handleDelete}
                changeTodoStatus={changeTodoStatus}
              />
            );
          })
        ) : (
          <p>No task found.</p>
        )}
      </div>
    </div>
  );
}

export default Todo;
