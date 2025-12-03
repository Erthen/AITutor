document.getElementById("sendBtn").addEventListener("click", sendMessage);

async function sendMessage() {
    const input = document.getElementById("userInput");
    const message = input.value.trim();
    if (!message) return;

    addMessage("You", message);
    input.value = "";

    try {
        const response = await fetch("https://aitutor-rwfq.onrender.com/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message })
        });

        const data = await response.json();
        addMessage("AI", data.reply);
    } catch (error) {
        addMessage("AI", "Server error. Please try again.");
    }
}

function addMessage(sender, text) {
    const box = document.getElementById("chatbox");
    box.innerHTML += `<p><b>${sender}:</b> ${text}</p>`;
    box.scrollTop = box.scrollHeight;
}
