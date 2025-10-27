<?php
header('Content-Type: application/json');

function testOllamaConnection() {
    $url = "http://localhost:11434/api/generate";
    
    $postData = json_encode([
        "model" => "llama3.2:1b",
        "prompt" => "Say hello in a friendly way!",
        "stream" => false
    ]);
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Content-Length: ' . strlen($postData)
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);
    
    return [
        'success' => $httpCode === 200 && !$error,
        'response' => $response,
        'error' => $error,
        'http_code' => $httpCode
    ];
}

$result = testOllamaConnection();
echo json_encode($result, JSON_PRETTY_PRINT);
?>