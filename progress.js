document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;
    
    // Initialize progress
    updateProgress();
    updateFoodLog();
    
    // Food form submission
    const foodForm = document.getElementById('foodForm');
    if (foodForm) {
        foodForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = document.getElementById('foodSearch').value.trim();
            
            if (!searchTerm) return;
            
            // Mock food data - replace with API call in production
            const mockFoods = [
                { name: 'Apple', calories: 95, protein: 0.5, carbs: 25, fat: 0.3 },
                { name: 'Banana', calories: 105, protein: 1.3, carbs: 27, fat: 0.4 },
                { name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
                { name: 'Salmon', calories: 208, protein: 20, carbs: 0, fat: 13 },
                { name: 'Rice (1 cup)', calories: 206, protein: 4.3, carbs: 45, fat: 0.4 }
            ];
            
            displayFoodResults(mockFoods.filter(food => 
                food.name.toLowerCase().includes(searchTerm.toLowerCase())
            ));
        });
    }
    
    function displayFoodResults(foods) {
        const resultsContainer = document.getElementById('foodResults');
        resultsContainer.innerHTML = '';
        
        if (foods.length === 0) {
            resultsContainer.innerHTML = '<div class="alert alert-info">No foods found. Try a different search.</div>';
            return;
        }
        
        foods.forEach(food => {
            const foodItem = document.createElement('div');
            foodItem.className = 'card mb-2';
            foodItem.innerHTML = `
                <div class="card-body d-flex justify-content-between align-items-center">
                    <div>
                        <h6>${food.name}</h6>
                        <small>${food.calories} cal | P: ${food.protein}g | C: ${food.carbs}g | F: ${food.fat}g</small>
                    </div>
                    <button class="btn btn-sm btn-primary add-food" 
                            data-name="${food.name}"
                            data-calories="${food.calories}"
                            data-protein="${food.protein}"
                            data-carbs="${food.carbs}"
                            data-fat="${food.fat}">
                        Add
                    </button>
                </div>
            `;
            resultsContainer.appendChild(foodItem);
        });
        
        // Add event listeners to Add buttons
        document.querySelectorAll('.add-food').forEach(button => {
            button.addEventListener('click', function() {
                const foodData = {
                    name: this.getAttribute('data-name'),
                    calories: parseInt(this.getAttribute('data-calories')),
                    protein: parseFloat(this.getAttribute('data-protein')),
                    carbs: parseFloat(this.getAttribute('data-carbs')),
                    fat: parseFloat(this.getAttribute('data-fat')),
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };
                
                // Add to user's food log
                currentUser.foodLog.push(foodData);
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                
                // Update the users array
                const users = JSON.parse(localStorage.getItem('users'));
                const userIndex = users.findIndex(u => u.email === currentUser.email);
                if (userIndex !== -1) {
                    users[userIndex] = currentUser;
                    localStorage.setItem('users', JSON.stringify(users));
                }
                
                updateProgress();
                updateFoodLog();
            });
        });
    }
    
    function updateProgress() {
        const totalCalories = currentUser.foodLog.reduce((sum, food) => sum + food.calories, 0);
        const totalProtein = currentUser.foodLog.reduce((sum, food) => sum + food.protein, 0);
        const totalCarbs = currentUser.foodLog.reduce((sum, food) => sum + food.carbs, 0);
        const totalFat = currentUser.foodLog.reduce((sum, food) => sum + food.fat, 0);
        
        // Update calorie progress
        const caloriePercentage = Math.min((totalCalories / currentUser.dailyGoal) * 100, 100);
        document.getElementById('calorieProgress').style.setProperty('--progress', caloriePercentage + '%');
        document.getElementById('progressText').textContent = `${totalCalories}/${currentUser.dailyGoal}`;
        document.getElementById('remainingCalories').textContent = Math.max(currentUser.dailyGoal - totalCalories, 0);
        
        // Update nutrient progress bars (using typical daily values)
        document.getElementById('proteinProgress').style.width = `${Math.min(totalProtein / 50 * 100, 100)}%`;
        document.getElementById('proteinProgress').textContent = `Protein: ${totalProtein.toFixed(1)}g`;
        
        document.getElementById('carbsProgress').style.width = `${Math.min(totalCarbs / 300 * 100, 100)}%`;
        document.getElementById('carbsProgress').textContent = `Carbs: ${totalCarbs.toFixed(1)}g`;
        
        document.getElementById('fatProgress').style.width = `${Math.min(totalFat / 70 * 100, 100)}%`;
        document.getElementById('fatProgress').textContent = `Fat: ${totalFat.toFixed(1)}g`;
        
        // Change color based on progress
        const progressBar = document.getElementById('calorieProgress');
        if (caloriePercentage > 90) {
            progressBar.style.background = `conic-gradient(#f44336 0%, #f44336 ${caloriePercentage}%, #f3f3f3 ${caloriePercentage}%)`;
        } else if (caloriePercentage > 70) {
            progressBar.style.background = `conic-gradient(#FFC107 0%, #FFC107 ${caloriePercentage}%, #f3f3f3 ${caloriePercentage}%)`;
        } else {
            progressBar.style.background = `conic-gradient(#4CAF50 0%, #4CAF50 ${caloriePercentage}%, #f3f3f3 ${caloriePercentage}%)`;
        }
    }
    
    function updateFoodLog() {
        const foodLogContainer = document.getElementById('foodLog');
        foodLogContainer.innerHTML = '';
        
        if (currentUser.foodLog.length === 0) {
            foodLogContainer.innerHTML = '<li class="list-group-item text-muted">No foods logged today</li>';
            return;
        }
        
        currentUser.foodLog.forEach(food => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item';
            listItem.innerHTML = `
                <div>
                    <strong>${food.name}</strong>
                    <small class="text-muted">${food.time}</small>
                </div>
                <span>${food.calories} cal</span>
            `;
            foodLogContainer.appendChild(listItem);
        });
    }
});