document.getElementById('changeColor').addEventListener('click', () => {
    const color = document.getElementById('colorChoice').value;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "changeBackgroundColor", color: color});
    });
});

document.getElementById('triggerNotification').addEventListener('click', () => {
    chrome.runtime.sendMessage({action: "triggerNotification"});
});

document.getElementById('applyFontSize').addEventListener('click', () => {
    chrome.storage.sync.get('fontSize', (data) => {
        const fontSize = data.fontSize;
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: "applyFontSize", fontSize: fontSize});
        });
    });
});

document.getElementById('toggleDarkTheme').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "toggleDarkTheme"});
    });
});

document.getElementById('addTodo').addEventListener('click', () => {
    const newTodo = document.getElementById('newTodo').value;
    if (newTodo) {
        const todoList = JSON.parse(localStorage.getItem('todoList') || '[]');
        todoList.push(newTodo);
        localStorage.setItem('todoList', JSON.stringify(todoList));
        document.getElementById('newTodo').value = ''; // Clear input
        displayTodos();
    }
});

function displayTodos(filter = 'All') {
    const todoList = JSON.parse(localStorage.getItem('todoList') || '[]');
    const todoItemsElement = document.getElementById('todoItems');
    todoItemsElement.innerHTML = ''; 
    todoList.forEach((todo, index) => {
        if (filter !== 'All' && todo.priority !== filter) return;
        const li = document.createElement('li');
        li.textContent = `${todo.text} - Priority: ${todo.priority}`;
    });
}

document.getElementById('addTodo').addEventListener('click', () => {
    const newTodoText = document.getElementById('newTodo').value;
    const newTodoPriority = document.getElementById('todoPriority').value;
    if (newTodoText) {
        const todoList = JSON.parse(localStorage.getItem('todoList') || '[]');
        todoList.push({ text: newTodoText, priority: newTodoPriority });
        localStorage.setItem('todoList', JSON.stringify(todoList));
        document.getElementById('newTodo').value = ''; // Clear input
        displayTodos();
    }
});

document.getElementById('filterPriority').addEventListener('change', () => {
    const filter = document.getElementById('filterPriority').value;
    displayTodos(filter);
});

document.getElementById('saveNote').addEventListener('click', () => {
    const noteContent = document.getElementById('quickNoteContent').value;
    chrome.storage.sync.set({'quickNote': noteContent}, () => {
        console.log('Note saved');
        // Optionally, clear the textarea or show a message to the user
    });
});

// Load the note when the popup is opened
document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get('quickNote', (data) => {
        document.getElementById('quickNoteContent').value = data.quickNote || '';
    });
    displayTodos(); // Existing call
});