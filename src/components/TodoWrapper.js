import React, { useState } from "react";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "./Todo";
import { EditTodoForm } from "./EditTodoForm";
import { TransitionGroup } from "react-transition-group";
import { List, Box, Collapse } from "@mui/material";
import FadeIn from "react-fade-in";
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

	// Pega a largura atualizada da tela para aprimorar responsividade
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

	// Adiciona borda quando aparece a barra de rolagem
	var lista = document.querySelector(".lista");
	var todosFlex = document.querySelector(".todosFlex");

	// CSS função
	const addExceededHeightClass = () => {
		if (lista) {
			const listabox = document.querySelector(".lista-box")
			if (todos.map((todo) => todo).length > 3) {
				listabox.style.borderBottom = "1px solid rgba(255,255,255,0.5)";
				listabox.style.borderTop = "1px solid rgba(255,255,255,0.5)";
				todosFlex.style.padding = "16px 8px";
			} else {
				listabox.style.borderTop = "none";
				listabox.style.borderBottom = "none";
				todosFlex.style.padding = "4px 8px";

			}
		}
	}

	// evento da lista
	if(lista)lista.addEventListener("DOMSubtreeModified", addExceededHeightClass);

	// evento do flex
	if(todosFlex)todosFlex.addEventListener("resize", addExceededHeightClass);

	return (
		<div className="TodoWrapper">
			<h1>Organize suas tarefas!</h1>
			<TodoForm windowWidth={windowWidth} addTodo={addTodo} />
			<Box className="lista-box" maxWidth={400} width={"100%"}>
				<List disablePadding id={1} className="lista">
					<TransitionGroup className="todosFlex">
						{todos.map((todo) =>
							todo.isEditing ? (
								<Collapse key={todo.id}>
									<FadeIn>
										<EditTodoForm
											windowWidth={windowWidth}
											{...todo}
											editTodo={editTask}
											todo={todo}
										/>
									</FadeIn>
								</Collapse>
							) : (
								<Collapse key={todo.id}>
									<FadeIn>
										<Todo
											todo={todo}
											toggleComplete={toggleComplete}
											deleteTodo={deleteTodo}
											editTodo={editTodo}
										/>
									</FadeIn>
								</Collapse>
							)
						)}
					</TransitionGroup>
				</List>
			</Box>
		</div>
	);
};
