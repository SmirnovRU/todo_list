import { useState, FC, useEffect } from "react";
import { ITodo } from "./types/types";
import { TodoList } from "./components/TodoLIst/TodoList";
import { CreateTodoForm } from "./components/CreateTodoForm/CreateTodoForm";
import { CounterTodo } from "./components/CounterTodo/CounterTodo";
import style from "./app.module.css";

export const App: FC = () => {
  const [todoList, setTodoList] = useState<ITodo[]>([]);
  const countTodos = todoList.length;

  const addTodo = (name: string, id?: number) => {
    if (name) {
      if (!id) {
        const newTodo = {
          id: Date.now(),
          name,
          isComplete: false,
          subTodoList: [],
        };
        setTodoList([newTodo, ...todoList]);
        localStorage.setItem(
          "todo_list",
          JSON.stringify([newTodo, ...todoList])
        );
      } else {
        const newSubTodo = {
          id: Date.now(),
          name,
          isComplete: false,
        };
        setTodoList(
          todoList.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                subTodoList: [newSubTodo, ...item.subTodoList],
              };
            }
            return item;
          })
        );
        localStorage.setItem(
          "todo_list",
          JSON.stringify(
            todoList.map((item) => {
              if (item.id === id) {
                return {
                  ...item,
                  subTodoList: [newSubTodo, ...item.subTodoList],
                };
              }
              return item;
            })
          )
        );
      }
    }
  };

  const deleteTodo = (
    e: React.MouseEvent<HTMLButtonElement>,
    todoId: number,
    subTodoId?: number
  ) => {
    e.stopPropagation();
    if (!subTodoId) {
      setTodoList(todoList.filter((item) => item.id !== todoId));
      localStorage.setItem(
        "todo_list",
        JSON.stringify(todoList.filter((item) => item.id !== todoId))
      );
    } else {
      setTodoList(
        todoList.map((item) => {
          if (item.id === todoId) {
            return {
              ...item,
              subTodoList: item.subTodoList.filter(
                (elem) => elem.id !== subTodoId
              ),
            };
          }
          return item;
        })
      );
      localStorage.setItem(
        "todo_list",
        JSON.stringify(
          todoList.map((item) => {
            if (item.id === todoId) {
              return {
                ...item,
                subTodoList: item.subTodoList.filter(
                  (elem) => elem.id !== subTodoId
                ),
              };
            }
            return item;
          })
        )
      );
    }
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todo_list") || "");
    if (todos) {
      setTodoList(todos);
    }
  }, [todoList]);

  const checkedTodo = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: number,
    subTodoId?: number
  ) => {
    e.stopPropagation();
    if (!subTodoId) {
      setTodoList(
        todoList.map((item) => {
          if (item.id === todoId) {
            return {
              ...item,
              isComplete: !item.isComplete,
              subTodoList: item.subTodoList.map((elem) => {
                return {
                  ...elem,
                  isComplete: !item.isComplete,
                };
              }),
            };
          }
          return item;
        })
      );
      localStorage.setItem(
        "todo_list",
        JSON.stringify(
          todoList.map((item) => {
            if (item.id === todoId) {
              return {
                ...item,
                isComplete: !item.isComplete,
                subTodoList: item.subTodoList.map((elem) => {
                  return {
                    ...elem,
                    isComplete: !item.isComplete,
                  };
                }),
              };
            }
            return item;
          })
        )
      );
    } else {
      setTodoList(
        todoList.map((item) => {
          if (item.id === todoId) {
            return {
              ...item,
              subTodoList: item.subTodoList.map((elem) => {
                if (elem.id === subTodoId) {
                  return {
                    ...elem,
                    isComplete: !elem.isComplete,
                  };
                }
                return elem;
              }),
            };
          }
          return item;
        })
      );
      localStorage.setItem(
        "todo_list",
        JSON.stringify(
          todoList.map((item) => {
            if (item.id === todoId) {
              return {
                ...item,
                subTodoList: item.subTodoList.map((elem) => {
                  if (elem.id === subTodoId) {
                    return {
                      ...elem,
                      isComplete: !elem.isComplete,
                    };
                  }
                  return elem;
                }),
              };
            }
            return item;
          })
        )
      );
    }
  };

  return (
    <div className={style.container}>
      <h1 className={style.title}>Список задач</h1>
      <CreateTodoForm addTodo={addTodo} />
      {countTodos > 0 && (
        <div>
          <CounterTodo
            value={countTodos}
            words={["задача", "задачи", "задач"]}
          />
          <TodoList
            todoList={todoList}
            addTodo={addTodo}
            deleteTodo={deleteTodo}
            checkedTodo={checkedTodo}
          />
        </div>
      )}

      {countTodos === 0 && <h4 className={style.text}>Список задач пуст</h4>}
    </div>
  );
};
