<?php
/**
 * Template Name: Sheep Station Manager Game
 * 
 * This template displays the educational sheep farming game
 * while maintaining WordPress integration and SEO benefits.
 */

get_header(); ?>

<style>
/* WordPress-specific adjustments */
.entry-content {
    padding: 0;
    margin: 0;
    max-width: none;
}

/* Ensure game takes full width */
.page-template-page-sheep-game .site-content {
    max-width: none;
    padding: 0;
}

.page-template-page-sheep-game .content-area {
    width: 100%;
    margin: 0;
}

/* Hide default page elements for game */
.page-template-page-sheep-game .entry-header,
.page-template-page-sheep-game .entry-footer,
.page-template-page-sheep-game .comments-area {
    display: none;
}

/* Ensure game container is full width */
.game-container {
    width: 100%;
    max-width: none;
    margin: 0;
    padding: 0;
}

/* Responsive adjustments for WordPress themes */
@media screen and (max-width: 768px) {
    .game-header {
        padding: 1rem;
    }
    
    .header-content h1 {
        font-size: 1.5rem;
    }
    
    .header-controls .btn {
        padding: 0.5rem 0.75rem;
        font-size: 0.875rem;
    }
}
</style>

<div id="sheep-game-container">
    <!-- Header Section -->
    <header class="game-header">
        <div class="header-content">
            <h1>Sheep Station Manager</h1>
            <div class="header-controls">
                <button id="nextRoundBtn" class="btn btn-primary" disabled>⏭️ Next Round</button>
                <button id="resetBtn" class="btn btn-secondary">🔄 Reset Game</button>
                <button id="helpBtn" class="btn btn-secondary">❓ Help</button>
            </div>
        </div>
        <div class="header-info">
            <div class="round-info">
                <span class="round-counter">Round <span id="currentRound">1</span> of <span id="maxRounds">12</span></span>
            </div>
            <div class="season-info">
                <span class="season-name" id="currentSeason">Spring</span>
                <span class="season-icon" id="seasonIcon">🌸</span>
            </div>
        </div>
    </header>

    <!-- Main Game Container -->
    <main class="game-container">
        <!-- Market Information Side Panel -->
        <aside class="market-info-side-panel">
            <!-- Flock Status - Prominent Information (Always Visible) -->
            <div class="flock-status-display critical-info">
                <h3>🐑 Farm Status</h3>
                <div class="flock-status-grid">
                    <div class="flock-status-item">
                        <span class="flock-status-label">Flock Size:</span>
                        <span class="flock-status-value" id="sidebarFlockSize">0</span>
                    </div>
                    <div class="flock-status-item">
                        <span class="flock-status-label">Housing Capacity:</span>
                        <span class="flock-status-value" id="sidebarHousingCapacity">0</span>
                    </div>
                </div>
            </div>

            <h2>Market Information</h2>
            
            <!-- Price Display - Critical Information (Always Visible) -->
            <div class="price-display critical-info">
                <h3>💰 Current Prices</h3>
                <div class="price-grid">
                    <div class="price-item">
                        <span class="price-label">Sheep Purchase:</span>
                        <span class="price-value" id="sheepPrice">$45</span>
                        <span class="price-change" id="sheepPriceChange"></span>
                    </div>
                    <div class="price-item">
                        <span class="price-label">Housing Cost:</span>
                        <span class="price-value" id="housingCost">$8</span>
                        <span class="price-change" id="housingCostChange"></span>
                    </div>
                    <div class="price-item">
                        <span class="price-label">Feed Cost:</span>
                        <span class="price-value" id="feedCost">$12</span>
                        <span class="price-change" id="feedCostChange"></span>
                    </div>
                    <div class="price-item">
                        <span class="price-label">Wool Price:</span>
                        <span class="price-value" id="woolPrice">$18</span>
                        <span class="price-change" id="woolPriceChange"></span>
                    </div>
                </div>
            </div>

            <!-- Market Conditions - Collapsible Section -->
            <div class="market-conditions collapsible-section">
                <button class="section-toggle" aria-expanded="true" aria-controls="marketConditionsContent">
                    <span class="toggle-icon">📊</span>
                    <span class="toggle-text">Market Conditions</span>
                    <span class="toggle-arrow">▼</span>
                </button>
                <div class="section-content" id="marketConditionsContent" aria-hidden="false">
                    <p id="marketCondition">Growing season - Prices are favorable for expansion</p>
                    <div id="priceChanges" class="price-changes">
                        <!-- Price change indicators will be displayed here -->
                    </div>
                </div>
            </div>

            <!-- Market Tools - Collapsible Section -->
            <div class="market-tools collapsible-section">
                <button class="section-toggle" aria-expanded="false" aria-controls="marketToolsContent">
                    <span class="toggle-icon">📈</span>
                    <span class="toggle-text">Market Tools</span>
                    <span class="toggle-arrow">▶</span>
                </button>
                <div class="section-content" id="marketToolsContent" aria-hidden="true">
                    <div class="market-buttons">
                        <button id="marketTrendsBtn" class="btn btn-secondary">📊 Market Trends</button>
                        <button id="roundHistoryBtn" class="btn btn-secondary" onclick="window.sheepGame.showRoundHistory()">📋 Round History</button>
                    </div>
                </div>
            </div>
        </aside>

        <!-- Main Content Area -->
        <div class="main-content-area">
            <!-- Expenses Section -->
            <section class="expenses-section">
                <h2>Expenses</h2>
            
                <!-- Housing Purchase Section -->
                <div class="housing-purchase-section">
                    <div class="section-header">
                        <h3>Purchase Housing</h3>
                        <button class="help-icon" title="Housing System Help" onclick="window.sheepGame.showHousingHelp()">❓</button>
                    </div>
                    <div class="housing-controls">
                        <label for="housingAmount" title="Enter the amount of money you want to spend on housing. The number of housing units will be calculated based on current seasonal prices.">Amount to spend on housing ($):</label>
                        <input type="number" id="housingAmount" min="0" step="1" value="0" placeholder="Enter amount" title="Enter the amount of money you want to spend on housing">
                        <button id="purchaseHousingBtn" class="btn btn-secondary" title="Purchase housing units with the entered amount">Purchase Housing</button>
                    </div>
                </div>
                
                <!-- Sheep Purchase Section -->
                <div class="sheep-purchase-section">
                    <div class="section-header">
                        <h3>Purchase Sheep</h3>
                        <button class="help-icon" title="Sheep Purchase System Help" onclick="window.sheepGame.showSheepPurchaseHelp()">❓</button>
                    </div>
                    
                    <div class="purchase-controls">
                        <label for="sheepMoneyInput" title="Enter the amount of money you want to spend on sheep. The number of sheep will be calculated based on current seasonal prices.">Amount to spend on sheep ($):</label>
                        <input type="number" id="sheepMoneyInput" min="0" step="1" value="0" placeholder="Enter amount" title="Enter the amount of money you want to spend on sheep">
                        <button id="purchaseBtn" class="btn btn-primary" title="Purchase sheep with the entered amount">Purchase Sheep</button>
                    </div>
                </div>
                
                <!-- Feed Cost Calculation with Guide -->
                <div class="calculation-item">
                    <div class="calculation-guide" id="feedGuide">
                        <button class="guide-toggle" aria-expanded="false" aria-controls="feedGuideContent">
                            <span class="guide-icon">📖</span>
                            <span class="guide-text">Show Help: How to calculate Feed Cost</span>
                        </button>
                        <div class="guide-content" id="feedGuideContent" aria-hidden="true">
                            <div class="guide-steps">
                                <h4>Feed Cost Calculation Guide</h4>
                                <p><strong>What to do:</strong> Multiply the number of sheep by the cost of each unit of food</p>
                                <div class="guide-example">
                                    <p><strong>Step 1:</strong> Count how many sheep you have</p>
                                    <p><strong>Step 2:</strong> Look at the current feed cost per sheep (shown in the prices above)</p>
                                    <p><strong>Step 3:</strong> Multiply: Number of sheep × Feed cost per sheep</p>
                                </div>
                                <p class="guide-tip">💡 <strong>Tip:</strong> Feed costs change with seasons. Check the current prices above!</p>
                            </div>
                        </div>
                    </div>
                    <label for="feedCalculation">Feed Cost Calculation:</label>
                    <input type="number" id="feedCalculation" placeholder="Enter your answer">
                    <button class="btn btn-check" data-calculation="feed">Check</button>
                </div>
            </section>

            <!-- Income Section -->
            <section class="income-section">
                <h2>Income</h2>
                
                <!-- Wool Income Calculation with Guide -->
                <div class="calculation-item">
                    <div class="calculation-guide" id="woolGuide">
                        <button class="guide-toggle" aria-expanded="false" aria-controls="woolGuideContent">
                            <span class="guide-icon">📖</span>
                            <span class="guide-text">Show Help: How to calculate Wool Income</span>
                        </button>
                        <div class="guide-content" id="woolGuideContent" aria-hidden="true">
                            <div class="guide-steps">
                                <h4>Wool Income Calculation Guide</h4>
                                <p><strong>What to do:</strong> Multiply the number of sheep by the income from wool per sheep</p>
                                <div class="guide-example">
                                    <p><strong>Step 1:</strong> Count how many sheep you have</p>
                                    <p><strong>Step 2:</strong> Look at the current wool price per sheep (shown in the prices above)</p>
                                    <p><strong>Step 3:</strong> Multiply: Number of sheep × Wool price per sheep</p>
                                </div>
                                <p class="guide-tip">💡 <strong>Tip:</strong> This is your income! Wool prices change with seasons, so check current prices.</p>
                            </div>
                        </div>
                    </div>
                    <label for="woolCalculation">Wool Income Calculation:</label>
                    <input type="number" id="woolCalculation" placeholder="Enter your answer">
                    <button class="btn btn-check" data-calculation="wool">Check</button>
                </div>
            </section>

            <!-- Financial Ledger Section -->
            <section class="ledger-section">
                <h2>Financial Ledger</h2>
                <div class="balance-display">
                    <span class="balance-label">Current Balance:</span>
                    <span class="balance-amount" id="currentBalance">$200</span>
                </div>
                
                <div class="calculations-section">
                    <h3>Your Calculations</h3>
                    
                    <!-- Profit Calculation with Guide -->
                    <div class="calculation-item">
                        <div class="calculation-guide" id="profitGuide">
                            <button class="guide-toggle" aria-expanded="false" aria-controls="profitGuideContent">
                                <span class="guide-icon">📖</span>
                                <span class="guide-text">Show Help: How to calculate Profit/Loss</span>
                            </button>
                            <div class="guide-content" id="profitGuideContent" aria-hidden="true">
                                <div class="guide-steps">
                                    <h4>Profit/Loss Calculation Guide</h4>
                                    <p><strong>What to do:</strong> Subtract your total costs from your wool income</p>
                                    <p><em>Note: Purchase Cost and Housing Cost are only included if you bought new sheep or housing this round.</em></p>
                                    <div class="guide-example">
                                        <p><strong>Step 1:</strong> Calculate your wool income (from the wool income calculation above)</p>
                                        <p><strong>Step 2:</strong> Calculate your feed cost (from the feed cost calculation above)</p>
                                        <p><strong>Step 3:</strong> Add any purchase costs (if you bought new sheep this round)</p>
                                        <p><strong>Step 4:</strong> Add any housing costs (if you bought new housing this round)</p>
                                        <p><strong>Step 5:</strong> Add all your costs together</p>
                                        <p><strong>Step 6:</strong> Subtract your total costs from your wool income</p>
                                    </div>
                                    <p class="guide-tip">💡 <strong>Tip:</strong> Positive numbers mean profit, negative numbers mean loss. This shows if you're making money!</p>
                                </div>
                            </div>
                        </div>
                        <label for="profitCalculation">Profit/Loss Calculation:</label>
                        <input type="number" id="profitCalculation" placeholder="Enter your answer">
                        <button class="btn btn-check" data-calculation="profit">Check</button>
                    </div>
                </div>

                <div class="transaction-record">
                    <h3>Round Transaction Record</h3>
                    <div id="transactionRecord" class="transaction-container">
                        <!-- Transaction record will be rendered here -->
                    </div>
                </div>
            </section>

            <!-- Feedback Banner -->
            <section class="feedback-banner" id="feedbackBanner">
                <!-- Dynamic feedback messages will appear here -->
            </section>
        </div>
    </main>

    <!-- All Modals -->
    <?php include get_template_directory() . '/sheep-game-modals.php'; ?>
</div>

<!-- Game Scripts -->
<link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/sheep-game/css/main.css">
<link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/sheep-game/css/responsive.css">
<script src="<?php echo get_template_directory_uri(); ?>/sheep-game/js/game.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/sheep-game/js/calculations.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/sheep-game/js/validation.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/sheep-game/js/pdf-export.js"></script>

<?php get_footer(); ?> 