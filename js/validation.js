/**
 * Sheep Business Game - Validation Module
 * Handles input validation and user feedback
 * Version 1.0
 */

class GameValidation {
    constructor() {
        this.validationMessages = {
            sheepQuantity: {
                required: 'Please enter the number of sheep you want to purchase.',
                invalid: 'Please enter a valid number of sheep (0-20).',
                negative: 'Number of sheep cannot be negative.',
                tooMany: 'Maximum 20 sheep allowed per round.',
                notInteger: 'Number of sheep must be a whole number.',
                insufficientFunds: 'Insufficient funds for this purchase.'
            },
            calculation: {
                required: 'Please enter your answer.',
                invalid: 'Please enter a valid number.',
                notFinite: 'Please enter a finite number.'
            },
            general: {
                success: 'Correct! Well done!',
                incorrect: 'Try again! Check your calculation.',
                hint: 'Here\'s a hint to help you.',
                workedExample: 'Let\'s work through this step by step.',
                autoFill: 'Answer auto-filled with penalty. Keep practicing!',
                roundComplete: 'All calculations correct! You can advance to the next round.',
                gameComplete: 'Congratulations! You\'ve completed the game!'
            }
        };
    }

    /**
     * Validate sheep quantity input
     * @param {string} input - User input
     * @param {number} currentBalance - Current balance
     * @param {number} sheepPrice - Price per sheep
     * @returns {object} Validation result
     */
    validateSheepQuantity(input, currentBalance, sheepPrice) {
        // Check if input is provided
        if (!input || input.trim() === '') {
            return {
                isValid: false,
                message: this.validationMessages.sheepQuantity.required,
                type: 'error'
            };
        }

        // Parse the input
        const quantity = parseInt(input.trim());

        // Check if it's a valid number
        if (isNaN(quantity)) {
            return {
                isValid: false,
                message: this.validationMessages.sheepQuantity.invalid,
                type: 'error'
            };
        }

        // Check if it's negative
        if (quantity < 0) {
            return {
                isValid: false,
                message: this.validationMessages.sheepQuantity.negative,
                type: 'error'
            };
        }

        // Check if it's an integer
        if (!Number.isInteger(parseFloat(input))) {
            return {
                isValid: false,
                message: this.validationMessages.sheepQuantity.notInteger,
                type: 'error'
            };
        }

        // Check if it exceeds maximum
        if (quantity > 20) {
            return {
                isValid: false,
                message: this.validationMessages.sheepQuantity.tooMany,
                type: 'error'
            };
        }

        // Check if affordable
        const totalCost = quantity * sheepPrice;
        if (totalCost > currentBalance) {
            return {
                isValid: false,
                message: this.validationMessages.sheepQuantity.insufficientFunds,
                type: 'error'
            };
        }

        return {
            isValid: true,
            message: `Valid purchase: ${quantity} sheep for $${totalCost}`,
            type: 'success',
            quantity: quantity,
            totalCost: totalCost
        };
    }

    /**
     * Validate calculation input
     * @param {string} input - User input
     * @returns {object} Validation result
     */
    validateCalculationInput(input) {
        // Check if input is provided
        if (!input || input.trim() === '') {
            return {
                isValid: false,
                message: this.validationMessages.calculation.required,
                type: 'error'
            };
        }

        // Parse the input
        const number = parseFloat(input.trim());

        // Check if it's a valid number
        if (isNaN(number)) {
            return {
                isValid: false,
                message: this.validationMessages.calculation.invalid,
                type: 'error'
            };
        }

        // Check if it's finite
        if (!Number.isFinite(number)) {
            return {
                isValid: false,
                message: this.validationMessages.calculation.notFinite,
                type: 'error'
            };
        }

        return {
            isValid: true,
            message: 'Valid input',
            type: 'success',
            value: number
        };
    }

    /**
     * Validate teacher settings
     * @param {object} settings - Settings object
     * @returns {object} Validation result
     */
    validateTeacherSettings(settings) {
        const errors = [];

        // Validate starting balance
        if (settings.startingBalance < 50 || settings.startingBalance > 500) {
            errors.push('Starting balance must be between $50 and $500');
        }

        // Validate maximum rounds
        if (settings.maxRounds < 2 || settings.maxRounds > 8) {
            errors.push('Maximum rounds must be between 2 and 8');
        }

        // Validate market difficulty
        const validDifficulties = ['easy', 'medium', 'hard'];
        if (!validDifficulties.includes(settings.marketDifficulty)) {
            errors.push('Market difficulty must be easy, medium, or hard');
        }

        return {
            isValid: errors.length === 0,
            message: errors.length === 0 ? 'Settings are valid' : errors.join(', '),
            type: errors.length === 0 ? 'success' : 'error',
            errors: errors
        };
    }

    /**
     * Compare student answer with correct answer
     * @param {number} studentAnswer - Student's answer
     * @param {number} correctAnswer - Correct answer
     * @returns {object} Comparison result
     */
    compareAnswers(studentAnswer, correctAnswer) {
        // Use a small tolerance for floating point comparisons
        const tolerance = 0.01;
        const difference = Math.abs(studentAnswer - correctAnswer);
        const isCorrect = difference < tolerance;

        return {
            isCorrect: isCorrect,
            difference: difference,
            tolerance: tolerance,
            message: isCorrect ? this.validationMessages.general.success : this.validationMessages.general.incorrect,
            type: isCorrect ? 'success' : 'error'
        };
    }

    /**
     * Generate feedback message based on attempt count
     * @param {number} attemptCount - Number of attempts
     * @param {string} calculationType - Type of calculation
     * @param {number} studentAnswer - Student's answer
     * @param {number} correctAnswer - Correct answer
     * @param {object} mathTips - MathTips instance (optional)
     * @returns {object} Feedback result
     */
    generateAttemptFeedback(attemptCount, calculationType, studentAnswer = null, correctAnswer = null, mathTips = null) {
        let message = '';
        let type = 'error';
        let showHint = false;
        let showWorkedExample = false;
        let autoFill = false;
        let mathTip = '';

        if (attemptCount === 1) {
            message = this.validationMessages.general.incorrect;
            type = 'error';
            showHint = false;
            showWorkedExample = false;
            
            // Add math tip on first error if math tips are enabled
            if (mathTips && studentAnswer !== null && correctAnswer !== null) {
                mathTip = mathTips.getTip(calculationType, 'first_error', studentAnswer, correctAnswer);
            }
        } else if (attemptCount === 2) {
            message = this.validationMessages.general.hint;
            type = 'warning';
            showHint = true;
            showWorkedExample = false;
            
            // Add more specific math tip on second error
            if (mathTips && studentAnswer !== null && correctAnswer !== null) {
                mathTip = mathTips.getTip(calculationType, 'second_error', studentAnswer, correctAnswer);
            }
        } else if (attemptCount >= 3 && attemptCount < 5) {
            message = this.validationMessages.general.workedExample;
            type = 'warning';
            showHint = false;
            showWorkedExample = true;
            
            // Add targeted math tip on third+ error
            if (mathTips && studentAnswer !== null && correctAnswer !== null) {
                mathTip = mathTips.getTip(calculationType, 'multiple_errors', studentAnswer, correctAnswer);
            }
        } else if (attemptCount >= 5) {
            message = this.validationMessages.general.autoFill;
            type = 'warning';
            showHint = false;
            showWorkedExample = false;
            autoFill = true;
            
            // Add final math tip before auto-fill
            if (mathTips && studentAnswer !== null && correctAnswer !== null) {
                mathTip = mathTips.getTip(calculationType, 'final_error', studentAnswer, correctAnswer);
            }
        } else {
            message = this.validationMessages.general.incorrect;
            type = 'error';
            showHint = false;
            showWorkedExample = false;
        }

        return {
            message: message,
            type: type,
            showHint: showHint,
            showWorkedExample: showWorkedExample,
            autoFill: autoFill,
            mathTip: mathTip
        };
    }

    /**
     * Generate a math tip based on error pattern and calculation type
     * @param {string} calculationType - Type of calculation
     * @param {number} studentAnswer - Student's answer
     * @param {number} correctAnswer - Correct answer
     * @param {object} mathTips - MathTips instance
     * @returns {string} Math tip message
     */
    generateMathTip(calculationType, studentAnswer, correctAnswer, mathTips) {
        if (!mathTips) {
            return '';
        }
        
        return mathTips.getTip(calculationType, 'error', studentAnswer, correctAnswer);
    }

    /**
     * Get proactive math tip for a calculation type
     * @param {string} calculationType - Type of calculation
     * @param {object} mathTips - MathTips instance
     * @returns {string} Proactive math tip
     */
    getProactiveMathTip(calculationType, mathTips) {
        if (!mathTips) {
            return '';
        }
        
        return mathTips.getProactiveTip(calculationType);
    }

    /**
     * Validate round completion
     * @param {object} calculations - Calculations object
     * @returns {object} Validation result
     */
    validateRoundCompletion(calculations) {
        const incompleteCalculations = [];
        const correctCalculations = [];

        Object.entries(calculations).forEach(([type, calc]) => {
            if (calc.studentAnswer !== calc.correctAnswer) {
                incompleteCalculations.push(type);
            } else {
                correctCalculations.push(type);
            }
        });

        const isComplete = incompleteCalculations.length === 0;

        return {
            isComplete: isComplete,
            incompleteCalculations: incompleteCalculations,
            correctCalculations: correctCalculations,
            message: isComplete ? this.validationMessages.general.roundComplete : `${incompleteCalculations.length} calculation(s) remaining`,
            type: isComplete ? 'success' : 'info'
        };
    }

    /**
     * Validate game completion
     * @param {number} currentRound - Current round number
     * @param {number} maxRounds - Maximum rounds
     * @returns {object} Validation result
     */
    validateGameCompletion(currentRound, maxRounds) {
        const isComplete = currentRound > maxRounds;

        return {
            isComplete: isComplete,
            message: isComplete ? this.validationMessages.general.gameComplete : `Round ${currentRound} of ${maxRounds}`,
            type: isComplete ? 'success' : 'info'
        };
    }

    /**
     * Sanitize user input
     * @param {string} input - User input
     * @returns {string} Sanitized input
     */
    sanitizeInput(input) {
        if (typeof input !== 'string') {
            return '';
        }

        // Remove leading/trailing whitespace
        let sanitized = input.trim();

        // Remove any non-numeric characters except decimal point and minus sign
        sanitized = sanitized.replace(/[^\d.-]/g, '');

        // Ensure only one decimal point
        const parts = sanitized.split('.');
        if (parts.length > 2) {
            sanitized = parts[0] + '.' + parts.slice(1).join('');
        }

        // Ensure minus sign is only at the beginning
        if (sanitized.includes('-') && !sanitized.startsWith('-')) {
            sanitized = sanitized.replace(/-/g, '');
        }

        return sanitized;
    }

    /**
     * Format validation error for display
     * @param {string} fieldName - Name of the field
     * @param {string} errorMessage - Error message
     * @returns {string} Formatted error message
     */
    formatFieldError(fieldName, errorMessage) {
        const fieldDisplayNames = {
            sheepQuantity: 'Number of sheep',
            feedCalculation: 'Feed cost calculation',
            woolCalculation: 'Wool income calculation',
            profitCalculation: 'Profit calculation',
            startingBalance: 'Starting balance',
            maxRounds: 'Maximum rounds',
            marketDifficulty: 'Market difficulty'
        };

        const displayName = fieldDisplayNames[fieldName] || fieldName;
        return `${displayName}: ${errorMessage}`;
    }

    /**
     * Validate numeric range
     * @param {number} value - Value to validate
     * @param {number} min - Minimum allowed value
     * @param {number} max - Maximum allowed value
     * @param {string} fieldName - Name of the field
     * @returns {object} Validation result
     */
    validateNumericRange(value, min, max, fieldName) {
        if (value < min) {
            return {
                isValid: false,
                message: this.formatFieldError(fieldName, `Value must be at least ${min}`),
                type: 'error'
            };
        }

        if (value > max) {
            return {
                isValid: false,
                message: this.formatFieldError(fieldName, `Value must be no more than ${max}`),
                type: 'error'
            };
        }

        return {
            isValid: true,
            message: 'Value is within valid range',
            type: 'success'
        };
    }

    /**
     * Validate required fields
     * @param {object} data - Data object
     * @param {array} requiredFields - Array of required field names
     * @returns {object} Validation result
     */
    validateRequiredFields(data, requiredFields) {
        const missingFields = [];

        requiredFields.forEach(field => {
            if (!data.hasOwnProperty(field) || data[field] === null || data[field] === undefined || data[field] === '') {
                missingFields.push(field);
            }
        });

        return {
            isValid: missingFields.length === 0,
            message: missingFields.length === 0 ? 'All required fields are provided' : `Missing required fields: ${missingFields.join(', ')}`,
            type: missingFields.length === 0 ? 'success' : 'error',
            missingFields: missingFields
        };
    }

    /**
     * Generate accessibility-friendly error message
     * @param {string} errorMessage - Error message
     * @param {string} fieldName - Name of the field
     * @returns {string} Accessibility-friendly message
     */
    generateAccessibleErrorMessage(errorMessage, fieldName) {
        const fieldDisplayNames = {
            sheepQuantity: 'sheep quantity',
            feedCalculation: 'feed cost calculation',
            woolCalculation: 'wool income calculation',
            profitCalculation: 'profit calculation'
        };

        const displayName = fieldDisplayNames[fieldName] || fieldName;
        return `Error in ${displayName}: ${errorMessage}`;
    }

    /**
     * Validate date format (for future enhancements)
     * @param {string} dateString - Date string
     * @param {string} format - Expected format
     * @returns {object} Validation result
     */
    validateDateFormat(dateString, format = 'YYYY-MM-DD') {
        const date = new Date(dateString);
        const isValid = !isNaN(date.getTime());

        return {
            isValid: isValid,
            message: isValid ? 'Valid date format' : 'Invalid date format',
            type: isValid ? 'success' : 'error',
            date: isValid ? date : null
        };
    }

    /**
     * Validate email format (for future enhancements)
     * @param {string} email - Email address
     * @returns {object} Validation result
     */
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(email);

        return {
            isValid: isValid,
            message: isValid ? 'Valid email format' : 'Invalid email format',
            type: isValid ? 'success' : 'error'
        };
    }

    /**
     * Validate URL format (for future enhancements)
     * @param {string} url - URL string
     * @returns {object} Validation result
     */
    validateURL(url) {
        try {
            new URL(url);
            return {
                isValid: true,
                message: 'Valid URL format',
                type: 'success'
            };
        } catch (error) {
            return {
                isValid: false,
                message: 'Invalid URL format',
                type: 'error'
            };
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GameValidation;
} 