import React, { FC } from "react";
import { ITodo } from "../../types/types";
import { SubTodo } from "../SubTodo/SubTodo";

interface ISubTodoListProps {
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
}

export const SubTodoList: FC<ISubTodoListProps> = ({
  todo,
  deleteTodo,
  checkedTodo,
}) => {
  const { id, subTodoList } = todo;
  return (
    <>
      {subTodoList.map((item) => (
        <SubTodo
          key={item.id}
          subTodo={item}
          todoId={id}
          deleteTodo={deleteTodo}
          checkedTodo={checkedTodo}
        />
      ))}
      {subTodoList.length === 0 && <h5>Список подзадач пуст</h5>}
    </>
  );
};
