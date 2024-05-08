const buttons = document.querySelectorAll("button")



const  selectHandler = evevnt => {
    const level = evevnt.target.innerText.toLowerCase()
    localStorage.setItem("level",level)
    window.location.assign("/")
    
}





buttons.forEach((button) => {
    button.addEventListener("click",selectHandler)
})