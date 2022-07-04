"use strict"

const socket = io();

const nickname = document.querySelector("#nickname");
const chatList = document.querySelector(".chatting-list");
const chatInput = document.querySelector(".chatting-input");
const sendButton = document.querySelector(".send-button");
const displayContiner = document.querySelector(".display-container");


function send(){
    const para = {
        name : nickname.value,
        msg : chatInput.value,
    }
    socket.emit("mychat", para);
}

sendButton.addEventListener("click", send)
chatInput.addEventListener("keypress", event =>{
    if(event.keyCode === 13){
        send();
    }
})


socket.on("mychat", (data)=>{
    const {name , msg, time } = data; //쪼개기
    const item = new LiModel(name, msg, time);
    item.makeLi();
    displayContiner.scrollTo(0, displayContiner.scrollHeight);
})

// construct function?
function LiModel(name , msg, time){
    this.name = name;
    this.msg = msg;
    this.time = time;

    this.makeLi = () => {
        const li = document.createElement("li");
        li.classList.add(nickname.value === this.name ? "sent" : "receive")
        const dom = `<span class="profile">
            <span class="user">${this.name}</span>
            <img src="https://placeimg.com/50/50/any" alt="any" class="image">
        </span>
        <span class="message">${this.msg}</span>
        <span class="time">${this.time}</span>`
        li.innerHTML = dom;
        chatList.append(li);
    }
}

console.log(socket);