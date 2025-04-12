// Mood-based food recommendations
const moodFoods = {
    happy: [
        {
            name: "Dark Chocolate",
            image: "https://images.unsplash.com/photo-1575377427642-087cf684f29d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            calories: 150,
            desc: "Rich in antioxidants and stimulates endorphin production",
            benefits: [
                "Boosts serotonin levels",
                "Contains mood-enhancing compounds",
                "Rich in magnesium"
            ]
        },
        {
            name: "Berries",
            image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            calories: 80,
            desc: "Packed with antioxidants and vitamin C",
            benefits: [
                "Reduces inflammation",
                "High in fiber",
                "Natural sweetness boosts mood"
            ]
        }
    ],
    sad: [
        {
            name: "Salmon",
            image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            calories: 200,
            desc: "Rich in omega-3 fatty acids that support brain health",
            benefits: [
                "May help reduce depression symptoms",
                "High in vitamin D",
                "Good source of protein"
            ]
        },
        {
            name: "Walnuts",
            image: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            calories: 180,
            desc: "Contains plant-based omega-3s and antioxidants",
            benefits: [
                "Supports brain function",
                "May improve mood regulation",
                "Rich in healthy fats"
            ]
        }
    ],
    stressed: [
        {
            name: "Avocado",
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            calories: 160,
            desc: "Packed with B vitamins and healthy fats",
            benefits: [
                "Helps regulate stress hormones",
                "Rich in potassium",
                "Contains stress-reducing nutrients"
            ]
        },
        {
            name: "Chamomile Tea",
            image: "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            calories: 5,
            desc: "Natural relaxant with calming properties",
            benefits: [
                "Reduces anxiety",
                "Promotes relaxation",
                "May improve sleep quality"
            ]
        }
    ],
    tired: [
        {
            name: "Banana",
            image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            calories: 105,
            desc: "Natural source of quick energy and potassium",
            benefits: [
                "Provides natural sugars for energy",
                "Contains vitamin B6",
                "Helps prevent muscle cramps"
            ]
        },
        {
            name: "Quinoa",
            image: "https://images.unsplash.com/photo-1598965402089-897c04b6218a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            calories: 220,
            desc: "Complete protein with all essential amino acids",
            benefits: [
                "Sustained energy release",
                "High in iron and magnesium",
                "Gluten-free complex carb"
            ]
        }
    ],
    angry: [
        {
            name: "Green Tea",
            image: "https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            calories: 5,
            desc: "Contains L-theanine which promotes relaxation",
            benefits: [
                "Calms without drowsiness",
                "Rich in antioxidants",
                "May lower stress hormones"
            ]
        },
        {
            name: "Spinach",
            image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            calories: 40,
            desc: "High in magnesium which helps regulate emotions",
            benefits: [
                "Rich in iron and folate",
                "Contains calming minerals",
                "Low-calorie nutrient powerhouse"
            ]
        }
    ],
    anxious: [
        {
            name: "Yogurt",
            image: "https://images.unsplash.com/photo-1551029506-0807df4e2031?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            calories: 150,
            desc: "Probiotics support gut-brain connection",
            benefits: [
                "May reduce anxiety symptoms",
                "Good source of protein",
                "Contains calcium and vitamin D"
            ]
        },
        {
            name: "Pumpkin Seeds",
            image: "https://images.unsplash.com/photo-1603048719539-8fe8e8f2b1d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            calories: 180,
            desc: "Rich in magnesium and zinc",
            benefits: [
                "Helps regulate nervous system",
                "Good source of tryptophan",
                "Contains stress-reducing minerals"
            ]
        }
    ],
    focused: [
        {
            name: "Blueberries",
            image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            calories: 80,
            desc: "High in antioxidants that support brain function",
            benefits: [
                "May improve memory",
                "Supports cognitive function",
                "Low glycemic index"
            ]
        },
        {
            name: "Eggs",
            image: "https://images.unsplash.com/photo-1587486913049-53fc88980cfc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            calories: 140,
            desc: "Rich in choline which is essential for brain health",
            benefits: [
                "Supports neurotransmitter production",
                "High-quality protein",
                "Contains lutein for brain function"
            ]
        }
    ],
    relaxed: [
        {
            name: "Oatmeal",
            image: "https://images.unsplash.com/photo-1606313564200-75f5c38edccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            calories: 150,
            desc: "Complex carbs help produce serotonin",
            benefits: [
                "Promotes feelings of calm",
                "Sustained energy release",
                "High in fiber"
            ]
        },
        {
            name: "Almonds",
            image: "https://images.unsplash.com/photo-1607457561901-e6ec3a6d16cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            calories: 160,
            desc: "Contains magnesium and healthy fats",
            benefits: [
                "Supports relaxation",
                "Good source of vitamin E",
                "May help lower blood pressure"
            ]
        }
    ]
};

document.addEventListener('DOMContentLoaded', function() {
    const moodBtns = document.querySelectorAll('.mood-btn');
    const recommendationsContainer = document.getElementById('foodRecommendations');
    const moodHeader = document.getElementById('moodHeader');

    moodBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            moodBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const mood = this.getAttribute('data-mood');
            showRecommendations(mood);
        });
    });

    function showRecommendations(mood) {
        const foods = moodFoods[mood] || [];
        moodHeader.textContent = `Foods for when you're feeling ${mood}`;
        
        recommendationsContainer.innerHTML = '';
        
        if (foods.length === 0) {
            recommendationsContainer.innerHTML = `
                <div class="col-12 text-center py-5">
                    <i class="fas fa-utensils fa-3x mb-3 text-muted"></i>
                    <p class="text-muted">No recommendations found for this mood</p>
                </div>
            `;
            return;
        }
        
        foods.forEach(food => {
            const foodCol = document.createElement('div');
            foodCol.className = 'col-md-6';
            foodCol.innerHTML = `
                <div class="food-card">
                    <div class="position-relative">
                        <img src="${food.image}" class="food-img" alt="${food.name}">
                        <span class="food-badge">${food.calories} cal</span>
                    </div>
                    <div class="food-body">
                        <h5 class="food-title">${food.name}</h5>
                        <p class="food-desc">${food.desc}</p>
                        <ul class="benefits-list">
                            ${food.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                        </ul>
                        <button class="btn btn-sm btn-primary mt-2 add-to-log" 
                                data-name="${food.name}"
                                data-calories="${food.calories}">
                            Add to Daily Log
                        </button>
                    </div>
                </div>
            `;
            recommendationsContainer.appendChild(foodCol);
        });

        // Add event listeners to "Add to Log" buttons
        document.querySelectorAll('.add-to-log').forEach(button => {
            button.addEventListener('click', function() {
                const foodData = {
                    name: this.getAttribute('data-name'),
                    calories: parseInt(this.getAttribute('data-calories')),
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };
                
                // Add to user's food log
                const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                if (currentUser) {
                    currentUser.foodLog.push(foodData);
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));
                    
                    // Update the users array
                    const users = JSON.parse(localStorage.getItem('users')) || [];
                    const userIndex = users.findIndex(u => u.email === currentUser.email);
                    if (userIndex !== -1) {
                        users[userIndex] = currentUser;
                        localStorage.setItem('users', JSON.stringify(users));
                    }
                    
                    // Show success message
                    alert(`${foodData.name} added to your daily log!`);
                }
            });
        });
    }
});