const addButton=document.getElementById("add-button")
const closeButton=document.getElementById("close-button")
const form=document.getElementById("form")
const titleInputElement=document.getElementById("title")
const dateInputElement=document.getElementById("date")
const descriptionAreaElement=document.getElementById("description")
const taskContainer=document.getElementById("tasks-container")
const submitButton=document.getElementById("submit")
const dialog=document.getElementById("dialog")
const cancelButton=document.getElementById("cancel")
const discardButton=document.getElementById("discard")
const moreButton=document.getElementById("more-button")
let taskList=[]
let currentTaskId="";
let i=6;
let moreNeed=true;
const checki=()=>{
    if(taskList.length+6<=i&&i!=6)
    {
        i=i-6;
    }
}
const checkMore=()=>{
    if(moreNeed){
        if(taskList.length>i)
    {
        if(moreButton.classList.contains("hidden"))
        {  
            moreButton.classList.toggle("hidden");
        }
    }
    else{
        if(!moreButton.classList.contains("hidden"))
        {  
            moreButton.classList.toggle("hidden");
        }
    }
    }
    else{
        if(!moreButton.classList.contains("hidden"))
        {  
            moreButton.classList.toggle("hidden");
        }
    }
    
}

const refreshContainer=()=>{
    let newtaskList=taskList.slice(0,i)
    taskContainer.innerHTML="";
    newtaskList.forEach((el)=>{
        taskContainer.innerHTML +=
        `
        <div class="task" id="${el.id}">
          <div class="crossdown ${!el.cross?"invisible":""}"></div>
          <div class="crossup ${!el.cross?"invisible":""}"></div>
          <p><strong>Title:</strong> ${el.title}</p>
          <p><strong>Date:</strong> ${el.date}</p>
          <p><strong>Description:</strong> ${el.text}</p>
          <div>
          <button onclick="editTask(this)" type="button" class="btn btntask">Edit</button>
          <button onclick="deleteTask(this)" type="button" class="btn btntask">Delete</button> 
          
        </div>
        `
    })
}
taskList= localStorage.getItem('item') ? JSON.parse(localStorage.getItem('item')) : [];
refreshContainer();
checkMore();

addButton.addEventListener("click",()=>{
    form.classList.toggle("hidden")
    moreNeed=false;
    checkMore();
})
closeButton.addEventListener("click",()=>{
    if(currentTaskId==="")
    {
      if(titleInputElement.value||dateInputElement.value||descriptionAreaElement.value)
      {dialog.showModal();}
      else
      {
        form.classList.toggle("hidden");
        moreNeed=true;
        checkMore();
      }
    }
    else{ 
     const dataArrIndex = taskList.findIndex(
        (item) => item.id === currentTaskId
      );
      if(taskList[dataArrIndex].title!==titleInputElement.value||
        taskList[dataArrIndex].date!==dateInputElement.value||
        taskList[dataArrIndex].text!==descriptionAreaElement.value)
    {
        dialog.showModal();
    }
     else{
        form.classList.toggle("hidden");
        submitButton.innerHTML="Add Task";
        currentTaskId="";
        clear();
        moreNeed=true;
        checkMore();
     } }
    
})
form.addEventListener("submit",(e)=>{
    e.preventDefault()
    form.classList.toggle("hidden")
    if(submitButton.innerHTML==="Add Task")
    {
    add();
    refreshContainer();
    clear();
    localStorage.setItem("item",JSON.stringify(taskList));
    checkMore();
    }
    else
    {
    updateTask();
    currentTaskId="";
    submitButton.innerHTML="Add Task";
    refreshContainer();
    clear();
    localStorage.setItem("item",JSON.stringify(taskList));
    }
    moreNeed=true;
    checkMore();
    
})
 const updateTask=()=>{

    const dataArrIndex = taskList.findIndex(
        (item) => item.id === currentTaskId
      );  
    taskList[dataArrIndex].title=titleInputElement.value;
    taskList[dataArrIndex].date=dateInputElement.value;
    taskList[dataArrIndex].text=descriptionAreaElement.value;
 }


 const add = ()=> {
    const titleValue=titleInputElement.value;
    const dateValue=dateInputElement.value;
    const textValue=descriptionAreaElement.value;
    const taskObject={
        id: Date.now().toString(),
        title:titleValue,
        date:dateValue,
        text:textValue,
        cross:false
    }
    taskList.push(taskObject);
}

const deleteTask=(buttonEl)=>{
    const dataArrIndex = taskList.findIndex(
        (item) => item.id === buttonEl.parentElement.parentElement.id
      );
    taskList.splice(dataArrIndex,1);
    refreshContainer();
    localStorage.setItem("item",JSON.stringify(taskList));
    checki();
    checkMore();

}
const editTask=(buttonEl)=>{
    moreNeed=false;
    checkMore();
    const dataArrIndex = taskList.findIndex(
        (item) => item.id === buttonEl.parentElement.parentElement.id
      );
      currentTaskId=taskList[dataArrIndex].id;
      titleInputElement.value=taskList[dataArrIndex].title;
      dateInputElement.value=taskList[dataArrIndex].date;
      descriptionAreaElement.value=taskList[dataArrIndex].text;
      form.classList.toggle("hidden");
      submitButton.innerHTML="Update";
      
}
const clear=()=>{
    titleInputElement.value="";
    dateInputElement.value="";
    descriptionAreaElement.value="";
}
cancelButton.addEventListener("click",()=>{
    dialog.close();
})
discardButton.addEventListener("click",()=>{
    form.classList.toggle("hidden");
    clear();
    moreNeed=true;
    checkMore();
})
moreButton.addEventListener("click",()=>{
    if(taskList.length>i)
    {
        i=i+6;
        refreshContainer();
        checkMore();
    }
})
taskContainer.addEventListener("dblclick",(e)=>{
    if(e.target.parentElement.id)
    {
        const dataArrIndex = taskList.findIndex(
            (item) => item.id === e.target.parentElement.id
          );
          taskList[dataArrIndex].cross=(!taskList[dataArrIndex].cross)
          localStorage.setItem("item",JSON.stringify(taskList));
       
        e.target.parentElement.children[0].classList.toggle("invisible")
        e.target.parentElement.children[1].classList.toggle("invisible")
    }


})