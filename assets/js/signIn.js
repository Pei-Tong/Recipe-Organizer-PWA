// 引入 Firebase Authentication
import { auth } from "./firebase.js";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// 確認 Firebase Auth 是否正確載入
console.log("Firebase Auth instance:", auth);

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

// Service Worker 註冊
const sw = new URL('../../service-worker.js', import.meta.url);

if ('serviceWorker' in navigator) {
  const s = navigator.serviceWorker;
  s.register(sw.href, { scope: '/Recipe-Organizer-PWA/' })
    .then(() => log.info('Service Worker Registered for scope:', sw.href, 'with', import.meta.url))
    .catch((err) => log.error('Service Worker Error:', err));
}

// Google SSO 登入邏輯
const provider = new GoogleAuthProvider();
provider.addScope('email'); // 添加必要的範圍
provider.addScope('profile'); // 添加必要的範圍

const signInButton = document.getElementById("signIn");
const biometricLoginButton = document.getElementById("biometricLogin");

function signIn() {
  console.log("Sign-in button clicked");
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log("User signed in:", user);
      localStorage.setItem("email", JSON.stringify(user.email));
      log.info(`User ${user.email} signed in successfully`);
      window.location.href = "recipes.html"; // 修正跳轉路徑
    })
    .catch((error) => {
      console.error("Popup Sign-in Error:", error);
      alert("Login failed, please try again.");
    });
}

// 確保 DOM 加載後再綁定事件
document.addEventListener("DOMContentLoaded", () => {
  if (signInButton) {
    signInButton.addEventListener("click", signIn);
  } else {
    console.error("Sign-in button not found!");
  }

  // **生物識別登入按鈕**
  if (biometricLoginButton) {
    biometricLoginButton.addEventListener("click", () => {
      log.info("Biometric Login clicked - implement biometric logic here");
      // Placeholder for biometric authentication
    });
  } else {
    console.error("Biometric login button not found!");
  }
});