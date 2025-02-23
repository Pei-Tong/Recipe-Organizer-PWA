// 頁面元素選取
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

const aiButton = document.getElementById("send-btn");
const aiInput = document.getElementById("chat-input");
const chatHistory = document.getElementById("chat-history");

// Import loglevel
import log from "loglevel";
// Set the log level (trace, debug, info, warn, error)
log.setLevel("info");
// Example logs
log.info("Application started");
log.debug("Debugging information");
log.error("An error occurred");


// Initialize Firebase
import { initializeApp } from "firebase/app";
import { getDocs, addDoc, getFirestore, collection, deleteDoc, doc, getDoc } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7UqECLIMhMXofB0ZsmB-cqSrbRxk53VI",
  authDomain: "recipe-organizer-pwa.firebaseapp.com",
  projectId: "recipe-organizer-pwa",
  storageBucket: "recipe-organizer-pwa.firebasestorage.app",
  messagingSenderId: "523889521938",
  appId: "1:523889521938:web:3ff88954b9ba279af22fcb"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);




// Import Google Generative AI
import { GoogleGenerativeAI } from '@google/generative-ai';

let apiKey, genAI, model;

document.addEventListener("DOMContentLoaded", async () => {
  await getApiKey();
  log.info("API Key and Generative AI initialized.");
});


// Call the gemini model
async function getApiKey() {
  let snapshot = await getDoc(doc(db, "apikey", "googlegenai"));
  apiKey = snapshot.data().key;
  genAI = new GoogleGenerativeAI(apiKey);
  model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
}


// Call the function to get the API key
async function askChatBot(request) {
  if (!model) {
    throw new Error("Generative AI model not initialized. Please wait for page load.");
  }
  try {
    const response = await model.generateContent(request);
    return response.response.text();
  } catch (error) {
    log.error("Error in askChatBot:", error);
    throw error;
  }
}


// Service Worker 註冊
const sw = new URL('./service-worker.js', import.meta.url);

if ('serviceWorker' in navigator) {
  const s = navigator.serviceWorker;

  s.register(sw.href, {
    scope: '/Recipe-Organizer-PWA/',
  })
    .then(() => 
      console.log('Service Worker Registered for scope:', sw.href, 'with', import.meta.url)
    )
    .catch((err) => 
      console.error('Service Worker Error:', err)
    );
}



// Sanitize Input
function sanitizeInput(input) {
  const div = document.createElement("div");
  div.textContent = input;
  return div.innerHTML;
}


// Add Task on Click
addTaskBtn.addEventListener("click", async () => {
  const task = taskInput.value.trim();
  if (task) {
    const taskText = sanitizeInput(taskInput.value.trim());

    if (taskText) {
      try {
        // Log user action
        log.info(`Task added: ${taskText}`);
        await addTaskToFirestore(taskText);
        renderTasks();
        taskInput.value = "";
      } catch (error) {
        // Log error
        log.error("Error adding task", error);
      }
    }
  } else {
    alert("Please enter a task");
  }
});

// Add Task on Enter
taskInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addTaskBtn.click();
  }
});

// Add Task to Firestore
async function addTaskToFirestore(taskText) {
  await addDoc(collection(db, "todos"), {
    text: taskText,
    completed: false
  });
}


// Remove task on Click
taskList.addEventListener("click", async (e) => {
  if (e.target.tagName === 'LI') {
    await deleteDoc(doc(db, "todos", e.target.id), {
    });
    e.target.remove();
    renderTasks();
  }
});

// Remove task on Enter
taskList.addEventListener("keypress", async function(e) {
  if (e.target.tagName === 'LI' && e.key === "Enter") {
    await deleteDoc(doc(db, "todos", e.target.id), {
    });
    e.target.remove();
    renderTasks();
  }
});




// Chatbot - Rule-based chatbot
async function ruleChatBot(request) {
  if (request.startsWith("add task")) {
    let task = request.replace("add task", "").trim();
    if (task) {
      await addTaskToFirestore(task);
      appendMessage('Task ' + task + ' added!');
      await renderTasks();
    } else {
      appendMessage("Please specify a task to add.");
    }
    return true;
  } else if (request.startsWith("complete")) {
    let taskName = request.replace("complete", "").trim();
    if (taskName) {
      const found = await removeFromTaskName(taskName);
      if (found) {
        appendMessage('Task ' + taskName + ' marked as complete.');
        await renderTasks();
      } else {
        appendMessage("Task not found!");
      }
    } else {
      appendMessage("Please specify a task to complete.");
    }
    return true;
  }
  return false;
}


// Chatbot - Send button click event
aiButton.addEventListener('click', async () => {
  let prompt = aiInput.value.trim().toLowerCase();
  if (prompt) {
    try {
      if (!await ruleChatBot(prompt)) {
        const response = await askChatBot(prompt);
        appendMessage(response);
      }
    } catch (error) {
      log.error("Error processing AI request:", error);
      appendMessage("Error: Could not process your request.");
    }
  } else {
    appendMessage("Please enter a prompt");
  }
});


// Chatbot - Add message to chat history
function appendMessage(message) {
  let history = document.createElement("div");
  history.textContent = message;
  history.className = 'history';
  chatHistory.appendChild(history);
  aiInput.value = "";
}


// Chatbot - Remove task by name
async function removeFromTaskName(taskName) {
  const tasks = taskList.getElementsByTagName("li");
  let found = false;
  
  for (let task of tasks) {
    const taskText = task.textContent.trim();
    if (
      taskText.toLowerCase() === taskName.toLowerCase() || 
      taskText.toLowerCase() === `task ${taskName.toLowerCase()}` || 
      taskText.toLowerCase().replace("task ", "") === taskName.toLowerCase()
    ) {
      try {
        await deleteDoc(doc(db, "todos", task.id));
        task.remove();
        found = true;
        log.info(`Task '${taskText}' successfully removed`);
      } catch (error) {
        log.error("Error removing task:", error);
        throw error;
      }
    }
  }
  return found;
}




// Render Tasks
async function renderTasks() {
  var tasks = await getTasksFromFirestore();
  taskList.innerHTML = "";
  
  tasks.forEach((task) => {
    if (!task.data().completed) {
      const taskItem = document.createElement("li");
      taskItem.id = task.id;
      taskItem.tabIndex = 0;
      taskItem.textContent = task.data().text.replace("Task ", "");
      taskList.appendChild(taskItem);
    }
  });
}

// Get Tasks from Firestore
async function getTasksFromFirestore() {
  var data = await getDocs(collection(db, "todos"));
  let userData = [];
  
  data.forEach((doc) => {
    userData.push(doc);
  });
  
  return userData;
}
