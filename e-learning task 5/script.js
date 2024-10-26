// Change Background Color
document.getElementById('bgColor').addEventListener('change', function() {
    document.body.style.backgroundColor = this.value;
});

// Change Font Size

let currentFontSize = 16;
const fontSizeDisplay = document.getElementById('currentSize');

// Decrease font size button
document.getElementById('decreaseFont').addEventListener('click', function() {
    if (currentFontSize > 12) {
        currentFontSize -= 2;
        updateFontSize();
    }
});

// Increase font size button
document.getElementById('increaseFont').addEventListener('click', function() {
    if (currentFontSize < 300) {
        currentFontSize += 2;
        updateFontSize();
    }
});

// Update font size function
function updateFontSize() {
    document.body.style.fontSize = currentFontSize + 'px';
    fontSizeDisplay.textContent = currentFontSize;
}

// Toggle Dark Mode
document.getElementById('toggleDarkMode').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
});

// Change Font Style
document.getElementById('fontStyle').addEventListener('change', function() {
    document.body.style.fontFamily = this.value;
});
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText === '') return;

    const li = document.createElement('li');
    li.classList.add('task');
    
    
    const taskSpan = document.createElement('span');
    taskSpan.classList.add('task-text');
    taskSpan.textContent = taskText;
    li.appendChild(taskSpan);

    
    const buttonGroup = document.createElement('div');
    buttonGroup.classList.add('button-group');


    const editBtn = document.createElement('button');
    editBtn.textContent = '✎';
    editBtn.classList.add('edit-btn');
    editBtn.onclick = function(e) {
        e.stopPropagation();
        editTask(li);
    };
    buttonGroup.appendChild(editBtn);

    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '✖';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.onclick = function(e) {
        e.stopPropagation();
        deleteTask(li);
    };
    buttonGroup.appendChild(deleteBtn);

    li.appendChild(buttonGroup);

    taskSpan.onclick = function(e) {
        e.stopPropagation();
        li.classList.toggle('completed');
    };

    document.getElementById('taskList').appendChild(li);
    taskInput.value = '';
}

// Delete Task Function
function deleteTask(element) {
    element.remove();
}

// Edit Task Function
function editTask(element) {
    const taskSpan = element.querySelector('.task-text');
    const currentText = taskSpan.textContent;
    const buttonGroup = element.querySelector('.button-group');
    
   
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;
    
    element.classList.add('edit-mode');
    
    input.onblur = function() {
        finishEditing(element, input, taskSpan, buttonGroup);
    };

    input.onkeypress = function(e) {
        if (e.key === 'Enter') {
            input.blur();
        }
    };
    taskSpan.style.display = 'none';
    element.insertBefore(input, buttonGroup);
    input.focus();
}

function finishEditing(element, input, taskSpan, buttonGroup) {
    const newText = input.value.trim();
    
    if (newText === '') {
        alert('Task cannot be empty!');
        input.focus();
        return;
    }
    
    taskSpan.textContent = newText;
    taskSpan.style.display = '';
    element.classList.remove('edit-mode');
    input.remove();
}

document.getElementById('taskInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});
