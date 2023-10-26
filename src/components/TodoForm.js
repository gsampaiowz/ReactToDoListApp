import React, { useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const TodoForm = ({ addTodo, windowWidth }) => {
  const scrollToBottom = () => {
    const element = document.getElementById('lista');
    element.scrollTo({
      top: element.scrollHeight,
      behavior: "smooth",
    });
  };

  setTimeout(() => {
    scrollToBottom();
  }, 250);

  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!value) {
      const input = document.querySelector(".todo-input");
      const btninput = document.querySelector(".todo-btn");
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

    setValue("");
  };

  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        value={value}
        placeholder="Adicione uma tarefa"
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        onClick={scrollToBottom}
        style={{ minWidth: windowWidth < 459 ? "48px" : "150px" }}
        type="submit"
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
