import React, { FC, useContext, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./home.css";
import { Context as TodoContext } from "../context/TodoContext";
import { EditableTodo } from "../interface";
import TodoService from "../services/todos.service";

type SomeComponentProps = RouteComponentProps;



const Home: FC<SomeComponentProps> = ({ history }) => {
  const logout = () => {
    localStorage.clear();
    history.push("/signin");
  };

  const { dispatch } = useContext(TodoContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [editableTodo, setEditableTodo] = useState<EditableTodo | null>(null);

  useEffect(() => {
    getTodos();
  }, []);

  const {
    state: { todos },
  } = useContext(TodoContext);

  const getTodos = () => {
    TodoService.getTodos()
      .then((res) => {
        dispatch({ type: "GET" });
        // Assuming the response data is an array of todos
        res.data.forEach((todo: any) => {
          dispatch({ type: "ADD", payload: todo });
        });
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  const create = (data: any) => {
    TodoService.createTodo(data.todo)
      .then((res) => {
        dispatch({
          type: "ADD",
          payload: {
            id: res.id,
            todo: res.todo,
            isCompleted: res.isCompleted,
            userId: res.userId,
          },
        });
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  const deleteItem = (id: number) => {
    TodoService.deleteTodo(id)
      .then((res) => {
   
        dispatch({
          type: "DELETE",
          payload: id,
        });
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  const toggleTodoStatus = (item: any) => {
    dispatch({ type: 'TOGGLE_STATUS', payload: item.id });
  };

  const startEditing = (todo: any) => {
    setEditableTodo({
      id: todo.id,
      todo: todo.todo,
      isCompleted: todo.isCompleted,
      isEditing: true,
    });
  };

  const updateTodo = (data: any) => {
    TodoService.updateTodo(data.id, data.todo,data.isCompleted)
      .then((res) => {
          console.log(res);
        dispatch({
          type: "UPDATE",
          payload: {
            id: data.id,
            todo: res.data.todo,
            isCompleted: res.data.isCompleted,
            userId: data.userId,
          },
        });
        setEditableTodo(null);
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  const cancelEditing = () => {
    setEditableTodo(null);
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div>
            <h3 className="m-3">Home</h3>
          </div>
          <div>
            <button type="submit" className="buttons" onClick={logout}>
              Logout
            </button>
          </div>
        </div>

        <form autoComplete="off" onSubmit={handleSubmit(create)} id="add" >
          <div className="form-group mt-4">
            <input
              type="text"
              data-testid="new-todo-input"
              className="form-control"
              placeholder="Enter todo name"
          
              {...register("todo", { required: "Todo name is required!" })}
            />
            {errors.todo && (
              <p className="text-danger mt-2" style={{ fontSize: 14 }}>
                Todo name is required!
              </p>
            )}
          </div>

          <div className="text-center mt-4">
            <button data-testid="new-todo-add-button" className="btn btn-primary" type="submit">
            추가 (Add) 
            </button>
          </div>
        </form>

        {todos.length > 0 ? (
          <ul className="list-group mt-4">
            {todos.map((item) => (
              <li key={item.id} className="list-group-item">
                {editableTodo && editableTodo.id === item.id && editableTodo.isEditing ? (
                  <form onSubmit={handleSubmit(updateTodo)} id="edit" >
                  <div className="form-group">
                    <div className="row align-items-center">
                      <div className="col-auto">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={item.isCompleted}
                          onChange={() => toggleTodoStatus(item)}
                        />
                      </div>
                      <div className="col">
                        <input
                          type="text"
                          className="form-control"
                          defaultValue={item.todo}
                          data-testid="modify-input"
                   
                          {...register("editTodo")}
                        />
                        {errors.editTodo && (
                          <p className="text-danger mt-2" style={{ fontSize: 14 }}>
                            Todo name is required!
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                
                  <div className="btn-group" role="group" aria-label="Actions">
                    <button type="submit" data-testid="submit-button" className="btn btn-success">
                      제출 (Save)
                    </button>
                    <button type="button" data-testid="cancel-button" className="btn btn-secondary" onClick={cancelEditing}>
                      취소 (Cancel)
                    </button>
                  </div>
                </form>
                ) : (
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={item.isCompleted}
                        onChange={() => toggleTodoStatus(item)}
                      />
                      <label className="form-check-label">{item.todo}</label>
                    </div>
                    <div>
                      <button data-testid="modify-button" className="btn btn-primary mx-2" onClick={() => startEditing(item)}>
                      수정 (Edit)
                      </button>
                      <button data-testid="delete-button" className="btn btn-danger" onClick={() => deleteItem(item.id)}>
                      삭제 (Delete)
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <h2>Great! There are no todos!</h2>
        )}
      </div>
    </>
  );
};

export default Home;
