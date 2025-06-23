function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();

  if (taskText === "") return;

  const timestamp = new Date().toLocaleString();
  const li = createTaskElement(taskText, timestamp, false);
  document.getElementById('pendingTasks').appendChild(li);

  taskInput.value = '';
}

function createTaskElement(text, time, isCompleted) {
  const li = document.createElement('li');
  li.className = isCompleted ? 'bg-green-100 p-3 rounded relative' : 'bg-blue-100 p-3 rounded relative';

  const taskContent = document.createElement('span');
  taskContent.innerHTML = `<strong>${text}</strong><br><small>${isCompleted ? 'Completed: ' : 'Added: '}${time}</small>`;
  li.appendChild(taskContent);

  const buttonGroup = document.createElement('div');
  buttonGroup.className = 'task-buttons flex gap-2 mt-2 justify-end';

  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.className = 'bg-yellow-400 text-white px-2 py-1 rounded text-sm hover:bg-yellow-500';
  editBtn.onclick = () => editTask(li, taskContent, isCompleted);

  const delBtn = document.createElement('button');
  delBtn.textContent = 'Delete';
  delBtn.className = 'bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600';
  delBtn.onclick = () => li.remove();

  const toggleBtn = document.createElement('button');
  toggleBtn.textContent = isCompleted ? 'Undo' : 'Complete';
  toggleBtn.className = 'bg-green-500 text-white px-2 py-1 rounded text-sm hover:bg-green-600';
  toggleBtn.onclick = () => toggleTask(li, text, isCompleted);

  buttonGroup.appendChild(editBtn);
  buttonGroup.appendChild(delBtn);
  buttonGroup.appendChild(toggleBtn);

  li.appendChild(buttonGroup);
  return li;
}

function toggleTask(taskElement, taskText, currentlyCompleted) {
  taskElement.remove();
  const time = new Date().toLocaleString();
  const newElement = createTaskElement(taskText, time, !currentlyCompleted);

  if (currentlyCompleted) {
    document.getElementById('pendingTasks').appendChild(newElement);
  } else {
    document.getElementById('completedTasks').appendChild(newElement);
  }
}

function editTask(taskElement, contentElement, isCompleted) {
  const newText = prompt("Edit your task:", contentElement.innerText.split('\n')[0]);
  if (newText && newText.trim() !== "") {
    taskElement.remove();
    const time = new Date().toLocaleString();
    const updatedTask = createTaskElement(newText.trim(), time, isCompleted);

    if (isCompleted) {
      document.getElementById('completedTasks').appendChild(updatedTask);
    } else {
      document.getElementById('pendingTasks').appendChild(updatedTask);
    }
  }
}
