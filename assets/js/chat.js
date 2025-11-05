import { hideWaitingIndicator, scrollToBottom, setupMarked } from "./script.js";
// ============================================
// CALL CHAT API
// ============================================
const CURRENT_URL = window.location.href;
/* export async function callChatAPI(message) {
    console.log('Calling streaming API...');
    // API endpoint URL
    //const apiUrl = 'C:\learning_projects\conversaAI\api\chat.php';
    const apiUrl = CURRENT_URL + 'api/chat.php';

    // Prepare data to send
    const requestData = {
        message: message
    };

    // Make fetch request
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(requestData)
    });

    if(!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse JSON response
    const data = await response.json();
    return data;
} */

export async function callChatAPI(message) {
    console.log('==IN CHAT.JS==');
    console.log('Calling streaming API...');
    const apiURL = CURRENT_URL + 'api/chat.php';

    return new Promise((resolve, reject) => {
        fetch(apiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        })
            .then(response => { 
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const reader = response.body.getReader();
                const decoder = new TextDecoder();

                let accumulateResponse = '';
                let messageStarted = false; // <-- NEW FLAG
                let messageElement = null;

                /* const messageElement = createAIMessageElement();
                hideWaitingIndicator(); */

                function readStream() {
                    reader.read().then(({ done, value }) => {
                        console.log("==1=="); 
                        console.log('done => ' + done); 
                        console.log('value => ' + value); 
                        if (done) {
                            console.log("==2==");
                            console.log('Stream complete');
                            console.log('accumulateResponse => ' + accumulateResponse);
                            resolve({ success: true, message: accumulateResponse });
                            return;
                        }
                        console.log("==3==");
                        const chunk = decoder.decode(value, { stream: true });
                        const lines = chunk.split('\n');

                        for (const line of lines) {
                            console.log("==FOR LOOP STARTED==");
                            if (line.startsWith('data: ')) {
                                const jsonStr = line.substring(6).trim();
                                try {
                                    console.log("==TRY==");
                                    if (jsonStr.startsWith('{') && jsonStr.endsWith('}')) {
                                        const data = JSON.parse(jsonStr);
                                        console.log("jsonStr => " + jsonStr);
                                        console.log("data.type => " + data.type);
                                        if (data.type === 'chunk') {
                                            // Only on first message chunk
                                            if (!messageStarted) {
                                                hideWaitingIndicator();
                                                messageElement = createAIMessageElement(); // create cloned template
                                                messageStarted = true;
                                            }
                                            console.log("==4==");
                                            console.log("data.content => "+ data.content);
                                            accumulateResponse += data.content;
                                            updateAIMessageContent(messageElement, accumulateResponse);
                                            setTimeout(() => scrollToBottom(), 50);
                                        } else if (data.type === 'error') {
                                            reject(new Error(data.message));
                                            return;
                                        }
                                    }
                                } catch (e) {
                                    console.error('Error parsing SSE:', e, 'Line:', line);
                                }
                            }
                        }

                        readStream();
                    });
                }

                readStream();
            }) 
            .catch(error => { console.error("==CATCH=="); console.error(error);
                reject(error);
            });
    });
}


function createAIMessageElement() {
    let chatContainer = document.getElementById('chatContainer');
    let aiMessageContainer = document.getElementById('aiMessageContainer');

    let template = aiMessageContainer.content.cloneNode(true);
    /* template.querySelector('#aiMessage').textContent = text; */
    chatContainer.appendChild(template);
    // Return the created element
    /*  return template; */
    return chatContainer.lastElementChild;
    /* setTimeout(() => scrollToBottom(), 50); */
}

function updateAIMessageContent(element, content) {
    const html = marked.parse(content);
    element.querySelector('#aiMessage').innerHTML = html;
}