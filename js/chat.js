const URL = "https://api.openai.com/v1/chat/completions";
const API_KEY = "YOUR_API_KEY";
const chatInput = document.querySelector(".chat-input");
const conversation = document.querySelector(".conversation");
const chatButton = document.querySelector(".chat-button");

let requestChat = new RequestChat("gpt-3.5-turbo", [
  new Message(
    "system",
    "Você vai ser um assistente virtual, me auxiliando em qualquer tipo de assunto."
  ),
]);

async function sendAsync() {
  const message = chatInput.value;
  requestChat.messages.push(new Message("user", message));
  createContent(message, "question");
  chatInput.value = "";
  chatButton.style.display = "none";
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestChat),
  });
  const jsonResponse = await response.json();
  const messageResponse = jsonResponse.choices[0].message;
  requestChat.messages.push(
    new Message(messageResponse.role, messageResponse.content)
  );
  createContent(messageResponse.content, "response");
  chatButton.style.display = "block";
}

function createContent(message, className) {
  const containerElement = document.createElement("div");
  containerElement.classList.add(className);
  const containerSonElement = document.createElement("div");
  containerSonElement.classList.add("son");
  const paragraphElement = document.createElement("p");
  paragraphElement.innerText = message;
  paragraphElement.classList.add("tipping");
  containerSonElement.appendChild(paragraphElement);
  containerElement.appendChild(containerSonElement);
  conversation.appendChild(containerElement);
}
