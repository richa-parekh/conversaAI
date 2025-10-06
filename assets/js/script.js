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
	const themeSwitch = document.getElementById('themeSwitch');

	if(!themeSwitch){
		console.error('Theme switch button not found!');
		return;
	}

	const savedTheme = localStorage.getItem('theme');
	console.log(`Saved theme: ${savedTheme}`);

	if(savedTheme === 'dark'){
		document.documentElement.classList.add('dark');
	}
console.log(`Saved theme: ${savedTheme}`);
	themeSwitch.addEventListener('click', function(){
		console.log('Theme switch button clicked');

		document.documentElement.classList.toggle('dark');

		const isDark = document.documentElement.classList.contains('dark');

		if(isDark){
			localStorage.setItem('theme', 'dark');
			console.log('Switched to dark mode');
		} else {
			localStorage.setItem('theme', 'light');
			console.log('Switched to light mode');
		}
	});
	console.log('Theme switch si ready');
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