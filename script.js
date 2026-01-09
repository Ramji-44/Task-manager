


/* Hours Input*/
const hoursInput = document.getElementById('hours')
hoursInput.addEventListener("keydown",(e) => {
    if(e.key === "e" || e.key === "E" || e.key === "+" || e.key === "-" || e.key === "."){
        e.preventDefault()
    }
})
/* Negative Hours*/
hoursInput.addEventListener("input",() => {
    if(hoursInput.value<0){
        hoursInput.value=""
    }
})

/*  Task Progress Input */
const range = document.getElementById('progress')
const percent = document.querySelector('.progress-value')
range.addEventListener("input",() => {
    percent.textContent =  `${range.value}%`
})


/* Hamburger Menu */
const menuBtn = document.getElementById('menuBtn')
const navLinks = document.querySelector(".nav-links")

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show")
})
