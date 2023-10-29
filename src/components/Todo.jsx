import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export const Todo = ({ todo, toggleComplete, deleteTodo, editTodo }) => {
	return (
		<div className="Todo">
			<p
				onClick={() => toggleComplete(todo.id)}
				className={`${todo.completed ? "completed" : ""}`}
				key={todo.id}
			>
				{todo.task}
			</p>
			<div className="icons">
				<FontAwesomeIcon
					icon={faPenToSquare}
					color="#d1d1d1"
					onClick={() => editTodo(todo.id)}
				/>
				<FontAwesomeIcon
					color="#d1d1d1"
					icon={faTrash}
					onClick={() => deleteTodo(todo.id)}
				/>
			</div>
		</div>
	);
};
