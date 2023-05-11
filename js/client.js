const socket = io("http://localhost:8000", {
  transports: ["websocket", "polling", "flashsocket"],
});

const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container");
//var audio = new Audio(file.name);

const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
//   if(position == 'left'){
//      //   audio.play();
//   }
 
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  append(`You: ${message}`, "right");
  socket.emit("send", message);
  messageInput.value = "";
});
const name = prompt("Name");
socket.emit("new-user-joined", name);

socket.on("user-joined", (name) => {
  append(`${name} in the room`, "right");
});

socket.on("receive", (data) => {
  append(`${data.name}: ${data.message}`, "left");
});

socket.on("leave", (data) => {
  append(`${name}: Left the chat`, "left");
});
