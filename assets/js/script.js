const INPUT_MAX_HEIGHT = 300;

// ============================================
// WAIT FOR PAGE TO LOAD
// ============================================
// This ensure HTML is fully loaded before JS runs
document.addEventListener('DOMContentLoaded', function () {
	console.log('Page Loaded. JS ready');
	// Call initialization function
	init();
});

// ============================================
// INITIALIZATION FUNCTION
// ============================================
function init() {
	console.log('Initializing app...');
	setupThemeSwitch();
	setupMessageForm();
	setupCopyButton();

	const userInput = document.getElementById('userInput');
	if (userInput) {
		userInput.focus();
	}

	console.log('=== APP READY ===');
}

// ============================================
// THEME FUNCTION
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
// MESSAGE FUNCTIONS
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

		userInput.style.height = 'auto';
		const newHeight = Math.min(userInput.scrollHeight, INPUT_MAX_HEIGHT);
		userInput.style.height = newHeight + 'px';

		userInput.style.overflowY = userInput.scrollHeight > INPUT_MAX_HEIGHT ? 'auto' : 'hidden';

		/* scrollToBottom(); */
	});
	chatForm.addEventListener('submit', function (event) {
		event.preventDefault();

		console.log(`form submitted ${userMessage}`);
		sendMessage(userMessage);

		userInput.value = '';
		userInput.style.height = 'auto';
		userInput.style.overflowY = 'hidden';
		userInput.blur();
		updateSendButton();
	});
	userInput.addEventListener('keypress', function (event) {
		if (event.key === 'Enter') {
			if (!event.shiftKey) {
				event.preventDefault();
				console.log('Enter pressed, submitting form');
				chatForm.dispatchEvent(new Event('submit', { cancelable: true }));
			}
		}
	});
	console.log('Message form ready!');
}

function sendMessage(text) {
	console.log(`Sending Message ${text}`);

	displayUserMessage(text);
	showWaitingIndicator();
	setTimeout(function () {
		hideWaitingIndicator();
		displayAIMessage('Test response from AI. Backend integration in Next Phase 4!');
	}, 3000);
}

function displayUserMessage(text) {
	let chatContainer = document.querySelector('#chatContainer');
	let userMessageContainer = document.querySelector('#userMessageContainer');

	let template = userMessageContainer.content.cloneNode(true);
	template.querySelector('#userMessage').textContent = text;
	chatContainer.appendChild(template);
	setTimeout(() => scrollToBottom(true), 50);
	console.info(`User message displayed ${text}`);
}

function displayAIMessage(text) {
	let chatContainer = document.getElementById('chatContainer');
	let aiMessageContainer = document.getElementById('aiMessageContainer');

	let template = aiMessageContainer.content.cloneNode(true);
	template.querySelector('#aiMessage').textContent = text;
	chatContainer.appendChild(template);
	setTimeout(() => scrollToBottom(), 50);
	console.info(`AI message displayed ${text}`);
}

// ============================================
// WAITING AI RESPONSE INDICATOR
// ============================================
function showWaitingIndicator() {
	let chatContainer = document.getElementById('chatContainer');
	let indicatorContainer = document.getElementById('indicatorContainer');

	let template = indicatorContainer.content.cloneNode(true);
	chatContainer.appendChild(template);
	setTimeout(() => scrollToBottom(), 50);
	console.info(`AI indicator displayed`);
}

// ============================================
// WAITING AI RESPONSE INDICATOR
// ============================================
function hideWaitingIndicator() {
	let indicator = document.querySelector('.indicator-wrapper');
	if (indicator) {
		indicator.remove();
	}
	console.info(`AI waiting indicator removed`);
}

// ============================================
// SETUP COPY TO CLIPBOARD
// ============================================
function setupCopyButton() {
	const chatContainer = document.querySelector('#chatContainer');
	if (!chatContainer) {
		console.error('Chat container not found!');
		return;
	}

	chatContainer.addEventListener('click', function (event) {
		const copyBtn = event.target.closest('.copy-btn');
		if (copyBtn) {
			console.log('Copy button clicked!');

			const aiMessage = copyBtn.closest('.message-ai')?.querySelector('.ai-message');

			if (aiMessage) {
				const textToCopy = aiMessage.textContent.trim();
				console.log(`Text to copy ${textToCopy}`);
				copyToClipboard(textToCopy, copyBtn);
			} else {
				console.warn('No .ai-message found near this copy button');
			}
		}
	});
}

// ============================================
// COPY TO CLIPBOARD
// ============================================
function copyToClipboard(text, button) {
	console.log('copyToClipboard');
	navigator.clipboard.writeText(text)
		.then(function () {
			console.log('text copied successfully');

			button.querySelector('.copy').classList.add('hidden');
			button.querySelector('.copied').classList.remove('hidden');

			setTimeout(function () {
				button.querySelector('.copied').classList.add('hidden');
				button.querySelector('.copy').classList.remove('hidden');
			}, 2000);
		})
		.catch(function (error) {
			console.error('Copy failed ', error);
			alert('Failed to copy text');
		});
}

// ============================================
// CHECK CURRENT THEME
// ============================================
function currentTheme() {
	const isDark = document.documentElement.classList.contains('dark');
	return isDark;
}

// ============================================
// UPDATE SEND BUTTON BEHAVIOR-STYLE
// ============================================
// Disabled button if user message is not entered and Enabled if user entered message
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

// ============================================
// This keeps the chat visible while the keyboard is open
// Always put in last
// ============================================
let viewportResizeTimer;
let lastKnownHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;

if (window.visualViewport) {
	window.visualViewport.addEventListener('resize', () => {
		clearTimeout(viewportResizeTimer);

		viewportResizeTimer = setTimeout(() => {
			const chatContainer = document.getElementById('chatContainer');
			if (!chatContainer) return;

			const currentHeight = window.visualViewport.height;
			const keyboardHeight = window.innerHeight - currentHeight;
			const extraPadding = 20;

			// Only update if height actually changed
			if (Math.abs(currentHeight - lastKnownHeight) > 10) {
				lastKnownHeight = currentHeight;
			}

			// Adjust padding
			chatContainer.style.paddingBottom =
				keyboardHeight > 0
					? `${keyboardHeight + extraPadding}px`
					: `${extraPadding}px`;

			// Wait a bit for Safari to repaint before scrolling
			requestAnimationFrame(() => {
				setTimeout(() => {
					scrollToBottom(true);
				}, 50);
			});
		}, 150); // Wait for Safari viewport animation to finish
	});
}

function scrollToBottom(force = false) {
	const chatContainer = document.getElementById('chatContainer');
	if (!chatContainer) return;

	const { scrollHeight, clientHeight } = chatContainer;
	if (!force && scrollHeight <= clientHeight) return;

	chatContainer.scrollTo({
		top: scrollHeight,
		behavior: 'instant' in chatContainer ? 'instant' : 'smooth'
	});
}