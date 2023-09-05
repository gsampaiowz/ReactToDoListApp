import React, { useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const EditTodoForm = ({ editTodo, todo, windowWidth }) => {
	const [value, setValue] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		editTodo(value, todo.id);

		setValue("");
	};

	return (
		<form className="TodoForm" onSubmit={handleSubmit}>
			<input
				type="text"
				className="todo-input"
				value={value}
				placeholder="Atualizar tarefa"
				onChange={(e) => setValue(e.target.value)}
			/>
			<button
				style={{ minWidth: windowWidth < 459 ? "48px" : "150px" }}
				type="submit"
				className="todo-btn"
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
