import React, { FC } from "react";
import { ISubTodo } from "../../types/types";
import style from "./subTodo.module.css";
import clsx from "clsx";

interface ISubTodoProps {
  subTodo: ISubTodo;
  todoId: number;
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
}

export const SubTodo: FC<ISubTodoProps> = ({
  subTodo,
  todoId,
  checkedTodo,
  deleteTodo,
}) => {
  const { id, name, isComplete } = subTodo;

  return (
    <div
      className={clsx(style.container, isComplete && style.complete)}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={style.box}>
        <div className={style.checkbox_box}>
          <input
            type="checkbox"
            checked={isComplete}
            onChange={(e) => checkedTodo(e, todoId, id)}
          />
        </div>
        <div className={clsx(style.title, isComplete && style.title_complete)}>
          <h6>{name}</h6>
        </div>
        <div>
          <button
            className={style.btn}
            onClick={(e) => deleteTodo(e, todoId, id)}
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
};
