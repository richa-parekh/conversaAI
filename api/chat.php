<?php
// ===============================
// CHAT API ENDPOINT
// ===============================
// Allow config to be loadded
define('API_ACCESS', true);
require_once __DIR__.'/config.php';

// ===============================
// HANDALE PREFLIGHT REQUESTS
// ===============================
// Browsers send OPTIONS request before POST (CORS check)
if($_SERVER['REQUEST_METHOD'] === 'OPTIONS'){
    http_response_code(200);
    exit();
}

// ===============================
// ALLOW ONLY POST REQUEST
// ===============================
if($_SERVER['REQUEST_METHOD'] !== 'POST'){
    http_response_code(405); // Method not allowed
    echo json_encode([
        'success' => false,
        'error' => 'Only POST request allowed'
    ]);
    exit();
}

// ===============================
// GET AND VALIDATE INPUT
// ===============================

// Get row POST data (JSON from frontend)
$rawInput = file_get_contents('php://input');

// Decode JSON to PHP array
$input  = json_decode($rawInput, true);

// Check is JSON is valid
if(json_last_error() !== JSON_ERROR_NONE){
    http_response_code(400); // Bad request
    echo json_encode([
        'success' => false,
        'error' => 'Invalide JSON input'
    ]);
    exit();
}

// Validate that message exists
if(!isset($input['message']) || empty(trim($input['message']))){
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Message is required'
    ]);
    exit();
}

$userMessage = trim($input['message']);

// ===============================
// LOG REQUEST (for debugging)
// ===============================
error_log("Chat API: Received message - " . $userMessage);




// ===============================
// CONNECT TO OLLAMA
// ===============================
/* Send message to ollama and get response */
function getOllamaResponse($message){
    // Prepare request data for ollama
    $requestData = [
        'model' => OLLAMA_MODEL,
        'prompt' => $message,
        'stream' => false
    ];

    // Initialize cURL
    $ch = curl_init(OLLAMA_API_URL);

    // Set cURL options
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode($requestData),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => [
            'Content-Type: application/json'
        ],
        CURLOPT_TIMEOUT => OLLAMA_TIMEOUT
    ]);

    // Exxecute request
    $response = curl_exec($ch);
    
    // Check for the error
    if(curl_errno($ch)) {
        $error = curl_error($ch);
        curl_close($ch);

        error_log('Ollama API Error:'. $error);
        return [
            'success' => false,
            /* 'error' => 'Failed to connect Ollama:' . $error */
            'error' => 'Failed to connect Ollama'
        ];
    }

    // Get HTTP status code
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlInfo = curl_getinfo($ch);
    curl_close($ch);

    // Check HTTP status
    if($httpCode !== 200){
        error_log('Ollama HTTP Error: '. $httpCode);
        error_log('Ollama response body: ' . var_export($response, true));
        error_log('Ollama curl info: ' . var_export($curlInfo, true));
        return [
            'success' => false,
            'error' => 'Ollama returned status code: '. $httpCode
        ];
    }

    // Parse Ollama response
    $responseData = json_decode($response, true);

    if(json_last_error() !== JSON_ERROR_NONE){
        error_log('Ollama JSON decode error: ' . json_last_error_msg());
        error_log('Ollama raw response: ' . var_export($response, true));
        return [
            'success' => false,
            'error' => 'Invalide response from Ollama'
        ];
    }

    // Extract the AI's message
    if(isset($responseData['response'])){
        error_log('Ollama response: ' . $responseData['response']);
        return [
            'success' => true,
            'message' => $responseData['response'],
            'model' => OLLAMA_MODEL,
            'timestamp' => date('Y-m-d H:i:s')
        ];
    }else{
        error_log('Ollama unexpected payload: ' . var_export($responseData, true));
        return [
            'success' => false,
            'error' => 'Unexpected response formate from Ollama'
        ];
    }
}


// ===============================
// GET OLLAMA RESPONSE
// ===============================

$response = getOllamaResponse($userMessage);
echo json_encode($response);