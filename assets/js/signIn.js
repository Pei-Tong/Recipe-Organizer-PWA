// signIn.js
import { auth } from "./firebase.js";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// Import loglevel with fallback
let log;
try {
  import("loglevel").then(module => {
    log = module.default;
    log.setLevel("info");
    log.info("Sign-in script started");
  }).catch(error => {
    console.error("Failed to load loglevel:", error);
    log = console;
    console.info("Sign-in script started (using console as fallback)");
  });
} catch (error) {
  console.error("Error initializing loglevel:", error);
  log = console; // Final fallback
}

// Service Worker Registration
const sw = new URL('../../service-worker.js', import.meta.url);

if ('serviceWorker' in navigator) {
  const s = navigator.serviceWorker;
  s.register(sw.href, {
    scope: '/Recipe-Organizer-PWA/',
  })
    .then(() => 
      log.info('Service Worker Registered for scope:', sw.href, 'with', import.meta.url)
    )
    .catch((err) => 
      log.error('Service Worker Error:', err)
    );
}

// Google SSO Sign-In Logic
const provider = new GoogleAuthProvider();
const signInButton = document.getElementById("signIn");
const biometricLoginButton = document.getElementById("biometricLogin");

function signIn() {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      localStorage.setItem("email", JSON.stringify(user.email)); // 儲存使用者 email
      log.info(`User ${user.email} signed in successfully`);
      window.location.href = "recipes.html"; // 成功後跳轉
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      log.error(`Sign-in error: ${errorCode} - ${errorMessage}`);
      alert("Login failed, please try again.");
    });
}

signInButton.addEventListener("click", () => {
  log.info("Sign In with Google clicked");
  signIn();
});

biometricLoginButton.addEventListener("click", () => {
  log.info("Biometric Login clicked - implement biometric logic here");
  // Placeholder for biometric authentication
});