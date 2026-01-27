/* Hamburger Menu */
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});


const activeTaskContainer = document.querySelector(".active-task");
let tasksArr = []    // new tasks Array


// custom dropdown 
let drop = document.querySelectorAll(".dropdown");

drop.forEach(function (select) {
  let selectAnopt = select.querySelector(".selectAnOption");
  let optionContainer = select.querySelector(".dropdown-options");
  let optionItems = optionContainer.querySelectorAll(".option");


  // toggle if open -> close, close -> open
  selectAnopt.addEventListener("click", () => {
    if (optionContainer.style.display === "block") {  // open 
      optionContainer.style.display = "none";  // close
    } else {
      optionContainer.style.display = "block";  // open
    }
  });

  // hides dropdown and selects selected item for display
  optionItems.forEach((opt) => {
    opt.addEventListener("click", () => {

      let arrow = selectAnopt.querySelector("span").outerHTML  // arrow icon
  
      selectAnopt.innerHTML = opt.textContent +  arrow 
      optionContainer.style.display = "none";

      clearError(selectAnopt)  // error-box call(form validation)
    });
  });

  // close
  window.addEventListener("click", (e) => {
    if (!select.contains(e.target)) {
      optionContainer.style.display = "none";
    }
  });
});


/* Form Validation */

const form = document.getElementById("taskform");

// input fields
const taskName = document.getElementById("taskname");
const assigneeName = document.getElementById("assigneename");
const email = document.getElementById("email");
const date = document.getElementById("dob");
const time = document.getElementById("time");
const prioritySelect = document.querySelector(".selectAnOption");
const hoursInput = document.getElementById("hours");
const url = document.getElementById("project-url");
const textArea = document.getElementById("descrip");
const progress = document.getElementById("progress");
const percent = document.querySelector(".progress-value");

// checkbox & radio
const taskCheckbox = document.querySelectorAll(
  '.task-type input[type="checkbox"]');
const statusRadio = document.querySelectorAll('input[name="status"]');

form.addEventListener("submit", (e) => {
  e.preventDefault();

if(validateInputs()){
    addTask()      // tasks adding  function
    showToast()   // successful - Notification
    form.reset()  // resets after validates
}
});

// validation function 
function validateInputs() {

  // validation conditions
// taskName 
  if (taskName.value.trim() === "") {
    showError(taskName, "Task Name is required");
    goToError(taskName)
    return false;
  }
  else{
    clearError(taskName)
  }

// Assigneee name
  if (assigneeName.value.trim() === "") {
    showError(assigneeName, "Assignee Name is required");
    goToError(assigneeName)
    return false;
  }
  else if(!AssigneeNameChar(assigneeName.value.trim())){
    showError(assigneeName,"Name does not contain special characters")
    goToError(assigneeName)
    return false
  }
  else if(!AssigneeNameNum(assigneeName.value.trim())){
    showError(assigneeName,"Name does not include numbers")
    goToError(assigneeName)
    return false
  }
  else{
    clearError(assigneeName)
  }

// email
  if (email.value.trim() === "") {
    showError(email, "Email is required");
    goToError(email)
    return false;
  }
  else if(!EmailValidation(email.value.trim())){
    showError(email,"Enter valid Email")
    goToError(email)
    return false
  }
  else{
    clearError(email)
  }

// date
    if (date.value === "") {
    showError(date, "Due date is required")
    goToError(date)
    return false
  }
  else{
    clearError(date)
  }

// time
  if (time.value === "") {
    showError(time, "Due time is required");
    goToError(time)
    return false;
  }
    else{
    clearError(time)
  }

// select - priority
  if (prioritySelect.textContent.includes("Select an option")) {
    showError(prioritySelect, "Select priority level");
    goToError(prioritySelect)
    return false;
  }
  else{
    clearError(prioritySelect)
  }

// hour
  if (hoursInput.value === "" ) {
    showError(hoursInput, "Enter hours");
    goToError(hoursInput)
    return false;
  }
  else if(hoursInput.value <= 0){
    showError(hoursInput,"Enter hours 0 or above")
    goToError(hoursInput)
    return false
  }
  else if(hoursInput.value >100){
    showError(hoursInput,"Maximum hours reached(100 hrs max)")
    goToError(hoursInput)
    return false
  }
  else{
    clearError(hoursInput)
  }
  
// url 
  if (url.value.trim() === "") {
    showError(url, "Project URL is required");
    goToError(url)
    return false;
  }
  else if(!projecturl(url.value.trim())){
    showError(url,"Enter valid url")
    goToError(url)
    return false
  }
  else{
    clearError(url)
  }

// text area
  if (textArea.value.trim() === "") {
    showError(textArea, "Task description is required");
    goToError(textArea)
    return false;
  }
  else{
    clearError(textArea)
  }

// progress
  // if (progress.value == 0) {
  //   showError(progress, "Progress must be greater than 0");
  //   goToError(progress)
  //   return false;
  // }
  // else{
  //   clearError(progress)
  // }

  // (checkbox) Task type validation
  let taskChecked = false;
  taskCheckbox.forEach((clickBox) => {
    if (clickBox.checked) {
      taskChecked = true;
    }
  });

  if (!taskChecked) {
    showError(taskCheckbox[0], "select at least one task type");
    goToError(taskChecked)
    return false;
  }
  else{
    clearError(taskCheckbox[0])
  }

  // (radio) status validation
  let statusChecked = false;
  statusRadio.forEach((clickRadio) => {
    if (clickRadio.checked) {
      statusChecked = true;
    }
  });

  if (!statusChecked) {
    showError(statusRadio[0], "Select task status");
    goToError(statusChecked)
    return false;
  }
  else{
    clearError(statusRadio[0])
  }

// returns valid with  true or false
  return true
// console.log(valid) 
}

// error message function

function showError(input, message) {
  const parent = input.parentElement

  const errorBox = parent.querySelector(".error-box");
  const small = parent.querySelector(".error");

  small.innerText = message;  // displays error msg
  errorBox.style.visibility = "visible";   // beacuse by default, in css i gave hidden
}

// clear error messages

function clearError(input){
  const parent = input.parentElement
  const errorBox = parent.querySelector(".error-box");
  const small = parent.querySelector('.error')

  small.innerText = ""    // empties
  errorBox.style.visibility = "hidden"   // hides error 
}

// hides error msg when input focused and typing...
const allInputs = document.querySelectorAll("input,textarea");

allInputs.forEach((input) => {
  input.addEventListener('input', () => {
    const parent = input.closest("div")


    if(!parent) // stop code if closest div not found
      return

      const errorBox = parent.querySelector(".error-box")
      const small = parent.querySelector('.error')
      if(errorBox){
        errorBox.style.visibility = "hidden"  // hides box
      }
      if(small)
        small.innerText = ""  // clears input field
  })
})

// Assignee Name 
function AssigneeNameChar(name){
  const acceptwords = /^[a-zA-Z0-9\s]+$/
  return acceptwords.test(name)
}
function AssigneeNameNum(numberspresent){
  const notaccept = /^[^0-9]+$/;
  return notaccept.test(numberspresent)
}

// Email validation RegEx
function EmailValidation(mail){
  const emailregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailregex.test(mail)
}


// range input
progress.addEventListener("input", () => {
  percent.textContent = `${progress.value}%`;
});

// reset progress value
form.addEventListener("reset", () => {
  percent.textContent = "0%";

prioritySelect.innerHTML = `Select an option<span><img src="arrow down.png" alt="arrow down"></span>`

  // remove error Messages when reset
  const AllerrorBox = form.querySelectorAll(".error-box")
  AllerrorBox.forEach((msg) => {
    msg.style.visibility = "hidden"
  })
});

// project url
 function projecturl(prourl){
  const Urlformat = /^https:\/\/(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/.*)?$/
  return Urlformat.test(prourl)
 }


/*Toast notification appears*/
// success Toast
const showToast = () => {
  const successNotification = document.querySelector('.success-toast')
  successNotification.style.visibility = "visible"
    setTimeout(() => {
        successNotification.style.visibility = "hidden";
    }, 3000);
}

// delete Toast
const deleteToast = () => {
  const deleteNotification = document.querySelector('.delete-toast')
  deleteNotification.style.visibility = "visible"
  setTimeout(() => {
    deleteNotification.style.visibility = "hidden"
  },3000)
}

// Radio Input - status 
function selectedStatus(){
  for(let radio of statusRadio) {
    if(radio.checked) {
      return radio.value   
    }
  }
  return ""   // if no radio is selected, returns empty string.
}

function TaskTypes(){
  const taskCheckbox = document.querySelectorAll('.task-type input[type="checkbox"]')
  let types = []

  taskCheckbox.forEach((box) => {
    if(box.checked) {
      types.push(box.nextElementSibling.textContent)
    }
  }) 
  return types   // returns in array
}

function addTask(){

// date - day-month-year to month day,year 
  const oldDate = date.value
  const modernDate = new Date(oldDate).toLocaleDateString('en-US',{
    month: 'short',    // jan,feb...
    day: 'numeric',    // number ...
    year: 'numeric'   //  number ...
  })

// keeps the tasks if that are previouly added  
   tasksArr = JSON.parse(localStorage.getItem("tasks")) || [];   // if not found tasks return empty [] 

  //  task object for local storage
   const task = {
   id: Date.now(),   // for unique ID for each Task
   title : taskName.value.trim(),
   assignee: assigneeName.value.trim(),
   email: email.value.trim(),
   dueDate: modernDate,
   dueTime: time.value,
   priority: prioritySelect.textContent.trim(),
   hours: hoursInput.value,
   projectUrl: url.value.trim(),
   description : textArea.value.trim(),
   progress: progress.value,
   TaskTypes: TaskTypes(),
   status: selectedStatus()
  }

  tasksArr.push(task)   // tasksArr is initially 0 
  localStorage.setItem("tasks",JSON.stringify(tasksArr))

  displayTask(task)
}

function displayTask(task){

// select tag - priority
const priorityopt = task.priority || ""

let priorityClass = "low"
let priorityText = "LOW"

if(priorityopt.includes("High")){
  priorityClass = "high"
  priorityText = "HIGH"
}
else if(priorityopt.includes("Medium")){
  priorityClass = "medium"
  priorityText = "MEDIUM"
}

// radio input
let statusClass = "pending"
let statusText = task.status

if(task.status == "In Progress"){
  statusClass = "inpro"
}
else if(task.status === "Completed"){
  statusClass = "completed"
}


// create task cards
const newTasks = document.createElement("div")
newTasks.className = `content ${priorityClass}`

newTasks.dataset.id = task.id  // task crads to local storage id connect 

newTasks.innerHTML = `<div>
       <h3>${task.title}<div class="edit-delete"><button class="edit" aria-label="Edit-task"> <i class="fa-solid fa-pen-to-square"></i></button>
          <button class="delete" aria-label="Delete task"><i class="fa-solid fa-trash"></i></button></div>
        </h3>
        <p class="text">${task.description}</p>

        <p class="date"><span class="calender-icon"><img src="calender-img.png" alt="calender-image"></span>Due:  ${task.dueDate}</p>
        <p class="name"><span class="user-icon"><img src="person-img.jpg" alt="user-image"></span> ${task.assignee}</p>

        <hr>
        <div class="priority-status">
          <span class="priority ${priorityClass}"><span class="priority-dot"></span> ${priorityText}</span>
          <span class="status ${statusClass}"><span class="status-dot"></span> ${statusText}</span>
        </div>
      </div>
`

  // new tasks adds on first 
activeTaskContainer.prepend(newTasks)

}

// delete task card
document.addEventListener("click",(e) => {

  const deleteBtn = e.target.closest(".delete")
  if(!deleteBtn) return

  const taskCards = deleteBtn.closest(".content")
  if(!taskCards) return

  const taskId = Number(taskCards.dataset.id)
    taskCards.remove()

    // delete from localStorage 
    let storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];   // gets task from the local storage

    storedTasks = storedTasks.filter(i => i.id !== taskId)

    localStorage.setItem("tasks", JSON.stringify(storedTasks));

    deleteToast()    // calling the delete Toast
  })

// while refresh the page
window.onload = () => {

// get Tasks from local storage
  tasksArr = JSON.parse(localStorage.getItem("tasks")) || [];

  tasksArr.forEach((task) => {  //   task from taskArr sends to displayTask
    displayTask(task)
  })
}

// focus on the input
function goToError(input) {
  input.scrollIntoView({
    behavior: "smooth",
    block: "center"
  })
  input.focus()
}

// object values fills in popup 
function valuesOfLocal(task){
  document.querySelector(".td-title").textContent = task.title
  document.querySelector(".td-assignee").textContent = task.assignee
  document.querySelector(".td-email").textContent = task.email
  document.querySelector(".td-date").textContent = task.dueDate
  document.querySelector(".td-time").textContent = task.dueTime
  document.querySelector(".td-hours").textContent = task.hours
  document.querySelector(".td-url").textContent = task.projectUrl
  document.querySelector(".td-priority").textContent = task.priority
  document.querySelector(".td-progress").textContent = task.progress + "%"
  document.querySelector(".td-tasktype").textContent = task.TaskTypes.join(", ")
  document.querySelector(".td-status").textContent = task.status
  document.querySelector(".td-description").textContent = task.description

}

const Overlay = document.querySelector(".overlay")
const taskDetails = document.querySelector(".task-details")
const closeIconx = document.querySelector(".fa-xmark") 

// opens full details popup
document.addEventListener("click", (e) => {
  // clicks priority area 
  const priorityArea = e.target.closest(".priority-status")
  if(!priorityArea){
    return
  }
// finds parent
  const taskCard = priorityArea.closest(".content")
  if(!taskCard){
    return
  }
// getting task ID
  const taskId = Number(taskCard.dataset.id)

  const tasks = JSON.parse(localStorage.getItem("tasks"))  || []
  const clickedTask = tasks.find(t => t.id === taskId)

  if(!clickedTask){
    return
  }

  valuesOfLocal(clickedTask)    // pop up filling

// shows popup
  Overlay.style.display = "block"
  taskDetails.style.visibility = "visible"
  taskDetails.style.opacity  = "1"
})

// close popup xicon
closeIconx.addEventListener("click", () => {
  taskDetails.style.visibility = "hidden"
  Overlay.style.display = "none"
})

// close popup clicking outside
Overlay.addEventListener("click", () => {
  taskDetails.style.visibility = "hidden"
  Overlay.style.display = "none"
})