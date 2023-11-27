import React, { FC, useState } from "react";
import { ITodo } from "../../types/types";
import style from "./todo.module.css";
import { SubTodoList } from "../SubTodoList/SubTodoList";
import { CreateTodoForm } from "../CreateTodoForm/CreateTodoForm";
import { CounterTodo } from "../CounterTodo/CounterTodo";
import clsx from "clsx";

interface ITodoProps {
  todo: ITodo;
  deleteTodo: (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number,
    subTodoId?: number
  ) => void;
  checkedTodo: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
    subTodoId?: number
  ) => void;
  addTodo: (name: string, id?: number) => void;
  index: number;
}

export const Todo: FC<ITodoProps> = ({
  todo,
  deleteTodo,
  checkedTodo,
  addTodo,
  index,
}) => {
  const { id, name, isComplete, subTodoList } = todo;
  const [visibleSubTodo, setVisibleSubTodo] = useState<boolean>(false);
  const [createSubTodo, setCreateSubTodo] = useState<boolean>(false);

  const showVisibleSubTodo = () => {
    setVisibleSubTodo((prev) => !prev);
  };

  return (
    <div
      className={clsx(
        style.container,
        index % 2 === 0 ? style.blue : style.red,
        isComplete && style.complete
      )}
      onClick={showVisibleSubTodo}
    >
      <div className={style.box}>
        <div className={style.wrapper}>
          <div
            className={style.checkbox_box}
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="checkbox"
              checked={isComplete}
              onChange={(e) => checkedTodo(e, id)}
              className={style.input}
            />
          </div>
          <div
            className={clsx(style.title, isComplete && style.title_complete)}
          >
            <h4>{name}</h4>
          </div>
          <div
            onClick={(e) => e.stopPropagation()}
            className={style.button_box}
          >
            <button
              className={style.btn}
              onClick={() => setCreateSubTodo((prev) => !prev)}
            >
              {createSubTodo ? "-" : "+"}
            </button>

            <button className={style.btn} onClick={(e) => deleteTodo(e, id)}>
              Удалить
            </button>
          </div>
        </div>
        {createSubTodo && <CreateTodoForm addTodo={addTodo} todoId={id} />}
      </div>

      {visibleSubTodo && (
        <>
          {subTodoList.length > 0 && (
            <CounterTodo
              value={subTodoList.length}
              words={["подзадача", "подзадачи", "подзадач"]}
            />
          )}
          <SubTodoList
            todo={todo}
            deleteTodo={deleteTodo}
            checkedTodo={checkedTodo}
          />
        </>
      )}
    </div>
  );
};
