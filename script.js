document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addButton = document.getElementById('add-button');
    const todoList = document.getElementById('todo-list');
    
    // Load todos from localStorage
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    
    // Render existing todos
    renderTodos();
    
    // Add todo when clicking the add button
    addButton.addEventListener('click', addTodo);
    
    // Add todo when pressing Enter in the input field
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });
    
    function addTodo() {
        const todoText = todoInput.value.trim();
        
        if (todoText) {
            const todo = {
                id: Date.now(),
                text: todoText,
                completed: false
            };
            
            todos.push(todo);
            saveTodos();
            renderTodos();
            todoInput.value = '';
        }
    }
    
    function renderTodos() {
        todoList.innerHTML = '';
        
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = todo.completed;
            checkbox.addEventListener('change', () => toggleTodo(todo.id));
            
            const text = document.createElement('span');
            text.className = 'text';
            text.textContent = todo.text;
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = '×';
            deleteBtn.addEventListener('click', () => deleteTodo(todo.id));
            
            li.appendChild(checkbox);
            li.appendChild(text);
            li.appendChild(deleteBtn);
            todoList.appendChild(li);
        });
    }
    
    function toggleTodo(id) {
        todos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
        
        saveTodos();
        renderTodos();
    }
    
    function deleteTodo(id) {
        todos = todos.filter(todo => todo.id !== id);
        saveTodos();
        renderTodos();
    }
    
    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }
});