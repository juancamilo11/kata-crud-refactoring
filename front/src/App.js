import React, { useContext, useReducer, useEffect, useRef, useState, createContext } from 'react';

const HOST_API = "http://localhost:8080/api";
const initialState = {
  todo: { list: [], item: {} }
};
const Store = createContext(initialState)


const Form = () => {
  const formRef = useRef(null);
  const { dispatch, state: { todo } } = useContext(Store);
  const item = todo.item;
  const [state, setState] = useState(item);

  const onAdd = (event) => {
    event.preventDefault();

    const request = {
      name: item.name,
      id: null,
      completed: false
    };


    fetch(HOST_API + "/todo", {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then((todo) => {
        dispatch({ type: "add-item", item: todo });
        setState({ name: "" });
        formRef.current.reset();
      });
  }

  const onEdit = (event) => {
    event.preventDefault();

    const request = {
      name: state.name,      
      id: item.id,
      completed: item.completed,
      idTodo: item.idTodo
    };
    console.log(request);


    fetch(HOST_API + "/todo/task", {
      method: "PUT",
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    // .then(response => response.json())
    //   .then((task) => {
    //     dispatch({ type: "update-item", item: task });
    //   });
      .then(response => response.json())
      .then((task) => {
        dispatch({ type: "update-item", item: task });
        setState({ name: "" });
        formRef.current.reset();
      });
  }

  return <form ref={formRef}>
    <input
      type="text"
      name="name"
      placeholder="¿Qué piensas hacer hoy?"
      defaultValue={item.name}
      onChange={(event) => {
        setState({ ...state, name: event.target.value })
      }}  ></input>
    {item.id && <button onClick={onEdit}>Actualizar</button>}
    {!item.id && <button onClick={onAdd}>Crear</button>}
  </form>
}


const List = () => {
  const { dispatch, state: { todo } } = useContext(Store);
  const currentList = todo.list;

  useEffect(() => {
    fetch(HOST_API + "/todos")
      .then(response => response.json())
      .then((list) => {
        dispatch({ type: "update-list", list })
      })
  }, [dispatch]);


  const onDeleteTask = (id) => { 
    fetch(HOST_API + "/todo/task/" + id, {
      method: "DELETE"
    }).then((list) => {
      dispatch({ type: "delete-task", id })
    })
  };
  
  const onDeleteToDo = (todo) => { 
    const id=todo.id;
    const id_list = todo.tasks.map((el) =>{
      return el.id;
    });
    fetch(HOST_API + "/todo/" + id, {
      method: "DELETE",
      body: JSON.stringify(id_list),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((list) => {
      dispatch({ type: "delete-todo", id })
    })
  };

  const onEdit = (todo) => {
    dispatch({ type: "edit-item", item: todo })
  };

  const onChange = (event, task) => {
    console.log(task);
    const request = {
      name: task.name,
      id: task.id,
      completed: event.target.checked,
      idTodo: task.idTodo
    };
    fetch(HOST_API + "/todo/task", {
      method: "PUT",
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then((task) => {
        dispatch({ type: "update-item", item: task });
      });
  };

  const decorationDone = {
    textDecoration: 'line-through'
  };

  return <div>

    {currentList.map((todo) => {
      
      return <div>
      <h2>{todo.name}</h2> 
      <td><button onClick={() => onDeleteToDo(todo)}>Eliminar</button></td>
      <table key={todo.id}>
          <thead>
            <tr>
              <td>ID</td>
              <td>Descripción</td>
              <td>¿Completado?</td>
            </tr>
          </thead>
          <tbody>
            {todo.tasks.map((task) => { 
              return <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.name}</td>
                <td><input type="checkbox" defaultChecked={task.completed} onChange={(event) => onChange(event, task)}></input></td>
                <td><button onClick={() => onDeleteTask(task.id)}>Eliminar</button></td>
                <td><button onClick={() => onEdit(task)}>Editar</button></td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    })}
  </div>
}


function reducer(state, action) {
  switch (action.type) {
    case 'update-item':
      const todoUpItem = state.todo;
      const listUpdateEdit = todoUpItem.list.map((item) => {
        let tasks = item.tasks.map(el=>{
          if (el.id === action.item.id) {
          return action.item;
        }
        return el;
        });
        item.tasks=tasks;
        return item;
      });
      todoUpItem.list = listUpdateEdit;
      todoUpItem.item = {};
      return { ...state, todo: todoUpItem }
    case 'delete-todo':
      const todoUpDelete = state.todo;
      const listUpdate = todoUpDelete.list.filter((item) => {
        return item.id !== action.id;
      });
      todoUpDelete.list = listUpdate;
      return { ...state, todo: todoUpDelete }
    case 'delete-task':
      const todoUpDeleteT = state.todo;
      const listUpdateT = todoUpDeleteT.list.map((item) => {
        let tasks = item.tasks.filter(el => {
          return el.id !== action.id;
        });
        item.tasks=tasks;
        return item;
      });
      todoUpDeleteT.list = listUpdateT;
      return { ...state, todo: todoUpDeleteT }
    case 'update-list':
      const todoUpList = state.todo;
      todoUpList.list = action.list;
      return { ...state, todo: todoUpList }
    case 'edit-item':
      const todoUpEdit = state.todo;
      todoUpEdit.item = action.item;
      return { ...state, todo: todoUpEdit }
    case 'add-item':
      const todoUp = state.todo.list;
      todoUp.push(action.item);
      return { ...state, todo: {list: todoUp, item: {}} }
    default:
      return state;
  }
}

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Store.Provider value={{ state, dispatch }}>
    {children}
  </Store.Provider>

}

function App() {
  return <StoreProvider>
    <h3>To-Do List</h3>
    <Form />
    <List />
  </StoreProvider>
}

export default App;
