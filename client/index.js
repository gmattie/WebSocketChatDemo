const wsDomain = window.location.hostname;
const wsScheme = wsDomain === "localhost" ? "ws" : "wss";
const wsPort = wsDomain === "localhost" ? 3000 : 443;
const webSocket = new WebSocket(`${wsScheme}://${wsDomain}:${wsPort}/`);
webSocket.onmessage = (event) => {
  let message;

  try {
    const data = JSON.parse(event.data);
    message = `${data.name}: ${data.message}`
  }
  catch (error) {
    message = event.data
  }

  document.getElementById("messages").innerHTML += message + "<br>";
};

const inputName = document.getElementById("name")
const inputMessage = document.getElementById("message")

const sendMessage = (event) => {
  event.preventDefault();
  
  webSocket.send(JSON.stringify({ name: inputName.value, message: inputMessage.value }))
  inputMessage.value = ""
}

document.getElementById("input-form").addEventListener("submit", sendMessage);