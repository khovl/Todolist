//2. design data
// teen cong viec
// trang thai
const Todolist ="Todolist";
let data = [
    {
        task: 'Run 2km',
        is_complete: false
    },
    
];
//input data
//luu data
const saveData = (data)=>{
    localStorage.setItem(Todolist, JSON.stringify(data));
}
saveData(data);
//lấy data lên
const loadData = ()=> {
    let data;
    data =  JSON.parse(localStorage.getItem(Todolist));
    data = data?data:[];
    return data;
}
data = loadData();

//thêm item
const addTask=(new_task)=>{
    let data;
    data = loadData();
    data= [...data, new_task];
    saveData(data);
}

const formAddTask =document.forms.add_task;
formAddTask.addEventListener('submit',(e)=>{
    let new_task;
    const task = document.querySelector('#task');
    const value = task.value;   
    if(!value.trim()){
        alert('Please enter todoTask')
        return;
    }


    const index = task.getAttribute('index');
    if(index){   
        editTask(task.value, index);
        task.removeAttribute('index');
    }else{
        new_task={
            task:value,
            is_complete: false}
    addTask(new_task); 

    }; 
    renderTask();
    task.value='';
    e.preventDefault();

});

const createTaskItem = (task, is_complete, index)=>{
    return `
    <li class="task-item" is-complete=${is_complete} index=${index}>
                <span onclick="markTaskComplete(${index})" class="task-output">${task}</span>
                <div>
                    <button onclick="pushEditTask(${index})" class="btn-cn">
                        <img src="./img/pen.png" alt="sửa">
                    </button>
                    <button onclick="deleteTask(this, ${index})" class="btn-cn">
                        <img src="./img/close.png" alt="xóa">
                    </button>
                </div>
            </li>
    `
}

const markTaskComplete =(index)=>{
    let data;
    data = loadData();
    data[index].is_complete = data[index].is_complete == true?false:true;
    saveData(data);
    renderTask();
} 

const deleteTask = (element,index)=> {
    let data;
    data = loadData();
    let delete_confirm = confirm("Bạn chắc chắn muốn xóa công việc này chứ?")
    if(delete_confirm== false)
    {
        return false;
    }
    
    data.splice(index,1);
    saveData(data);
    element.closest('.task-item').remove()
}
const pushEditTask = (index)=>{
    let data;
    data = loadData();
    const btn = document.querySelector('#add_task button');
    const task = document.querySelector('#task');
    task.value = data[index].task;
    task.setAttribute('index',index);
    btn.innerText="Edit Task";

}
const editTask =(task, index)=>{
    let data;
    const btn = document.querySelector('#add_task button');
    data=loadData();
    data[index].task = task;
    btn.innerText="Add Task";
    saveData(data);
    
}
//render ra html
const renderTask=()=>{
    let data, ulTasksHtml, ulTasks, taskResult, count_complete;
    taskResult = document.querySelector('.task-result')
    ulTasks = document.querySelector('ul.tasks');
    data= loadData();
    count_complete = 0;
    
    ulTasksHtml = data.map((element, index)=>{
        if (element.is_complete == true)
        {
            count_complete++;
        }
        return createTaskItem(element.task,element.is_complete,index)
    });
    
    taskResult.textContent= `Bạn đã hoàn thành ${count_complete} công việc`;
    ulTasks.innerHTML = ulTasksHtml.join('')
}
document.addEventListener('keyup',(e)=>{
    const task = document.querySelector('#task');
    if(e.which == 27){
        task.value = "";
        task.removeAttribute('index')
        const btn = document.querySelector('#add_task button');
        btn.innerText="Add Task";

    }
    // console.log(e);
})
renderTask();   