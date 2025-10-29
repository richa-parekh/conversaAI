// ============================================
// CALL CHAT API
// ============================================
const CURRENT_URL = window.location.href;
export async function callChatAPI(message) {
    console.log('Calling API with message: ', message);
    
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
    console.log('API response: ', data);

    return data;
}