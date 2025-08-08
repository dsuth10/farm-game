<?php
/**
 * Sheep Game Modals
 * Contains all modal dialogs for the educational game
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}
?>

<!-- Teacher Settings Modal -->
<div id="teacherSettingsModal" class="modal">
    <div class="modal-content">
        <span class="close">&times;</span>
        <h2>Teacher Settings</h2>
        <div class="settings-grid">
            <div class="setting-item">
                <label for="seasonalFluctuation">Seasonal Price Fluctuations:</label>
                <input type="checkbox" id="seasonalFluctuation" checked>
            </div>
            <div class="setting-item">
                <label for="randomVariation">Random Price Variations (±$3):</label>
                <input type="checkbox" id="randomVariation">
            </div>
            <div class="setting-item">
                <label for="sheepMortality">Sheep Mortality Events (5% chance):</label>
                <input type="checkbox" id="sheepMortality">
            </div>
            <div class="setting-item">
                <label for="startingBalance">Starting Balance:</label>
                <input type="number" id="startingBalance" value="200" min="50" max="500">
            </div>
            <div class="setting-item">
                <label for="maxRoundsSetting">Maximum Rounds:</label>
                <input type="number" id="maxRoundsSetting" value="12" min="2" max="20">
            </div>
            <div class="setting-item">
                <label for="marketDifficulty">Market Difficulty:</label>
                <select id="marketDifficulty">
                    <option value="easy">Easy</option>
                    <option value="medium" selected>Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>
            <div class="setting-item">
                <label for="mathTipsEnabled">Math Tips System:</label>
                <input type="checkbox" id="mathTipsEnabled" checked>
            </div>
            <div class="setting-item">
                <label for="mathTipsFrequency">Math Tips Frequency:</label>
                <select id="mathTipsFrequency">
                    <option value="always">Always (show tips proactively)</option>
                    <option value="on_error" selected>On Error (show tips after incorrect answers)</option>
                    <option value="never">Never (disable tips completely)</option>
                </select>
            </div>
        </div>
        <div class="modal-actions">
            <button id="saveSettings" class="btn btn-primary">Save Settings</button>
            <button id="cancelSettings" class="btn btn-secondary">Cancel</button>
        </div>
    </div>
</div>

<!-- Help Modal -->
<div id="helpModal" class="modal">
    <div class="modal-content">
        <span class="close">&times;</span>
        <h2>How to Play</h2>
        <div class="help-content">
            <h3>Game Overview</h3>
            <p>Welcome to Sheep Station Manager! You're a sheep farmer managing your flock through four seasons.</p>
            
            <h3>How to Play</h3>
            <ol>
                <li><strong>Purchase Sheep:</strong> Choose how many sheep to buy (0-20) in the first round</li>
                <li><strong>Purchase Housing:</strong> Buy housing units for your sheep (1 unit per sheep)</li>
                <li><strong>Calculate Costs:</strong> Work out housing and feed costs</li>
                <li><strong>Calculate Income:</strong> Determine wool income from your sheep</li>
                <li><strong>Calculate Profit:</strong> Find your net profit or loss</li>
                <li><strong>Advance:</strong> Move to the next round when all calculations are correct</li>
            </ol>

            <h3>Skip Purchase Feature (Rounds 2+)</h3>
            <p>In rounds 2 and beyond, you can choose to skip purchasing new sheep and housing. This allows you to:</p>
            <ul>
                <li>Use your existing flock for calculations</li>
                <li>Focus only on feed costs and wool income</li>
                <li>Save money for future rounds</li>
                <li>Still maintain the housing requirement if you want to expand later</li>
            </ul>

            <h3>Seasonal Changes</h3>
            <p>Prices change each season based on market conditions. Watch for the ↑↓ indicators showing price changes.</p>

            <h3>Getting Help</h3>
            <p>If you get stuck, the game will provide hints and worked examples to help you learn.</p>
        </div>
    </div>
</div>

<!-- Market Trends Modal -->
<div id="marketTrendsModal" class="modal">
    <div class="modal-content">
        <span class="close">&times;</span>
        <h2>Market Trends</h2>
        <div id="marketTrendsContent">
            <!-- Market trends data will be displayed here -->
        </div>
    </div>
</div>

<!-- Worked Example Modal -->
<div id="workedExampleModal" class="modal">
    <div class="modal-content">
        <span class="close">&times;</span>
        <h2>Worked Example</h2>
        <div id="workedExampleContent">
            <!-- Worked examples will be displayed here -->
        </div>
    </div>
</div>

<!-- Housing Help Modal -->
<div id="housingHelpModal" class="modal">
    <div class="modal-content">
        <span class="close">&times;</span>
        <div id="housingHelpContent">
            <!-- Housing help content will be displayed here -->
        </div>
    </div>
</div>

<!-- Sheep Purchase Help Modal -->
<div id="sheepPurchaseHelpModal" class="modal">
    <div class="modal-content">
        <span class="close">&times;</span>
        <div id="sheepPurchaseHelpContent">
            <!-- Sheep purchase help content will be displayed here -->
        </div>
    </div>
</div>

<!-- Game Summary Modal -->
<div id="gameSummaryModal" class="modal">
    <div class="modal-content">
        <span class="close">&times;</span>
        <h2>Game Summary</h2>
        <div id="gameSummaryContent">
            <!-- Game summary will be displayed here -->
        </div>
        <div class="modal-actions">
            <button id="downloadReport" class="btn btn-primary">Download Report</button>
            <button id="newGame" class="btn btn-secondary">New Game</button>
        </div>
    </div>
</div> 