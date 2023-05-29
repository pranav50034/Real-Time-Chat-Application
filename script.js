const socket = io();

let username = "";
document.getElementById("join-btn").addEventListener("click", (event) => {
   event.preventDefault();
   username = document.getElementById("username-input").value;
   if (username.trim() != "") {
      document.querySelector(".form-username").style.display = "none";
      document.querySelector(".chatroom-container").style.display = "block";
      document.querySelector(
         ".chatroom-header"
      ).innerText = `Chatroom - ${username}`;
   }
});

document.getElementById("send-btn").addEventListener("click", (event) => {
   event.preventDefault();
   const data = {
      username: username,
      message: document.getElementById("message-input").value,
   };

   socket.emit("message", data);
   addMessage(data, true);
});

socket.on("message", (data) => {
   if (data.username !== username) {
      addMessage(data, false);
   }
});

function addMessage(data, check) {
   var msgDiv = document.createElement("div");
   msgDiv.innerText = `${data.username}: ${data.message}`;
   if (check) {
      msgDiv.setAttribute("class", "message sent");
   } else {
      msgDiv.setAttribute("class", "message received");
   }
   document.getElementById("messages-container").appendChild(msgDiv);
   document.getElementById("message-input").value = "";
}
