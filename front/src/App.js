import React, { useContext, useReducer, useEffect, useRef, useState, createContext } from 'react';

const HOST_API = "http://localhost:8080/api";
const initialState = {
  todo: { list: [], item: {} }
};
const Store = createContext(initialState)

// const nameIsvalid = (name) => {
//   let nameToValidate = name || "";
//   if (nameToValidate.test(RegExp/[0-9A-Za-z*_()]{1-50}/)) {
//     return true;
//   } 
//   console.log(nameToValidate.match(/[A-Za-z*_()]{1-50}/));
//   return false;
// }

const Form = () => {
  const formRefTodo = useRef(null);
  const { dispatch, state: { todo } } = useContext(Store);
  const item = todo.item;
  const [state, setState] = useState(item);

  const onAdd = (event) => {
    event.preventDefault();
    const request = { 
      name: state.name,
      tasks: []
    };
    // if(!nameIsvalid(request.name)) {
    //   return; 
    // }
    //request.name = request.name.trim();
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
        formRefTodo.current.reset();
      });
  }

  // const onEdit = (event) => {
  //   event.preventDefault();

  //   const request = {
  //     name: state.name,
  //     id: item.id,
  //     completed: item.completed,
  //     idTodo: item.idTodo
  //   };

  //   fetch(HOST_API + "/todo/task", {
  //       method: "PUT",
  //       body: JSON.stringify(request),
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     })
  //     .then(response => response.json())
  //     .then((task) => {
  //       dispatch({
  //         type: "update-item",
  //         item: task
  //       });
  //       setState({
  //         name: ""
  //       });
  //       formRefTodo.current.reset();
  //     });
  // }

  {/* <form className="d-flex">
          <input className="form-control me-2" type="text" aria-label="Search"/>
          <button className="btn btn-outline-success" type="submit">Nueva Lista de Tareas</button>
        </form> */}

  return <form ref={formRefTodo}>
    <form className="d-flex">
    <input
      className="form-control me-2"
      type="text"
      name="name"
      className="form-control"
      placeholder="Crear lista"
      // defaultValue={item.name}
      onChange={(event) => {
        setState({ ...state, name: event.target.value })
      }}></input>
    <button className="btn btn-success ms-2" onClick={onAdd}>Crear</button>
      </form>
    {/* {item.id && <button onClick={onEdit}>Actualizar</button>} */}
  </form>
}

const List = () => {
  const formRef = useRef(null);
  const { dispatch, state: { todo } } = useContext(Store);
  let itemT = todo.item;
  console.log(itemT);
  const [stateT, setStateT] = useState(itemT);
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

  const onAddTask = (event) => {
    event.preventDefault();
    const request = {
      name: stateT.name,
      completed: false,
      idTodo: stateT.id
    };
    console.log(request);
    // if(!nameIsvalid(request.name)) {
    //   return; 
    // }
    //request.name = request.name.trim();
    fetch(HOST_API + "/todo/task", {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then((task) => {
        dispatch({ type: "add-task", item: task });
        setStateT({ name: "" });
        formRef.current.reset();
      });
  }
  
  const onEditTask = (event) => {
    event.preventDefault();

    const request = {
      name: stateT.name,
      id: itemT.id,
      completed: itemT.completed,
      idTodo: itemT.idTodo
    };
    console.log(request);

    fetch(HOST_API + "/todo/task", {
        method: "PUT",
        body: JSON.stringify(request),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then((task) => {
        dispatch({
          type: "update-item",
          item: task
        });
        setStateT({
          name: ""
        });
        formRef.current.reset();
        // itemT = {};
      });
      
  }

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

  // const onEdit = (todo) => {
  //   dispatch({ type: "edit-item", item: todo })
  // };

  const onEditT = (task) => {
    //console.log(task);
    //itemT=task;
    // setStateT({ ...stateT, name: event.target.value })
    //console.log(itemT);
    dispatch({ type: "edit-item", item: task })
  };

  const onChange = (event, task) => {
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

        {/* <form className="d-flex">
          <input className="form-control me-2" type="text" aria-label="Search"/>
          <button className="btn btn-outline-success" type="submit">Nueva Lista de Tareas</button>
        </form> */}
      <form className="d-flex mb-3 mt-5">
      <h2 >{todo.name}</h2> 
      <td><button onClick={() => onDeleteToDo(todo)} className="btn btn-danger ms-2">Eliminar</button></td>
      </form>
      <form ref={formRef}>
        <form className="d-flex mb-2">
        <input
          className="form-control me-2"
          type="text"
          name="name_task"
          placeholder="¿Qué piensas hacer hoy?"
          defaultValue={(itemT.idTodo===todo.id) ? itemT.name : ""}
          onChange={(event) => {
            setStateT({ ...stateT, name: event.target.value, id:todo.id })
          }}></input>
        {/* {itemT.id && <button onClick={onEditTask}>Actualizar</button>} */}
        {itemT.id && itemT.idTodo===todo.id && <button className="btn btn-success" onClick={onEditTask}>Actualizar</button>}
        {!itemT.id && <button className="btn btn-success" onClick={onAddTask}>Crear</button>}
        </form>
      </form>
      <table key={todo.id} className="table table-bordered">
          <thead>
            <tr className="text-center">
              <td>ID</td>
              <td>Descripción</td>
              <td>¿Completado?</td>
              <td colspan="2">Acción</td>
            </tr>
          </thead>
          <tbody>
            {todo.tasks.map((task) => { 
              return <tr key={task.id} className="text-center">
                <td>{task.id}</td>
                <td>{task.name}</td>
                <td><input type="checkbox" defaultChecked={task.completed} onChange={(event) => onChange(event, task)}></input></td>
                {/* <td><button onClick={() => onDeleteTask(task.id)}>Eliminar</button></td> */}
                {!task.completed && <td><button onClick={() => onEditT(task)} className="btn btn-primary">Editar</button></td>}
                {task.id!==itemT.id && <td><button onClick={() => onDeleteTask(task.id)} className="btn btn-danger">Eliminar</button></td>}
                {/* {(task.completed) ? task.nombre.setAttribute("text-decoration","line-through") : task.nombre.setAttribute("text-decoration","line-through")} */}
              </tr>
            })}
          </tbody>
        </table>
        <hr/>
      </div>
    })}
  </div>
}


function reducer(state, action) {
  switch (action.type) {
    case 'update-item':
      const todoUpItem = state.todo;
      const listUpdateEdit = todoUpItem.list.map((item) => {
        const tasks = item.tasks.map(el=>{
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
      // console.log(todoUpEdit.item);

      // console.log(action.item);
      return { ...state, todo: todoUpEdit }
    case 'add-item':
      const todoUp = state.todo.list;
      todoUp.push(action.item);
      return { ...state, todo: {list: todoUp, item: {}} }
    case 'add-task':
      const todoList = state.todo.list;
      const todoUpdated = todoList.filter(todo => {
        if(todo.id===action.item.idTodo){
          todo.tasks.push(action.item);
          return todo;
        }
        return todo;
        });
      return { ...state, todo: {list: todoUpdated, item: {}} }
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
    <div className = "container">
    <h1 className="text-center my-5">To-Do List | Juan Camilo Cardona Calderón</h1> 
      <div className="row">
        <div className="col-md-12">
          <Form />    
          <List />
        </div>
      </div>
    </div>
  </StoreProvider>
}

export default App;


/*
<Fragment>
  <div className="container">
    <h1>Aplicación agregar estudiante</h1>
    <div className="row">
      <div className="col-md-12">
        <Formularios />
      </div>
    </div>
  </div>
      
</Fragment>
*/