// 頁面元素選取
const recipeName = document.getElementById("recipeName");
const ingredients = document.getElementById("ingredients");
const steps = document.getElementById("steps");
const mealType = document.getElementById("mealType");
const addRecipeBtn = document.getElementById("addRecipeBtn");
const recipeList = document.getElementById("recipeList");
const filterIngredient = document.getElementById("filterIngredient");
const filterMealType = document.getElementById("filterMealType");
const clearFilterBtn = document.getElementById("clearFilterBtn");

const aiButton = document.getElementById("send-btn");
const aiInput = document.getElementById("chat-input");
const chatHistory = document.getElementById("chat-history");
const qrBtn = document.getElementById("qr-btn"); // QR 碼按鈕

// Import loglevel with fallback
let log;
try {
  import("loglevel").then(module => {
    log = module.default;
    log.setLevel("info");
    log.info("Application started");
  }).catch(error => {
    console.error("Failed to load loglevel:", error);
    log = console;
    console.info("Application started (using console as fallback)");
  });
} catch (error) {
  console.error("Error initializing loglevel:", error);
  log = console; // 最終備用方案
}

// Initialize Firebase
import { initializeApp } from "firebase/app";
import { getDocs, addDoc, getFirestore, collection, deleteDoc, doc, getDoc, updateDoc, query, where } from "firebase/firestore";

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
  try {
    let snapshot = await getDoc(doc(db, "apikey", "googlegenai"));
    apiKey = snapshot.data().key;
    genAI = new GoogleGenerativeAI(apiKey);
    model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  } catch (error) {
    log.error("Error fetching API key from Firestore: ", error);
    throw error;
  }
}

// Call the function to get the API key
async function askChatBot(request) {
  if (!model) {
    throw new Error("Generative AI model not initialized. Please wait for page load.");
  }
  try {
    const response = await model.generateContent(`Provide a recipe suggestion or answer for: ${request}. If it's a recipe query, include name, ingredients, and steps.`);
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
      log.info('Service Worker Registered for scope:', sw.href, 'with', import.meta.url)
    )
    .catch((err) => 
      log.error('Service Worker Error:', err)
    );
}

// Sanitize Input
function sanitizeInput(input) {
  const div = document.createElement("div");
  div.textContent = input;
  return div.innerHTML;
}

// Add Recipe on Click (Skipping biometric authentication)
addRecipeBtn.addEventListener("click", async () => {
  const name = recipeName.value.trim();
  const ingredientsText = ingredients.value.trim();
  const stepsText = steps.value.trim();
  const meal = mealType.value;

  if (name && ingredientsText && stepsText && meal) {
    const recipeData = {
      name: sanitizeInput(name),
      ingredients: sanitizeInput(ingredientsText).split(',').map(item => item.trim()),
      steps: sanitizeInput(stepsText).split('\n').map(step => step.trim()).filter(step => step),
      mealType: meal,
      favorite: false
    };

    try {
      console.log("Attempting to add recipe:", recipeData);
      await addRecipeToFirestore(recipeData);
      renderRecipes();
      recipeName.value = "";
      ingredients.value = "";
      steps.value = "";
      mealType.selectedIndex = 0;
      alert("Recipe added successfully!");
      log.info(`Recipe "${name}" added successfully.`);
    } catch (error) {
      log.error("Error adding recipe:", error);
      alert("Failed to add recipe. Please try again.");
    }
  } else {
    alert("Please fill in all recipe fields.");
  }
});

// Add Recipe on Enter (for recipeName)
recipeName.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addRecipeBtn.click();
  }
});

// Add Recipe to Firestore
async function addRecipeToFirestore(recipeData) {
  console.log("Adding recipe to Firestore:", recipeData);
  try {
    const docRef = await addDoc(collection(db, "recipes"), recipeData);
    log.info(`Recipe added successfully with ID: ${docRef.id}`);
    renderRecipes(); // 確保渲染更新
    return docRef; // 可選：返回文檔引用以供進一步使用
  } catch (error) {
    log.error("Error adding recipe to Firestore: ", error);
    throw error;
  }
}

// Edit Recipe
function editRecipe(recipeId, recipeData) {
  const recipeRef = doc(db, "recipes", recipeId);
  updateDoc(recipeRef, recipeData)
    .then(() => {
      log.info(`Recipe with id ${recipeId} updated successfully.`);
      renderRecipes();
    })
    .catch(error => {
      log.error("Error updating recipe:", error);
      alert("Failed to update recipe. Please try again.");
    });
}

// Remove Recipe
async function removeRecipe(recipeId) {
  console.log("Attempting to delete recipe with ID:", recipeId);
  const recipeRef = doc(db, "recipes", recipeId);
  try {
    await deleteDoc(recipeRef);
    log.info(`Recipe with id ${recipeId} has been deleted from Firestore.`);
    removeVisualRecipe(recipeId);
  } catch (error) {
    log.error("Error removing recipe: ", error);
    alert("Failed to delete recipe. Please check the recipe ID or try again.");
  }
}

function removeVisualRecipe(recipeId) {
  const recipeElement = document.getElementById(recipeId);
  if (recipeElement) {
    recipeElement.remove();
    log.info(`Recipe with id ${recipeId} removed from the visual interface.`);
  } else {
    log.warn(`Recipe with id ${recipeId} not found on the page.`);
  }
}

// Toggle Favorite
function toggleFavorite(recipeId, currentFavorite) {
  const recipeRef = doc(db, "recipes", recipeId);
  updateDoc(recipeRef, { favorite: !currentFavorite })
    .then(() => {
      log.info(`Favorite status toggled for recipe with id ${recipeId}.`);
      renderRecipes();
    })
    .catch(error => {
      log.error("Error toggling favorite:", error);
      alert("Failed to toggle favorite status. Please try again.");
    });
}

// Filter Recipes
function filterRecipes() {
  const ingredientFilter = filterIngredient.value.trim().toLowerCase();
  const mealFilter = filterMealType.value.toLowerCase();

  getDocs(collection(db, "recipes"))
    .then((querySnapshot) => {
      recipeList.innerHTML = "";
      querySnapshot.forEach((doc) => {
        const recipe = doc.data();
        const matchesIngredient = !ingredientFilter || recipe.ingredients.some(ing => ing.toLowerCase().includes(ingredientFilter));
        const matchesMeal = !mealFilter || recipe.mealType.toLowerCase() === mealFilter;

        if (matchesIngredient && matchesMeal) {
          renderRecipe(doc.id, recipe);
        }
      });
    })
    .catch(error => {
      log.error("Error filtering recipes:", error);
      alert("Failed to filter recipes. Please try again.");
    });
}

// Clear Filters
clearFilterBtn.addEventListener("click", () => {
  filterIngredient.value = "";
  filterMealType.value = "";
  renderRecipes();
});

// Render Recipes
async function renderRecipes() {
  const recipes = await getRecipesFromFirestore();
  recipeList.innerHTML = "";
  
  recipes.forEach((recipe) => {
    renderRecipe(recipe.id, recipe.data());
  });
}

function renderRecipe(recipeId, recipeData) {
  const recipeItem = document.createElement("li");
  recipeItem.id = recipeId;
  recipeItem.tabIndex = 0;

  recipeItem.innerHTML = `
    <span>${recipeData.name} (${recipeData.mealType})</span>
    <span class="actions">
      <button onclick="editRecipe('${recipeId}', { name: prompt('New name:', '${recipeData.name}'), mealType: prompt('New meal type:', '${recipeData.mealType}') })">Edit</button>
      <button onclick="removeRecipe('${recipeId}')">Delete</button>
      <button onclick="toggleFavorite('${recipeId}', ${recipeData.favorite || false})">${recipeData.favorite ? 'Unfavorite' : 'Favorite'}</button>
    </span>
  `;
  recipeList.appendChild(recipeItem);
}

// Get Recipes from Firestore
async function getRecipesFromFirestore() {
  const data = await getDocs(collection(db, "recipes"));
  let userData = [];
  
  data.forEach((doc) => {
    userData.push(doc);
  });
  
  return userData;
}

// Add Event Listeners for Filters
filterIngredient.addEventListener("input", filterRecipes);
filterMealType.addEventListener("change", filterRecipes);

// 將函數暴露到全局作用域（用於 onclick 事件）
window.editRecipe = editRecipe;
window.removeRecipe = removeRecipe;
window.toggleFavorite = toggleFavorite;

// Chatbot - Rule-based chatbot
function ruleChatBot(request) {
  if (request.startsWith("add recipe")) {
    let recipeName = request.replace("add recipe", "").trim();
    if (recipeName) {
      const recipeData = { name: recipeName, ingredients: [], steps: [], mealType: "Dinner", favorite: false };
      console.log("Attempting to add recipe via chatbot:", recipeData);
      addRecipeToFirestore(recipeData);
      appendMessage(`Recipe ${recipeName} added!`);
      renderRecipes();
    } else {
      appendMessage("Please specify a recipe name to add.");
    }
    return true;
  } else if (request.startsWith("complete")) {
    let recipeName = request.replace("complete", "").trim();
    if (recipeName) {
      if (removeFromRecipeName(recipeName)) {
        appendMessage(`Recipe ${recipeName} marked as complete.`);
        renderRecipes();
      } else {
        appendMessage("Recipe not found!");
      }
    } else {
      appendMessage("Please specify a recipe to complete.");
    }
    return true;
  } else if (request.startsWith("find recipes with")) {
    let ingredient = request.replace("find recipes with", "").trim();
    if (ingredient) {
      filterRecipesByIngredient(ingredient);
      appendMessage(`Finding recipes with ${ingredient}...`);
    } else {
      appendMessage("Please specify an ingredient.");
    }
    return true;
  }
  return false;
}

// Filter Recipes by Ingredient
function filterRecipesByIngredient(ingredient) {
  filterIngredient.value = ingredient;
  filterRecipes();
}

// Chatbot - Remove recipe by name
function removeFromRecipeName(recipeName) {
  const recipes = recipeList.getElementsByTagName("li");
  let found = false;
  for (let recipe of recipes) {
    const recipeText = recipe.querySelector("span:first-child").textContent.trim().split(" (")[0]; // 獲取名稱部分
    if (recipeText.toLowerCase() === recipeName.toLowerCase()) {
      removeRecipe(recipe.id);
      removeVisualRecipe(recipe.id);
      found = true;
    }
  }
  return found;
}

// Chatbot - Send button click event
aiButton.addEventListener('click', async () => {
  let prompt = aiInput.value.trim().toLowerCase();
  if (prompt) {
    try {
      if (!ruleChatBot(prompt)) {
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

// QR Code Generation
qrBtn.addEventListener('click', () => {
  const qrCodeUrl = 'https://pei-tong.github.io/Recipe-Organizer-PWA/';
  const qrCodeWindow = window.open(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrCodeUrl)}`, '_blank');
  if (!qrCodeWindow) {
    alert("Please allow popups to generate QR code.");
  }
});