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
const taskCheckbox = document.querySelectorAll('.task-type input[type="checkbox"]',);
const statusRadio = document.querySelectorAll('input[name="status"]');


form.addEventListener("submit", (e) => {
  e.preventDefault();

  clearError();

  validateInputs();
});

function validateInputs() {
  let success = true;  

// validation conditions

  if (taskName.value.trim() === "") {
    showError(taskName, "Task Name is required");
    success = false;
  }

  if (email.value.trim() === "") {
    showError(email, "Email is required");
    success = false;
  }

  if (assigneeName.value.trim() === "") {
    showError(assigneeName, "Assignee Name is required");
    success = false;
  }

  if (date.value === "") {
    showError(date, "Due date is required");
    success = false;
  }

  if (time.value === "") {
    showError(time, "Due time is required");
    success = false;
  }
  if (priority.value === "") {
    showError(priority, "Select priority level");
    success = false;
  }

  if (hoursInput.value === "" || hoursInput.value <= 0) {
    showError(hoursInput, "Enter valid hours");
    success = false;
  }

  if (url.value.trim() === "") {
    showError(url, "Project URL is required");
    success = false;
  }

  if (textArea.value.trim() === "") {
    showError(textArea, "Task description is required");
    success = false;
  }

  if (progress.value == 0) {
    showError(progress, "Progress must be greater than 0");
    success = false;
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
    success = false;
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
    success = false;
  }
  if (success) {
    alert("Task created successfully");
    form.submit();
  }
}

// error message function

function showError(input, message) {
  const parent = input.closest("div");
  const errorMsg = parent.querySelector(".error-msg");
  const errorText = parent.querySelector(".error");

  errorText.innerText = message;
  errorMsg.style.visibility = "visible";
}

// clear error messages

function clearError() {
  const errorContent = document.querySelectorAll(".error-msg");

  errorContent.forEach(function (icon_msg) {
    icon_msg.style.visibility = "hidden";
    icon_msg.querySelector(".error").innerText = "";
  });
}

// hides error msg when input focused and typing...
const inputs = document.querySelectorAll("input,select,textarea");

inputs.forEach(function (input) {
  input.addEventListener("input", () => {
    const parent = input.closest("div");

    if (parent) {
      const errorMsg = parent.querySelector(".error-msg");
      if (errorMsg) {
        errorMsg.style.visibility = "hidden";
      }
    }
  });
});

// charcters restricted in hours input
hoursInput.addEventListener("keydown", (e) => {
  if (
    e.key === "e" ||
    e.key === "E" ||
    e.key === "+" ||
    e.key === "-" ||
    e.key === "."
  ) {
    e.preventDefault();
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