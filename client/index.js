const webSocket = new WebSocket(`ws://${window.location.hostname}:443/`);
webSocket.onmessage = (event) => {
  console.log(event)
  document.getElementById("messages").innerHTML += 
    "Message from server: " + event.data + "<br>";
};
webSocket.addEventListener("open", () => console.log("We are connected"));

const inputMessage = document.getElementById("message")
const sendMessage = (event) => {
  event.preventDefault();
  
  webSocket.send(inputMessage.value)
  inputMessage.value = ""
}

document.getElementById("input-form").addEventListener("submit", sendMessage);