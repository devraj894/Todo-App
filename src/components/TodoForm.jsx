// src/components/TodoForm.jsx
import React, { useState } from 'react';
import { addTodo } from '../services/todoService';

const TodoForm = ({ onTodoAdded }) => {
    const [input, setInput] = useState('');
    const [error, setError] = useState('');

    const addTodoHandler = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const newTodo = await addTodo({
                title: input,  // Adjust to match the API's required fields
                completed: false
            });
            setInput('');
            alert('Todo added successfully!');
            if (onTodoAdded) {
                onTodoAdded(newTodo);  // Call the callback with the new todo
            }
        } catch (err) {
            console.error('Error adding todo:', err);
            setError('Failed to add todo');
        }
    };

    return (
        <form onSubmit={addTodoHandler} className="space-x-3 mt-12">
            <input
                type="text"
                className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                placeholder="Enter a Todo..."
                value={input}
                required={true}
                onChange={(e) => setInput(e.target.value)}
            />
            <button
                type="submit"
                className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
                Add Todo
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};

export default TodoForm;
