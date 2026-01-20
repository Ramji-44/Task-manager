/* Hamburger Menu */
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

/* Filter the navigation bar */

const navLabels = document.querySelectorAll(".nav-buttons label");
const taskBox = document.querySelectorAll(".active-task .content");

// all-high-medium-low
const allCount = document.getElementById("all-count");
const highCount = document.getElementById("high-count");
const mediumCount = document.getElementById("medium-count");
const lowCount = document.getElementById("low-count");

function updateCounts() {
  let high = 0;
  let medium = 0;
  let low = 0;

  taskBox.forEach(function (cards) {
    if (cards.classList.contains("high")) high++;
    else if (cards.classList.contains("medium")) medium++;
    else if (cards.classList.contains("low")) low++;
  });

  allCount.textContent = high + medium + low; // adds (high+medium+low) = all
  highCount.textContent = high;
  mediumCount.textContent = medium;
  lowCount.textContent = low;
}

updateCounts(); // function called

navLabels[0].classList.add("active"); // highlight color for only all

navLabels.forEach(function (label) {
  label.onclick = function () {
    var filter = this.dataset.filter; // -ex:label.dataset.filter = high,medium,low

    navLabels.forEach(function (del) {
      del.classList.remove("active"); // removes the navLabels[0] "active" class
    });

    this.classList.add("active"); // highlights only clicked filter

    taskBox.forEach(function (cards) {
      cards.style.display =
        filter === "all" || cards.classList.contains(filter) ? "block" : "none";
    });
  };
});

/* Form Validation */

const form = document.getElementById("taskform");

// input fields
const taskName = document.getElementById("taskname");
const assigneeName = document.getElementById("assigneename");
const email = document.getElementById("email");
const date = document.getElementById("dob");
const time = document.getElementById("time");
const priority = document.getElementById("priority");
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
  // clearError();
if(!validateInputs()){
    e.preventDefault();
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
    showError(date, "Due date is required");
    valid = false;
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
  if (priority.value === "") {
    showError(priority, "Select priority level");
    valid = false;
  }
  else{
    clearError(priority)
  }

// hour
  if (hoursInput.value === "" || hoursInput.value <= 0) {
    showError(hoursInput, "Enter valid hours");
    valid = false;
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
  if (progress.value == 0) {
    showError(progress, "Progress must be greater than 0");
    valid = false;
  }
  else{
    clearError(progress)
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

// prints
  if (valid) {
    alert("Task created successfully");
  }
  return valid
}

// error message function

function showError(input, message) {
  const parent = input.parentElement

  const errorBox = parent.querySelector(".error-box");
  const small = parent.querySelector(".error");

  small.innerText = message;  // displays error msg
  errorBox.style.visibility = "visible";   // beacuse by default, in css i gave hidden

  parent.classList.add('error')
  parent.classList.remove('success')
}

// clear error messages

function clearError(input){
  const parent = input.parentElement
  const errorBox = parent.querySelector(".error-box");
  const small = parent.querySelector('.error')

  small.innerText = ""    // empties
  errorBox.style.visibility = "hidden"   // hides error 

  parent.classList.add('success')
  parent.classList.remove('error')
}

// hides error msg when input focused and typing...
const allInputs = document.querySelectorAll("input,select,textarea");

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
  const acceptwords = /^[a-zA-Z0-9.]+$/
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

hoursInput.addEventListener("input", function () {
  // only numbers allowed
  this.value = this.value.replace(/[^1-9]/g, "");

  //  0 to 24 only accepts
  if (this.value > 24) {
    this.value = 24;
  }
});

// range input
progress.addEventListener("input", () => {
  percent.textContent = `${progress.value}%`;
});
// reset progress value
form.addEventListener("reset", () => {
  percent.textContent = "0%";
});

// project url
 function projecturl(prourl){
  const Urlformat = /^https:\/\/(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/.*)?$/
  return Urlformat.test(prourl)
 }

