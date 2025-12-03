const chatbox = document.getElementById("chatbox");
const input = document.getElementById("userInput");
const btn = document.getElementById("sendBtn");

function showMessage(role, text) {
    const div = document.createElement("div");
    div.style.margin = "10px 0";
    div.innerHTML = `<b>${role}:</b> ${text}`;
    chatbox.appendChild(div);
    chatbox.scrollTop = chatbox.scrollHeight;
}

btn.onclick = async () => {
    const question = input.value.trim();
    if (!question) return;

    showMessage("You", question);
    input.value = "";

    const response = await fetch("/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: question })
    });

    const data = await response.json();
    showMessage("AI", data.answer);
};
