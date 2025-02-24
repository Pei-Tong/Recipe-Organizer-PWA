// recipes.js
import { db, getDocs, addDoc, collection, deleteDoc, doc, getDoc, updateDoc } from "./firebase.js";

// Import loglevel with fallback
let log;
try {
  import("loglevel").then(module => {
    log = module.default;
    log.setLevel("info");
    log.info("Recipes script started");
  }).catch(error => {
    console.error("Failed to load loglevel:", error);
    log = console;
    console.info("Recipes script started (using console as fallback)");
  });
} catch (error) {
  console.error("Error initializing loglevel:", error);
  log = console; // Final fallback
}

// Import Google Generative AI
import { GoogleGenerativeAI } from '@google/generative-ai';

// Page Element Selection
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
const qrBtn = document.getElementById("qr-btn");
const signOutBttn = document.getElementById("signOutBttn");

// Check if user is signed in
const email = JSON.parse(localStorage.getItem("email"));
if (!email) {
  log.warn("No user email found in localStorage, redirecting to login");
  window.location.href = "index.html";
}

let apiKey, genAI, model;

document.addEventListener("DOMContentLoaded", async () => {
  await getApiKey();
  log.info("API Key and Generative AI initialized.");
  renderRecipes(); // Initial render
});

// Fetch API Key for Google Generative AI
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

// Chatbot AI Response
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

// Sanitize Input
function sanitizeInput(input) {
  const div = document.createElement("div");
  div.textContent = input;
  return div.innerHTML;
}

// Add Recipe on Click
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
      favorite: false,
      email: email // 加入使用者 email，讓食譜與使用者關聯
    };

    try {
      await addRecipeToFirestore(recipeData);
      renderRecipes();
      recipeName.value = "";
      ingredients.value = "";
      steps.value = "";
      mealType.selectedIndex = 0;
      alert("Recipe added successfully!");
      log.info(`Recipe "${name}" added successfully by ${email}`);
    } catch (error) {
      log.error("Error adding recipe:", error);
      alert("Failed to add recipe. Please try again.");
    }
  } else {
    alert("Please fill in all recipe fields.");
  }
});

// Add Recipe on Enter
recipeName.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addRecipeBtn.click();
  }
});

// Add Recipe to Firestore
async function addRecipeToFirestore(recipeData) {
  try {
    const docRef = await addDoc(collection(db, "recipes"), recipeData);
    log.info(`Recipe added successfully with ID: ${docRef.id}`);
    return docRef;
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
  const recipeRef = doc(db, "recipes", recipeId);
  try {
    await deleteDoc(recipeRef);
    log.info(`Recipe with id ${recipeId} has been deleted from Firestore.`);
    removeVisualRecipe(recipeId);
  } catch (error) {
    log.error("Error removing recipe: ", error);
    alert("Failed to delete recipe. Please try again.");
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
        const matchesUser = recipe.email === email; // 只顯示當前使用者的食譜

        if (matchesIngredient && matchesMeal && matchesUser) {
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
    if (doc.data().email === email) { // 只返回當前使用者的食譜
      userData.push(doc);
    }
  });
  
  return userData;
}

// Add Event Listeners for Filters
filterIngredient.addEventListener("input", filterRecipes);
filterMealType.addEventListener("change", filterRecipes);

// Expose Functions to Global Scope (for onclick events)
window.editRecipe = editRecipe;
window.removeRecipe = removeRecipe;
window.toggleFavorite = toggleFavorite;

// Chatbot - Rule-based Logic
function ruleChatBot(request) {
  if (request.startsWith("add recipe")) {
    let recipeName = request.replace("add recipe", "").trim();
    if (recipeName) {
      const recipeData = { name: recipeName, ingredients: [], steps: [], mealType: "Dinner", favorite: false, email: email };
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

// Chatbot - Remove Recipe by Name
function removeFromRecipeName(recipeName) {
  const recipes = recipeList.getElementsByTagName("li");
  let found = false;
  for (let recipe of recipes) {
    const recipeText = recipe.querySelector("span:first-child").textContent.trim().split(" (")[0];
    if (recipeText.toLowerCase() === recipeName.toLowerCase()) {
      removeRecipe(recipe.id);
      removeVisualRecipe(recipe.id);
      found = true;
    }
  }
  return found;
}

// Chatbot - Send Button Click Event
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

// Chatbot - Add Message to Chat History
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

// Sign Out
signOutBttn.addEventListener("click", () => {
  localStorage.removeItem("email"); // 移除使用者 email
  log.info("User signed out");
  window.location.href = "index.html";
});