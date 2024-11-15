document.getElementById('send-btn').addEventListener('click', async () => {
    const userInput = document.getElementById('user-input').value;
    const sendButton = document.getElementById('send-btn');
    const loadingDiv = document.getElementById('loading');
    const messagesDiv = document.getElementById('messages');

    if (!userInput) return;

    // Disable button and show loading
    sendButton.disabled = true;
    loadingDiv.style.display = 'block';

    // Display user's message
    const userMessageDiv = document.createElement('div');
    userMessageDiv.classList.add('user-message');
    userMessageDiv.textContent = userInput;
    messagesDiv.appendChild(userMessageDiv);

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userInput }),
        });

        const data = await response.json();

        // Format AI's response with bold and italic
        let formattedResponse = data.message
            .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') // Bold
            .replace(/``(.*?)``/g, '<i>$1</i>');   // Italic

        // Display AI's response
        const aiMessageDiv = document.createElement('div');
        aiMessageDiv.classList.add('ai-message');
        aiMessageDiv.innerHTML = formattedResponse; // Allow HTML
        messagesDiv.appendChild(aiMessageDiv);

    } catch (error) {
        console.error('Error:', error);
        loadingDiv.textContent = 'An error occurred. Please try again.';
    } finally {
        // Re-enable button and hide loading
        sendButton.disabled = false;
        loadingDiv.style.display = 'none';
        document.getElementById('user-input').value = ''; // Clear input
        messagesDiv.scrollTop = messagesDiv.scrollHeight; // Scroll to bottom
    }
});
