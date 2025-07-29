/**
 * Sheep Business Game - Calculations Module
 * Handles mathematical operations and validation
 * Version 1.0
 */

class GameCalculations {
    constructor() {
        this.maxAttempts = 5;
        this.penaltyAmount = 10;
    }

    /**
     * Calculate housing cost for a given number of sheep
     * @param {number} sheepCount - Number of sheep
     * @param {number} housingCostPerSheep - Housing cost per sheep
     * @returns {number} Total housing cost
     */
    calculateHousingCost(sheepCount, housingCostPerSheep) {
        return sheepCount * housingCostPerSheep;
    }

    /**
     * Calculate feed cost for a given number of sheep
     * @param {number} sheepCount - Number of sheep
     * @param {number} feedCostPerSheep - Feed cost per sheep
     * @returns {number} Total feed cost
     */
    calculateFeedCost(sheepCount, feedCostPerSheep) {
        return sheepCount * feedCostPerSheep;
    }

    /**
     * Calculate wool income for a given number of sheep
     * @param {number} sheepCount - Number of sheep
     * @param {number} woolPricePerSheep - Wool price per sheep
     * @returns {number} Total wool income
     */
    calculateWoolIncome(sheepCount, woolPricePerSheep) {
        return sheepCount * woolPricePerSheep;
    }

    /**
     * Calculate total profit/loss for a round
     * @param {number} woolIncome - Total wool income
     * @param {number} housingCost - Total housing cost
     * @param {number} feedCost - Total feed cost
     * @param {number} purchaseCost - Total purchase cost for new sheep
     * @returns {number} Net profit/loss
     */
    calculateProfit(woolIncome, housingCost, feedCost, purchaseCost) {
        return woolIncome - (housingCost + feedCost + purchaseCost);
    }

    /**
     * Calculate total purchase cost for new sheep
     * @param {number} sheepCount - Number of sheep to purchase
     * @param {number} pricePerSheep - Price per sheep
     * @returns {number} Total purchase cost
     */
    calculatePurchaseCost(sheepCount, pricePerSheep) {
        return sheepCount * pricePerSheep;
    }

    /**
     * Validate if a purchase is affordable
     * @param {number} purchaseCost - Cost of purchase
     * @param {number} currentBalance - Current balance
     * @returns {boolean} True if affordable
     */
    isPurchaseAffordable(purchaseCost, currentBalance) {
        return purchaseCost <= currentBalance;
    }

    /**
     * Validate sheep quantity input
     * @param {number} quantity - Number of sheep
     * @param {number} maxSheep - Maximum allowed sheep
     * @returns {object} Validation result with isValid and message
     */
    validateSheepQuantity(quantity, maxSheep = 20) {
        if (quantity < 0) {
            return {
                isValid: false,
                message: 'Number of sheep cannot be negative'
            };
        }
        
        if (quantity > maxSheep) {
            return {
                isValid: false,
                message: `Maximum ${maxSheep} sheep allowed per round`
            };
        }
        
        if (!Number.isInteger(quantity)) {
            return {
                isValid: false,
                message: 'Number of sheep must be a whole number'
            };
        }
        
        return {
            isValid: true,
            message: 'Valid quantity'
        };
    }

    /**
     * Validate calculation input
     * @param {string} input - User input
     * @returns {object} Validation result with isValid, value, and message
     */
    validateCalculationInput(input) {
        const trimmedInput = input.trim();
        
        if (trimmedInput === '') {
            return {
                isValid: false,
                value: null,
                message: 'Please enter a value'
            };
        }
        
        const number = parseFloat(trimmedInput);
        
        if (isNaN(number)) {
            return {
                isValid: false,
                value: null,
                message: 'Please enter a valid number'
            };
        }
        
        if (!Number.isFinite(number)) {
            return {
                isValid: false,
                value: null,
                message: 'Please enter a finite number'
            };
        }
        
        return {
            isValid: true,
            value: number,
            message: 'Valid input'
        };
    }

    /**
     * Compare student answer with correct answer
     * @param {number} studentAnswer - Student's answer
     * @param {number} correctAnswer - Correct answer
     * @returns {boolean} True if answers match
     */
    compareAnswers(studentAnswer, correctAnswer) {
        // Use a small tolerance for floating point comparisons
        const tolerance = 0.01;
        return Math.abs(studentAnswer - correctAnswer) < tolerance;
    }

    /**
     * Generate a worked example for a calculation type
     * @param {string} calculationType - Type of calculation
     * @param {object} gameData - Current game data
     * @returns {string} HTML formatted worked example
     */
    generateWorkedExample(calculationType, gameData) {
        const { sheepCount, prices, sheepPurchased } = gameData;
        
        switch (calculationType) {
            case 'housing':
                return this.generateHousingExample(sheepCount, prices.housingCost);
            case 'feed':
                return this.generateFeedExample(sheepCount, prices.feedCost);
            case 'wool':
                return this.generateWoolExample(sheepCount, prices.woolPrice);
            case 'profit':
                return this.generateProfitExample(sheepCount, prices, sheepPurchased);
            default:
                return 'No example available for this calculation type.';
        }
    }

    /**
     * Generate housing cost worked example
     */
    generateHousingExample(sheepCount, housingCost) {
        return `
            <div class="worked-example">
                <h4>Housing Cost Calculation</h4>
                <p><strong>Formula:</strong> Housing Cost = Number of Sheep × Housing Cost per Sheep</p>
                <p><strong>Step 1:</strong> Count your sheep: ${sheepCount} sheep</p>
                <p><strong>Step 2:</strong> Multiply by housing cost: ${sheepCount} × $${housingCost}</p>
                <p><strong>Step 3:</strong> Calculate: ${sheepCount} × $${housingCost} = $${sheepCount * housingCost}</p>
                <p><strong>Answer:</strong> $${sheepCount * housingCost}</p>
            </div>
        `;
    }

    /**
     * Generate feed cost worked example
     */
    generateFeedExample(sheepCount, feedCost) {
        return `
            <div class="worked-example">
                <h4>Feed Cost Calculation</h4>
                <p><strong>Formula:</strong> Feed Cost = Number of Sheep × Feed Cost per Sheep</p>
                <p><strong>Step 1:</strong> Count your sheep: ${sheepCount} sheep</p>
                <p><strong>Step 2:</strong> Multiply by feed cost: ${sheepCount} × $${feedCost}</p>
                <p><strong>Step 3:</strong> Calculate: ${sheepCount} × $${feedCost} = $${sheepCount * feedCost}</p>
                <p><strong>Answer:</strong> $${sheepCount * feedCost}</p>
            </div>
        `;
    }

    /**
     * Generate wool income worked example
     */
    generateWoolExample(sheepCount, woolPrice) {
        return `
            <div class="worked-example">
                <h4>Wool Income Calculation</h4>
                <p><strong>Formula:</strong> Wool Income = Number of Sheep × Wool Price per Sheep</p>
                <p><strong>Step 1:</strong> Count your sheep: ${sheepCount} sheep</p>
                <p><strong>Step 2:</strong> Multiply by wool price: ${sheepCount} × $${woolPrice}</p>
                <p><strong>Step 3:</strong> Calculate: ${sheepCount} × $${woolPrice} = $${sheepCount * woolPrice}</p>
                <p><strong>Answer:</strong> $${sheepCount * woolPrice}</p>
            </div>
        `;
    }

    /**
     * Generate profit calculation worked example
     */
    generateProfitExample(sheepCount, prices, sheepPurchased) {
        const housingCost = sheepCount * prices.housingCost;
        const feedCost = sheepCount * prices.feedCost;
        const woolIncome = sheepCount * prices.woolPrice;
        const purchaseCost = sheepPurchased * prices.sheepPurchasePrice;
        const totalCosts = housingCost + feedCost + purchaseCost;
        const profit = woolIncome - totalCosts;

        return `
            <div class="worked-example">
                <h4>Profit/Loss Calculation</h4>
                <p><strong>Formula:</strong> Profit = Wool Income - (Housing Cost + Feed Cost + Purchase Cost)</p>
                <p><strong>Step 1:</strong> Calculate wool income: ${sheepCount} × $${prices.woolPrice} = $${woolIncome}</p>
                <p><strong>Step 2:</strong> Calculate housing cost: ${sheepCount} × $${prices.housingCost} = $${housingCost}</p>
                <p><strong>Step 3:</strong> Calculate feed cost: ${sheepCount} × $${prices.feedCost} = $${feedCost}</p>
                <p><strong>Step 4:</strong> Calculate purchase cost: ${sheepPurchased} × $${prices.sheepPurchasePrice} = $${purchaseCost}</p>
                <p><strong>Step 5:</strong> Add all costs: $${housingCost} + $${feedCost} + $${purchaseCost} = $${totalCosts}</p>
                <p><strong>Step 6:</strong> Calculate profit: $${woolIncome} - $${totalCosts} = $${profit}</p>
                <p><strong>Answer:</strong> $${profit}</p>
            </div>
        `;
    }

    /**
     * Generate a hint for a calculation type
     * @param {string} calculationType - Type of calculation
     * @param {object} gameData - Current game data
     * @returns {string} Hint message
     */
    generateHint(calculationType, gameData) {
        const { sheepCount, prices } = gameData;
        
        switch (calculationType) {
            case 'housing':
                return `Remember: Housing cost = ${sheepCount} sheep × $${prices.housingCost} per sheep`;
            case 'feed':
                return `Remember: Feed cost = ${sheepCount} sheep × $${prices.feedCost} per sheep`;
            case 'wool':
                return `Remember: Wool income = ${sheepCount} sheep × $${prices.woolPrice} per sheep`;
            case 'profit':
                return `Remember: Profit = Wool income - (Housing cost + Feed cost + Purchase cost)`;
            default:
                return 'Think about the formula for this calculation.';
        }
    }

    /**
     * Calculate seasonal price adjustments based on difficulty
     * @param {string} difficulty - Market difficulty level
     * @param {number} basePrice - Base price
     * @returns {number} Adjusted price
     */
    calculateSeasonalAdjustment(difficulty, basePrice) {
        let adjustmentRange;
        
        switch (difficulty) {
            case 'easy':
                adjustmentRange = 1;
                break;
            case 'medium':
                adjustmentRange = 3;
                break;
            case 'hard':
                adjustmentRange = 5;
                break;
            default:
                adjustmentRange = 3;
        }
        
        const adjustment = Math.floor(Math.random() * (adjustmentRange * 2 + 1)) - adjustmentRange;
        return Math.max(1, basePrice + adjustment);
    }

    /**
     * Calculate sheep mortality (if enabled)
     * @param {number} flockSize - Current flock size
     * @param {number} mortalityRate - Mortality rate (default 0.05 for 5%)
     * @returns {number} Number of sheep lost
     */
    calculateMortality(flockSize, mortalityRate = 0.05) {
        if (flockSize === 0) return 0;
        
        const lostSheep = Math.floor(flockSize * mortalityRate);
        return Math.min(lostSheep, flockSize);
    }

    /**
     * Format currency for display
     * @param {number} amount - Amount to format
     * @returns {string} Formatted currency string
     */
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-AU', {
            style: 'currency',
            currency: 'AUD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }

    /**
     * Calculate percentage change between two values
     * @param {number} oldValue - Previous value
     * @param {number} newValue - New value
     * @returns {number} Percentage change
     */
    calculatePercentageChange(oldValue, newValue) {
        if (oldValue === 0) return newValue > 0 ? 100 : 0;
        return ((newValue - oldValue) / oldValue) * 100;
    }

    /**
     * Round to specified decimal places
     * @param {number} value - Value to round
     * @param {number} decimals - Number of decimal places
     * @returns {number} Rounded value
     */
    roundToDecimals(value, decimals = 2) {
        return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
    }

    /**
     * Validate that a number is within a specified range
     * @param {number} value - Value to validate
     * @param {number} min - Minimum allowed value
     * @param {number} max - Maximum allowed value
     * @returns {boolean} True if value is within range
     */
    isWithinRange(value, min, max) {
        return value >= min && value <= max;
    }

    /**
     * Generate a random number within a specified range
     * @param {number} min - Minimum value
     * @param {number} max - Maximum value
     * @returns {number} Random number
     */
    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Calculate compound interest (for future enhancements)
     * @param {number} principal - Initial amount
     * @param {number} rate - Interest rate (as decimal)
     * @param {number} time - Time period
     * @returns {number} Final amount
     */
    calculateCompoundInterest(principal, rate, time) {
        return principal * Math.pow(1 + rate, time);
    }

    /**
     * Calculate simple interest (for future enhancements)
     * @param {number} principal - Initial amount
     * @param {number} rate - Interest rate (as decimal)
     * @param {number} time - Time period
     * @returns {number} Interest earned
     */
    calculateSimpleInterest(principal, rate, time) {
        return principal * rate * time;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GameCalculations;
} 