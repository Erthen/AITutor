const chatbox = document.getElementById("chatbox");
const input = document.getElementById("userInput");
const btn = document.getElementById("sendBtn");

// Function to show messages
function showMessage(role, text) {
    const div = document.createElement("div");
    div.className = role;
    div.innerHTML = `<p>${text}</p>`;
    chatbox.appendChild(div);
    chatbox.scrollTop = chatbox.scrollHeight;
}

btn.onclick = async () => {
    const question = input.value.trim();
    if (!question) return;

    showMessage("user", question);
    input.value = "";

    // Send data to backend
    const response = await fetch("/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: question })
    });

    const data = await response.json();
    showMessage("bot", data.answer);
};
