document.getElementById("sendBtn").onclick = async function () {
    const question = document.getElementById("userInput").value;

    const response = await fetch("/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: question })
    });

    const data = await response.json();

    document.getElementById("answerBox").innerHTML = data.answer;
};
