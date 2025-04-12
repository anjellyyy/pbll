// Edamam Nutrition API Configuration
const APP_ID = "1fcfdc59";
const APP_KEY = "48bd0c8cf2bd92850a258b2de7b3ab98";
const API_URL = "https://api.edamam.com/api/nutrition-data";

// DOM Elements
const foodSearchForm = document.getElementById('foodSearchForm');
const foodQueryInput = document.getElementById('foodQuery');
const searchResults = document.getElementById('searchResults');
const nutritionDetails = document.getElementById('nutritionDetails');
const foodTitle = document.getElementById('foodTitle');
const foodLog = document.getElementById('foodLog');
const totalCaloriesEl = document.getElementById('totalCalories');
const clearLogBtn = document.getElementById('clearLogBtn');
const addToLogBtn = document.getElementById('addToLogBtn');
const toastEl = document.getElementById('liveToast');
const toast = new bootstrap.Toast(toastEl);

// Current food data
let currentFood = null;
let dailyLog = JSON.parse(localStorage.getItem('dailyLog')) || [];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loader').style.display = 'none';
    renderFoodLog();
    
    // Form submission
    foodSearchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        searchFood();
    });

    // Add to log button
    addToLogBtn.addEventListener('click', addToFoodLog);

    // Clear log button
    clearLogBtn.addEventListener('click', clearFoodLog);
});

async function searchFood() {
    const query = foodQueryInput.value.trim();
    if (!query) return;

    showLoading(true);
    searchResults.innerHTML = '<div class="text-center"><div class="spinner-border text-primary"></div><p class="mt-2">Searching nutrition data...</p></div>';
    nutritionDetails.classList.add('d-none');

    try {
        const response = await fetch(`${API_URL}?app_id=${APP_ID}&app_key=${APP_KEY}&ingr=${encodeURIComponent(query)}`);
        
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        
        if (data.calories && data.totalNutrients) {
            currentFood = processNutritionData(data, query);
            displayNutritionDetails(currentFood);
        } else {
            throw new Error("No nutrition data found for this food");
        }
    } catch (error) {
        console.error("Error fetching nutrition data:", error);
        showError("Couldn't find nutrition data. Please try a different food item.");
    } finally {
        showLoading(false);
    }
}

function processNutritionData(data, query) {
    // Basic nutrients
    const food = {
        name: query,
        calories: Math.round(data.calories),
        protein: Math.round(data.totalNutrients.PROCNT?.quantity || 0),
        carbs: Math.round(data.totalNutrients.CHOCDF?.quantity || 0),
        fat: Math.round(data.totalNutrients.FAT?.quantity || 0),
        nutrients: {}
    };

    // Additional important nutrients
    const importantNutrients = {
        FIBTG: "Fiber",
        SUGAR: "Sugar",
        NA: "Sodium",
        CA: "Calcium",
        FE: "Iron",
        VITA_RAE: "Vitamin A",
        VITC: "Vitamin C",
        VITD: "Vitamin D"
    };

    for (const [key, name] of Object.entries(importantNutrients)) {
        if (data.totalNutrients[key]) {
            const nutrient = data.totalNutrients[key];
            food.nutrients[name] = {
                value: Math.round(nutrient.quantity * 10) / 10,
                unit: nutrient.unit
            };
        }
    }

    return food;
}

function displayNutritionDetails(food) {
    foodTitle.textContent = food.name;
    document.getElementById('caloriesValue').textContent = food.calories;
    document.getElementById('proteinValue').textContent = `${food.protein}g`;
    document.getElementById('carbsValue').textContent = `${food.carbs}g`;
    document.getElementById('fatValue').textContent = `${food.fat}g`;

    // Additional nutrients
    const additionalNutrientsEl = document.getElementById('additionalNutrients');
    additionalNutrientsEl.innerHTML = '';

    for (const [name, info] of Object.entries(food.nutrients)) {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            ${name}
            <span class="badge bg-light text-dark rounded-pill">
                ${info.value}${info.unit}
            </span>
        `;
        additionalNutrientsEl.appendChild(li);
    }

    nutritionDetails.classList.remove('d-none');
    searchResults.innerHTML = '';
}

function addToFoodLog() {
    if (!currentFood) return;

    dailyLog.push({
        name: currentFood.name,
        calories: currentFood.calories,
        protein: currentFood.protein,
        carbs: currentFood.carbs,
        fat: currentFood.fat,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    saveFoodLog();
    renderFoodLog();
    showToast('Success', `${currentFood.name} added to your daily log!`);
}

function renderFoodLog() {
    if (dailyLog.length === 0) {
        foodLog.innerHTML = '<li class="list-group-item text-muted">No foods logged yet</li>';
        totalCaloriesEl.textContent = '0';
        clearLogBtn.classList.add('d-none');
        return;
    }

    clearLogBtn.classList.remove('d-none');
    foodLog.innerHTML = '';

    let totalCalories = 0;

    dailyLog.forEach((item, index) => {
        totalCalories += item.calories;

        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <strong>${item.name}</strong>
                    <small class="text-muted ms-2">${item.time}</small>
                </div>
                <div>
                    <span class="food-log-calories me-3">${item.calories} cal</span>
                    <button class="btn btn-sm btn-outline-danger delete-item" data-index="${index}">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
        `;
        foodLog.appendChild(li);
    });

    // Add event listeners to delete buttons
    document.querySelectorAll('.delete-item').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            deleteFoodItem(index);
        });
    });

    totalCaloriesEl.textContent = totalCalories;
}

function deleteFoodItem(index) {
    dailyLog.splice(index, 1);
    saveFoodLog();
    renderFoodLog();
    showToast('Removed', 'Food item removed from your log');
}

function clearFoodLog() {
    dailyLog = [];
    saveFoodLog();
    renderFoodLog();
    showToast('Cleared', 'Your food log has been cleared');
}

function saveFoodLog() {
    localStorage.setItem('dailyLog', JSON.stringify(dailyLog));
}

function showLoading(show) {
    document.getElementById('loader').style.display = show ? 'flex' : 'none';
}

function showError(message) {
    searchResults.innerHTML = `
        <div class="alert alert-danger">
            <i class="fas fa-exclamation-circle me-2"></i>
            ${message}
        </div>
    `;
}

function showToast(title, message) {
    document.getElementById('toastTitle').textContent = title;
    document.getElementById('toastMessage').textContent = message;
    toast.show();
}