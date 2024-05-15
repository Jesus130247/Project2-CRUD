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

// section for up and down voting
const votes = document.querySelectorAll('.vote span')
console.log(votes)
const upVoteBtns = document.querySelectorAll('.upVote')
const downVoteBtns = document.querySelectorAll('.downVote')
console.log(upVoteBtns, downVoteBtns)

for (let voteButtons=0; voteButtons<votes.length; voteButtons++) {
    upVoteBtns[voteButtons].addEventListener('click', () => {
        votes[voteButtons].innerText = Number(votes[voteButtons].innerText)+1
    })
    downVoteBtns[voteButtons].addEventListener('click', () => {
        votes[voteButtons].innerText = Number(votes[voteButtons].innerText)-1
    })
}