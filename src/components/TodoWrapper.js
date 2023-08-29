import React, { useState } from "react";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "./Todo";
import { EditTodoForm } from "./EditTodoForm";
import { TransitionGroup } from "react-transition-group";
import { List, Box, Collapse } from "@mui/material";
uuidv4();

export const TodoWrapper = () => {
	const [todos, setTodos] = useState([]);

	const addTodo = (todo) => {
		setTodos([
			...todos,
			{ id: uuidv4(), task: todo, completed: false, idEditing: false },
		]);
	};

	const toggleComplete = (id) => {
		setTodos(
			todos.map((todo) =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo
			)
		);
	};

	const deleteTodo = (id) => {
		setTodos(todos.filter((todo) => todo.id !== id));
	};

	const editTodo = (id) => {
		setTodos(
			todos.map((todo) =>
				todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
			)
		);
	};

	const editTask = (task, id) => {
		setTodos(
			todos.map((todo) =>
				todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
			)
		);
	};

	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	React.useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<div className="TodoWrapper">
			<h1>Organize suas tarefas!</h1>
			<TodoForm windowWidth={windowWidth} addTodo={addTodo} />
			<Box>
				<List>
					<TransitionGroup className="todosFlex">
						{todos.map((todo, index) =>
							todo.isEditing ? (
								<Collapse>
									<EditTodoForm
										key={todo.id}
										{...todo}
										editTodo={editTask}
										task={todo}
									/>
								</Collapse>
							) : (
								<Collapse>
									<Todo
										task={todo}
										key={index}
										toggleComplete={toggleComplete}
										deleteTodo={deleteTodo}
										editTodo={editTodo}
									/>
								</Collapse>
							)
						)}
					</TransitionGroup>
				</List>
			</Box>
		</div>
	);
};
