const score = JSON.parse(localStorage.getItem("score"))
const highScore = JSON.parse(localStorage.getItem("highScore")) || []
const scoreElement = document.querySelector("p")
const button = document.querySelector("button")
const input = document.querySelector("input")


scoreElement.innerText = score


const saveHandler = () => {
    if (!input.value || !score) {
        alert("invalied")
    }
    else {
        const finallScore = {name: input.value , score,}
        highScore.push(finallScore)
        highScore.sort((a,b) => b.score - a.score)
        highScore.splice(10)
        localStorage.setItem("highScore",JSON.stringify(highScore))
        localStorage.removeItem("score")
        window.location.assign("/")

    }
}






button.addEventListener("click", saveHandler)