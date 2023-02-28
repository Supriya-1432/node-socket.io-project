const socket=io()

let name1
let textarea=document.querySelector("#textarea")
let messageArea=document.querySelector(".message__area")
do{
    name1=prompt("enter yor nam to join");
}while(!name1)

textarea.addEventListener('keyup',(e)=>{
    if(e.key==='Enter'){
        sendMessage(e.target.value)
    }
})

function sendMessage(message){
    let msg={
        user:name1,
        message:message.trim()
    }
    
    appendMeessage(msg,'outgoing')
    textarea.value=''
    scrollToBottom()

    //server

    socket.emit('message',msg)
}
function appendMeessage(msg,type){
     let mainDiv=document.createElement('div')
     let className=type
     mainDiv.classList.add(className,'message')

    let markup=`<h4>${msg.user}</h4>
                <p>${msg.message}</p>`
    mainDiv.innerHTML=markup
    messageArea.appendChild(mainDiv)
}


//receive

socket.on('message',(msg)=>{
    appendMeessage(msg,'incoming')
    scrollToBottom()
})

function scrollToBottom(){
    messageArea.scrollTop=messageArea.scrollHeight
}
