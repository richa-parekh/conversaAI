# ConversaAI
A conversational AI web application using HTML, CSS, JavaScript, PHP, and Ollama LLM. This is a learning project for my portfolio.

## Project Scope:
1. **Core features**: Send messages, receive AI responses, basic chat interface
2. **Future enhancements**: Chat history, user sessions, message formatting

## Project Structure
ConversaAI/
├── index.html
├── assets/                 // Frontend resources
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── script.js
│   └── images/
├── api/                    // PHP backend endpoints
│   ├── chat.php
│   └── config.php
├── data/                   // JSON file storage
│   └── conversations/
├── docs/                   // Project documentation
│   ├── requirements.md
│   ├── wireframes/
│   └── daily-progress.md
└── README.md

## Architecture Planning 
### Frontend Architecture:
1. Vanilla JavaScript (modular functions)
2. Tailwind CSS for styling
3. Responsive design approach

### Backend Architecture:
1. PHP for API endpoints
2. JSON files for data persistence
3. RESTful API design

### Communication Flow:
User Input → Frontend Validation → AJAX Request → PHP API → Ollama → Response Processing → UI Update