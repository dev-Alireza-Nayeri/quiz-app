const highScore = JSON.parse(localStorage.getItem("highScore")) || []

const list = document.querySelector("ol")

list.innerHTML = highScore.map((score,index) => {
    return `
     <li>
       <span>${index + 1}</span>
       <p> ${score.name}</p>
       <span>${score.score}</span>
     
     </li>
    
    
    `
})