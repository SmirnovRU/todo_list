import React, { FC } from "react";
import { ITodo } from "../../types/types";
import { Todo } from "../Todo/Todo";

interface ITodoListProps {
  todoList: ITodo[];
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
}

export const TodoList: FC<ITodoListProps> = ({
  todoList,
  deleteTodo,
  checkedTodo,
  addTodo,
}) => {
  return (
    <>
      {todoList.map((item, idx) => (
        <Todo
          todo={item}
          checkedTodo={checkedTodo}
          deleteTodo={deleteTodo}
          addTodo={addTodo}
          index={idx}
          key={item.id}
        />
      ))}
    </>
  );
};
