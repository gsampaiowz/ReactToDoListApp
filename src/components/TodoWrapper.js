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

  //Carrega os toDos do localStorage
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");

    if (storedTodos) setTodos(JSON.parse(storedTodos));
  }, []);

  const toggleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
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
    setShowModal(false);

    setTodos([]);

    localStorage.setItem("todos", JSON.stringify([]));
  };

  // Pega a largura atualizada da tela para aprimorar responsividade
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Adiciona borda quando aparece a barra de rolagem
  const lista = document.querySelector(".lista");
  const todosFlex = document.querySelector(".todosFlex");
  const listabox = document.querySelector(".lista-box");

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (listabox && todos.length !== 0) {
      listabox.style.maxHeight = "1000px"; // Use um valor grande o suficiente para acomodar o conteúdo
      listabox.style.opacity = "1";
      listabox.style.marginTop = "0"; // Reset o margin após a transição
      listabox.style.visibility = "visible";
    } else if (listabox && todos.length === 0) {
      listabox.style.maxHeight = "0";
      listabox.style.opacity = "0";
      setTimeout(() => {
        listabox.style.visibility = "hidden";
        listabox.style.marginTop = "-12px"; // Defina um margin negativo igual ao gap após a transição
      }, 300);
    }

    if (listabox && todos.length > 3) {
      listabox.style.borderBottom = "1px solid rgba(255,255,255,0.5)";
      listabox.style.borderTop = "1px solid rgba(255,255,255,0.5)";
      todosFlex.style.padding = "16px 8px";
    } else if (listabox && todos.length <= 3) {
      listabox.style.borderTop = "none";
      listabox.style.borderBottom = "none";
      todosFlex.style.padding = "4px 8px";
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [listabox, todosFlex, todos, lista]);

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    if (todos.length === 0) return alert("Não há tarefas para deletar");
    setShowModal(true);
  };

  const cancel = async () => {
    document
      .getElementsByClassName("modal")[0]
      .animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 300,
        iterations: 1,
      });

    setTimeout(() => {
      setShowModal(false);
    }, 250);
  };

  return (
    <div className="TodoWrapper">
      <h1>Organize suas tarefas!</h1>
      <TodoForm todos={todos} windowWidth={windowWidth} addTodo={addTodo} />
      <Box className="lista-box" maxWidth={400} width={"100%"}>
        <List disablePadding id="lista" className="lista">
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
        onClick={openModal}
      >
        Deletar todos
      </button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirmação</h2>
            <p>Deseja realmente executar esta ação?</p>
            <div className="buttons">
              <button onClick={deleteAll}>Confirmar</button>
              <button onClick={cancel}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
