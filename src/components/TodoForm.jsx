import React, { useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TodoForm = ({ addTodo, windowWidth }) => {
  const scrollToBottom = () => {
    const element = document.getElementById("lista");
    element.scrollTo({
      top: element.scrollHeight,
      behavior: "smooth",
    });
  };

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
    addTodo(value);

    setTimeout(() => {
      scrollToBottom();
    }, 250);

    setValue("");
  };

  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        id="todo-input"
        value={value}
        placeholder="Adicione uma tarefa"
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        onClick={scrollToBottom}
        style={{ minWidth: windowWidth < 459 ? "48px" : "150px" }}
        type="submit"
        id="todo-btn"
        className="todo-btn"
      >
        {windowWidth < 459 ? (
          <FontAwesomeIcon icon={faPlus} />
        ) : (
          "Adicionar tarefa"
        )}
      </button>
    </form>
  );
};

export default TodoForm;