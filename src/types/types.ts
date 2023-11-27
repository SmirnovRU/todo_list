export interface ISubTodo {
    id: number;
    name: string;
    isComplete: boolean;
  }
  
  export interface ITodo extends ISubTodo {
    subTodoList: ISubTodo[];
  }