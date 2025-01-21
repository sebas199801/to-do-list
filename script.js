 class Task {

    constructor( name) {
        this.id = this.generateUniqueId();
        this.name = name;
        this.isCompleted = false;
    }

    toggleCompletion() {
        this.isCompleted =!this.isCompleted;
    }

    generateUniqueId() {
        return Math.floor(Math.random() * 1000000);
    }

}

class TaskList { 

    constructor() {
        this.tasks = [];
    }

    addTask() {
        const task = this.createTask();
        document.getElementById('taskInput').value = '';
        this.tasks.push(task);
        this.displayTasks(this.tasks);
    }
    
    deleteTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id!== taskId);
        this.displayTasks(this.tasks);
    }

    createTask(){
        const name = document.getElementById('taskInput').value;
        if(name === '') return;
        return new Task(name);
    }

    displayTasks(tasks) {
        const tasksContainer = document.getElementById('taskList');
        tasksContainer.innerHTML = '';
        tasks.forEach(task =>  {
            tasksContainer.innerHTML += `
              <li class="list_item">
                    <input type="checkbox" name="Checkbox" id="taskCheckbox" class="taskCheckbox" ${task.isCompleted? 'checked' : ''} onchange="taskList.toggleCompletion(${task.id})">
                    <p type="text" id="taskInput" class="task_info">${task.name}</p>
                    <button class="input_button" onclick="taskList.deleteTask(${task.id})">x</button>
                </li>`
        }
        )
    }

    toggleCompletion(taskId){
        const task = this.tasks.find(task => task.id === taskId);
        if(task) task.toggleCompletion();
        console.log(this.tasks);
    }

    clearCompletedTasks(){
        this.tasks = this.tasks.filter(task =>!task.isCompleted);
        this.displayTasks(this.tasks);
    }

    clearAllTasks(){
        this.tasks = [];
        this.displayTasks(this.tasks);
    }

    filterTaskList(filter){
        if(filter === 'all') {
            const tasks = this.tasks;
            this.displayTasks(tasks);
        }
        else if(filter === 'completed') {
            const tasks = this.tasks.filter(task => task.isCompleted);
            this.displayTasks(tasks);
        }
        else if(filter === 'incompleted') {
            const tasks = this.tasks.filter(task =>!task.isCompleted);
            this.displayTasks(tasks);
        }
    }
}

const taskList = new TaskList();
