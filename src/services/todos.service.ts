import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://www.pre-onboarding-selection-task.shop/';

class TodoService {
  createTodo(todo: string) {
    console.log(todo);
    const headers ={
        ...authHeader(),
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
    }


    return axios.post(API_URL + "todos",{todo},{headers})
        .then(response => { 
            console.log(response);
            return response.data;
          });
      }
  

  getTodos() {
    return axios.get(API_URL + 'todos', { headers: authHeader() });
  }

  updateTodo(id: number, todo: string, isCompleted: boolean) {
    const headers ={
        ...authHeader(),
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
    }

    const body = {
        "todo": todo,
        "isCompleted": isCompleted
    }
    return axios.put(API_URL + `todos/${id}`, body, { headers: authHeader() });
  }

  deleteTodo(id:number) {
      
    return axios.delete(API_URL + `todos/${id}`, { headers: authHeader() });
  }
}

export default new TodoService();