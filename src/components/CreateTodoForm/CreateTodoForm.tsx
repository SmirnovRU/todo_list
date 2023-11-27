import React, { FC, useState, useRef } from "react";
import style from "./createTodoForm.module.css";

interface ICreateTodoFormProps {
  addTodo: (name: string, id?: number) => void;
  todoId?: number;
}

export const CreateTodoForm: FC<ICreateTodoFormProps> = ({
  addTodo,
  todoId,
}) => {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      createTodo();
    }
  };

  const createTodo = () => {
    addTodo(value, todoId);
    setValue(() => "");
    inputRef.current?.focus();
  };

  return (
    <div className={style.container} onClick={(e) => e.stopPropagation()}>
      <input
        placeholder="Введите название задачи"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        ref={inputRef}
        className={style.input}
      />
      <button className={style.button} onClick={createTodo}>
        Создать
      </button>
    </div>
  );
};
