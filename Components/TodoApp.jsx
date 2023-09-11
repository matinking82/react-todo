import React from 'react';
import '../global.css';

const getTodosFromCache = () => {
  let todos = localStorage.getItem('todos');
  if (todos) {
    return JSON.parse(todos);
  }
  return [];
};

const addATodoToCache = (content) => {
  let todo = {
    id: Date.now(),
    content,
    done: false,
  };
  let todos = getTodosFromCache();
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
};

const completeATodo = (id) => {
  let todos = getTodosFromCache();
  let updatedTodos = todos.map((todo) => {
    if (todo.id === id) {
      return {
        ...todo,
        done: !todo.done,
      };
    }
    return todo;
  });

  localStorage.setItem('todos', JSON.stringify(updatedTodos));
};

const deleteATodo = (id) => {
  let todos = getTodosFromCache();
  let updatedTodos = todos.filter((todo) => todo.id !== id);

  localStorage.setItem('todos', JSON.stringify(updatedTodos));
};

function TodoApp() {
  let [content, setContent] = React.useState('');
  let [todos, setTodos] = React.useState(getTodosFromCache());

  return (
    <div className="TodoApp">
      <div className="new-todo-form">
        <input
          value={content}
          type="text"
          placeholder="What needs to be done?"
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
        <button
          onClick={() => {
            addATodoToCache(content);
            setContent('');
            setTodos(getTodosFromCache());
          }}
        >
          Add Todo
        </button>
      </div>
      <div className="todos-list">
        {todos.map((todo) => {
          return (
            <div
              key={todo.id}
              className={`todo ${todo.done ? 'todo-done' : ''}`}
              onClick={() => {
                if (todo.done) {
                  deleteATodo(todo.id);
                  setTodos(getTodosFromCache);
                } else {
                  completeATodo(todo.id);
                }
                setTodos(getTodosFromCache());
              }}
            >
              <h3>{todo.content}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TodoApp;
