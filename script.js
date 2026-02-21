/* Hamburger Menu */
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");
const navLinkItems = document.querySelectorAll(".nav-links a")

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show")  // show links
  menuBtn.classList.toggle("active") // x 
});
// when link is clicked, close dropdown
navLinkItems.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show")   // hide links
    menuBtn.classList.remove("active")  
  })
})

const activeTaskContainer = document.querySelector(".active-task");
const Overlay = document.querySelector(".overlay")  // dark bg overlay
let tasksArr = []    // new tasks Array

// custom dropdown 
let drop = document.querySelectorAll(".dropdown");

drop.forEach(function (select) {
  let selectAnopt = select.querySelector(".selectAnOption");
  let optionContainer = select.querySelector(".dropdown-options");
  let optionItems = optionContainer.querySelectorAll(".option");

  selectAnopt.addEventListener("click", () => {
    optionContainer.classList.toggle("open-custom")
    selectAnopt.classList.add("active-color")
  });

  optionItems.forEach((opt) => {
    opt.addEventListener("click", () => {

      let arrow = selectAnopt.querySelector(".arrowdown").outerHTML  // arrow icon
  
      selectAnopt.innerHTML = opt.innerHTML +  arrow
      selectAnopt.dataset.value = opt.dataset.value
      optionContainer.classList.remove("open-custom")   // none

      selectAnopt.classList.remove("active-color")

      if(select.closest("form")){
      clearError(selectAnopt)  // error-box call(form validation)
      }
    })
  })
// dropdown close  if click outside
  document.addEventListener("click", (e) => {
    if (!select.contains(e.target)) {
      optionContainer.classList.remove("open-custom")
      selectAnopt.classList.remove("active-color")
    }
})
})

let currentFilterPriority = "all"
let currentFilterStatus = "all"

function taskCounts(){    //  Update task counts for  filters
  const allTasks = document.querySelectorAll('.active-task .content')      // all
  const highTasks = document.querySelectorAll('.active-task .content.high')   // high
  const mediumTasks = document.querySelectorAll('.active-task .content.medium')   // medium
  const lowTasks = document.querySelectorAll('.active-task .content.low')   // low

  const pendingTasks = document.querySelectorAll('.active-task .content.pending')  // pending
  const inprogressTasks = document.querySelectorAll('.active-task .content.inpro')
  const completedTasks = document.querySelectorAll('.active-task .content.completed')

  // length count by priority
  document.getElementById('all-count').textContent = allTasks.length
  document.getElementById('high-count').textContent = highTasks.length
  document.getElementById('medium-count').textContent = mediumTasks.length
  document.getElementById('low-count').textContent = lowTasks.length

  // length count by status
  document.getElementById("pending-count").textContent = `[${pendingTasks.length}]`  // with []
  document.getElementById("inprogress-count").textContent = `[${inprogressTasks.length}]`
  document.getElementById("completed-count").textContent = `[${completedTasks.length}]`
}

/* filter by priority, status, matching count an icon  */
function filterTasks(priority, status = currentFilterStatus) {

  const tasks = document.querySelectorAll('.active-task .content')
  const tasknotFound = document.querySelector('.notask-found')
  const taskFound = document.getElementById('matchingTasks')
  let matchCount = 0   // matching count

  tasks.forEach(task => {

    const samePriority = priority === "all" || task.classList.contains(priority)
    const sameStatus = status === "all" || task.classList.contains(status)

    if(samePriority && sameStatus){
      task.classList.remove("hidden")
      matchCount++   // increment when same
    }
    else{
      task.classList.add("hidden")
    }
  })
   if (matchCount > 0) {
    taskFound.classList.remove("hidden")
    tasknotFound.classList.add("hidden")
  } 
  else {   // if not found 
    tasknotFound.classList.remove("hidden") 
  }
/* matching  count by status and priority */
  document.getElementById("match-count").textContent = matchCount
}

/* filter buttons, highlight colors */
const filterButtons = document.querySelectorAll('.nav-buttons button')

filterButtons.forEach(currentBtn => {
currentBtn.addEventListener('click', () => {

    filterButtons.forEach(btn => btn.classList.remove('active'))  // remove active color from all buttons

    currentBtn.classList.add('active')   // adding active for clicked label
    const filterType = currentBtn.getAttribute('data-filter')  // get filter type
    currentFilterPriority = filterType

    filterTasks(currentFilterPriority, currentFilterStatus)   // show tasks
  })
})

/* Form Validation */
const form = document.getElementById("taskform");
// input fields
const taskName = document.getElementById("taskname");
const assigneeName = document.getElementById("assigneename");
const email = document.getElementById("email");
const date = document.getElementById("Date");
date.min = todayDate()   // sets the minimum selectable date
const time = document.getElementById("time");
const prioritySelect = document.querySelector(".selectAnOption");
const hoursInput = document.getElementById("hours");
const url = document.getElementById("project-url");
const textArea = document.getElementById("descrip");
const progress = document.getElementById("progress");
const percent = document.querySelector(".progress-value");
// checkbox & radio
const taskCheckbox = form.querySelectorAll(
  '.task-type input[type="checkbox"]');
const statusRadio = form.querySelectorAll('input[name="status"]');

/* Edit Task form  validation */
const editForm = document.getElementById("editTaskForm")
// inputs
const editTaskName = document.getElementById("edit-taskname");
const editAssignee = document.getElementById("edit-assigneename");
const editEmail = document.getElementById("edit-email");
const editDate = document.getElementById("edit-Date");
editDate.min = todayDate()   // sets the minimum selectable date
const editTime = document.getElementById("edit-time");
const editHours = document.getElementById("edit-hours");
const editUrl = document.getElementById("edit-project-url");
const editDescription = document.getElementById("edit-descrip");
const editPriority = document.querySelector(".edit-priority");
// progress bar
const editProgress = document.getElementById("edit-progress")
const editProgressValue = document.querySelector(".edit-progress-value")
// checkbox & radio
const editCheckboxes = editForm.querySelectorAll('input[name="edit-task-type"]')
const editRadios = editForm.querySelectorAll('input[name="edit-status"]');

/* create task form */
form.addEventListener("submit", (e) => {
  e.preventDefault();

if(validateInputs()){
    addTask()
    successToast()
    form.reset()
}
});

// Inputs validation function 
function validateInputs() {

  if (taskName.value.trim() === "") {
    return throwError(taskName, "Task Name is required.");
  }
  else if(TaskNameExist(taskName.value.trim())){
    return throwError(taskName,"Task Name already exists.")
  }
  else if(!taskNameLength(taskName.value.trim())){
    return throwError(taskName,"Task Name must contain a minimum of 3 characters.")
  }
  else if(taskName.value.trim().length > 50){
    return throwError(taskName,"Task Name cannot exceed 50 characters")
  }
  else{
    clearError(taskName)
  }
// Assigneee name
  if (assigneeName.value.trim() === "") {
    return throwError(assigneeName, "Assignee Name is required.");
  }
  else if(!AssigneeNameChar(assigneeName.value.trim())){
    return throwError(assigneeName,"Numbers and  special characters are not allowed.")
  }
  else if(!AssigneeNameLength(assigneeName.value.trim())){
    return throwError(assigneeName,"Assignee Name must contain a minimum of 3 letters.")
}
  else{
    clearError(assigneeName)
  }
// email
  if (email.value.trim() === "") {
    return throwError(email, "Email is required.");
  }
  else if(!EmailValidation(email.value.trim())){
    return throwError(email,"Enter valid Email.")
  }
  else{
    clearError(email)
  }
// date
  if (date.value === "") {
    return throwError(date, "Due date is required.")
  }
  else if (date.value < date.min) {
  return throwError(date, "Past dates are not allowed.");
  }
  else{
    clearError(date)
  }
// time
  if (time.value === "") {
    return throwError(time, "Due time is required");
  }
//    yyyy-mm-dd     yyyy-mm-dd       HH:MM        HH:MM  
  if(date.value === todayDate() && time.value < currentTime()) {
    return throwError(time, "past time is not allowed")
}
else {
  clearError(time)
}
// select - priority
  if (prioritySelect.textContent.includes("Select an option")) {
    return throwError(prioritySelect, "Select priority level");
  }
// hour
  if (hoursInput.value === "" ) {
    return throwError(hoursInput, "Enter hours");
  }
  else if(hoursInput.value <= 0){
    return throwError(hoursInput,"Enter hours 0 or above")
  }
  else{
    clearError(hoursInput)
  }
// url 
  if (url.value.trim() === "") {
    return throwError(url, "Project URL is required");
  }
  else if(!projecturl(url.value.trim())){
    return throwError(url,"Enter valid url")
  }
  else{
    clearError(url)
  }
// text area
  if (textArea.value.trim() === "") {
    return throwError(textArea, "Task description is required");
  }
  else{
    clearError(textArea)
  }
// (checkbox) Task type validation
  let taskChecked = false;
  taskCheckbox.forEach((clickBox) => {
    if (clickBox.checked) {
      taskChecked = true;
    }
  });

  if (!taskChecked) {
    return throwError(taskCheckbox[0], "select at least one task type");
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
    return throwError(statusRadio[0], "Select task status");
  }
  else{
    clearError(statusRadio[0])
  }
/* completed status and 100% progress */ 

  const statusValue = selectedStatus()
  if(statusValue === "Completed" && Number(progress.value) !== 100){
    return throwError(progress, "Completed tasks must have 100% progress")
  }
  else if(statusValue === "Pending" && Number(progress.value) !== 0){
    return throwError(progress, "Pending tasks must have 0% progress");
  }
  else if(statusValue === "In Progress" && Number(progress.value) === 100){
    return throwError(progress,"In Progress tasks cannot have 100% progress")
  }
  else{
    clearError(progress)
  }
  return true
}
/* edit form validation function */
function validateEditInputs(){
// edit-taskname
  if (editTaskName.value.trim() === "") {
    return throwError(editTaskName, "Task Name is required.")
  }
  else if(!taskNameLength(editTaskName.value.trim())){
    return throwError(editTaskName,"Task Name must contain a minimum of 3 characters.")
  }
  else if(TaskNameExist(taskName.value.trim())){
    return throwError(taskName,"Task Name already exists.")
  }
  else if(editTaskName.value.trim().length > 50){
    return throwError(editTaskName,"Task Name cannot exceed 50 characters")
  }
  else{
    clearError(editTaskName)
  }
// edit-assignee name
  if (editAssignee.value.trim() === "") {
    return throwError(editAssignee, "Assignee Name is required")
  }
  else if(!AssigneeNameChar(editAssignee.value.trim())){
    return throwError(editAssignee,"Numbers and  special characters are not allowed")
  }
  else if(!AssigneeNameLength(editAssignee.value.trim())){
    return throwError(editAssignee,"Assignee Name must contain a minimum of 3 letters.")
  }
  else{
    clearError(editAssignee)
  }
// edit-email
  if (editEmail.value.trim() === "") {
    return throwError(editEmail, "Email is required")
  }
  else if(!EmailValidation(editEmail.value.trim())){
    return throwError(editEmail,"Enter valid Email")
  }
  else{
    clearError(editEmail)
  }
/* Date validation*/

  if (editDate.value === "") {
    return throwError(editDate, "Due date is required")
  }
  else if (editDate.value < editDate.min) {
  return throwError(editDate, "Past dates are not allowed.");
  }
  else{
    clearError(editDate)
  }

// time
  if (editTime.value === "") {
    return throwError(editTime, "Due time is required")
  }
//    yyyy-mm-dd         yyyy-mm-dd       HH:MM            HH:MM
  if(editDate.value === todayDate() && editTime.value < currentTime()){
    return throwError(editTime, "past time is not allowed")
}
  else{
    clearError(editTime)
}
// hour
  if (editHours.value === "" ) {
    return throwError(editHours, "Enter hours")
  }
  else if(editHours.value <= 0){
    return throwError(editHours,"Enter hours above 0")
  }
  else{
    clearError(editHours)
  }
// url
  if (editUrl.value.trim() === "") {
    return throwError(editUrl, "Project URL is required")
  }
  else if(!projecturl(editUrl.value.trim())){
    return throwError(editUrl,"Enter valid url")
  }
  else{
    clearError(editUrl)
  }

  // text area
  if (editDescription.value.trim() === "") {
    return throwError(editDescription, "Task description is required")
  }
  else{
    clearError(editDescription)
  }

  // (checkbox) Task type validation
  let taskChecked = false
  editCheckboxes.forEach((clickBox) => {
    if (clickBox.checked) {
      taskChecked = true
    }
  });

  if (!taskChecked) {
    return throwError(editCheckboxes[0], "select at least one task type")
  }
  else{
    clearError(editCheckboxes[0])
  }

  // (radio) status validation
  let statusChecked = false
  editRadios .forEach((clickRadio) => {
    if (clickRadio.checked) {
      statusChecked = true
    }
  });

/* completed status and 100% progress */ 

  const editStatusValue =  document.querySelector('input[name="edit-status"]:checked')?.value || ""
  if(editStatusValue === "Completed" && Number(editProgress.value) !== 100){
    return throwError(editProgress, "Completed tasks must have 100% progress")
  }
  else if(editStatusValue === "Pending" && Number(editProgress.value) !== 0){
    return throwError(editProgress, "Pending tasks must have 0% progress");
  }
  else if(editStatusValue === "In Progress" && Number(editProgress.value) === 100){
    return throwError(editProgress, "In Progress tasks cannot have 100% progress")
  }
  else{
    clearError(editProgress)
  }
  return true
}

// error message function
function showError(input, message) {
  const parent = input.parentElement

  const errorBox = parent.querySelector(".error-box");
  const small = parent.querySelector(".error");

  small.innerText = message;  // displays error msg
  errorBox.classList.add("show")   // beacuse by default, in css i gave hidden
}

// clear error messages
function clearError(input){
  const parent = input.parentElement
  const errorBox = parent.querySelector(".error-box");
  const small = parent.querySelector('.error')

  small.innerText = ""    // empties
  errorBox.classList.remove("show")   // hides error 
}

// hides error msg when input focused and typing...
const allInputs = document.querySelectorAll("input,textarea");

allInputs.forEach((input) => {
  input.addEventListener('input', () => {
    const parent = input.closest(".borderbox, .field")   // gets  the correct parent

      const errorBox = parent.querySelector(".error-box")
      const small = parent.querySelector('.error')
      if(errorBox){
        errorBox.classList.remove("show")  // hides box
      }
      if(small)
        small.innerText = ""  // clears input field
  })
})

function throwError(input, message){ 
    showError(input, message)
    goToError(input)
    return false
  }
// focus on the input
function goToError(input) {
  input.scrollIntoView({
    behavior: "smooth",
    block: "center"
  })
  input.focus()
}

// Task Name min 3 letter
let taskNameLength = (name) => {
  return name.length >= 3
}
// Task Name repeating not allowed function 
function TaskNameExist(taskNameValue){ 
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [] 
  for(let i = 0; i< tasks.length; i++){ 
    if(tasks[i].title.toLowerCase() === taskNameValue.toLowerCase()){
       return true 
    }
  }
    return false
}
// Assignee Name 
function AssigneeNameChar(name){
  const acceptwords = /^[a-zA-Z\s]+$/
  return acceptwords.test(name)
}

// Assignee Name min 3 letter 
function AssigneeNameLength(name){
 return name.length >= 3
}

// Email validation RegEx
function EmailValidation(mail){
  const emailregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailregex.test(mail)
}

// project url RegEx
 function projecturl(prourl){
  const Urlformat = /^(https?:\/\/|www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9]+)+([\/?#].*)?$/
  return Urlformat.test(prourl)
 }

// range input
progress.addEventListener("input", () => {
  percent.textContent = `${progress.value}%`;
});

function todayDate(){   // gets today Date 
  return new Date().toISOString().split("T")[0]  // yyyy-mm-dd
}

function currentTime(){  // gets current time
    return new Date().toTimeString().slice(0,5)  // HH:MM
}

// reset -> progress=0, dropdown, clear Error msg
form.addEventListener("reset", () => {
  percent.textContent = "0%";

  // reset dropdown text
  const selectAnopt = form.querySelector(".selectAnOption")
  if (selectAnopt) {
    selectAnopt.innerHTML = 'Select an option <span><i class="fa-solid fa-angle-down arrowdown"></i></span>'
    selectAnopt.dataset.value = "" // reset the data-value
  }
  // remove error Messages when reset
  const AllerrorBox = form.querySelectorAll(".error-box")
  AllerrorBox.forEach((msg) => {
    msg.classList.remove("show")
  })
});

// Radio Input - status 
function selectedStatus(){
  for(let radio of statusRadio) {
    if(radio.checked) {
      return radio.value   // .value from HTMl
    }
  }
  return ""
}

function TaskTypes(){
  let types = []   // empty array
  taskCheckbox.forEach((box) => {
    if(box.checked) {
      types.push(box.value)   // refers its value, and push in the empty array [] types
    }    // box.value - value is from the HTML
  }) 
  return types   // returns in array
}

/* store tasks in local storage */
function setTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks))
}

/* Add task function for display and store */
function addTask(){
tasksArr = JSON.parse(localStorage.getItem("tasks")) || [];   // get Tasks if tasks not found return empty [] 

//  task object to store in local storage
   const task = {
   id: Date.now(),   // for unique ID for each Task
   title : taskName.value.trim(),
   assignee: assigneeName.value.trim(),
   email: email.value.trim(),
   dueDate: date.value,
   dueTime: time.value,
   priority: prioritySelect.dataset.value,
   hours: hoursInput.value,
   projectUrl: url.value.trim(),
   description : textArea.value.trim(),
   progress: progress.value,
   taskTypes: TaskTypes(),
   status: selectedStatus()
  }

  tasksArr.push(task)  // tasksArr is initially 0 
  setTasks(tasksArr)  //  set to local storage
  showTasks()
}

/* priority */
function priorityOptions(task){
  const priority = task.priority || "low"
  if(priority === "high"){
    return ["high", "HIGH"]
  }
  if(priority === "medium"){
    return ["medium", "MEDIUM"]
  }
  return ["low", "LOW"]
}

/* status selects */
function statusTypes(task){
  if(task.status.includes("In Progress")){
    return ["inpro", task.status]
  }
  if(task.status.includes("Completed")){
    return ["completed", task.status]
  }
  return ["pending", task.status]
}

/* formatted date for displayTask() and taskView() */
function formatDate(task){
  return new Date(task.dueDate).toLocaleDateString("en-US", {   // ex: yyyy-mm-dd => mon,dd yyyy
    month: "short",
    day: "numeric",
    year: "numeric"
  })
}

/* display task cards in UI */
function displayTask(task){

  const [priorityClass, priorityText] = priorityOptions(task)
  const [statusClass, statusText] = statusTypes(task)

// create task cards
const newTasks = document.createElement("div")    // creating a empty contanier
newTasks.className = `content ${priorityClass} ${statusClass}`

newTasks.dataset.id = task.id  // task cards to local storage id connect 

newTasks.innerHTML = `<div>
       <h3 class="task-title">${task.title}<div class="edit-delete"><button class="edit" aria-label="Edit-task"> <i class="fa-solid fa-pen-to-square"></i></button>
          <button class="delete" aria-label="Delete task"><i class="fa-solid fa-trash"></i></button></div>
        </h3>
        <p class="text">${task.description}</p>

        <p class="date"><span class="calender-icon"><img src="calender-img.png" alt="calender-image"></span>Due: ${formatDate(task)}</p>
        <p class="name"><span class="user-icon"><img src="person-img.jpg" alt="user-image"></span> ${task.assignee}</p>

        <hr>
        <div class="priority-status">
          <span class="priority ${priorityClass}"><span class="priority-dot"></span> ${priorityText}</span>
          <span class="status ${statusClass}"><span class="status-dot"></span> ${statusText}</span>
        </div>
      </div> `
activeTaskContainer.prepend(newTasks)   // new tasks adds on first 
}

function showTasks(){
  activeTaskContainer.innerHTML = ""
  const tasks = JSON.parse(localStorage.getItem("tasks")) || []
  
  tasks.forEach(task =>{
    displayTask(task)
  })
  taskCounts()
  filterTasks(currentFilterPriority)
  showInterface()
}

// object values fills in popup 
function taskView(task){

 const [priorityClass, priorityText] = priorityOptions(task)  // 
 const [statusClass, statusText] = statusTypes(task)

  document.querySelector(".td-title").textContent = task.title
  document.querySelector(".td-assignee").textContent = task.assignee
  document.querySelector(".td-email").textContent = task.email
  document.querySelector(".td-date").textContent = formatDate(task)
  document.querySelector(".td-time").textContent = task.dueTime
  document.querySelector(".td-hours").textContent = task.hours
  document.querySelector(".td-url").href = task.projectUrl
  document.querySelector(".td-priority").innerHTML = `<span class="priority ${priorityClass}"><span class="priority-dot"></span> ${priorityText}</span>`
  document.querySelector(".td-progress-range").value = task.progress
  document.querySelector(".td-progress-value").textContent = `${task.progress}%`
  document.querySelector(".td-tasktype").textContent = task.taskTypes.join(", ")
  document.querySelector(".td-status").innerHTML = `<span class="status ${statusClass}"><span class="status-dot"></span> ${statusText}</span>`
  document.querySelector(".td-description").textContent = task.description
} 

const taskDetails = document.querySelector(".task-details")
const closeIconx = document.querySelector(".closeTD") 

// opens full details popup
document.addEventListener("click", (e) => {

  const taskCard = e.target.closest(".content")
  if(!taskCard){
    return
  }
  if(e.target.closest(".edit") || e.target.closest(".delete")) return
// getting task ID
  const taskId = Number(taskCard.dataset.id)

  const tasks = JSON.parse(localStorage.getItem("tasks"))  || []  // str to arr
  const clickedTask = tasks.find(t => t.id === taskId)  // retruns the task object

  if(!clickedTask){
    return
  }
  taskView(clickedTask)    //function calls for filling the popup

// shows popup
  Overlay.classList.add("openTD")
  taskDetails.classList.add("openTD")
})

// close popup xicon
closeIconx.addEventListener("click", () => {
  taskDetails.classList.remove("openTD")
  Overlay.classList.remove("openTD")
})

/*Edit Task*/
// get data from local storage ->fill in form ->validate -> update in UI and local storage

const editOverlay = document.querySelector(".edit-overlay")
const editPopup = document.querySelector(".edit-popup")
const editCloseBtn = document.querySelector(".edit-close")
const editCancelBtn = document.querySelector(".cancel-button")

let editTaskId = 0

// Open edit popup when edit button clicked
activeTaskContainer.addEventListener("click", (e) => {
  const editBtn = e.target.closest(".edit")    // content inside edit icon
  if (!editBtn) return

  const taskCard = editBtn.closest(".content")   // finds task card that have the edit icon
  editTaskId = Number(taskCard.dataset.id)

  // get task from localStorage
  const tasks = JSON.parse(localStorage.getItem("tasks")) || []
  const editTask = tasks.find(t => t.id === editTaskId)  // if ID matches return that task
  fillEditForm(editTask)
  openEditPopup()
})

  // fill the edit form with the values in local storage
function fillEditForm(task){
  editTaskName.value = task.title;
  editAssignee.value = task.assignee;
  editEmail.value = task.email;
  editDate.value = task.dueDate
  editTime.value = task.dueTime;
  editHours.value = task.hours;
  editUrl.value = task.projectUrl;
  editDescription.value = task.description;
  editProgress.value = task.progress;
  editProgressValue.textContent = `${task.progress}%`;

//  priority
const priorityLabels = {
  low: "Low Priority",
  medium: "Medium Priority",
  high: "High Priority"
}
const arrowHTML = `<span><i class="fa-solid fa-angle-down arrowdown"></i></span>`

const label = priorityLabels[task.priority]

editPriority.innerHTML = `${label} ${arrowHTML}`
editPriority.dataset.value = task.priority

  //  checkboxes
   editCheckboxes.forEach(checks => {
    checks.checked = task.taskTypes.includes(checks.value)
  })
  //  radio
  editRadios.forEach(radios => {
    radios.checked = radios.value === task.status
  })
}

// progress bar
editProgress.addEventListener("input", () => {
  editProgressValue.textContent = `${editProgress.value}%`
})

function updateTask(){ 
  let tasks = JSON.parse(localStorage.getItem("tasks")) || []
  const index = tasks.findIndex(t => t.id === editTaskId)   // index position of the task, that matches

  // checkboxes
  const types = [];
  editCheckboxes.forEach(box => {
  if (box.checked) {
    types.push(box.value)
  }
});

  tasks[index] = {   // copy all existing properties then update with new values 
    ...tasks[index],
    title: editTaskName.value.trim(),
    assignee: editAssignee.value.trim(),
    email: editEmail.value.trim(),
    dueDate: editDate.value,
    dueTime: editTime.value,
    priority: editPriority.dataset.value,
    hours: editHours.value,
    projectUrl: editUrl.value.trim(),
    description: editDescription.value.trim(),
    progress: editProgress.value,
    taskTypes: types,
    status: document.querySelector('input[name="edit-status"]:checked').value
  }
  setTasks(tasks)
  showTasks()
}

// Submit edit form with validation
editForm.addEventListener("submit", (e) => {
  e.preventDefault()

  if(validateEditInputs()) {
  updateTask()  // update in local storage and in UI
  closeEditPopup()
  updateToast()  // Show success notification after edit
}
})
function openEditPopup(){    
  editOverlay.classList.add("open-edit")
  editPopup.classList.add("open-edit")
}
// Close button and X button  
function closeEditPopup(){
  editOverlay.classList.remove("open-edit")
  editPopup.classList.remove("open-edit")
  editTaskId = 0
  clearEditErrorMsg()
}
/* removes error msg when closing the edit form */
function clearEditErrorMsg(){
  const editFormErrorBox = editForm.querySelectorAll(".error-box")
  const editFormErrorText = editForm.querySelectorAll(".error")

  editFormErrorBox.forEach(box => box.classList.remove("show"))
  editFormErrorText.forEach(text => text.innerText = "")
}

editCloseBtn.addEventListener("click", closeEditPopup)  // X-button
editCancelBtn.addEventListener("click",closeEditPopup)  // cancel - button

/* Delete task */
const deletePopup = document.querySelector(".delete-confirmation")
const NameofTask = document.getElementById("task-name")

const confirmBtn = document.getElementById("delete-btn")
const cancelDBtn = document.getElementById("cancel-btn")

let currentId = null

/* open delete popup box */
activeTaskContainer.addEventListener("click", (e) => {
  const deleteIcon = e.target.closest(".delete")
  if(!deleteIcon) return

  const taskCard = deleteIcon.closest(".content")
  currentId = Number(taskCard.dataset.id)

  const tasks = JSON.parse(localStorage.getItem("tasks")) || []
  const task = tasks.find(t => t.id === currentId)
  if(!task) return

  NameofTask.textContent = task.title     // task name in popup

  deletePopup.classList.add("showDeleteConfirm")
  Overlay.classList.add("openTD")
})

/* delete task function */
function deleteTask(id){
  
  let storedTasks = JSON.parse(localStorage.getItem("tasks")) || []
  storedTasks = storedTasks.filter(task => Number(task.id) !== Number(id))   // remove

  setTasks(storedTasks)
  showTasks()
}

// delete confirm button - deletes 
confirmBtn.addEventListener("click", () => {
  if(!currentId) return

  deleteTask(currentId)  
  deleteToast()

  deletePopup.classList.remove("showDeleteConfirm")  // popup close
  Overlay.classList.remove("openTD")
})
// cancel button -> close
cancelDBtn.addEventListener("click", () => {
  currentId = null
  deletePopup.classList.remove("showDeleteConfirm")
  Overlay.classList.remove("openTD")
})

/*Toast notification appears*/

const openToast = (toastSelector) => {
  const toast = document.querySelector(toastSelector)

  toast.classList.add("showToast")

  const timeOut = setTimeout( () => {
    toast.classList.remove("showToast")
  },3000)
// close toast msg
  const closeToast = toast.querySelector(".close-toast")
  closeToast.addEventListener("click",() => {
    clearTimeout(timeOut)   // remove time
    toast.classList.remove("showToast")  // remove toast
  })
}
/* function, class name is passed as parameter */
const successToast = () => openToast('.success-toast')
const deleteToast  = () => openToast('.delete-toast')
const updateToast  = () => openToast('.update-toast')

/* Links Reloading  */
const LinksReload = document.querySelectorAll(' .footer-links')
LinksReload.forEach(links => {
  links.addEventListener("click",(e) => {
    if(links.getAttribute("href") === "#"){   // href=# , stop reload
    e.preventDefault()
    }
  })
  })

/* current year in the footer */
document.getElementById("copy-year").textContent = new Date().getFullYear()

/* create task interface */
const emptyTaskBox = document.querySelector(".empty-task");
const addTaskBtn = document.querySelector(".add-task-btn");

if (addTaskBtn) {
  addTaskBtn.addEventListener("click", () => {

/* in tasks page to dashboard page switch */
    location.hash = "#dashboard"  

// focus on the taskName input.
    form.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    setTimeout(() => {
      taskName.focus();
    }, 300);
  });
}
/* empty task interface - tells to create task */
function showInterface() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || []
  const filterResult = document.querySelector(".filter-result")
  if (tasks.length === 0) {
    emptyTaskBox.classList.add("interface")
    filterResult.classList.add("hidden")
  } 
  else {
    emptyTaskBox.classList.remove("interface")
    filterResult.classList.remove("hidden")
  }
}

document.addEventListener("DOMContentLoaded", () => {

// default highlight color for all
filterButtons.forEach(label => {
  if(label.getAttribute("data-filter") === "all"){
    label.classList.add("active")
  }
})
statusDropdown()
pageSwitch()  // page navigation
})

/* display filter tasks  */
function statusFilter(value){
  if (value === "default") {
    currentFilterStatus = "all"  // show all tasks
  }
  else if (value === "inprogress") {
    currentFilterStatus = "inpro"
  }
  else{
    currentFilterStatus = value   // value as class name
  }

  filterTasks(currentFilterPriority, currentFilterStatus)
}
/* filter by task status  */
function statusDropdown(){
  const statusDropdown = document.querySelector(".status-dropdown")
  const options = statusDropdown.querySelectorAll(".option")

  options.forEach(function(option) {
    option.addEventListener("click", () => {
      let value = option.dataset.value
      statusFilter(value)
    })
  })
}

/* switching between pages */
const mainContainer = document.querySelector(".container1")
const titleH1 = document.querySelector(".title h1")
const formContainer = document.querySelector(".new-task")
const tasksContainer = document.getElementById("tasksPage")
const profileSection = document.querySelector(".profile")

function pageSwitch() {
  const currentHash = location.hash.replace("#", "") || "dashboard"

// display none for form,tasks
  formContainer.classList.remove("hide")  // form - block
  tasksContainer.classList.remove("hide") // task - block
  profileSection.classList.add("hide")
  mainContainer.classList.remove("expand")
// remove highlight color 
  navLinkItems.forEach(link => link.classList.remove("active"))

// Add active class to the current link
  const highlightLink = document.querySelector(`.nav-links a[href="#${currentHash}"]`)
  if (highlightLink) {
    highlightLink.classList.add("active")
  }
// links - dashboard, tasks, profile
  if (currentHash === "tasks") {
    formContainer.classList.add("hide")
    mainContainer.classList.add("expand")
    titleH1.textContent = "Tasks"
    showTasks()
  } 
  else if (currentHash === "profile") {
    formContainer.classList.add("hide")
    tasksContainer.classList.add("hide")
    profileSection.classList.remove("hide")
    mainContainer.classList.add("expand")
    titleH1.textContent = "Profile"
  } 
  else {
    titleH1.textContent = "Task Dashboard"
    showTasks()
  }
}

// tracks the hash change to #tasks,#dashboard,#profile 
window.addEventListener("hashchange", () => { 
  pageSwitch()  
})