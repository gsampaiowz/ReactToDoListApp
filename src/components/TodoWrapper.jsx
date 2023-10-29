import React, { useCallback, useState } from "react";
import TodoForm from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import Todo from "./Todo";
import EditTodoForm from "./EditTodoForm";
import { TransitionGroup } from "react-transition-group";
import { List, Box, Collapse } from "@mui/material";
import FadeIn from "react-fade-in";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";

const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [toasts, setToast] = useState();
  const toast = document.getElementById("toast");

  const showToast = () => {
    document.querySelectorAll("svg").forEach((el) => {
      el.style.cursor = "wait";
    });
    document.querySelectorAll("input").forEach((input) => {
      input.placeholder = "Aguarde...";
      input.style.cursor = "wait";
      input.disabled = true;
    });

    setTimeout(() => {
      document.querySelectorAll("svg").forEach((el) => {
        el.style.cursor = "pointer";
      });
      document.querySelectorAll("input").forEach((input) => {
        input.placeholder = "Adicione uma tarefa";
        input.style.cursor = "auto";
        input.disabled = false;
      });
    }, 1500);

    toast.style.marginTop = "-100px";

    setTimeout(() => {
      toast.style.opacity = "0";
    }, 1000);

    setTimeout(() => {
      toast.style.transition = "0s";
      toast.style.marginTop = "-300px";
    }, 1500);

    setTimeout(() => {
      toast.style.transition = "1s";
      toast.style.opacity = "1";
    }, 2000);
  };

  const addTodo = (todo) => {
    setToast(true);
    toast.style.background = "green";

    showToast();

    const newTodo = [
      ...todos,
      { id: uuidv4(), task: todo, completed: false, idEditing: false },
    ];

    setTodos(newTodo);

    localStorage.setItem("todos", JSON.stringify(newTodo));
  };

  //Carrega os todos do localStorage
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
    setToast(false);
    toast.style.background = "red";

    showToast();

    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const editTodo = (id) => {
    setTodos(todos.forEach((todo) => (todo.isEditing = false)));
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = (task, id) => {
    setToast(true);
    showToast();

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
  const todosFlex = document.querySelector(".todosFlex");
  const listabox = document.querySelector(".lista-box");

  const deleteAllTransition = useCallback(() => {
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
  }, [listabox, todos.length]);

  const setBorder = useCallback(() => {
    if (listabox && todos.length > 3) {
      listabox.style.borderBottom = "1px solid rgba(255,255,255,0.5)";
      listabox.style.borderTop = "1px solid rgba(255,255,255,0.5)";
      todosFlex.style.padding = "16px 8px";
    } else if (listabox && todos.length <= 3) {
      listabox.style.borderTop = "none";
      listabox.style.borderBottom = "none";
      todosFlex.style.padding = "4px 8px";
    }
  }, [listabox, todos.length, todosFlex]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    deleteAllTransition(useCallback);

    setBorder(useCallback);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [deleteAllTransition, setBorder]);

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    if (todos.length === 0) return alert("Não há tarefas para deletar");
    setShowModal(true);
  };

  const cancel = () => {
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
    <div className="TodoWrapper" id="todo-wrapper">
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
      <div className="toast" id="toast">
        {toasts ? (
          <FontAwesomeIcon size="xl" icon={faCheck} />
        ) : (
          <>
            <FontAwesomeIcon size="xl" icon={faTrash} />
          </>
        )}
      </div>
    </div>
  );
};

export default TodoWrapper;
