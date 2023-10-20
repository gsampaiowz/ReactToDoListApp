import React, { useState } from "react";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "./Todo";
import { EditTodoForm } from "./EditTodoForm";
import { TransitionGroup } from "react-transition-group";
import { List, Box, Collapse } from "@mui/material";
import FadeIn from "react-fade-in";
import { useEffect } from "react";
uuidv4();

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    const newTodo = [
      ...todos,
      { id: uuidv4(), task: todo, completed: false, idEditing: false },
    ];

    setTodos(newTodo);

    localStorage.setItem("todos", JSON.stringify(newTodo));
  };

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");

    if (storedTodos) setTodos(JSON.parse(storedTodos));
  }, []);

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = (task, id) => {
    const updatedTask = todos.map((todo) =>
      todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
    );

    setTodos(updatedTask);

    localStorage.setItem("todos", JSON.stringify(updatedTask));
  };

  const deleteAll = () => {
    if(todos.length === 0) return alert("Não há tarefas para deletar");

    setTodos([]);

    localStorage.setItem("todos", JSON.stringify([]));
  };

  // Pega a largura atualizada da tela para aprimorar responsividade
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Adiciona borda quando aparece a barra de rolagem
  const lista = document.querySelector(".lista");
  const todosFlex = document.querySelector(".todosFlex");

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (todosFlex && localStorage.getItem("todos") === "[]") {
      todosFlex.classList.add("animate")
      // todosFlex.style.display =  "none";
      setTimeout(() => {todosFlex.style.display =  "none"; todosFlex.style.position = "absolute"}, 1000);
    }else if (todosFlex && localStorage.getItem("todos") !== "[]") {
      todosFlex.classList.add("animate")
      todosFlex.style.display =  "flex";
      todosFlex.style.height = "auto";
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [todos, todosFlex]);

  // CSS função
  const addExceededHeightClass = () => {
    if (lista) {
      const listabox = document.querySelector(".lista-box");
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
  };

  // evento da lista
  if (lista) lista.addEventListener("MutatioObserver", addExceededHeightClass);

  // evento do flex
  if (todosFlex) todosFlex.addEventListener("resize", addExceededHeightClass);

  return (
    <div className="TodoWrapper">
      <h1>Organize suas tarefas!</h1>
      <TodoForm todos={todos} windowWidth={windowWidth} addTodo={addTodo} />
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
      <button
        className="todo-btn"
        style={{ borderRadius: 8, borderLeft: "1px solid" }}
        onClick={deleteAll}
      >
        Deletar todos
      </button>
    </div>
  );
};
