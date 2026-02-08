/* Hamburger Menu */
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show");
  menuBtn.classList.toggle("active")
});


const activeTaskContainer = document.querySelector(".active-task");
let tasksArr = []    // new tasks Array
const Overlay = document.querySelector(".overlay")  // dark bg overlay

// custom dropdown 
let drop = document.querySelectorAll(".dropdown");

drop.forEach(function (select) {
  let selectAnopt = select.querySelector(".selectAnOption");
  let optionContainer = select.querySelector(".dropdown-options");
  let optionItems = optionContainer.querySelectorAll(".option");


  selectAnopt.addEventListener("click", () => {
    optionContainer.classList.toggle("open-custom")
  });

  optionItems.forEach((opt) => {
    opt.addEventListener("click", () => {

      let arrow = selectAnopt.querySelector("span").outerHTML  // arrow icon
  
      selectAnopt.innerHTML = opt.textContent +  arrow
      selectAnopt.dataset.value = opt.dataset.value
      optionContainer.classList.remove("open-custom")   // none

      clearError(selectAnopt)  // error-box call(form validation)
    })
  })
})


// Update task counts for all filters
function taskCounts(){
  const allTasks = document.querySelectorAll('.active-task .content')      // all
  const highTasks = document.querySelectorAll('.active-task .content.high')   // high
  const mediumTasks = document.querySelectorAll('.active-task .content.medium')   // medium
  const lowTasks = document.querySelectorAll('.active-task .content.low')   // low

  // length count in page
  document.getElementById('all-count').textContent = allTasks.length
  document.getElementById('high-count').textContent = highTasks.length
  document.getElementById('medium-count').textContent = mediumTasks.length
  document.getElementById('low-count').textContent = lowTasks.length
}

function filterTasks(priority) {

  const tasks = document.querySelectorAll('.active-task .content')

  tasks.forEach(task => {

    // if "All"  show everything
    if (priority === "all") {
      task.classList.remove("hidden")
    } 
    else {
      // show only matching priority
      if (task.classList.contains(priority)) {
        task.classList.remove("hidden")
      } else {
        task.classList.add("hidden")
      }
    }
  })
}

const filterLabels = document.querySelectorAll('.nav-buttons label')

filterLabels.forEach(label => {
  label.addEventListener('click', () => {

    // remove active from all 
    filterLabels.forEach(l => l.classList.remove('active'))  // remove active color from all buttons

    label.classList.add('active')   // adding active for clicked label
    const filterType = label.getAttribute('data-filter')  // get filter type
    filterTasks(filterType)   // show tasks
  })
})


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
    successToast()   // successful - Notification
    form.reset()  // resets after validates
}
});

// validation function 
function validateInputs() {

  // validation conditions
// taskName 
  if (taskName.value.trim() === "") {
    showError(taskName, "Task Name is required.");
    goToError(taskName)
    return false;
  }
  else if(TaskNameExist(taskName.value.trim())){
    showError(taskName,"Task Name already exists.")
    goToError(taskName)
    return false
  }
  else if(!taskName3letter(taskName.value.trim())){
    showError(taskName,"Task Name must contain a minimum of 3 characters.")
    goToError(taskName)
    return false
  }
  else{
    clearError(taskName)
  }

// Assigneee name
  if (assigneeName.value.trim() === "") {
    showError(assigneeName, "Assignee Name is required.");
    goToError(assigneeName)
    return false;
  }
  else if(!AssigneeNameChar(assigneeName.value.trim())){
    showError(assigneeName,"Numbers and  special characters are not allowed.")
    goToError(assigneeName)
    return false
  }
  else if(!Assignee3letter(assigneeName.value.trim())){
    showError(assigneeName,"Assignee Name must contain a minimum of 3 letters.")
    goToError(assigneeName)
    return false
}
  else{
    clearError(assigneeName)
  }

// email
  if (email.value.trim() === "") {
    showError(email, "Email is required.");
    goToError(email)
    return false;
  }
  else if(!EmailValidation(email.value.trim())){
    showError(email,"Enter valid Email.")
    goToError(email)
    return false
  }
  else{
    clearError(email)
  }

// date
const selectedDate = date.value
const today = new Date().toISOString().split("T")[0]

  if (date.value === "") {
    showError(date, "Due date is required.")
    goToError(date)
    return false
  }
  else if(selectedDate < today){
  showError(date,"Past dates are not allowed")
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

  // (checkbox) Task type validation
  let taskChecked = false;
  taskCheckbox.forEach((clickBox) => {
    if (clickBox.checked) {
      taskChecked = true;
    }
  });

  if (!taskChecked) {
    showError(taskCheckbox[0], "select at least one task type");
    goToError(taskCheckbox[0])
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
    goToError(statusRadio[0])
    return false;
  }
  else{
    clearError(statusRadio[0])
  }

  return true
}

/* edit form validation function */
function validateEditInputs(){
  const editTaskName = document.getElementById("edit-taskname")
  const editAssigneeName = document.getElementById("edit-assigneename")
  const editEmail = document.getElementById("edit-email")
  const editDate = document.getElementById("edit-dob")
  const editTime = document.getElementById("edit-time")
  const editPriority = document.querySelector(".edit-priority")
  const editHoursInput = document.getElementById("edit-hours")
  const editUrl = document.getElementById("edit-project-url")
  const editTextArea = document.getElementById("edit-descrip")
  const editTaskCheckbox = document.querySelectorAll('#editTaskForm input[type="checkbox"]')
  const editStatusRadio = document.querySelectorAll('input[name="edit-status"]')

  // taskName
  if (editTaskName.value.trim() === "") {
    showError(editTaskName, "Task Name is required.")
    goToError(editTaskName)
    return false;
  }
  else if(!taskName3letter(editTaskName.value.trim())){
    showError(editTaskName,"Task Name must contain a minimum of 3 characters.")
    goToError(editTaskName)
    return false
  }
  else{
    clearError(editTaskName)
  }

  // Assignee name
  if (editAssigneeName.value.trim() === "") {
    showError(editAssigneeName, "Assignee Name is required")
    goToError(editAssigneeName)
    return false;
  }
  else if(!AssigneeNameChar(editAssigneeName.value.trim())){
    showError(editAssigneeName,"Numbers and  special characters are not allowed")
    goToError(editAssigneeName)
    return false
  }
  else if(!Assignee3letter(editAssigneeName.value.trim())){
    showError(editAssigneeName,"Assignee Name must contain a minimum of 3 letters.")
    goToError(editAssigneeName)
    return false
  }
  else{
    clearError(editAssigneeName)
  }

  // email
  if (editEmail.value.trim() === "") {
    showError(editEmail, "Email is required")
    goToError(editEmail)
    return false;
  }
  else if(!EmailValidation(editEmail.value.trim())){
    showError(editEmail,"Enter valid Email")
    goToError(editEmail)
    return false
  }
  else{
    clearError(editEmail)
  }
  /* Date validation*/
const EselectedDate = editDate.value
const Etoday = new Date().toISOString().split("T")[0]

  // date
  if (editDate.value === "") {
    showError(editDate, "Due date is required")
    goToError(editDate)
    return false
  }
  else if(EselectedDate < Etoday){
      showError(editDate,"Past dates are not allowed")
      goToError(editDate)
      return false
    }
  else{
    clearError(editDate)
  }

  // time
  if (editTime.value === "") {
    showError(editTime, "Due time is required")
    goToError(editTime)
    return false;
  }
  else{
    clearError(editTime)
  }

  // hour
  if (editHoursInput.value === "" ) {
    showError(editHoursInput, "Enter hours")
    goToError(editHoursInput)
    return false;
  }
  else if(editHoursInput.value <= 0){
    showError(editHoursInput,"Enter hours 0 or above")
    goToError(editHoursInput)
    return false
  }
  else{
    clearError(editHoursInput)
  }
 
  // url
  if (editUrl.value.trim() === "") {
    showError(editUrl, "Project URL is required")
    goToError(editUrl)
    return false;
  }
  else if(!projecturl(editUrl.value.trim())){
    showError(editUrl,"Enter valid url")
    goToError(editUrl)
    return false
  }
  else{
    clearError(editUrl)
  }

  // text area
  if (editTextArea.value.trim() === "") {
    showError(editTextArea, "Task description is required")
    goToError(editTextArea)
    return false
  }
  else{
    clearError(editTextArea)
  }
// progress
   if (editProgress.value == 0) {
     showError(editProgress, "Progress value must be greater than 0");
     goToError(editProgress)
     return false;
   }
   else{
     clearError(editProgress)
   }

  // (checkbox) Task type validation
  let taskChecked = false
  editTaskCheckbox.forEach((clickBox) => {
    if (clickBox.checked) {
      taskChecked = true
    }
  });

  if (!taskChecked) {
    if(editTaskCheckbox.length > 0){
    showError(editTaskCheckbox[0], "select at least one task type")
    goToError(editTaskCheckbox[0])
    }
    return false
  }
  else{
    clearError(editTaskCheckbox[0])
  }

  // (radio) status validation
  let statusChecked = false
  editStatusRadio.forEach((clickRadio) => {
    if (clickRadio.checked) {
      statusChecked = true
    }
  });

  if (!statusChecked) {
    if(editStatusRadio.length > 0){
    showError(editStatusRadio[0], "Select task status")
    goToError(editStatusRadio[0])
    }
    return false
  }
  else{
    clearError(editStatusRadio[0])
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
    const parent = input.closest(".borderbox, .field")   // gets  the correct parent, instead of div

      const errorBox = parent.querySelector(".error-box")
      const small = parent.querySelector('.error')
      if(errorBox){
        errorBox.classList.remove("show")  // hides box
      }
      if(small)
        small.innerText = ""  // clears input field
  })
})

// focus on the input
function goToError(input) {
  input.scrollIntoView({
    behavior: "smooth",
    block: "center"
  })
  input.focus()
}

// Task Name min 3 letter
let taskName3letter = (name) => {
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
function Assignee3letter(name){
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

// reset -> progress=0, dropdown, clear Error msg
form.addEventListener("reset", () => {
  percent.textContent = "0%";

prioritySelect.innerHTML = `Select an option<span><img src="arrow down.png" alt="arrow down"></span>`
prioritySelect.dataset.value = "" 

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

/* Add task function for display and store */
function addTask(){

// date - day-month-year to month day,year 
  const oldDate = date.value  // date.value returns str like "0000-00-00"
  const modernDate = new Date(oldDate).toLocaleDateString('en-US',{   // it converts to ex: Feb 29, 2026
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
   priority: prioritySelect.dataset.value,
   hours: hoursInput.value,
   projectUrl: url.value.trim(),
   description : textArea.value.trim(),
   progress: progress.value,
   taskTypes: TaskTypes(),
   status: selectedStatus()
  }

  tasksArr.push(task)   // tasksArr is initially 0 
// local storage
  localStorage.setItem("tasks",JSON.stringify(tasksArr)) 

  displayTask(task) 
  taskCounts()
  showInterface()
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

/* display task function */
function displayTask(task){

  const [priorityClass, priorityText] = priorityOptions(task)
  const [statusClass, statusText] = statusTypes(task)

// create task cards
const newTasks = document.createElement("div")    // creating a empty contanier
newTasks.className = `content ${priorityClass}`

newTasks.dataset.id = task.id  // task crads to local storage id connect 

newTasks.innerHTML = `<div>
       <h3 class="task-title">${task.title}<div class="edit-delete"><button class="edit" aria-label="Edit-task"> <i class="fa-solid fa-pen-to-square"></i></button>
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

function updateTask(task) {
  const card = document.querySelector(`.content[data-id="${task.id}"]`)
  if (!card) return

  card.querySelector(".task-title").textContent = task.title
  card.querySelector(".text").textContent = task.description
  card.querySelector(".date").textContent = `Due: ${task.dueDate}`
  card.querySelector(".name").textContent = task.assignee

    // priority
  const priorityShow = card.querySelector(".priority")
  const [pClass, pText] = priorityOptions(task)
  card.classList.remove("high", "medium", "low")
  card.classList.add(pClass)

  priorityShow.innerHTML = `<span class="priority-dot"></span> ${pText}`
  priorityShow.className = `priority ${pClass}`

  // status
  const statusShow = card.querySelector(".status")
  statusShow.textContent = task.status

  if (task.status === "In Progress") {
    statusShow.className = "status inpro"
  } 
  else if (task.status === "Completed") {
    statusShow.className = "status completed"
  } 
  else {
    statusShow.className = "status pending"
  }
}

// object values fills in popup 
function taskView(task){

// used here for the dot-small circle will be present in the task view
 const [priorityClass, priorityText] = priorityOptions(task)
 const [statusClass, statusText] = statusTypes(task)

  document.querySelector(".td-title").textContent = task.title
  document.querySelector(".td-assignee").textContent = task.assignee
  document.querySelector(".td-email").textContent = task.email
  document.querySelector(".td-date").textContent = task.dueDate
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
const editForm = document.getElementById("editTaskForm")
// inputs
const editTaskName = document.getElementById("edit-taskname");
const editAssignee = document.getElementById("edit-assigneename");
const editEmail = document.getElementById("edit-email");
const editDate = document.getElementById("edit-dob");
const editTime = document.getElementById("edit-time");
const editHours = document.getElementById("edit-hours");
const editUrl = document.getElementById("edit-project-url");
const editDescription = document.getElementById("edit-descrip");
const editPriority = document.querySelector(".edit-priority");
// progress bar
const editProgress = document.getElementById("edit-progress")
const editProgressValue = document.querySelector(".edit-progress-value")

// checkbox & radio
const editCheckboxes = document.querySelectorAll('#editTaskForm input[type="checkbox"]');
const editRadios = document.querySelectorAll('input[name="edit-status"]');

let editTaskId = null

// Open edit popup when edit button clicked
document.addEventListener("click", (e) => {
  const editBtn = e.target.closest(".edit")    // content inside edit icon
  if (!editBtn) return

  const taskCard = editBtn.closest(".content")   // finds task card that have the edit icon
  editTaskId = Number(taskCard.dataset.id)

  // get task from localStorage
  const tasks = JSON.parse(localStorage.getItem("tasks")) || []
  const editTask = tasks.find(t => t.id === editTaskId)
  if (!editTask) return
  filleditForm(editTask)
  openEditPopup()
})

  // fill the edit form
  function filleditForm(task){
    editTaskName.value = task.title;
    editAssignee.value = task.assignee;
    editEmail.value = task.email;

  // convert date 
  const dateObj = new Date(task.dueDate)
  const year = dateObj.getFullYear()   // ex:2026
  const month = String(dateObj.getMonth() + 1).padStart(2, '0')
  const day = String(dateObj.getDate()).padStart(2, '0')
  document.getElementById("edit-dob").value = `${year}-${month}-${day}`

  editTime.value = task.dueTime;
  editHours.value = task.hours;
  editUrl.value = task.projectUrl;
  editDescription.value = task.description;
  editProgress.value = task.progress;
  editProgressValue.textContent = `${task.progress}%`;

  //  priority
  const arrow = editPriority.querySelector("span").outerHTML
  editPriority.innerHTML = task.priority + arrow
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

function openEditPopup(){
  editOverlay.classList.add("open-edit")
  editPopup.classList.add("open-edit")
}
// Close button  popup

function closeEditPopup(){
  editOverlay.classList.remove("open-edit")
  editPopup.classList.remove("open-edit")
  editTaskId = null
}
editCloseBtn.addEventListener("click", closeEditPopup)
editCancelBtn.addEventListener("click",closeEditPopup)


// progress bar
editProgress.addEventListener("input", () => {
  editProgressValue.textContent = `${editProgress.value}%`
})

// Submit edit form with validation
editForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Call validation function - stops submit if validation fails
  if(!validateEditInputs()) {
    return
  }

  let tasks = JSON.parse(localStorage.getItem("tasks")) || []
  const index = tasks.findIndex(t => t.id === editTaskId)
  if (index === -1) return

  // checkboxes
  const types = [];
  editCheckboxes.forEach(box => {
  if (box.checked) {
    types.push(box.value)
  }
});

  // date
  const dateVal = document.getElementById("edit-dob").value
  const formattedDate = new Date(dateVal).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  })

  tasks[index] = {
    ...tasks[index],
    title: editTaskName.value.trim(),
    assignee: editAssignee.value.trim(),
    email: editEmail.value.trim(),
    dueDate: formattedDate,
    dueTime: editTime.value,
    priority: editPriority.dataset.value,
    hours: editHours.value,
    projectUrl: editUrl.value.trim(),
    description: editDescription.value.trim(),
    progress: editProgress.value,
    taskTypes: types,
    status: document.querySelector('input[name="edit-status"]:checked').value
  }

  localStorage.setItem("tasks", JSON.stringify(tasks))

// looks for the data-id=""
  const card = document.querySelector(`[data-id="${editTaskId}"]`) 
  localStorage.setItem("tasks", JSON.stringify(tasks));  

  updateTask(tasks[index])
  taskCounts()
  editPopup.classList.remove("open-edit")
  editOverlay.classList.remove("open-edit")  
  updateToast()  // Show success notification after edit
})


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
  storedTasks = storedTasks.filter(task => Number(task.id) !== Number(id))   /// remove

  localStorage.setItem("tasks", JSON.stringify(storedTasks));  // uptated tasks
  const card = document.querySelector(`.content[data-id="${id}"]`)
  if (card) card.style.display = "none"
  taskCounts()
  showInterface()
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
// success Toast
const successToast = () => {
  const successNotification = document.querySelector('.success-toast')
  successNotification.classList.add("showToast")   // visibile
    setTimeout(() => {
        successNotification.classList.remove("showToast");  // hidden
    }, 3000);
}

// delete Toast
const deleteToast = () => {
  const deleteNotification = document.querySelector('.delete-toast')
  deleteNotification.classList.add("showToast")   // visible
  setTimeout(() => {
    deleteNotification.classList.remove("showToast")   // hidden
  },3000)
}

// update Toast
const updateToast = () => {
  const updateNotification = document.querySelector('.update-toast')
  updateNotification.classList.add("showToast")    // visible
  setTimeout(() => {
    updateNotification.classList.remove("showToast")    // hidden
  },3000)
}

/* Links Reloading  */
const LinksReload = document.querySelectorAll('.nav-link, .footer-links')
LinksReload.forEach(links => {
  links.addEventListener("click",(e) => {
    if(links.getAttribute("href") === "#"){   // href=# , stop reload
    e.preventDefault()
    }
  })
  })

/* current year in the footer */
document.getElementById("copy-year").textContent = new Date().getFullYear()

const emptyTaskBox = document.querySelector(".empty-task");
const addTaskBtn = document.querySelector(".add-task-btn");

if (addTaskBtn) {
  addTaskBtn.addEventListener("click", () => {
    form.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    setTimeout(() => {
      taskName.focus();
    }, 300);
  });
}

function showInterface() {
  const taskCards = activeTaskContainer.querySelectorAll(".content")
  if (taskCards.length === 0) {
    emptyTaskBox.classList.add("interface")
  } 
  else {
    emptyTaskBox.classList.remove("interface")
  }
}


/*refresh page */
const storedTasks = JSON.parse(localStorage.getItem("tasks")) || []
storedTasks.forEach(task => displayTask(task))
taskCounts()
showInterface()
// default highlight color for all
filterLabels.forEach(label => {
  if(label.getAttribute("data-filter") === "all"){
    label.classList.add("active")
  }
})
