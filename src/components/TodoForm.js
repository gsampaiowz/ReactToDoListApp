import React, { useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const TodoForm = ({ todos, addTodo, windowWidth }) => {
  const scrollToBottom = () => {
    const element = document.getElementById(1);
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
