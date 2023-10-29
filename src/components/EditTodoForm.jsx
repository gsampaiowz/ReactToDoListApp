import React, { useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const EditTodoForm = ({ editTodo, todo, windowWidth }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!value) {
      const input = document.getElementById("todo-input");
      const btninput = document.getElementById("todo-btn");
      input.focus();
      input.animate(
        [
          { transform: "translateY(-1px)", border: "1px solid red" },
          { transform: "translateY(1px)", border: "1px solid red" },
        ],

        { duration: 100, iterations: 3 }
      );
      btninput.animate(
        [
          { transform: "translateY(-1px)", border: "1px solid red" },
          { transform: "translateY(1px)", border: "1px solid red" },
        ],

        { duration: 100, iterations: 3 }
      );
      return;
    }

    editTodo(value, todo.id);

    setValue("");
  };

  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        value={value}
		id="todo-input"
        placeholder="Atualizar tarefa"
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        style={{ minWidth: windowWidth < 459 ? "48px" : "150px" }}
        type="submit"
        className="todo-btn"
		id="todo-btn"
      >
        {windowWidth < 459 ? (
          <FontAwesomeIcon icon={faPlus} />
        ) : (
          "Atualizar tarefa"
        )}
      </button>
    </form>
  );
};
