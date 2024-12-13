document.addEventListener('DOMContentLoaded', () => {
    const messageForm = document.getElementById('message-form');
    const messageInput = document.getElementById('message-input');
    const messageArea = document.getElementById('message-area');

    // Cargar mensajes desde el localStorage al inicio
    let messages = JSON.parse(localStorage.getItem('messages')) || [];

    // Función para renderizar todos los mensajes
    function renderMessages() {
        messageArea.innerHTML = '';
        messages.forEach((msg) => {
            const messageElement = document.createElement('div');
            messageElement.classList.add('message');
            const [date, time] = msg.timestamp.split(', ');
            messageElement.innerHTML = `
                <div>${date}</div>
                <div>${time}: <strong>${msg.text}</strong></div>
            `;
            messageArea.appendChild(messageElement);
        });
        messageArea.scrollTop = messageArea.scrollHeight;
    }

    // Función para añadir un nuevo mensaje
    function addMessage(text) {
        const timestamp = new Date().toLocaleString();
        const newMessage = { text, timestamp };
        messages.push(newMessage);
        localStorage.setItem('messages', JSON.stringify(messages));
        renderMessages();
    }

    // Evento para el envío del formulario
    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = messageInput.value.trim();
        if (text) {
            addMessage(text);
            messageInput.value = '';
        }
    });

    // Renderizar mensajes al cargar la página
    renderMessages();
});
