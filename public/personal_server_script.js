console.log('personal_server javascript')
// section for the add content buttons
const plusDiv = document.querySelector('.plus')
const createDiv = document.querySelector('.create')

const displayBtn = document.querySelector('.display_create')
displayBtn.addEventListener('click', display)

const hideBtn = document.querySelector('.hide_this')
hideBtn.addEventListener('click', hide)

function display() {
    plusDiv.style.visibility = 'hidden'
    createDiv.style.visibility = 'visible'
}
function hide() {
    plusDiv.style.visibility = 'visible'
    createDiv.style.visibility = 'hidden'
}
//