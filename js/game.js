/**
 * Sheep Business Game - Main Game Logic
 * Educational Math Game for Year 5 Students
 * Version 1.0
 */

// Game State Management
class SheepBusinessGame {
    constructor() {
        this.gameState = {
            currentRound: 1,
            maxRounds: 4,
            balance: 200,
            flockSize: 0,
            sheep: [],
            currentSeason: 'spring',
            seasonalPrices: {
                spring: {
                    woolPrice: 18,
                    feedCost: 12,
                    housingCost: 8,
                    sheepPurchasePrice: 45,
                    marketCondition: 'Growing season'
                },
                summer: {
                    woolPrice: 22,
                    feedCost: 18,
                    housingCost: 12,
                    sheepPurchasePrice: 55,
                    marketCondition: 'Peak demand'
                },
                autumn: {
                    woolPrice: 20,
                    feedCost: 15,
                    housingCost: 10,
                    sheepPurchasePrice: 50,
                    marketCondition: 'Stable market'
                },
                winter: {
                    woolPrice: 16,
                    feedCost: 20,
                    housingCost: 15,
                    sheepPurchasePrice: 40,
                    marketCondition: 'High costs'
                }
            },
            marketPrices: {
                woolPrice: 18,
                feedCost: 12,
                housingCost: 8,
                sheepPurchasePrice: 45
            },
            roundHistory: [],
            settings: {
                seasonalFluctuation: true,
                randomVariation: false,
                sheepMortality: false,
                marketDifficulty: 'medium'
            },
            currentRoundData: null
        };

        this.seasons = ['spring', 'summer', 'autumn', 'winter'];
        this.seasonIcons = {
            spring: '🌸',
            summer: '☀️',
            autumn: '🍂',
            winter: '❄️'
        };

        this.initializeGame();
        this.setupEventListeners();
    }

    /**
     * Initialize the game with starting values
     */
    initializeGame() {
        this.updateDisplay();
        this.updateSeasonalPrices();
        this.updateMarketConditions();
        this.clearCalculations();
        this.updateChart();
    }

    /**
     * Set up all event listeners for user interactions
     */
    setupEventListeners() {
        // Purchase button
        document.getElementById('purchaseBtn').addEventListener('click', () => {
            this.handlePurchase();
        });

        // Calculation check buttons
        document.querySelectorAll('.btn-check').forEach(button => {
            button.addEventListener('click', (e) => {
                const calculationType = e.target.dataset.calculation;
                this.handleCalculationCheck(calculationType);
            });
        });

        // Next round button
        document.getElementById('nextRoundBtn').addEventListener('click', () => {
            this.advanceRound();
        });

        // Reset button
        document.getElementById('resetBtn').addEventListener('click', () => {
            this.resetGame();
        });

        // Help button
        document.getElementById('helpBtn').addEventListener('click', () => {
            this.showHelp();
        });

        // Teacher settings button
        document.getElementById('teacherSettingsBtn').addEventListener('click', () => {
            this.showTeacherSettings();
        });

        // Market trends button
        document.getElementById('marketTrendsBtn').addEventListener('click', () => {
            this.showMarketTrends();
        });

        // Modal close buttons
        document.querySelectorAll('.close').forEach(closeBtn => {
            closeBtn.addEventListener('click', (e) => {
                this.closeModal(e.target.closest('.modal'));
            });
        });

        // Modal backdrop clicks
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal);
                }
            });
        });

        // Teacher settings save/cancel
        document.getElementById('saveSettings').addEventListener('click', () => {
            this.saveTeacherSettings();
        });

        document.getElementById('cancelSettings').addEventListener('click', () => {
            this.closeModal(document.getElementById('teacherSettingsModal'));
        });

        // Enter key support for inputs
        document.querySelectorAll('input[type="number"]').forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const calculationType = this.getCalculationTypeFromInput(input);
                    if (calculationType) {
                        this.handleCalculationCheck(calculationType);
                    } else if (input.id === 'sheepQuantity') {
                        this.handlePurchase();
                    }
                }
            });
        });
    }

    /**
     * Handle sheep purchase
     */
    handlePurchase() {
        const quantity = parseInt(document.getElementById('sheepQuantity').value) || 0;
        
        if (quantity < 0 || quantity > 20) {
            this.showFeedback('Please enter a valid number of sheep (0-20)', 'error');
            return;
        }

        const totalCost = quantity * this.gameState.marketPrices.sheepPurchasePrice;
        
        if (totalCost > this.gameState.balance) {
            this.showFeedback('Insufficient funds for this purchase', 'error');
            return;
        }

        // Update game state
        this.gameState.balance -= totalCost;
        this.gameState.flockSize += quantity;
        
        // Add sheep to flock
        for (let i = 0; i < quantity; i++) {
            this.gameState.sheep.push({
                id: Date.now() + i,
                purchaseRound: this.gameState.currentRound,
                purchasePrice: this.gameState.marketPrices.sheepPurchasePrice
            });
        }

        // Initialize current round data
        this.gameState.currentRoundData = {
            roundNumber: this.gameState.currentRound,
            season: this.gameState.currentSeason,
            marketCondition: this.gameState.seasonalPrices[this.gameState.currentSeason].marketCondition,
            sheepPurchased: quantity,
            seasonalPrices: { ...this.gameState.marketPrices },
            priceChanges: this.calculatePriceChanges(),
            calculations: {
                housingCost: { studentAnswer: null, correctAnswer: null, attempts: 0 },
                feedCost: { studentAnswer: null, correctAnswer: null, attempts: 0 },
                woolIncome: { studentAnswer: null, correctAnswer: null, attempts: 0 },
                profit: { studentAnswer: null, correctAnswer: null, attempts: 0 }
            },
            finalProfit: 0,
            endingBalance: 0
        };

        this.updateDisplay();
        this.showFeedback(`Successfully purchased ${quantity} sheep for $${totalCost}`, 'success');
        
        // Enable calculation inputs
        this.enableCalculations();
    }

    /**
     * Handle calculation validation
     */
    handleCalculationCheck(calculationType) {
        const inputElement = document.getElementById(`${calculationType}Calculation`);
        const studentAnswer = parseInt(inputElement.value) || 0;
        const correctAnswer = this.calculateCorrectAnswer(calculationType);
        
        if (studentAnswer === correctAnswer) {
            this.markCalculationCorrect(calculationType, studentAnswer);
            this.showFeedback('Correct! Well done!', 'success');
        } else {
            this.markCalculationIncorrect(calculationType, studentAnswer, correctAnswer);
            this.showFeedback('Try again! Check your calculation.', 'error');
        }

        this.checkRoundCompletion();
    }

    /**
     * Calculate the correct answer for a given calculation type
     */
    calculateCorrectAnswer(calculationType) {
        const sheepCount = this.gameState.flockSize;
        const prices = this.gameState.marketPrices;
        
        switch (calculationType) {
            case 'housing':
                return sheepCount * prices.housingCost;
            case 'feed':
                return sheepCount * prices.feedCost;
            case 'wool':
                return sheepCount * prices.woolPrice;
            case 'profit':
                const housingCost = sheepCount * prices.housingCost;
                const feedCost = sheepCount * prices.feedCost;
                const woolIncome = sheepCount * prices.woolPrice;
                const purchaseCost = this.gameState.currentRoundData.sheepPurchased * prices.sheepPurchasePrice;
                return woolIncome - (housingCost + feedCost + purchaseCost);
            default:
                return 0;
        }
    }

    /**
     * Mark a calculation as correct
     */
    markCalculationCorrect(calculationType, answer) {
        const inputElement = document.getElementById(`${calculationType}Calculation`);
        const calculationItem = inputElement.closest('.calculation-item');
        
        calculationItem.classList.remove('incorrect');
        calculationItem.classList.add('correct');
        inputElement.disabled = true;
        
        // Update game state
        this.gameState.currentRoundData.calculations[calculationType] = {
            studentAnswer: answer,
            correctAnswer: answer,
            attempts: this.gameState.currentRoundData.calculations[calculationType].attempts + 1
        };
    }

    /**
     * Mark a calculation as incorrect
     */
    markCalculationIncorrect(calculationType, studentAnswer, correctAnswer) {
        const inputElement = document.getElementById(`${calculationType}Calculation`);
        const calculationItem = inputElement.closest('.calculation-item');
        
        calculationItem.classList.remove('correct');
        calculationItem.classList.add('incorrect');
        
        // Update attempts count
        this.gameState.currentRoundData.calculations[calculationType].attempts++;
        this.gameState.currentRoundData.calculations[calculationType].studentAnswer = studentAnswer;
        this.gameState.currentRoundData.calculations[calculationType].correctAnswer = correctAnswer;

        // Show worked example after 2 attempts
        if (this.gameState.currentRoundData.calculations[calculationType].attempts >= 2) {
            this.showWorkedExample(calculationType);
        }

        // Auto-fill after 5 attempts with penalty
        if (this.gameState.currentRoundData.calculations[calculationType].attempts >= 5) {
            this.autoFillCalculation(calculationType, correctAnswer);
        }
    }

    /**
     * Show worked example for a calculation
     */
    showWorkedExample(calculationType) {
        const sheepCount = this.gameState.flockSize;
        const prices = this.gameState.marketPrices;
        let example = '';

        switch (calculationType) {
            case 'housing':
                example = `Housing Cost = Number of Sheep × Housing Cost per Sheep<br>
                          Housing Cost = ${sheepCount} × $${prices.housingCost} = $${sheepCount * prices.housingCost}`;
                break;
            case 'feed':
                example = `Feed Cost = Number of Sheep × Feed Cost per Sheep<br>
                          Feed Cost = ${sheepCount} × $${prices.feedCost} = $${sheepCount * prices.feedCost}`;
                break;
            case 'wool':
                example = `Wool Income = Number of Sheep × Wool Price per Sheep<br>
                          Wool Income = ${sheepCount} × $${prices.woolPrice} = $${sheepCount * prices.woolPrice}`;
                break;
            case 'profit':
                const housingCost = sheepCount * prices.housingCost;
                const feedCost = sheepCount * prices.feedCost;
                const woolIncome = sheepCount * prices.woolPrice;
                const purchaseCost = this.gameState.currentRoundData.sheepPurchased * prices.sheepPurchasePrice;
                example = `Profit = Wool Income - (Housing Cost + Feed Cost + Purchase Cost)<br>
                          Profit = $${woolIncome} - ($${housingCost} + $${feedCost} + $${purchaseCost})<br>
                          Profit = $${woolIncome} - $${housingCost + feedCost + purchaseCost} = $${woolIncome - (housingCost + feedCost + purchaseCost)}`;
                break;
        }

        document.getElementById('workedExampleContent').innerHTML = example;
        this.showModal('workedExampleModal');
    }

    /**
     * Auto-fill calculation with penalty
     */
    autoFillCalculation(calculationType, correctAnswer) {
        const inputElement = document.getElementById(`${calculationType}Calculation`);
        inputElement.value = correctAnswer;
        inputElement.disabled = true;
        
        // Apply penalty
        this.gameState.balance -= 10;
        this.updateDisplay();
        
        this.markCalculationCorrect(calculationType, correctAnswer);
        this.showFeedback('Answer auto-filled with $10 penalty. Keep practicing!', 'warning');
    }

    /**
     * Check if all calculations are complete
     */
    checkRoundCompletion() {
        const calculations = this.gameState.currentRoundData.calculations;
        const allComplete = Object.values(calculations).every(calc => 
            calc.studentAnswer === calc.correctAnswer
        );

        if (allComplete) {
            document.getElementById('nextRoundBtn').disabled = false;
            this.showFeedback('All calculations correct! You can advance to the next round.', 'success');
        }
    }

    /**
     * Advance to the next round
     */
    advanceRound() {
        // Save current round data
        this.gameState.roundHistory.push(this.gameState.currentRoundData);
        
        // Update round number
        this.gameState.currentRound++;
        
        if (this.gameState.currentRound > this.gameState.maxRounds) {
            this.completeGame();
        } else {
            // Update season
            const seasonIndex = (this.gameState.currentRound - 1) % 4;
            this.gameState.currentSeason = this.seasons[seasonIndex];
            
            // Update prices for new season
            this.updateSeasonalPrices();
            
            // Reset for new round
            this.clearCalculations();
            this.updateDisplay();
            this.updateMarketConditions();
            this.updateChart();
            
            this.showFeedback(`Welcome to ${this.gameState.currentSeason}! New prices are in effect.`, 'success');
        }
    }

    /**
     * Complete the game and show summary
     */
    completeGame() {
        this.showGameSummary();
    }

    /**
     * Update the display with current game state
     */
    updateDisplay() {
        // Update header
        document.getElementById('currentRound').textContent = this.gameState.currentRound;
        document.getElementById('maxRounds').textContent = this.gameState.maxRounds;
        document.getElementById('currentSeason').textContent = this.gameState.currentSeason.charAt(0).toUpperCase() + this.gameState.currentSeason.slice(1);
        document.getElementById('seasonIcon').textContent = this.seasonIcons[this.gameState.currentSeason];
        
        // Update financial information
        document.getElementById('currentBalance').textContent = `$${this.gameState.balance}`;
        document.getElementById('flockSize').textContent = this.gameState.flockSize;
        
        // Update prices
        document.getElementById('sheepPrice').textContent = `$${this.gameState.marketPrices.sheepPurchasePrice}`;
        document.getElementById('housingCost').textContent = `$${this.gameState.marketPrices.housingCost}`;
        document.getElementById('feedCost').textContent = `$${this.gameState.marketPrices.feedCost}`;
        document.getElementById('woolPrice').textContent = `$${this.gameState.marketPrices.woolPrice}`;
        
        // Update market condition
        document.getElementById('marketCondition').textContent = this.gameState.seasonalPrices[this.gameState.currentSeason].marketCondition;
    }

    /**
     * Update seasonal prices
     */
    updateSeasonalPrices() {
        const season = this.gameState.currentSeason;
        const basePrices = this.gameState.seasonalPrices[season];
        
        // Apply random variations if enabled
        if (this.gameState.settings.randomVariation) {
            this.gameState.marketPrices = {
                woolPrice: this.applyRandomVariation(basePrices.woolPrice),
                feedCost: this.applyRandomVariation(basePrices.feedCost),
                housingCost: this.applyRandomVariation(basePrices.housingCost),
                sheepPurchasePrice: this.applyRandomVariation(basePrices.sheepPurchasePrice)
            };
        } else {
            this.gameState.marketPrices = { ...basePrices };
        }
    }

    /**
     * Apply random variation to a price
     */
    applyRandomVariation(basePrice) {
        const variation = Math.floor(Math.random() * 7) - 3; // -3 to +3
        return Math.max(1, basePrice + variation); // Ensure price doesn't go below $1
    }

    /**
     * Calculate price changes from previous round
     */
    calculatePriceChanges() {
        if (this.gameState.roundHistory.length === 0) {
            return {
                woolPrice: { previous: 0, current: this.gameState.marketPrices.woolPrice, change: 0 },
                feedCost: { previous: 0, current: this.gameState.marketPrices.feedCost, change: 0 },
                housingCost: { previous: 0, current: this.gameState.marketPrices.housingCost, change: 0 },
                sheepPurchasePrice: { previous: 0, current: this.gameState.marketPrices.sheepPurchasePrice, change: 0 }
            };
        }

        const previousRound = this.gameState.roundHistory[this.gameState.roundHistory.length - 1];
        const previousPrices = previousRound.seasonalPrices;

        return {
            woolPrice: {
                previous: previousPrices.woolPrice,
                current: this.gameState.marketPrices.woolPrice,
                change: this.gameState.marketPrices.woolPrice - previousPrices.woolPrice
            },
            feedCost: {
                previous: previousPrices.feedCost,
                current: this.gameState.marketPrices.feedCost,
                change: this.gameState.marketPrices.feedCost - previousPrices.feedCost
            },
            housingCost: {
                previous: previousPrices.housingCost,
                current: this.gameState.marketPrices.housingCost,
                change: this.gameState.marketPrices.housingCost - previousPrices.housingCost
            },
            sheepPurchasePrice: {
                previous: previousPrices.sheepPurchasePrice,
                current: this.gameState.marketPrices.sheepPurchasePrice,
                change: this.gameState.marketPrices.sheepPurchasePrice - previousPrices.sheepPurchasePrice
            }
        };
    }

    /**
     * Update market conditions display
     */
    updateMarketConditions() {
        const priceChanges = this.calculatePriceChanges();
        const priceChangesContainer = document.getElementById('priceChanges');
        
        priceChangesContainer.innerHTML = '';
        
        Object.entries(priceChanges).forEach(([priceType, change]) => {
            if (change.change !== 0) {
                const changeElement = document.createElement('div');
                changeElement.className = 'price-change-item';
                const direction = change.change > 0 ? '↑' : '↓';
                const color = change.change > 0 ? 'up' : 'down';
                changeElement.innerHTML = `
                    <span class="price-type">${this.formatPriceType(priceType)}:</span>
                    <span class="change-arrow ${color}">${direction}</span>
                    <span class="change-amount">$${Math.abs(change.change)}</span>
                `;
                priceChangesContainer.appendChild(changeElement);
            }
        });
    }

    /**
     * Format price type for display
     */
    formatPriceType(priceType) {
        return priceType
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase());
    }

    /**
     * Clear all calculation inputs
     */
    clearCalculations() {
        const calculationInputs = document.querySelectorAll('.calculation-item input');
        calculationInputs.forEach(input => {
            input.value = '';
            input.disabled = true;
            input.closest('.calculation-item').classList.remove('correct', 'incorrect');
        });
        
        document.getElementById('nextRoundBtn').disabled = true;
    }

    /**
     * Enable calculation inputs after purchase
     */
    enableCalculations() {
        const calculationInputs = document.querySelectorAll('.calculation-item input');
        calculationInputs.forEach(input => {
            input.disabled = false;
        });
    }

    /**
     * Update the profit chart
     */
    updateChart() {
        const chartContainer = document.getElementById('profitChart');
        
        if (this.gameState.roundHistory.length === 0) {
            chartContainer.innerHTML = '<p>Complete your first round to see profit trends</p>';
            return;
        }

        // Simple chart implementation - can be enhanced with a charting library
        const profits = this.gameState.roundHistory.map(round => round.finalProfit);
        const chartHTML = this.createSimpleChart(profits);
        chartContainer.innerHTML = chartHTML;
    }

    /**
     * Create a simple text-based chart
     */
    createSimpleChart(profits) {
        let chartHTML = '<div class="simple-chart">';
        profits.forEach((profit, index) => {
            const barHeight = Math.max(1, Math.abs(profit) / 10);
            const barColor = profit >= 0 ? 'green' : 'red';
            chartHTML += `
                <div class="chart-bar">
                    <div class="bar-label">Round ${index + 1}</div>
                    <div class="bar" style="height: ${barHeight}px; background-color: ${barColor};"></div>
                    <div class="bar-value">$${profit}</div>
                </div>
            `;
        });
        chartHTML += '</div>';
        return chartHTML;
    }

    /**
     * Show feedback message
     */
    showFeedback(message, type = 'info') {
        const banner = document.getElementById('feedbackBanner');
        banner.textContent = message;
        banner.className = `feedback-banner ${type}`;
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            banner.className = 'feedback-banner';
        }, 5000);
    }

    /**
     * Show modal
     */
    showModal(modalId) {
        document.getElementById(modalId).style.display = 'block';
    }

    /**
     * Close modal
     */
    closeModal(modal) {
        modal.style.display = 'none';
    }

    /**
     * Reset the game
     */
    resetGame() {
        if (confirm('Are you sure you want to reset the game? All progress will be lost.')) {
            this.gameState = {
                ...this.gameState,
                currentRound: 1,
                balance: this.gameState.settings.startingBalance || 200,
                flockSize: 0,
                sheep: [],
                currentSeason: 'spring',
                roundHistory: [],
                currentRoundData: null
            };
            
            this.initializeGame();
            this.showFeedback('Game reset successfully!', 'success');
        }
    }

    /**
     * Show help modal
     */
    showHelp() {
        this.showModal('helpModal');
    }

    /**
     * Show teacher settings modal
     */
    showTeacherSettings() {
        // Populate current settings
        document.getElementById('seasonalFluctuation').checked = this.gameState.settings.seasonalFluctuation;
        document.getElementById('randomVariation').checked = this.gameState.settings.randomVariation;
        document.getElementById('sheepMortality').checked = this.gameState.settings.sheepMortality;
        document.getElementById('startingBalance').value = this.gameState.settings.startingBalance || 200;
        document.getElementById('maxRoundsSetting').value = this.gameState.settings.maxRounds || 4;
        document.getElementById('marketDifficulty').value = this.gameState.settings.marketDifficulty;
        
        this.showModal('teacherSettingsModal');
    }

    /**
     * Save teacher settings
     */
    saveTeacherSettings() {
        this.gameState.settings.seasonalFluctuation = document.getElementById('seasonalFluctuation').checked;
        this.gameState.settings.randomVariation = document.getElementById('randomVariation').checked;
        this.gameState.settings.sheepMortality = document.getElementById('sheepMortality').checked;
        this.gameState.settings.startingBalance = parseInt(document.getElementById('startingBalance').value) || 200;
        this.gameState.settings.maxRounds = parseInt(document.getElementById('maxRoundsSetting').value) || 4;
        this.gameState.settings.marketDifficulty = document.getElementById('marketDifficulty').value;
        
        this.closeModal(document.getElementById('teacherSettingsModal'));
        this.showFeedback('Settings saved successfully!', 'success');
    }

    /**
     * Show market trends modal
     */
    showMarketTrends() {
        const trendsContent = document.getElementById('marketTrendsContent');
        let trendsHTML = '<h3>Seasonal Price Trends</h3><table class="trends-table">';
        trendsHTML += '<tr><th>Season</th><th>Wool Price</th><th>Feed Cost</th><th>Housing Cost</th><th>Sheep Price</th></tr>';
        
        Object.entries(this.gameState.seasonalPrices).forEach(([season, prices]) => {
            trendsHTML += `
                <tr>
                    <td>${season.charAt(0).toUpperCase() + season.slice(1)}</td>
                    <td>$${prices.woolPrice}</td>
                    <td>$${prices.feedCost}</td>
                    <td>$${prices.housingCost}</td>
                    <td>$${prices.sheepPurchasePrice}</td>
                </tr>
            `;
        });
        
        trendsHTML += '</table>';
        trendsContent.innerHTML = trendsHTML;
        this.showModal('marketTrendsModal');
    }

    /**
     * Show game summary
     */
    showGameSummary() {
        const summaryContent = document.getElementById('gameSummaryContent');
        let summaryHTML = '<h3>Game Complete!</h3>';
        
        // Calculate final statistics
        const totalProfit = this.gameState.roundHistory.reduce((sum, round) => sum + round.finalProfit, 0);
        const averageProfit = totalProfit / this.gameState.roundHistory.length;
        const bestRound = this.gameState.roundHistory.reduce((best, round) => 
            round.finalProfit > best.finalProfit ? round : best
        );
        
        summaryHTML += `
            <div class="summary-stats">
                <p><strong>Final Balance:</strong> $${this.gameState.balance}</p>
                <p><strong>Total Profit:</strong> $${totalProfit}</p>
                <p><strong>Average Profit per Round:</strong> $${averageProfit.toFixed(2)}</p>
                <p><strong>Best Round:</strong> Round ${bestRound.roundNumber} ($${bestRound.finalProfit})</p>
                <p><strong>Final Flock Size:</strong> ${this.gameState.flockSize} sheep</p>
            </div>
        `;
        
        summaryContent.innerHTML = summaryHTML;
        this.showModal('gameSummaryModal');
    }

    /**
     * Get calculation type from input element
     */
    getCalculationTypeFromInput(input) {
        const id = input.id;
        if (id.includes('housing')) return 'housing';
        if (id.includes('feed')) return 'feed';
        if (id.includes('wool')) return 'wool';
        if (id.includes('profit')) return 'profit';
        return null;
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.sheepGame = new SheepBusinessGame();
}); 