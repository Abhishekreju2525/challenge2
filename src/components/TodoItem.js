import React from "react";
import "../css/todo.css";

function TodoItem({ Item, index, onDelete, changeTodoStatus }) {
  //   console.log(Item);
  console.log("Item" + Item);
  return (
    <div className="TodoItem">
      <div>
        {index + 1}. &nbsp;
        {Item.todoItem}
      </div>
      <button
        className="w-[200px] bg-green-300 rounded-xl"
        onClick={() => {
          changeTodoStatus(Item);
        }}
      >
        {Item.status ? "Undo" : "Mark as Done"}
      </button>
      <div>
        <button
          onClick={() => {
            onDelete(index);
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
