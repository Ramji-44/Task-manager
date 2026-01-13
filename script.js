

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


/* Filter the navigation bar */

const  navLabels = document.querySelectorAll('.nav-buttons label') 
const taskBox = document.querySelectorAll('.active-task .content')

// all-high-medium-low
const allCount = document.getElementById('all-count')
const highCount = document.getElementById('high-count')
const mediumCount = document.getElementById('medium-count')
const lowCount = document.getElementById('low-count')

function updateCounts(){
  let high = 0
  let medium = 0
  let low = 0

  taskBox.forEach(function (cards){
    if(cards.classList.contains('high'))
      high++
    else if(cards.classList.contains('medium'))
      medium++
    else if(cards.classList.contains('low'))
      low++
  })

  allCount.textContent = high + medium + low  // adds (high+medium+low) = all
  highCount.textContent = high
  mediumCount.textContent = medium
  lowCount.textContent = low
}

updateCounts()  // function called

navLabels[0].classList.add('active')  // highlight color for only all


navLabels.forEach(function(label){
  label.onclick = function(){
    var filter = this.dataset.filter   // -ex:label.dataset.filter = high,medium,low

    navLabels.forEach(function (del) {
      del.classList.remove('active')   // removes the navLabels[0] "active" class
    })

    this.classList.add('active')  // highlights only clicked filter

    taskBox.forEach(function (cards) {
      cards.style.display = 
      filter === "all" || cards.classList.contains(filter)
      ? 'block' : 'none'
    })
  }
})
