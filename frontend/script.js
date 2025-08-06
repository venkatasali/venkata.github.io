// 🔥 REPLACE THIS WITH YOUR LIGHTSAIL PUBLIC IP
const BACKEND_IP = "18.224.221.41";  // ← Your Lightsail IP here
const wsUrl = `ws://${BACKEND_IP}:8000/ws`;

let socket;

function log(msg) {
  const div = document.getElementById("messages");
  div.innerHTML += `<div>${msg}</div>`;
}

function connect() {
  socket = new WebSocket(wsUrl);
  document.getElementById("url").textContent = wsUrl;

  socket.onopen = () => log("✅ Connected!");
  socket.onmessage = (event) => log("⬅️ " + event.data);
  socket.onclose = () => log("❌ Disconnected. Trying to reconnect...");
  socket.onerror = (err) => log("🚨 Error");
}

function send() {
  const input = document.getElementById("inputMsg");
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(input.value);
    log("➡️ " + input.value);
    input.value = "";
  } else {
    log("❌ Not connected");
  }
}

// Auto-connect when page loads
connect();