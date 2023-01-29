var textColor

document.querySelectorAll(".preloader").forEach((e)=>{
    e.remove()
})
document.querySelectorAll("iframe").forEach((e)=>{
    console.log(e)
})
function saveData(){
    
    console.log()
    axios({
        method: "post",
        url: "/saveblog",
        data:{
            blog: document.querySelector("#editor").innerHTML,
        }
    });
}
document.querySelector("#save").addEventListener("click",()=>{
    saveData()
})
function title(){

    const parent = document.querySelector("#text-content")
    const children = Array.from(parent.children);
    children.forEach((e,index)=>{
        if(e.textContent.length === 0 && e.localName != "img" && e.localName != "iframe" && e.localName != "div"){
            e.remove()
        }
        e.setAttribute("title","del"+index)
    })
}
function imgdelete(){
    document.querySelectorAll("img").forEach((d)=>{
        d.addEventListener("dblclick",(e)=>{
            elem = d.getAttribute("src").split(".")
            elem = elem[elem.length-1]
            if(elem === "jpg" || elem === "png" || elem === "jpeg" || elem === "webp"){
                axios({
                    method: "post",
                    url: "/deleteimg",
                    data:{
                        file: "../public/"+d.getAttribute("src"),
                    }
                });
            }
            else{
                console.log("not image")
            }
            e.target.remove()
            


        })
    })
}
imgdelete()

function viddelete(){
    document.querySelectorAll(".btn-delete").forEach((d)=>{
        console.log(d)
        d.addEventListener("click",(e)=>{
            e.target.remove()
            document.querySelector("#"+e.target.id).remove()
            console.log(e.target.id);
        })
    })
}
viddelete()



function sepdel(){
    document.querySelectorAll("hr").forEach((d)=>{

        d.addEventListener("dblclick",(e)=>{
            e.target.remove()
        })
    })
}
sepdel()
function codedel(){

    document.querySelectorAll(".ri-delete-bin-6-fill").forEach((data)=>{
        console.log({data})
        data.addEventListener("click",()=>{
            console.log("deleted")
            data.parentNode.remove()
        })
    })
}
codedel()

var timing = 0
const resetTimer = ()=>{
    clearInterval(timer)
    timing = 0
}
const timer = ()=>{
    setInterval((e) => {
    timing++
    if (timing === 5){
        }
}, 1000)
}
document.onkeydown = resetTimer
timer()

function deleteline(){

    document.querySelectorAll("#text-line").forEach((data)=>{
        data.addEventListener("keydown",(e)=>{
            // console.log(e)
            if(e.target.textContent.length < 1 && e.key === "Backspace"){
                console.log(e.target)
                e.target.remove()
            }
        })
    })
}

deleteline()
title()







const modifyText = (command, def, value) => {
    console.log(value,"value")
    document.execCommand(command, false, value)
} 

document.querySelector("#line").addEventListener("click", () => {
    var elem = document.createElement("pre")
    elem.setAttribute("id", "text-line")
    elem.setAttribute("class", "gugu")
    elem.setAttribute("contenteditable", "true")
    elem.setAttribute("style", "margin-bottom: 20px; font-size: 20px; font-family: Arial, Helvetica, sans-serif;")
    elem.textContent = "Enter text here⠀    "
    document.querySelector("#text-content").insertBefore(elem, document.querySelector("#options"))
    title()
    deleteline()
    document.querySelectorAll("#text-line").forEach((e)=>{
        console.log(e,"data")
        e.addEventListener("click",(d)=>{
            if(d.target.textContent === "Enter text here⠀    "){
                d.target.textContent = ""
            }
        })
    })
})

document.querySelector("#imageinsert").addEventListener("click", () => {
    
    document.querySelector("#choose").style.opacity = 1
    document.querySelector("#choose").style.pointerEvents = "all"
    document.querySelector("#done").addEventListener("click",()=>{
        document.querySelector("#choose").style.opacity = 0
        document.querySelector("#choose").style.pointerEvents = "none"
        var elem = document.createElement("img")
        var link_img = prompt("Enter link of image")
        if (link_img.trim().length > 0) {
            elem.setAttribute("src", link_img)
            elem.setAttribute("style", "margin-bottom: 30px;")
            document.querySelector("#text-content").insertBefore(elem, document.querySelector("#options"))
        }
        console.log("insertyed")
        title()
        imgdelete()

    })
    
})
document.querySelector("#choose input").addEventListener("change",(data)=>{
        document.querySelector("#choose").style.opacity = 0
        document.querySelector("#choose").style.pointerEvents = "none"
            var formData = new FormData(document.querySelector("#addimg"));
        console.log(formData)
        $.ajax({
            type:'POST',
            url: '/addimg',
            data: formData,
            cache:false,
            contentType: false,
            processData: false,
            success:function(data){
                console.log("success");
                console.log(data);
                var elem = document.createElement("img")
                elem.setAttribute("src", data)
                elem.setAttribute("style", "margin-bottom: 30px;")
                document.querySelector("#text-content").insertBefore(elem, document.querySelector("#options"))
                title()
                imgdelete()
            },
            error: function(data){
                console.log("error");
                console.log(data);
            }
        });
})
document.querySelector("#video").addEventListener("click", () => {
    ID = "del"+String(Date.now())
    var elem = document.createElement("iframe")
    var btn = document.createElement("button")
    btn.setAttribute("id", ID)
    btn.setAttribute("class", "btn-delete")
    btn.textContent = "Delete"
    var link_video = prompt("Enter link of image")
    if (link_video.trim().length > 0) {
        
        elem.setAttribute("src", link_video)
        elem.setAttribute("id", ID)
        elem.setAttribute("style", "margin-bottom: 30px;")
        document.querySelector("#text-content").insertBefore(elem, document.querySelector("#options"))
        document.querySelector("#text-content").insertBefore(btn, document.querySelector("#options"))
    }
    title()
    viddelete()
})

document.querySelector("#seperator").addEventListener("click", () => {
    var elem = document.createElement("div")
    elem.innerHTML = "<hr>"
    document.querySelector("#text-content").insertBefore(elem, document.querySelector("#options"))
    title()
    sepdel()
})
document.querySelector("#code").addEventListener("click", () => {
    var elem = document.createElement("pre")
    elem.setAttribute("id", "code-box")
    console.log(elem);
    var code = document.createElement("code")
    code.textContent = "Enter Code Here"
    code.setAttribute("contenteditable", "true")
    code.setAttribute("data-language", prompt("Enter Language").toLowerCase())
    code.setAttribute("class", "gugu")
    elem.innerHTML = code.outerHTML
    elem.innerHTML += '<i class="ri-file-copy-2-fill"></i>'
    elem.innerHTML += '<i class="ri-delete-bin-6-fill"></i>'
    document.querySelector("#text-content").insertBefore(elem, document.querySelector("#options"))
    title()
    codedel()

})


document.querySelector("#bold").addEventListener("click", () => {
    modifyText("bold", false, null)
})
document.querySelector("#italic").addEventListener("click", () => {
    modifyText("italic", false, null)
})
document.querySelector("#insertUnorderedList").addEventListener("click", () => {
    modifyText("insertUnorderedList", false, null)
})
document.querySelector("#insertOrderedList").addEventListener("click", () => {
    modifyText("insertOrderedList", false, null)
})
document.querySelector("#heading1").addEventListener("click", () => {
    modifyText("formatBlock", false, "<h1>")
})
document.querySelector("#heading2").addEventListener("click", () => {
    modifyText("formatBlock", false, "<h2>")
})
document.querySelector("#heading3").addEventListener("click", () => {
    modifyText("formatBlock", false, "<h3>")
})
document.querySelector("#insertParagraph").addEventListener("click", () => {
    modifyText("formatBlock", false, "<p>")
})
document.querySelector("#createLink").addEventListener("click", () => {
    modifyText("createLink", false, prompt("insert link"))
})
document.querySelector("#unlink").addEventListener("click", () => {
    modifyText("unlink", false, null)
})
document.querySelector("#colorr").addEventListener("change", (e) => {
    textColor = e.target.value
    console.log(textColor)
})
document.querySelector("#formatColor").addEventListener("click", (e) => {
    modifyText("foreColor", false, textColor)
})
document.querySelector("#img").addEventListener("click", () => {
    var link
    console.log("challa")
    document.querySelector("#choose2").style.opacity = 1
    document.querySelector("#choose2").style.pointerEvents = "all"

    document.querySelector("#done2").addEventListener("click",()=>{
        document.querySelector("#choose2").style.opacity = 0
        document.querySelector("#choose2").style.pointerEvents = "none"
        link = prompt("Enter link of image")
        if(link.trim().length > 0){
            modifyText("insertImage", false, link)
        }
        
    })
    document.querySelector("#choose2 input").addEventListener("change",()=>{
        var deta
        document.querySelector("#choose2").style.opacity = 0
        document.querySelector("#choose2").style.pointerEvents = "none"
        modifyText("insertImage", false, link)
        
        var formData = new FormData(document.querySelector("#addimg2"));
        $.ajax({
            type:'POST',
            url: '/addimg',
            data: formData, 
            cache:false,
            contentType: false,
            processData: false,
            success:function(data){
                console.log(link)
            },
            error: function(data){
                console.log("error");
            }
        });
    })
})
document.querySelector("#blockquote").addEventListener("click", () => {
    modifyText("formatBlock", false, "<blockquote>")
})
document.querySelector("#remove").addEventListener("click", () => {
    document.execCommand("removeFormat", false, "foreColor");
})


document.querySelector("#colorr").addEventListener("input",("click",(e)=>{
    modifyText("foreColor", false, e.target.value)
    document.querySelectorAll("h2").forEach((data)=>{
        data.style.borderLeft = "5px solid "+e.target.value
    })
    document.querySelectorAll("font").forEach((data)=>{
        console.log(data)
        data.style.color = e.target.value
        data.style.fontWeight = 700

    })
}))
document.querySelectorAll(".ri-file-copy-2-fill").forEach((data)=>{
    console.log({data})
    data.addEventListener("click",(e)=>{
        console.log("copied")
        data.style.backgroundColor = "green"
        data.style.color = "white"
        console.log(e.target)
       navigator.clipboard.writeText(e.target.parentNode.textContent)
       setTimeout((e)=>{
        data.style.backgroundColor = "white"
        data.style.color = "black"
       },3000)
    })
})


window.addEventListener("change",()=>{
    console.log("changed")
    // saveData()
})

editor.addEventListener("paste", function(e) {
    e.preventDefault();
    console.log("pasted",e)
    var text = (e.originalEvent || e).clipboardData.getData('text/plain');
    document.execCommand("insertHTML", false, text);
});
document.querySelectorAll("#text-line").forEach((e)=>{
    console.log(e,"data")
    e.addEventListener("click",(d)=>{
        console.log(d)
    })
})

