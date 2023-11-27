import { FC } from "react";

interface ICounterTodoProps {
  value: number;
  words: string[];
}

export const CounterTodo: FC<ICounterTodoProps> = ({ value, words }) => {
  const numWord = (value: number, words: string[]): string => {
    value = Math.abs(value) % 100;
    const num = value % 10;
    if (value > 10 && value < 20) return words[2];
    if (num > 1 && num < 5) return words[1];
    if (num === 1) return words[0];
    return words[2];
  };
  return (
    <div>
      {value} {numWord(value, words)}
    </div>
  );
};
