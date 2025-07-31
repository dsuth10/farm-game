/**
 * Fix Input Issues Script
 * Run this in the browser console if you can't enter numbers in the game
 */

function fixGameInputs() {
    console.log('🔧 Fixing game inputs...');
    
    // Get all number inputs
    const inputs = document.querySelectorAll('input[type="number"]');
    let fixedCount = 0;
    
    inputs.forEach((input, index) => {
        const wasDisabled = input.disabled;
        const wasReadOnly = input.readOnly;
        const hadDisabledClass = input.classList.contains('disabled');
        
        // Enable the input
        input.disabled = false;
        input.readOnly = false;
        input.classList.remove('disabled');
        
        // Check if we actually fixed something
        if (wasDisabled || wasReadOnly || hadDisabledClass) {
            fixedCount++;
            console.log(`✅ Fixed input ${index + 1} (${input.id || 'unnamed'}):`, {
                wasDisabled,
                wasReadOnly,
                hadDisabledClass
            });
        }
    });
    
    console.log(`🎉 Fixed ${fixedCount} inputs!`);
    
    if (fixedCount > 0) {
        alert(`✅ Fixed ${fixedCount} disabled inputs! You should now be able to enter numbers.`);
    } else {
        alert('ℹ️ No disabled inputs found. The issue might be elsewhere.');
    }
    
    return fixedCount;
}

// Auto-run the fix
const fixedCount = fixGameInputs();

// Also try to enable inputs through the game object if it exists
if (typeof window.sheepGame !== 'undefined' && window.sheepGame.ensureAllInputsEnabled) {
    try {
        window.sheepGame.ensureAllInputsEnabled();
        console.log('✅ Also enabled inputs through game object');
    } catch (error) {
        console.error('❌ Error enabling inputs through game object:', error);
    }
}

// Make the function available globally
window.fixGameInputs = fixGameInputs; 