/* Hamburger Menu */
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});


const activeTaskContainer = document.querySelector(".active-task");

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

  // hide dropdown and pick selected item to display
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
const priority = document.querySelector(".selectAnOption");
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
  let valid = true;  

  // validation conditions
// taskName 
  if (taskName.value.trim() === "") {
    showError(taskName, "Task Name is required");
    valid = false;
  }
  else{
    clearError(taskName)
  }

// Assigneee name
  if (assigneeName.value.trim() === "") {
    showError(assigneeName, "Assignee Name is required");
    valid = false;
  }
  else if(!AssigneeNameChar(assigneeName.value.trim())){
    showError(assigneeName,"Name does not contain special characters")
    valid = false
  }
  else if(!AssigneeNameNum(assigneeName.value.trim())){
    showError(assigneeName,"Name does not include numbers")
    valid = false
  }
  else{
    clearError(assigneeName)
  }

// email
  if (email.value.trim() === "") {
    showError(email, "Email is required");
    valid = false;
  }
  else if(!EmailValidation(email.value.trim())){
    showError(email,"Enter valid Email")
    valid = false
  }
  else{
    clearError(email)
  }

// date
    if (date.value === "") {
    showError(date, "Due date is required")
    valid = false
  }
  else{
    clearError(date)
  }

// time
  if (time.value === "") {
    showError(time, "Due time is required");
    valid = false;
  }
    else{
    clearError(time)
  }

// select - priority
  if (priority.textContent.includes("Select an option")) {
    showError(priority, "Select priority level");
    valid = false;
  }
  else{
    clearError(priority)
  }

// hour
  if (hoursInput.value === "" ) {
    showError(hoursInput, "Enter hours");
    valid = false;
  }
  else if(hoursInput.value <= 0){
    showError(hoursInput,"Enter hours 0 or above")
    valid = false
  }
  else if(hoursInput.value >100){
    showError(hoursInput,"Maximum hours reached(100 hrs max)")
    valid = false
  }
  else{
    clearError(hoursInput)
  }
  
// url 
  if (url.value.trim() === "") {
    showError(url, "Project URL is required");
    valid = false;
  }
  else if(!projecturl(url.value.trim())){
    showError(url,"Enter valid url")
    valid = false
  }
  else{
    clearError(url)
  }

// text area
  if (textArea.value.trim() === "") {
    showError(textArea, "Task description is required");
    valid = false;
  }
  else{
    clearError(textArea)
  }

// progress
  // if (progress.value == 0) {
  //   showError(progress, "Progress must be greater than 0");
  //   valid = false;
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
    valid = false;
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
    valid = false;
  }
  else{
    clearError(statusRadio[0])
  }

// returns valid with  true or false
  return valid
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

priority.innerHTML = `Select an option<span><img src="arrow down.png" alt="arrow down"></span>`

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
const showToast = () => {
  const notification = document.getElementById('toast-container')
  notification.style.visibility = "visible"
    setTimeout(() => {
        notification.style.visibility = "hidden";
    }, 3000);
}

function addTask(){

  const title = taskName.value
  const description = textArea.value
  const dueDate = date.value
  const assignee = assigneeName.value

// select tag - priority

const priorityContent = priority.textContent.trim()
let priorityClass = "low"
let priorityText = "LOW"
if(priorityContent.includes("High")){
  priorityClass = "high"
  priorityText = "HIGH"
}
else if(priorityContent.includes("Medium")){
  priorityClass = "medium"
  priorityText = "MEDUIM"
}

// status type 
let statusClass = ""
let statusText = ""
if(document.getElementById("pending").checked){
  statusClass = "pending"
  statusText = "Pending"
}
else if(document.getElementById("inprogress").checked){
  statusClass = "inpro"
  statusText = "In Progress"
}
else if(document.getElementById("completed").checked){
  statusClass = "completed"
  statusText = "Completed"
}

// 

// create task cards
const newTasks = document.createElement("div")
newTasks.className = `content ${priorityClass}`

newTasks.innerHTML = `<div>
       <h3>${title}<div class="edit-delete"><button class="edit" aria-label="Edit-task"> <i class="fa-solid fa-pen-to-square"></i></button>
          <button class="delete" aria-label="Delete task"><i class="fa-solid fa-trash"></i></button></div>
        </h3>
        <p class="text">${description}</p>

        <p class="date"><span class="calender-icon"><img src="calender-img.png" alt="calender-image"></span>Due:  ${dueDate}</p>
        <p class="name"><span class="user-icon"><img src="person-img.jpg" alt="user-image"></span> ${assignee}</p>

        <hr>
        <div class="priority-status">
          <span class="priority ${priorityClass}"><span class="priority-dot"></span> ${priorityText}</span>
          <span class="status ${statusClass}"><span class="status-dot"></span> ${statusText}</span>
        </div>
      </div>
`
activeTaskContainer.appendChild(newTasks)
}

/* Task contents  Delete button */
document.addEventListener("click",(e) => {
  if(e.target.closest(".delete")){
    const contentCard = e.target.closest(".content")
    if(contentCard){
      contentCard.remove()
    }
  }
})
