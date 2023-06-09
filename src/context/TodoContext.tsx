import React, { useReducer, ReactNode } from "react";
import { ICounterAction, ICounterState, IContextModel } from "../interface";

const defaultState: ICounterState = {
    todos: []
};

const reducer = (state: ICounterState, action: ICounterAction) : ICounterState => {
    switch (action.type) {
    case "GET":
            return {...state};
      case "ADD":
        return {
          ...state,
          todos: [...state.todos, action.payload]
        };
  
      case "DELETE":
        return {
          ...state,
          todos: state.todos.filter((item) => item.id !== action.payload)
        };
    case 'TOGGLE_STATUS':
            return {
              ...state,
              todos: state.todos.map((todo) =>
                todo.id === action.payload ? { ...todo, isCompleted: !todo.isCompleted } : todo
              )
            };
      default:
        return state;
    }
  };

export const Context = React.createContext({} as IContextModel);

interface ProviderProps {
  children: ReactNode;
}

export const Provider: React.FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return (
    <Context.Provider value={{ state, dispatch }}>
      {children}
    </Context.Provider>
  );
};
