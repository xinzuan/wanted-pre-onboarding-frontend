import React, { FormEvent, useRef, useContext } from "react";
import { Context as TodoContext } from "../context/TodoContext";


import createTodo from "../services/todos.service"

const AddTodo: React.FC = () => {
  const { dispatch } = useContext(TodoContext);

  const textInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    const inputValue = textInputRef.current!.value;

    if (inputValue.trim() === "") {
      return;
    }

    // dispatch(
    //   addTodo({
    //     id: new Date().getTime().toString(),
    //     title: textInputRef.current!.value,
    //     active: true
    //   })
    // );

    textInputRef.current!.value = "";
  };

  return (
    <form>
      <input type="text" ref={textInputRef} />
      <button type="button" onClick={submitHandler}>
        Add
      </button>
    </form>
  );
};

export default AddTodo;
