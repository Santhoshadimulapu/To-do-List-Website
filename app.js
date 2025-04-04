let tasks =[];
document.addEventListener('DOMContentLoaded',()=>{
    const storedTasks = JSON.parse(localStorage.getItem('tasks'))
    if(storedTasks){
        storedTasks.forEach((task)=>tasks.push(task))
        updateTasksList();
        updateStats();
    }
})
const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
const addTask=()=>{
    const taskInput =document.getElementById('taskInput')
    const text =taskInput.value.trim()
    if(text){
        tasks.push({text: text, completed: false});
        taskInput.value="";
        updateTasksList();
        updateStats();
        saveTasks();
    }
};
const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
    updateStats();
    saveTasks();  
};
const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasksList();
    updateStats();
    saveTasks();
};
const editTask = (index) => {
    const taskInput =document.getElementById('taskInput')
    taskInput.value=tasks[index].text;
    tasks.splice(index,1)
    updateTasksList();
    updateStats();
    saveTasks();
};
const updateStats = ()=>{
    const completeTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progress = totalTasks > 0 ? (completeTasks / totalTasks) * 100 : 0;
    const progressBar = document.getElementById('progress');
    progressBar.style.width = `${progress}%`;
    const numbersElement = document.getElementById('numbers');
    numbersElement.textContent = `${completeTasks} / ${totalTasks}`
}
const updateTasksList = ()=>{
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
        <div class="taskitem">
            <div class="task ${task.completed ? 'completed' : ''}">
                <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} onclick="toggleTaskComplete(${index})"/>
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <img src="./img/edit.png" onclick="editTask(${index})"/>
                <img src="./img/bin.png" onclick="deleteTask(${index})"/>
            </div>
        </div>`;
        taskList.appendChild(listItem);
    });
}   
document.getElementById('newTask').addEventListener('click',function(e){
    e.preventDefault();
    addTask();
})