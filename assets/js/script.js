// ============================================
// 1. WAIT FOR PAGE TO LOAD
// ============================================
// This ensure HTML is fully loaded before JS runs
document.addEventListener('DOMContentLoaded', function() {
	console.log("Page Loaded. JS ready");

	// Call initialization function
	init();
});

// ============================================
// 2. INITIALIZATION FUNCTION
// ============================================
function init() {
	console.log("Initializing app...");
	setupThemeSwitch();
	setupMessageForm();
}

// ============================================
// 3. THEME FUNCTION
// ============================================
function setupThemeSwitch(){
	console.log("Theme switch settings");
}

// ============================================
// 4. MESSAGE FUNCTIONS
// ============================================
function setupMessageForm(){
	console.log("Settings up message form");
}

function sendMessage(text){
	console.log(`Sending Message ${text}`);
}

function displayUserMessage(text){
	console.log(`Displaying user message ${text}`);
}

function displayAIMessage(text){
	console.log(`Displaying AI message ${text}`);
}