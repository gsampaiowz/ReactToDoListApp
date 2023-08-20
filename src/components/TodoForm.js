import React, { useState } from "react";

export const TodoForm = () => {
	const [value, setValue] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		console.log(value);
	};

	return (
		<form className="TodoForm" onSubmit={handleSubmit}>
			<input
				type="text"
				className="todo-input"
				placeholder="Adicione uma tarefa"
				onChange={(e) => setValue(e.target.value)}
			/>
			<button type="submit" className="todo-btn">
				Adicionar tarefa
			</button>
		</form>
	);
};
