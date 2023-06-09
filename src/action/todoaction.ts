import { ICounterAction, ITodoItem } from "../interface";

export const addTodo = (todo: ITodoItem): ICounterAction => ({
  type: "ADD",
  payload: todo
});

export const updateTodo = (todo: ITodoItem): ICounterAction => ({
    type: "UPDATE",
    payload: todo
  });

export const deleteTodo = (id: number): ICounterAction => ({
  type: "DELETE",
  payload: id
});

export const getTodo = (): ICounterAction => ({
    type: "GET"
  });