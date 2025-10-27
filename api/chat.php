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
// FOR NOW: SEND TEST RESPONSE
// ===============================

$response = [
    'success' => true,
    'message' => 'This is a test response from PHP! Your message was: '. $userMessage
];

echo json_encode($response);