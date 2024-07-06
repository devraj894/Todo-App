import React, { useEffect, useState } from 'react';
import { getTodos, deleteTodo, updateTodo, toggleTodoStatus } from '../services/todoService';
import TodoForm from './TodoForm';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTodo, setEditingTodo] = useState(null);
  const [updatedText, setUpdatedText] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getTodos();
        console.log(data)
        setTodos(data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  if (loading) return <p>Loading...</p>;

  const handleAddTodo = (newTodo) => {
    setTodos([...todos, newTodo]);  // Add the new todo to the list
};

  const handleDelete = async (todoId) => {
    try {
      await deleteTodo(todoId);
      setTodos(todos.filter(todo => todo.id !== todoId));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleUpdate = async (todoId, updates) => {
    try {
      const updatedTodo = await updateTodo(todoId, updates);
      setTodos(todos.map((todo) => todo.id === todoId ? updatedTodo : todo));
      setEditingTodo(null);
      setUpdatedText("");
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleToggleStatus = async (todoId) => {
    try {
      await toggleTodoStatus(todoId);
      const updatedTodos = todos.map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      );
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error toggling todo status:', error);
    }
  };

  return (
    <>
      <TodoForm onTodoAdded={handleAddTodo}/>
      <div>Todos</div>
      <div className='p-7 bg-gray-500'>
        <ul className="list-none">
          {todos.length > 0 ? (
            todos.map((todo) => (
              <li
                className="mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded"
                key={todo.id}
              >
                {editingTodo === todo.id ? (
                  <input
                    type="text"
                    value={updatedText}
                    onChange={(e) => setUpdatedText(e.target.value)}
                    className="text-black"
                  />
                ) : (
                  <div className={`text-white ${todo.completed ? 'line-through' : ''}`}>
                    {todo.title}
                  </div>
                )}
                <div>
                  {editingTodo === todo.id ? (
                    <button
                      onClick={() => handleUpdate(todo.id, { title: updatedText })}
                      className="text-white bg-blue-500 border-0 py-1 px-4 focus:outline-none hover:bg-blue-600 rounded text-md"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingTodo(todo.id);
                        setUpdatedText(todo.title);
                      }}
                      className="text-white bg-yellow-500 border-0 py-1 px-4 focus:outline-none hover:bg-yellow-600 rounded text-md"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleToggleStatus(todo.id)}
                    className={`text-white border-0 py-1 px-4 focus:outline-none rounded text-md ${todo.completed ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 hover:bg-gray-600'}`}
                  >
                    {todo.completed ? 'Completed' : 'Pending'}
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p>No todos available</p>
          )}
        </ul>
      </div>
    </>
  );
};

export default TodoList;
