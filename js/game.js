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
            maxRounds: 12,
            balance: 200,
            flockSize: 0,
            sheep: [],
            housingCapacity: 0, // Number of housing units available
            totalHousingExpenses: 0, // Total amount spent on housing
            currentSeason: 'spring',
            canSkipPurchases: false, // New property to track if purchases can be skipped
            sheepPurchasedThisRound: 0, // Number of sheep purchased in current round only
            housingUnitsPurchasedThisRound: 0, // Number of housing units purchased in current round only
            seasonalPrices: {
                spring: {
                    woolPrice: 72, // Increased from 18 to achieve ~60% profit margin (sheep cost $45)
                    feedCost: 12,
                    housingCost: 8,
                    sheepPurchasePrice: 45,
                    marketCondition: 'Growing season'
                },
                summer: {
                    woolPrice: 88, // Increased from 22 to achieve ~60% profit margin (sheep cost $55)
                    feedCost: 18,
                    housingCost: 12,
                    sheepPurchasePrice: 55,
                    marketCondition: 'Peak demand'
                },
                autumn: {
                    woolPrice: 80, // Increased from 20 to achieve ~60% profit margin (sheep cost $50)
                    feedCost: 15,
                    housingCost: 10,
                    sheepPurchasePrice: 50,
                    marketCondition: 'Stable market'
                },
                winter: {
                    woolPrice: 64, // Increased from 16 to achieve ~60% profit margin (sheep cost $40)
                    feedCost: 20,
                    housingCost: 15,
                    sheepPurchasePrice: 40,
                    marketCondition: 'High costs'
                }
            },
            marketPrices: {
                woolPrice: 72,
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
        // Set whether purchases can be skipped (round 2 and beyond)
        this.gameState.canSkipPurchases = this.gameState.currentRound > 1;
        
        this.updateDisplay();
        this.updateSeasonalPrices();
        this.updateMarketConditions();
        this.clearCalculations();
        this.updateChart();
        this.updateHousingPreview();
        this.updateSheepPurchasePreview();
        this.initializeRoundData();
        this.updatePurchaseSectionVisibility();
        
        // Ensure purchase inputs are enabled
        this.enablePurchaseInputs();
        
        // Check if calculations should be auto-enabled for round 2+
        this.checkAutoEnableCalculations();
    }

    /**
     * Set up all event listeners for user interactions
     */
    setupEventListeners() {
        // Purchase button
        document.getElementById('purchaseBtn').addEventListener('click', () => {
            this.handlePurchase();
        });
        


        // Housing purchase button
        document.getElementById('purchaseHousingBtn').addEventListener('click', () => {
            this.handleHousingPurchase();
        });

        // Housing amount input for real-time preview
        document.getElementById('housingAmount').addEventListener('input', () => {
            this.updateHousingPreview();
        });

        // Sheep money input for real-time preview
        document.getElementById('sheepMoneyInput').addEventListener('input', () => {
            this.updateSheepPurchasePreview();
        });

        // Guide toggle buttons
        document.querySelectorAll('.guide-toggle').forEach(button => {
            button.addEventListener('click', (e) => {
                this.toggleGuide(e.target.closest('.guide-toggle'));
            });
        });

        // Next round button (if it exists)
        const nextRoundBtn = document.getElementById('nextRoundBtn');
        if (nextRoundBtn) {
            nextRoundBtn.addEventListener('click', () => {
                this.handleNextRound();
            });
        }

        // Calculation check buttons
        document.querySelectorAll('.btn-check').forEach(button => {
            button.addEventListener('click', (e) => {
                const calculationType = e.target.dataset.calculation;
                this.handleCalculationCheck(calculationType);
            });
        });

        // Reset button
        document.getElementById('resetBtn').addEventListener('click', () => {
            this.resetGame();
        });

        // Help button
        document.getElementById('helpBtn').addEventListener('click', () => {
            this.showHelp();
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
     * Initialize round data for a new round
     */
    initializeRoundData() {
        // Reset round-specific purchase counters
        this.gameState.sheepPurchasedThisRound = 0;
        this.gameState.housingUnitsPurchasedThisRound = 0;
        
        this.gameState.currentRoundData = {
            roundNumber: this.gameState.currentRound,
            season: this.gameState.currentSeason,
            marketCondition: this.gameState.seasonalPrices[this.gameState.currentSeason].marketCondition,
            sheepPurchased: 0,
            housingCapacity: this.gameState.housingCapacity,
            housingPurchased: 0,
            seasonalPrices: { ...this.gameState.marketPrices },
            priceChanges: this.calculatePriceChanges(),
            calculations: {
                feedCost: { studentAnswer: null, correctAnswer: null, attempts: 0 },
                woolIncome: { studentAnswer: null, correctAnswer: null, attempts: 0 },
                profit: { studentAnswer: null, correctAnswer: null, attempts: 0 }
            },
            finalProfit: 0,
            endingBalance: 0
        };
    }

    /**
     * Handle sheep purchase
     */
    handlePurchase() {
        const moneyInput = parseFloat(document.getElementById('sheepMoneyInput').value) || 0;
        
        // Validate input
        if (isNaN(moneyInput) || moneyInput < 0) {
            this.showFeedback('Please enter a valid amount for sheep purchase.', 'error');
            return;
        }
        
        if (moneyInput > this.gameState.balance) {
            this.showFeedback('Insufficient funds for sheep purchase.', 'error');
            return;
        }
        
        // Calculate sheep quantity to purchase
        const sheepPrice = this.gameState.marketPrices.sheepPurchasePrice;
        
        // Check if the amount is an exact multiple of the sheep price
        if (moneyInput % sheepPrice !== 0) {
            this.showFeedback(`Amount must be an exact multiple of the sheep price ($${sheepPrice}). Please calculate the correct amount.`, 'error');
            return;
        }
        
        const quantity = moneyInput / sheepPrice;
        
        if (quantity === 0) {
            this.showFeedback('Amount too small to purchase any sheep.', 'error');
            return;
        }
        
        // Check maximum sheep limit
        if (quantity > 20) {
            this.showFeedback('Cannot purchase more than 20 sheep per round.', 'error');
            return;
        }
        
        // Check housing capacity
        if (this.gameState.flockSize + quantity > this.gameState.housingCapacity) {
            this.showFeedback(`Insufficient housing! You can only house ${this.gameState.housingCapacity} sheep. Purchase more housing first.`, 'error');
            return;
        }
        
        // Calculate actual cost and update game state
        const actualCost = quantity * sheepPrice;
        this.gameState.balance -= actualCost;
        this.gameState.flockSize += quantity;
        
        // Increment round-specific sheep purchase counter
        this.gameState.sheepPurchasedThisRound += quantity;
        
        // Add sheep to flock
        for (let i = 0; i < quantity; i++) {
            this.gameState.sheep.push({
                id: Date.now() + i,
                purchaseRound: this.gameState.currentRound,
                purchasePrice: sheepPrice
            });
        }

        // Update current round data
        if (this.gameState.currentRoundData) {
            this.gameState.currentRoundData.sheepPurchased = quantity;
            this.gameState.currentRoundData.housingCapacity = this.gameState.housingCapacity;
        }

        // Clear the input
        document.getElementById('sheepMoneyInput').value = '0';
        this.updateSheepPurchasePreview();
        
        this.updateDisplay();
        this.showFeedback(`🐑 Successfully purchased ${quantity} sheep for $${actualCost}!`, 'success');
        
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
        
        // Get current round data for purchase costs
        const sheepPurchased = this.gameState.currentRoundData ? this.gameState.currentRoundData.sheepPurchased : 0;
        const housingPurchased = this.gameState.currentRoundData ? this.gameState.currentRoundData.housingPurchased : 0;
        
        switch (calculationType) {
            case 'feed':
                return sheepCount * prices.feedCost;
            case 'wool':
                return sheepCount * prices.woolPrice;
            case 'profit':
                const feedCost = sheepCount * prices.feedCost;
                const woolIncome = sheepCount * prices.woolPrice;
                const purchaseCost = sheepPurchased * prices.sheepPurchasePrice;
                const housingCost = housingPurchased * prices.housingCost;
                return woolIncome - (feedCost + purchaseCost + housingCost);
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
        
        // Update game state - safely handle if calculation object doesn't exist yet
        if (this.gameState.currentRoundData && this.gameState.currentRoundData.calculations) {
            if (!this.gameState.currentRoundData.calculations[calculationType]) {
                this.gameState.currentRoundData.calculations[calculationType] = {
                    studentAnswer: null,
                    correctAnswer: null,
                    attempts: 0
                };
            }
            
            this.gameState.currentRoundData.calculations[calculationType] = {
                studentAnswer: answer,
                correctAnswer: answer,
                attempts: this.gameState.currentRoundData.calculations[calculationType].attempts + 1
            };
        }
    }

    /**
     * Mark a calculation as incorrect
     */
    markCalculationIncorrect(calculationType, studentAnswer, correctAnswer) {
        const inputElement = document.getElementById(`${calculationType}Calculation`);
        const calculationItem = inputElement.closest('.calculation-item');
        
        calculationItem.classList.remove('correct');
        calculationItem.classList.add('incorrect');
        
        // Update attempts count - safely handle if calculation object doesn't exist yet
        if (this.gameState.currentRoundData && this.gameState.currentRoundData.calculations) {
            if (!this.gameState.currentRoundData.calculations[calculationType]) {
                this.gameState.currentRoundData.calculations[calculationType] = {
                    studentAnswer: null,
                    correctAnswer: null,
                    attempts: 0
                };
            }
            
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
    }

    /**
     * Show worked example for a calculation
     */
    showWorkedExample(calculationType) {
        const sheepCount = this.gameState.flockSize;
        const prices = this.gameState.marketPrices;
        const sheepPurchased = this.gameState.currentRoundData ? this.gameState.currentRoundData.sheepPurchased : 0;
        const housingPurchased = this.gameState.currentRoundData ? this.gameState.currentRoundData.housingPurchased : 0;
        let example = '';

        switch (calculationType) {
            case 'feed':
                example = `Feed Cost = Number of Sheep × Feed Cost per Sheep<br>
                          Feed Cost = ${sheepCount} × $${prices.feedCost} = $${sheepCount * prices.feedCost}`;
                break;
            case 'wool':
                example = `Wool Income = Number of Sheep × Wool Price per Sheep<br>
                          Wool Income = ${sheepCount} × $${prices.woolPrice} = $${sheepCount * prices.woolPrice}`;
                break;
            case 'profit':
                const feedCost = sheepCount * prices.feedCost;
                const woolIncome = sheepCount * prices.woolPrice;
                const purchaseCost = sheepPurchased * prices.sheepPurchasePrice;
                const housingCost = housingPurchased * prices.housingCost;
                const totalCosts = feedCost + purchaseCost + housingCost;
                
                let purchaseText = purchaseCost > 0 ? ` + Purchase Cost ($${purchaseCost})` : '';
                let housingText = housingCost > 0 ? ` + Housing Cost ($${housingCost})` : '';
                
                example = `Profit = Wool Income - (Feed Cost${purchaseText}${housingText})<br>
                          Profit = $${woolIncome} - ($${feedCost}${purchaseText}${housingText})<br>
                          Profit = $${woolIncome} - $${totalCosts} = $${woolIncome - totalCosts}`;
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
     * Calculate final profit for the current round
     */
    calculateFinalProfit() {
        if (!this.gameState.currentRoundData) return 0;
        
        const sheepCount = this.gameState.flockSize;
        const prices = this.gameState.marketPrices;
        
        // Calculate costs and income
        const woolIncome = sheepCount * prices.woolPrice;
        const feedCost = sheepCount * prices.feedCost;
        const purchaseCost = this.gameState.currentRoundData.sheepPurchased * prices.sheepPurchasePrice;
        const housingCost = this.gameState.currentRoundData.housingPurchased * prices.housingCost;
        
        // Calculate final profit
        const finalProfit = woolIncome - (feedCost + purchaseCost + housingCost);
        
        // Update round data
        this.gameState.currentRoundData.finalProfit = finalProfit;
        this.gameState.currentRoundData.endingBalance = this.gameState.balance + finalProfit;
        
        return finalProfit;
    }

    /**
     * Check if all calculations are complete and housing is sufficient
     */
    checkRoundCompletion() {
        const calculations = this.gameState.currentRoundData.calculations;
        
        // Check each calculation individually to ensure all are complete
        const feedComplete = calculations.feedCost.studentAnswer !== null && 
                           calculations.feedCost.studentAnswer === calculations.feedCost.correctAnswer;
        const woolComplete = calculations.woolIncome.studentAnswer !== null && 
                           calculations.woolIncome.studentAnswer === calculations.woolIncome.correctAnswer;
        const profitComplete = calculations.profit.studentAnswer !== null && 
                             calculations.profit.studentAnswer === calculations.profit.correctAnswer;
        
        // Alternative check: verify the input fields directly
        const feedInput = document.getElementById('feedCalculation');
        const woolInput = document.getElementById('woolCalculation');
        const profitInput = document.getElementById('profitCalculation');
        
        const feedInputValue = parseInt(feedInput?.value) || 0;
        const woolInputValue = parseInt(woolInput?.value) || 0;
        const profitInputValue = parseInt(profitInput?.value) || 0;
        
        const feedCorrectAnswer = this.calculateCorrectAnswer('feed');
        const woolCorrectAnswer = this.calculateCorrectAnswer('wool');
        const profitCorrectAnswer = this.calculateCorrectAnswer('profit');
        
        const feedCompleteAlt = feedInputValue === feedCorrectAnswer;
        const woolCompleteAlt = woolInputValue === woolCorrectAnswer;
        const profitCompleteAlt = profitInputValue === profitCorrectAnswer;
        
        // Use the alternative validation if the stored data is incomplete
        const allComplete = (feedComplete && woolComplete && profitComplete) || 
                           (feedCompleteAlt && woolCompleteAlt && profitCompleteAlt);
        
        const housingSufficient = this.checkHousingCapacity();
        


        if (allComplete && housingSufficient) {
            // Enable next round button without revealing profit information
            document.getElementById('nextRoundBtn').disabled = false;
            this.showFeedback('All calculations correct and housing sufficient! You can advance to the next round.', 'success');
        } else if (allComplete && !housingSufficient) {
            document.getElementById('nextRoundBtn').disabled = true;
            
            // Special case: if user has sheep but no housing at all
            if (this.gameState.flockSize > 0 && this.gameState.housingCapacity === 0) {
                this.showFeedback(`Calculations complete, but you have ${this.gameState.flockSize} sheep with no housing! You need to purchase housing for your sheep before advancing.`, 'warning');
            } else {
                this.showFeedback(`Calculations complete, but insufficient housing! You have ${this.gameState.flockSize} sheep but only ${this.gameState.housingCapacity} housing units. Purchase more housing before advancing.`, 'warning');
            }
        } else {
            document.getElementById('nextRoundBtn').disabled = true;
            // Add more specific feedback for incomplete calculations
            if (!allComplete) {
                let missingCalculations = [];
                if (!feedComplete && !feedCompleteAlt) missingCalculations.push('Feed Cost');
                if (!woolComplete && !woolCompleteAlt) missingCalculations.push('Wool Income');
                if (!profitComplete && !profitCompleteAlt) missingCalculations.push('Profit/Loss');
                this.showFeedback(`Complete all calculations first. Missing: ${missingCalculations.join(', ')}`, 'error');
            }
        }
    }

    /**
     * Handle next round button click with validation
     */
    handleNextRound() {
        // Check if housing is sufficient before allowing round advancement
        if (!this.checkHousingCapacity()) {
            this.showFeedback('Cannot advance: Insufficient housing for your current flock size. Purchase more housing first.', 'error');
            return;
        }
        
        // Check if all calculations are complete with detailed validation
        const calculations = this.gameState.currentRoundData.calculations;
        
        const feedComplete = calculations.feedCost.studentAnswer !== null && 
                           calculations.feedCost.studentAnswer === calculations.feedCost.correctAnswer;
        const woolComplete = calculations.woolIncome.studentAnswer !== null && 
                           calculations.woolIncome.studentAnswer === calculations.woolIncome.correctAnswer;
        const profitComplete = calculations.profit.studentAnswer !== null && 
                             calculations.profit.studentAnswer === calculations.profit.correctAnswer;
        
        // Alternative check: verify the input fields directly
        const feedInput = document.getElementById('feedCalculation');
        const woolInput = document.getElementById('woolCalculation');
        const profitInput = document.getElementById('profitCalculation');
        
        const feedInputValue = parseInt(feedInput?.value) || 0;
        const woolInputValue = parseInt(woolInput?.value) || 0;
        const profitInputValue = parseInt(profitInput?.value) || 0;
        
        const feedCorrectAnswer = this.calculateCorrectAnswer('feed');
        const woolCorrectAnswer = this.calculateCorrectAnswer('wool');
        const profitCorrectAnswer = this.calculateCorrectAnswer('profit');
        
        const feedCompleteAlt = feedInputValue === feedCorrectAnswer;
        const woolCompleteAlt = woolInputValue === woolCorrectAnswer;
        const profitCompleteAlt = profitInputValue === profitCorrectAnswer;
        
        // Use the alternative validation if the stored data is incomplete
        const allComplete = (feedComplete && woolComplete && profitComplete) || 
                           (feedCompleteAlt && woolCompleteAlt && profitCompleteAlt);
        

        
        if (!allComplete) {
            let missingCalculations = [];
            if (!feedComplete && !feedCompleteAlt) missingCalculations.push('Feed Cost');
            if (!woolComplete && !woolCompleteAlt) missingCalculations.push('Wool Income');
            if (!profitComplete && !profitCompleteAlt) missingCalculations.push('Profit/Loss');
            
            this.showFeedback(`Cannot advance: Complete all calculations first. Missing: ${missingCalculations.join(', ')}`, 'error');
            return;
        }
        
        // If all validations pass, advance to next round
        this.advanceRound();
    }

    /**
     * Advance to the next round
     */
    advanceRound() {
        // Calculate and apply final profit to balance
        if (this.gameState.currentRoundData) {
            const finalProfit = this.calculateFinalProfit();
            this.gameState.balance += finalProfit;
        }
        
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
            
            // Set whether purchases can be skipped (round 2 and beyond)
            this.gameState.canSkipPurchases = this.gameState.currentRound > 1;
            

            
            // Update prices for new season
            this.updateSeasonalPrices();
            
            // Reset for new round
            this.clearCalculations();
            this.initializeRoundData();
            this.updateDisplay();
            this.updateMarketConditions();
            this.updateChart();
            
            // Check housing sufficiency at start of new round
            this.checkHousingSufficiency();
            
            // Update purchase section visibility for new round
            this.updatePurchaseSectionVisibility();
            
            // Re-enable purchase inputs for new round
            this.enablePurchaseInputs();
            
            this.showFeedback(`Welcome to ${this.gameState.currentSeason}! New prices are in effect.`, 'success');
            
            // Check if calculations should be auto-enabled for round 2+
            this.checkAutoEnableCalculations();
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
        
        // Update housing information
        document.getElementById('housingCapacity').textContent = this.gameState.housingCapacity;
        document.getElementById('housingStatus').textContent = this.getHousingStatus();
        

        
        // Apply visual indicators for housing status
        this.updateHousingVisualIndicators();
        
        // Update prices
        document.getElementById('sheepPrice').textContent = `$${this.gameState.marketPrices.sheepPurchasePrice}`;
        document.getElementById('housingCost').textContent = `$${this.gameState.marketPrices.housingCost}`;
        document.getElementById('feedCost').textContent = `$${this.gameState.marketPrices.feedCost}`;
        document.getElementById('woolPrice').textContent = `$${this.gameState.marketPrices.woolPrice}`;
        
        // Update market condition
        document.getElementById('marketCondition').textContent = this.gameState.seasonalPrices[this.gameState.currentSeason].marketCondition;
        
        // Update round-specific purchase displays
        this.updateRoundPurchaseDisplays();
        
        // Guide values are no longer updated since guides show operation instructions only
    }

    /**
     * Update round-specific purchase displays
     */
    updateRoundPurchaseDisplays() {
        // Update sheep purchase display
        const sheepRoundPurchases = document.getElementById('sheepRoundPurchases');
        const sheepRoundValue = document.getElementById('sheepRoundPurchasesValue');
        
        if (this.gameState.sheepPurchasedThisRound > 0) {
            const message = `During this round you have purchased ${this.gameState.sheepPurchasedThisRound} sheep`;
            sheepRoundValue.textContent = message;
            sheepRoundPurchases.classList.add('has-purchases');
            sheepRoundPurchases.setAttribute('aria-label', message);
        } else {
            sheepRoundValue.textContent = 'No sheep purchased yet';
            sheepRoundPurchases.classList.remove('has-purchases');
            sheepRoundPurchases.setAttribute('aria-label', 'No sheep purchased in this round');
        }
        
        // Update housing purchase display
        const housingRoundPurchases = document.getElementById('housingRoundPurchases');
        const housingRoundValue = document.getElementById('housingRoundPurchasesValue');
        
        if (this.gameState.housingUnitsPurchasedThisRound > 0) {
            const message = `During this round you have purchased ${this.gameState.housingUnitsPurchasedThisRound} housing units`;
            housingRoundValue.textContent = message;
            housingRoundPurchases.classList.add('has-purchases');
            housingRoundPurchases.setAttribute('aria-label', message);
        } else {
            housingRoundValue.textContent = 'No housing purchased yet';
            housingRoundPurchases.classList.remove('has-purchases');
            housingRoundPurchases.setAttribute('aria-label', 'No housing purchased in this round');
        }
    }

    /**
     * Update seasonal prices with wool price fluctuations in 60-70% profit range
     */
    updateSeasonalPrices() {
        const season = this.gameState.currentSeason;
        const basePrices = this.gameState.seasonalPrices[season];
        
        // Calculate wool price with 60-70% profit margin fluctuation
        const woolPrice = this.calculateWoolPriceWithProfitMargin(basePrices.sheepPurchasePrice, basePrices.feedCost);
        
        // Apply random variations if enabled
        if (this.gameState.settings.randomVariation) {
            this.gameState.marketPrices = {
                woolPrice: this.applyRandomVariation(woolPrice),
                feedCost: this.applyRandomVariation(basePrices.feedCost),
                housingCost: this.applyRandomVariation(basePrices.housingCost),
                sheepPurchasePrice: this.applyRandomVariation(basePrices.sheepPurchasePrice)
            };
        } else {
            this.gameState.marketPrices = { 
                ...basePrices,
                woolPrice: woolPrice
            };
        }
        
        // Update housing preview when prices change
        this.updateHousingPreview();
        
        // Update sheep purchase preview when prices change
        this.updateSheepPurchasePreview();
    }

    /**
     * Calculate wool price to achieve 60-70% profit margin with fluctuations
     * @param {number} sheepPurchasePrice - Cost to purchase a sheep
     * @param {number} feedCost - Cost to feed a sheep
     * @returns {number} Wool price that achieves target profit margin
     */
    calculateWoolPriceWithProfitMargin(sheepPurchasePrice, feedCost) {
        // Calculate total cost per sheep (purchase + feed)
        const totalCostPerSheep = sheepPurchasePrice + feedCost;
        
        // Target profit margin: 60-70% (randomly selected)
        const minProfitMargin = 0.60; // 60%
        const maxProfitMargin = 0.70; // 70%
        const profitMargin = minProfitMargin + Math.random() * (maxProfitMargin - minProfitMargin);
        
        // Calculate wool price needed to achieve the target profit margin
        // Formula: woolPrice = totalCostPerSheep * (1 + profitMargin)
        const woolPrice = Math.round(totalCostPerSheep * (1 + profitMargin));
        
        return woolPrice;
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
        
        // Add skip to calculations button for round 2+ if no purchases made yet
        this.addSkipToCalculationsButton();
    }
    
    /**
     * Add skip to calculations button for round 2+
     */
    addSkipToCalculationsButton() {
        if (this.gameState.canSkipPurchases && this.gameState.flockSize > 0) {
            // Remove existing button if it exists
            const existingBtn = document.getElementById('skipToCalculationsBtn');
            if (existingBtn) {
                existingBtn.remove();
            }
            
            // Create new skip button
            const skipButton = document.createElement('button');
            skipButton.id = 'skipToCalculationsBtn';
            skipButton.className = 'btn btn-accent skip-to-calculations-btn';
            skipButton.innerHTML = `
                <strong>🚀 Skip Purchases - Use Existing Flock</strong><br>
                <small>Round ${this.gameState.currentRound}: Use your ${this.gameState.flockSize} sheep for calculations</small>
            `;
            skipButton.title = 'Skip sheep and housing purchases. Use your existing flock for calculations.';
            skipButton.addEventListener('click', () => {
                this.handleSkipPurchase();
            });
            
            // Insert the button at the top of the calculations section
            const calculationsSection = document.querySelector('.calculations-section');
            if (calculationsSection) {
                const firstCalculation = calculationsSection.querySelector('.calculation-item');
                if (firstCalculation) {
                    calculationsSection.insertBefore(skipButton, firstCalculation);
                    console.log('Skip to calculations button added');
                } else {
                    calculationsSection.appendChild(skipButton);
                    console.log('Skip to calculations button added to end of calculations section');
                }
            }
        }
    }

    /**
     * Enable calculation inputs after purchase
     */
    enableCalculations() {
        const calculationInputs = document.querySelectorAll('.calculation-item input');
        calculationInputs.forEach(input => {
            input.disabled = false;
        });
        
        // Remove skip to calculations button if it exists
        const skipToCalculationsBtn = document.getElementById('skipToCalculationsBtn');
        if (skipToCalculationsBtn) {
            skipToCalculationsBtn.remove();
        }
    }
    
    /**
     * Check if calculations should be auto-enabled for round 2+
     */
    checkAutoEnableCalculations() {
        // Auto-enable calculations in round 2+ if player has sheep and no purchases made yet
        if (this.gameState.canSkipPurchases && this.gameState.flockSize > 0) {
            console.log('Auto-enabling calculations for round', this.gameState.currentRound, 'with flock size', this.gameState.flockSize);
            
            // Check if any purchases have been made this round
            const sheepPurchased = this.gameState.currentRoundData ? this.gameState.currentRoundData.sheepPurchased : 0;
            const housingPurchased = this.gameState.currentRoundData ? this.gameState.currentRoundData.housingPurchased : 0;
            
            if (sheepPurchased === 0 && housingPurchased === 0) {
                console.log('No purchases made this round, enabling calculations');
                this.enableCalculations();
                
                // Show feedback to user
                this.showFeedback(`Round ${this.gameState.currentRound}: You can skip purchases and use your existing flock of ${this.gameState.flockSize} sheep for calculations!`, 'info');
            }
        }
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
                housingCapacity: 0,
                totalHousingExpenses: 0,
                currentSeason: 'spring',
                canSkipPurchases: false,
                sheepPurchasedThisRound: 0,
                housingUnitsPurchasedThisRound: 0,
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
     * Show detailed round history with housing information
     */
    showRoundHistory() {
        let historyHTML = '<h3>Round History</h3>';
        
        this.gameState.roundHistory.forEach((round, index) => {
            historyHTML += `
                <div class="round-history-item">
                    <h4>Round ${round.roundNumber} (${round.season})</h4>
                    <div class="round-details">
                        <p><strong>Sheep Purchased:</strong> ${round.sheepPurchased}</p>
                        <p><strong>Housing Purchased:</strong> ${round.housingPurchased || 0} units</p>
                        <p><strong>Housing Capacity:</strong> ${round.housingCapacity} units</p>
                        <p><strong>Final Profit:</strong> $${round.finalProfit || 0}</p>
                        <p><strong>Market Condition:</strong> ${round.marketCondition}</p>
                    </div>
                </div>
            `;
        });
        
        // Create a simple alert for now (could be enhanced with a modal)
        alert(historyHTML.replace(/<[^>]*>/g, ''));
    }

    /**
     * Show housing system help
     */
    showHousingHelp() {
        const helpContent = document.getElementById('housingHelpContent');
        helpContent.innerHTML = `
            <h3>🏠 Housing System Guide</h3>
            <p><strong>How it works:</strong></p>
            <ul>
                <li>Each housing unit can accommodate 1 sheep</li>
                <li>Housing costs vary by season</li>
                <li>Housing capacity persists between rounds</li>
                <li>You must have enough housing before purchasing sheep</li>
                <li>Round advancement is blocked if housing is insufficient</li>
            </ul>
            <p><strong>Visual Indicators:</strong></p>
            <ul>
                <li>🟢 Green: Plenty of housing available</li>
                <li>🟡 Yellow: Nearly at capacity (≤2 units remaining)</li>
                <li>🔴 Red: At capacity or insufficient housing</li>
            </ul>
            <p><strong>Strategy:</strong> Plan ahead! Housing costs change with seasons, so consider purchasing housing when prices are lower.</p>
        `;
        
        this.showModal('housingHelpModal');
    }

    /**
     * Show sheep purchase system help
     */
    showSheepPurchaseHelp() {
        const helpContent = document.getElementById('sheepPurchaseHelpContent');
        helpContent.innerHTML = `
            <h3>🐑 Sheep Purchase System Guide</h3>
            <p><strong>How it works:</strong></p>
            <ul>
                <li>Enter the amount of money you want to spend on sheep</li>
                <li>The system calculates how many sheep you can buy based on current prices</li>
                <li>Sheep prices vary by season</li>
                <li>Maximum 20 sheep can be purchased per round</li>
                <li>You must have enough housing capacity before purchasing sheep</li>
            </ul>
            <p><strong>What to do:</strong></p>
            <ul>
                <li>Look at the current sheep price (shown in the prices above)</li>
                <li>Divide your money by the sheep price to see how many sheep you can buy</li>
                <li>The system will show you the exact number of sheep you can purchase</li>
            </ul>
            <p><strong>Strategy:</strong> Watch for seasonal price changes! Sheep prices vary throughout the year.</p>
        `;
        
        this.showModal('sheepPurchaseHelpModal');
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
        document.getElementById('maxRoundsSetting').value = this.gameState.settings.maxRounds || 12;
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
        this.gameState.settings.maxRounds = parseInt(document.getElementById('maxRoundsSetting').value) || 12;
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
                <p><strong>Final Housing Capacity:</strong> ${this.gameState.housingCapacity} units</p>
                <p><strong>Total Housing Expenses:</strong> $${this.gameState.totalHousingExpenses}</p>
            </div>
        `;
        
        summaryContent.innerHTML = summaryHTML;
        this.showModal('gameSummaryModal');
    }

    /**
     * Toggle calculation guide visibility
     */
    toggleGuide(toggleButton) {
        const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';
        const contentId = toggleButton.getAttribute('aria-controls');
        const content = document.getElementById(contentId);
        
        if (isExpanded) {
            // Collapse guide
            toggleButton.setAttribute('aria-expanded', 'false');
            content.setAttribute('aria-hidden', 'true');
            toggleButton.querySelector('.guide-text').textContent = toggleButton.querySelector('.guide-text').textContent.replace('Hide', 'Show');
        } else {
            // Expand guide
            toggleButton.setAttribute('aria-expanded', 'true');
            content.setAttribute('aria-hidden', 'false');
            toggleButton.querySelector('.guide-text').textContent = toggleButton.querySelector('.guide-text').textContent.replace('Show', 'Hide');
            
            // Guide values are no longer updated since guides show operation instructions only
        }
    }

    /**
     * Update guide values with current game state
     * Note: This function is no longer needed since guides now show operation instructions only
     * Keeping the function for potential future use but removing the actual value updates
     */
    updateGuideValues() {
        // Guides now show operation instructions only, not actual values
        // This function is kept for potential future use but no longer populates values
    }

    /**
     * Get calculation type from input element
     */
    getCalculationTypeFromInput(input) {
        const id = input.id;
        if (id.includes('feed')) return 'feed';
        if (id.includes('wool')) return 'wool';
        if (id.includes('profit')) return 'profit';
        return null;
    }

    /**
     * Handle housing purchase
     */
    handleHousingPurchase() {
        const housingAmount = parseFloat(document.getElementById('housingAmount').value);
        
        // Validate input
        if (isNaN(housingAmount) || housingAmount < 0) {
            this.showFeedback('Please enter a valid amount for housing purchase.', 'error');
            return;
        }
        
        if (housingAmount > this.gameState.balance) {
            this.showFeedback('Insufficient funds for housing purchase.', 'error');
            return;
        }
        
        // Calculate housing units to purchase
        const housingCostPerUnit = this.gameState.marketPrices.housingCost;
        
        // Check if the amount is an exact multiple of the housing cost per unit
        if (housingAmount % housingCostPerUnit !== 0) {
            this.showFeedback(`Amount must be an exact multiple of the housing cost per unit ($${housingCostPerUnit}). Please calculate the correct amount.`, 'error');
            return;
        }
        
        const housingUnits = housingAmount / housingCostPerUnit;
        
        if (housingUnits === 0) {
            this.showFeedback('Amount too small to purchase any housing units.', 'error');
            return;
        }
        
        // Calculate actual cost and update game state
        const actualCost = housingUnits * housingCostPerUnit;
        this.gameState.balance -= actualCost;
        this.gameState.housingCapacity += housingUnits;
        this.gameState.totalHousingExpenses += actualCost;
        
        // Increment round-specific housing purchase counter
        this.gameState.housingUnitsPurchasedThisRound += housingUnits;
        
        // Update round data if it exists
        if (this.gameState.currentRoundData) {
            this.gameState.currentRoundData.housingCapacity = this.gameState.housingCapacity;
            this.gameState.currentRoundData.housingPurchased += housingUnits;
        }
        
        // Clear the input
        document.getElementById('housingAmount').value = '0';
        this.updateHousingPreview();
        
        // Update display
        this.updateDisplay();
        
        // Enhanced feedback with visual effects
        this.showFeedback(`🏠 Successfully purchased ${housingUnits} housing units for $${actualCost}!`, 'success');
        
        // Add visual feedback to housing capacity display
        const housingCapacityElement = document.getElementById('housingCapacity');
        housingCapacityElement.style.transform = 'scale(1.2)';
        housingCapacityElement.style.transition = 'transform 0.3s ease';
        setTimeout(() => {
            housingCapacityElement.style.transform = 'scale(1)';
        }, 300);
    }

    /**
     * Update housing preview based on current input
     */
    updateHousingPreview() {
        const housingAmount = parseFloat(document.getElementById('housingAmount').value) || 0;
        const housingCostPerUnit = this.gameState.marketPrices.housingCost;
        
        // Check if amount is an exact multiple
        const isExactMultiple = housingAmount % housingCostPerUnit === 0;
        const housingUnits = Math.floor(housingAmount / housingCostPerUnit);
        
        // Show preview with validation indicator
        if (housingAmount > 0 && !isExactMultiple) {
            document.getElementById('housingUnitsPreview').textContent = `${housingUnits} (Invalid - not exact multiple)`;
            document.getElementById('housingUnitsPreview').style.color = '#ff6b6b';
        } else {
            document.getElementById('housingUnitsPreview').textContent = housingUnits;
            document.getElementById('housingUnitsPreview').style.color = '';
        }
        
        // Update housing cost per unit display
        document.getElementById('housingCostPerUnit').textContent = `$${housingCostPerUnit}`;
    }

    /**
     * Update sheep purchase preview based on current input
     */
    updateSheepPurchasePreview() {
        const sheepAmount = parseFloat(document.getElementById('sheepMoneyInput').value) || 0;
        const sheepCostPerUnit = this.gameState.marketPrices.sheepPurchasePrice;
        
        // Check if amount is an exact multiple
        const isExactMultiple = sheepAmount % sheepCostPerUnit === 0;
        const sheepUnits = Math.floor(sheepAmount / sheepCostPerUnit);
        
        // Show preview with validation indicator
        if (sheepAmount > 0 && !isExactMultiple) {
            document.getElementById('sheepUnitsPreview').textContent = `${sheepUnits} (Invalid - not exact multiple)`;
            document.getElementById('sheepUnitsPreview').style.color = '#ff6b6b';
        } else {
            document.getElementById('sheepUnitsPreview').textContent = sheepUnits;
            document.getElementById('sheepUnitsPreview').style.color = '';
        }
        
        // Update sheep cost per unit display
        document.getElementById('sheepCostPerUnit').textContent = `$${sheepCostPerUnit}`;
    }

    /**
     * Check if current flock size exceeds housing capacity
     */
    checkHousingCapacity() {
        return this.gameState.flockSize <= this.gameState.housingCapacity;
    }

    /**
     * Get housing status message
     */
    getHousingStatus() {
        const capacity = this.gameState.housingCapacity;
        const flockSize = this.gameState.flockSize;
        
        if (flockSize > capacity) {
            return '⚠️ Insufficient housing!';
        } else if (flockSize === capacity) {
            return '🏠 At capacity';
        } else if (capacity - flockSize <= 2) {
            return '🏠 Nearly full';
        } else {
            return '🏠 Available';
        }
    }

    /**
     * Check if housing capacity is sufficient for current flock size
     */
    checkHousingSufficiency() {
        if (this.gameState.flockSize > this.gameState.housingCapacity) {
            this.showFeedback(`Warning: Your flock size (${this.gameState.flockSize}) exceeds your housing capacity (${this.gameState.housingCapacity}). Consider purchasing more housing.`, 'warning');
            return false;
        }
        return true;
    }

    /**
     * Get maximum flock size allowed by current housing capacity
     */
    getMaxFlockSize() {
        return this.gameState.housingCapacity;
    }

    /**
     * Update visual indicators for housing status
     */
    updateHousingVisualIndicators() {
        const housingInfoDisplay = document.querySelector('.housing-info-display');
        const housingCapacity = document.getElementById('housingCapacity');
        const capacity = this.gameState.housingCapacity;
        const flockSize = this.gameState.flockSize;
        
        // Remove all existing classes
        housingInfoDisplay.classList.remove('warning', 'danger', 'success');
        housingCapacity.classList.remove('near-limit', 'at-limit', 'available');
        
        // Apply appropriate classes based on housing status
        if (flockSize > capacity) {
            // Insufficient housing
            housingInfoDisplay.classList.add('danger');
            housingCapacity.classList.add('at-limit');
        } else if (flockSize === capacity) {
            // At capacity
            housingInfoDisplay.classList.add('warning');
            housingCapacity.classList.add('at-limit');
        } else if (capacity - flockSize <= 2) {
            // Nearly full
            housingInfoDisplay.classList.add('warning');
            housingCapacity.classList.add('near-limit');
        } else {
            // Available capacity
            housingInfoDisplay.classList.add('success');
            housingCapacity.classList.add('available');
        }
    }

    /**
     * Update purchase section visibility based on whether purchases can be skipped
     */
    updatePurchaseSectionVisibility() {
        const purchaseSection = document.querySelector('.purchase-section');
        const skipPurchaseBtn = document.getElementById('skipPurchaseBtn');
        
        if (this.gameState.canSkipPurchases) {
            // Show skip purchase button if it doesn't exist
            if (!skipPurchaseBtn) {
                const skipButton = document.createElement('button');
                skipButton.id = 'skipPurchaseBtn';
                skipButton.className = 'btn btn-secondary skip-purchase-btn';
                skipButton.textContent = 'Skip Purchase - Use Existing Flock';
                skipButton.title = 'Skip sheep and housing purchases for this round. Use your existing flock for calculations.';
                skipButton.addEventListener('click', () => {
                    this.handleSkipPurchase();
                });
                
                // Insert the skip button after the skip option box
                const skipOptionBox = document.querySelector('.skip-option-box');
                if (skipOptionBox) {
                    skipOptionBox.parentNode.insertBefore(skipButton, skipOptionBox.nextSibling);
                }
            }
        } else {
            // Remove skip purchase button if it exists
            if (skipPurchaseBtn) {
                skipPurchaseBtn.remove();
            }
        }
    }

    /**
     * Handle skip purchase - use existing flock for calculations
     */
    handleSkipPurchase() {
        // Validate that player has sheep to work with
        if (this.gameState.flockSize === 0) {
            this.showFeedback('You need to have sheep to skip purchases. Please purchase some sheep first.', 'error');
            return;
        }
        
        // Validate housing capacity
        if (!this.checkHousingCapacity()) {
            this.showFeedback('Cannot skip purchases: Your flock size exceeds your housing capacity. Purchase more housing first.', 'error');
            return;
        }
        
        // Set round data to indicate no new purchases
        if (this.gameState.currentRoundData) {
            this.gameState.currentRoundData.sheepPurchased = 0;
            this.gameState.currentRoundData.housingPurchased = 0;
            this.gameState.currentRoundData.housingCapacity = this.gameState.housingCapacity;
        }
        
        // Enable calculations immediately
        this.enableCalculations();
        
        // Remove skip buttons
        const skipPurchaseBtn = document.getElementById('skipPurchaseBtn');
        const skipToCalculationsBtn = document.getElementById('skipToCalculationsBtn');
        if (skipPurchaseBtn) skipPurchaseBtn.remove();
        if (skipToCalculationsBtn) skipToCalculationsBtn.remove();
        
        // Update display
        this.updateDisplay();
        
        // Show success message
        this.showFeedback(`✅ Skipped purchases! Using your existing flock of ${this.gameState.flockSize} sheep for calculations.`, 'success');
        
        // Disable purchase inputs to prevent confusion
        this.disablePurchaseInputs();
    }
    
    /**
     * Disable purchase inputs after skipping purchases
     */
    disablePurchaseInputs() {
        const sheepInput = document.getElementById('sheepMoneyInput');
        const housingInput = document.getElementById('housingAmount');
        const purchaseBtn = document.getElementById('purchaseBtn');
        const housingBtn = document.getElementById('purchaseHousingBtn');
        const skipBtn = document.getElementById('skipPurchaseBtn');
        
        if (sheepInput) sheepInput.disabled = true;
        if (housingInput) housingInput.disabled = true;
        if (purchaseBtn) purchaseBtn.disabled = true;
        if (housingBtn) housingBtn.disabled = true;
        if (skipBtn) skipBtn.disabled = true;
        
        // Add visual indication that purchases are disabled
        [sheepInput, housingInput, purchaseBtn, housingBtn, skipBtn].forEach(element => {
            if (element) {
                element.classList.add('disabled');
            }
        });
    }

    /**
     * Re-enable purchase inputs for new round
     */
    enablePurchaseInputs() {
        const sheepInput = document.getElementById('sheepMoneyInput');
        const housingInput = document.getElementById('housingAmount');
        const purchaseBtn = document.getElementById('purchaseBtn');
        const housingBtn = document.getElementById('purchaseHousingBtn');
        const skipBtn = document.getElementById('skipPurchaseBtn');
        
        if (sheepInput) sheepInput.disabled = false;
        if (housingInput) housingInput.disabled = false;
        if (purchaseBtn) purchaseBtn.disabled = false;
        if (housingBtn) housingBtn.disabled = false;
        if (skipBtn) skipBtn.disabled = false;
        
        // Remove visual indication that purchases are disabled
        [sheepInput, housingInput, purchaseBtn, housingBtn, skipBtn].forEach(element => {
            if (element) {
                element.classList.remove('disabled');
            }
        });
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.sheepGame = new SheepBusinessGame();
}); 