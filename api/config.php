<?php
// ============================================
// CONFIGURATION FILE
// ============================================
// This file contains settings used across API

if(!defined('API_ACCESS')){
    die('Direct access not permitted!');
}

// Ollama API settings
define('OLLAMA_API_URL', 'http://localhost:11434/api/generate');
define('OLLAMA_MODEL', 'llama3.2:1b');

// Response settings
define('OLLAMA_STREAM', true);
define('OLLAMA_TIMEOUT', 60);

// CORS settings (for local development)
// CORS = Cross-Origin Resource Sharing
// Allows our frontend talks to our backend
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Error reporting (For development)
error_reporting(E_ALL);
if (!ini_get('display_errors')) {
    ini_set('display_errors', '1');
}
// echo ini_get('display_errors');
