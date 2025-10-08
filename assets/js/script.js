// ============================================
// 1. WAIT FOR PAGE TO LOAD
// ============================================
// This ensure HTML is fully loaded before JS runs
document.addEventListener('DOMContentLoaded', function () {
	console.log('Page Loaded. JS ready');
	// Call initialization function
	init();
});

// ============================================
// 2. INITIALIZATION FUNCTION
// ============================================
function init() {
	console.log('Initializing app...');
	setupThemeSwitch();
	setupMessageForm();
}

// ============================================
// 3. THEME FUNCTION
// ============================================
function setupThemeSwitch() {
	const themeSwitch = document.getElementById('themeSwitch');

	if (!themeSwitch) {
		console.error('Theme switch button not found!');
		return;
	}

	const savedTheme = localStorage.getItem('theme');
	console.log(`Saved theme: ${savedTheme}`);

	if (savedTheme === 'dark') {
		document.documentElement.classList.add('dark');
	}
	console.log(`Saved theme: ${savedTheme}`);
	themeSwitch.addEventListener('click', function () {
		console.log('Theme switch button clicked');

		document.documentElement.classList.toggle('dark');

		if (currentTheme()) {
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
function setupMessageForm() {
	const chatForm = document.getElementById('chatForm');
	const userInput = document.getElementById('userInput');
	const sendButton = document.getElementById('sendBtn');

	if (!chatForm || !userInput || !sendButton) {
		console.error('Form element not found!');
		return;
	}
	let userMessage = '';
	userInput.addEventListener('input', function () {
		userMessage = userInput.value.trim();
		const hasText = userMessage.length > 0;
		updateSendButton(hasText);
	});
	chatForm.addEventListener('submit', function (event) {
		event.preventDefault();

		console.log(`form submitted ${userMessage}`);
		sendMessage(userMessage);

		userInput.value = '';
		userInput.focus();
		updateSendButton();
	});

	console.log('Message form ready!');
}

function sendMessage(text) {
	console.log(`Sending Message ${text}`);

	displayUserMessage(text);

	setTimeout(function () {
		displayAIMessage('This is test AI response message');
	}, 1000);
}

function displayUserMessage(text) {
	console.log(`Displaying user message ${text}`);
}

function displayAIMessage(text) {
	console.log(`Displaying AI message ${text}`);
}

// ============================================
// 5. CHECK CURRENT THEME
// ============================================
function currentTheme() {
	const isDark = document.documentElement.classList.contains('dark');
	return isDark;
}

// ============================================
// 6. UPDATE SEND BUTTON BEHAVIOR-STYLE
// ============================================
function updateSendButton(hasText) {
	console.log(`userMessage ${hasText ? 'entered' : 'removed'}`);
	const sendButton = document.getElementById('sendBtn');
	sendButton.disabled = !hasText;

	const isDark = currentTheme();
	const activeClass = isDark ? 'send-btn-active-dark' : 'send-btn-active';
	const defaultClass = isDark ? 'send-btn-default-dark' : 'send-btn-default';

	sendButton.classList.toggle(activeClass, hasText);
	sendButton.classList.toggle(defaultClass, !hasText);
}