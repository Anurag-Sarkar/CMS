document.querySelectorAll(".gugu").forEach((data)=>{
    data.setAttribute("contenteditable",false)
})

document.querySelectorAll(".ri-file-copy-2-fill").forEach((data)=>{
    data.style.backgroundColor = "white"
    data.style.color = "black"

})
function removeList(){
    document.querySelectorAll("li").forEach((e)=>{
        if(e.innerHTML.split(" ")[0] === "<img" ){
            console.log("lol")
            e.style.listStyleType = "none"
        }
    })
}
removeList()

document.querySelectorAll(".ri-file-copy-2-fill").forEach((data)=>{
    data.addEventListener("click",(e)=>{
        data.style.backgroundColor = "green"
        data.style.color = "white"
       navigator.clipboard.writeText(e.target.parentNode.textContent)
       setTimeout((e)=>{
        data.style.backgroundColor = "white"
        data.style.color = "black"
       },3000)
    })
})