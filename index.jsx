import React from 'react';
import ReactDOM from 'react-dom/client';
import TodoApp from './Components/TodoApp';

function App() {
  return <TodoApp />;
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(<App />);
