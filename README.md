# Recipe-Organizer-PWA

A Progressive Web App (PWA) designed to help users organize, manage, and filter their favorite recipes.This app allows users to add, edit, and delete recipes, store data persistently with Firebase, and interact with an AI chatbot for assistance. The app is deployed live on GitHub Pages and adheres to responsive design and accessibility standards.

<bold>Live Demo: https://pei-tong.github.io/Recipe-Organizer-PWA/ <bold>

## Features
- Dynamic Interaction: Add, edit, and delete recipes with real-time updates.
- Persistent Storage: Recipes are saved using Firebase, ensuring data persists across sessions.
- Filtering: Filter recipes by ingredient or meal type (e.g., Breakfast, Lunch, Dinner, Snack).
- AI Chatbot: An integrated chatbot assists users with recipe management and queries.
- QR Code Sharing: Generate a QR code to share the app or specific features.
- Responsive Design: Optimized for mobile, tablet, and desktop devices using CSS media queries.
- Accessibility: Built with WCAG guidelines in mind for inclusivity (WAVE toolbar compliant).
- PWA Features: Installable on devices with a custom manifest and service worker support.

## In Progress
Gmail Login: Authentication via Google Sign-In is under development.
Biometric Authentication: Fingerprint or face recognition login is planned but not yet implemented.

## Tech Stack
HTML: Structured layout with semantic elements.
CSS: Custom styles with media queries for responsiveness.
JavaScript: Vanilla JS for functionality (no frameworks).
Firebase: Real-time database for storing and retrieving recipe data.
GitHub Pages: Hosting and deployment.
Google Analytics: Tracking user interactions (via gtag.js).
PWA: Manifest and service worker for offline capabilities.


## Project Structure
Recipe-Organizer-PWA/
├── .github/
│   └── workflows/
│       └── deploy.yml    # GitHub Actions workflow for deployment
├── assets/
│   ├── css/
│   │   └── style.css     # Styles for responsive design
│   ├── html/
│   │   ├── index.html    # Login page
│   │   └── recipes.html  # Main app page
│   ├── icons/
│   │   ├── favicon.ico   # App favicon
│   │   ├── icon-128.png  # PWA icon (128x128)
│   │   └── icon-512.png  # PWA icon (512x512)
│   └── js/
│       ├── firebase.js   # Firebase configuration and initialization
│       ├── recipes.js    # Handles app logic (CRUD, filtering, chatbot)
│       └── signIn.js     # Handles login functionality (Google & Biometrics - WIP)
├── service-worker.js     # Service worker for PWA offline capabilities
├── .eslintrc.js          # ESLint configuration
├── .gitignore            # Git ignore file
├── jest.config.js        # Jest configuration for testing
├── manifest.json         # PWA manifest
├── package-lock.json     # npm package lock file
├── package.json          # npm package dependencies
├── README.md             # Project documentation
└── tests/
    └── recipe.test.js    # Example test file