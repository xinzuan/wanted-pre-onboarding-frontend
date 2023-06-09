import React from "react";

export interface ITodoItem {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}
export interface EditableTodo {
    id: number;
    todo: string;
    isCompleted: boolean;
    isEditing: boolean;
  }
export interface ICounterState {
  todos: ITodoItem[];
}

export interface IContextModel {
  state: ICounterState;
  dispatch: React.Dispatch<ICounterAction>;
}

export type ICounterAction =
  | { type: 'ADD'; payload: ITodoItem }
  | { type: 'UPDATE'; payload: ITodoItem }
  | { type: 'DELETE'; payload: number }
  | { type: 'GET'}
  | { type: 'TOGGLE_STATUS'; payload: number };