// src/services/todoService.js
import apiClient from './apiClient';

// Get all todos
export const getTodos = async () => {
    try {
        const response = await apiClient.get('/todos');
        // console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error fetching todos:', error);
        throw error;
    }
};

// Get a single todo by ID
export const getTodoById = async (todoId) => {
    try {
        const response = await apiClient.get(`/todos/${todoId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching todo:', error);
        throw error;
    }
};

// Add a new todo
export const addTodo = async (todo) => {
    try {
        const response = await apiClient.post('/todos', {
            title: todo.title, // Ensure this matches the API's expected format
            completed: todo.completed
        });
        return response.data;
    } catch (error) {
        console.error('Error adding todo:', error);
        throw error;
    }
};


// Delete a todo by ID
export const deleteTodo = async (todoId) => {
    try {
        await apiClient.delete(`/todos/${todoId}`);
    } catch (error) {
        console.error('Error deleting todo:', error);
        throw error;
    }
};

// Update a todo by ID
    export const updateTodo = async (todoId, updates) => {
        try {
            const response = await apiClient.patch(`/todos/${todoId}`, updates); // Changed to PATCH if partial updates are supported
            return response.data;
        } catch (error) {
            console.error('Error updating todo:', error);
            throw error;
        }
    };
    

// Toggle todo status by ID (simulated)
export const toggleTodoStatus = async (todoId) => {
    try {
        // Fetch the current todo
        const todo = await getTodoById(todoId);
        // Simulate toggling the 'completed' status
        const updatedTodo = { ...todo, completed: !todo.completed };
        // Update the todo
        const response = await updateTodo(todoId, updatedTodo);
        return response;
    } catch (error) {
        console.error('Error toggling todo status:', error);
        throw error;
    }
};
