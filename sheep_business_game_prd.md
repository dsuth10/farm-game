# Sheep Business Game - Product Requirements Document (PRD)
*Version 1.0 | 29 July 2025*

## Executive Summary

The Sheep Business Game is an educational web application designed for Year 5 students (ages 10-11) to practice multiplication, unit rates, and basic profit-loss analysis through an engaging sheep farming simulation. The game runs entirely in-browser with no backend requirements, making it ideal for classroom use with limited internet connectivity.

### Key Value Propositions
- **Educational Focus**: Directly aligns with Australian Curriculum v9 Mathematics standards
- **Zero Setup**: Runs in any modern web browser without installation
- **Immediate Feedback**: Real-time validation with guided learning
- **Teacher Control**: Configurable difficulty settings for differentiated instruction
- **Progress Tracking**: Round-by-round analytics for assessment

## Product Overview

### Target Audience
- **Primary Users**: Year 5 students (ages 10-11)
- **Secondary Users**: Classroom teachers and mathematics educators
- **Technical Environment**: School laptops/tablets with modern web browsers

### Core Learning Objectives
1. **Mathematical Skills**: Multiplication tables up to 20×20, addition/subtraction with 3-digit numbers
2. **Financial Literacy**: Understanding income, expenses, and profit calculation
3. **Data Analysis**: Interpreting tabular data and trend visualization
4. **Decision Making**: Strategic thinking based on mathematical outcomes

## Functional Requirements

### 1. Game Flow Requirements

#### 1.1 Game Initialization
- **REQ-1.1.1**: Game must initialize with starting balance of $200
- **REQ-1.1.2**: Initial sheep count must be 0
- **REQ-1.1.3**: Game must display current round indicator (1-4)
- **REQ-1.1.4**: All input fields must be cleared and enabled

#### 1.2 Round Structure
Each round represents 6 months and follows this sequence:
1. **Purchase Phase**: Player chooses sheep quantity (0-20)
2. **Cost Calculation**: Player calculates housing costs
3. **Feed Calculation**: Player calculates feed costs
4. **Income Calculation**: Player calculates wool income
5. **Profit Calculation**: Player computes net profit/loss
6. **Validation**: System provides feedback on each calculation
7. **Advancement**: Progress to next round or game completion

### 2. Calculation Requirements

#### 2.1 Seasonal Economic Parameters
Each round represents a different season with varying market conditions:

| Season (Round) | Wool Price | Feed Cost | Housing Cost | Sheep Purchase Price | Market Condition |
|----------------|------------|-----------|--------------|---------------------|------------------|
| Spring (1) | $18 per sheep | $12 per sheep | $8 per sheep | $45 per sheep | Growing season |
| Summer (2) | $22 per sheep | $18 per sheep | $12 per sheep | $55 per sheep | Peak demand |
| Autumn (3) | $20 per sheep | $15 per sheep | $10 per sheep | $50 per sheep | Stable market |
| Winter (4) | $16 per sheep | $20 per sheep | $15 per sheep | $40 per sheep | High costs |

#### 2.2 Seasonal Price Display Requirements
- **REQ-2.2.1**: Current season must be prominently displayed with seasonal icon
- **REQ-2.2.2**: All prices must update dynamically at round start
- **REQ-2.2.3**: Price changes must be highlighted with visual indicators (↑↓)
- **REQ-2.2.4**: Seasonal market condition must be explained in tooltip
- **REQ-2.2.5**: Price history must be accessible via "Market Trends" button

#### 2.3 Calculation Validation
- **REQ-2.3.1**: Each calculation must be validated immediately upon submission
- **REQ-2.3.2**: Correct answers must trigger green visual feedback
- **REQ-2.3.3**: Incorrect answers must trigger red visual feedback with guidance
- **REQ-2.3.4**: After 2 incorrect attempts, system must display worked example
- **REQ-2.3.5**: After 5 incorrect attempts, system must auto-fill correct answer with $10 penalty

### 3. User Interface Requirements

#### 3.1 Layout Structure
```
┌─────────────────────────────────────────────────────────┐
│ Header: "Sheep Station Manager - Round X of 4"         │
│ Season: [Spring/Summer/Autumn/Winter] [Seasonal Icon]  │
├─────────────────────────────────────────────────────────┤
│ ┌─────────────────────┐  ┌───────────────────────────┐ │
│ │ Purchase Section    │  │ Financial Ledger          │ │
│ │ • Sheep quantity   │  │ • Income/Expense table    │ │
│ │ • Unit prices      │  │ • Running totals          │ │
│ │ • Input fields     │  │ • Profit chart            │ │
│ │ • Market Trends    │  │ • Seasonal indicators     │ │
│ └─────────────────────┘  └───────────────────────────┘ │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Market Conditions: [Seasonal description]           │ │
│ │ Price Changes: [↑↓ indicators with explanations]   │ │
│ └─────────────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Feedback Banner (dynamic)                           │ │
│ └─────────────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Controls: [Reset] [Help] [Teacher Settings]         │ │
│ └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

#### 3.2 Responsive Design
- **REQ-3.2.1**: Must support screen widths from 320px (mobile) to 1920px (desktop)
- **REQ-3.2.2**: Mobile layout must stack vertically with single-column design
- **REQ-3.2.3**: Tablet layout (768px+) must maintain two-column structure

#### 3.3 Accessibility Requirements
- **REQ-3.3.1**: All interactive elements must be keyboard navigable (Tab order)
- **REQ-3.3.2**: Screen reader support with ARIA labels for all inputs
- **REQ-3.3.3**: Color-blind friendly design (red/green supplemented with icons/text)
- **REQ-3.3.4**: Minimum contrast ratio of 4.5:1 for all text

### 4. Teacher Control Requirements

#### 4.1 Settings Panel
- **REQ-4.1.1**: Toggle for seasonal price fluctuations (enabled by default)
- **REQ-4.1.2**: Toggle for random price variations (±$3 per season)
- **REQ-4.1.3**: Toggle for sheep mortality events (5% chance per round)
- **REQ-4.1.4**: Adjustable starting balance (default $200)
- **REQ-4.1.5**: Adjustable maximum rounds (default 4)
- **REQ-4.1.6**: Market difficulty selector (Easy/Medium/Hard)
- **REQ-4.1.7**: Seasonal cycle speed (1-4 rounds per season)

#### 4.2 Analytics
- **REQ-4.2.1**: Track each calculation attempt (correct/incorrect)
- **REQ-4.2.2**: Generate PDF summary at game completion
- **REQ-4.2.3**: Include round-by-round profit/loss data

## Technical Requirements

### 1. Technology Stack
- **Frontend**: HTML5, CSS3 (Flexbox/Grid), Vanilla JavaScript (ES6+)
- **No Backend**: All data stored in-memory (resets on refresh)
- **No External Dependencies**: No frameworks or libraries
- **Browser Support**: Chrome 80+, Firefox 75+, Safari 13+, Edge 80+

### 2. Performance Requirements
- **Load Time**: <2 seconds on average school WiFi
- **Bundle Size**: <500KB total (HTML+CSS+JS)
- **Memory Usage**: <50MB during gameplay

### 3. Data Model

#### 3.1 Game State Object
```javascript
const gameState = {
    currentRound: 1,
    maxRounds: 4,
    balance: 200,
    flockSize: 0,
    sheep: [], // Array of sheep objects
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
    roundHistory: [], // Array of round results
    settings: {
        seasonalFluctuation: true,
        randomVariation: false,
        sheepMortality: false,
        marketDifficulty: 'medium'
    }
}
```

#### 3.2 Round Data Structure
```javascript
const roundData = {
    roundNumber: 1,
    season: 'spring',
    marketCondition: 'Growing season',
    sheepPurchased: 0,
    seasonalPrices: {
        woolPrice: 18,
        feedCost: 12,
        housingCost: 8,
        sheepPurchasePrice: 45
    },
    priceChanges: {
        woolPrice: { previous: 20, current: 18, change: -2 },
        feedCost: { previous: 15, current: 12, change: -3 },
        housingCost: { previous: 10, current: 8, change: -2 },
        sheepPurchasePrice: { previous: 50, current: 45, change: -5 }
    },
    calculations: {
        housingCost: { studentAnswer: null, correctAnswer: null, attempts: 0 },
        feedCost: { studentAnswer: null, correctAnswer: null, attempts: 0 },
        woolIncome: { studentAnswer: null, correctAnswer: null, attempts: 0 },
        profit: { studentAnswer: null, correctAnswer: null, attempts: 0 }
    },
    finalProfit: 0,
    endingBalance: 0
}
```

## User Stories & Acceptance Criteria

### Student User Stories

| Story ID | Description | Acceptance Criteria |
|----------|-------------|---------------------|
| S-1 | View initial resources | Balance shows $200, sheep count 0 |
| S-2 | Choose sheep quantity | Input accepts 0-20 only |
| S-3 | See unit costs | All prices displayed clearly |
| S-4 | Get calculation feedback | Immediate validation with color coding |
| S-5 | Receive learning support | Worked example after 2 errors |
| S-6 | Handle repeated errors | Auto-fill with penalty after 5 errors |
| S-7 | Track financial progress | Ledger updates after each calculation |
| S-8 | Advance rounds | Next round button enables after validation |
| S-9 | Visualize progress | Chart updates showing profit trend |
| S-10 | Reset game | One-click reset with confirmation |
| S-11 | Understand seasonal changes | Season indicator and market condition visible |
| S-12 | Track price fluctuations | Price change indicators (↑↓) displayed |
| S-13 | Access market trends | Historical price data available |
| S-14 | Adapt to market conditions | Strategic decisions based on seasonal pricing |

### Teacher User Stories

| Story ID | Description | Acceptance Criteria |
|----------|-------------|---------------------|
| T-1 | Adjust difficulty | Toggle switches for seasonal/random fluctuations |
| T-2 | Customize parameters | Edit starting balance and round count |
| T-3 | Generate reports | PDF download with game summary |
| T-4 | Control market complexity | Set market difficulty (Easy/Medium/Hard) |
| T-5 | Manage seasonal cycles | Adjust seasonal cycle speed |
| T-6 | Monitor seasonal learning | Track student adaptation to price changes |

## Test Cases

### Functional Test Matrix

| Test Case | Scenario | Expected Result |
|-----------|----------|-----------------|
| TC-01 | Game initialization | Correct starting values displayed |
| TC-02 | Valid sheep purchase | Balance updates, flock size correct |
| TC-03 | Invalid sheep quantity | Error message, no state change |
| TC-04 | Correct calculation | Green feedback, advance to next |
| TC-05 | First incorrect attempt | Red feedback with guidance |
| TC-06 | Second incorrect attempt | Worked example modal appears |
| TC-07 | Multiple errors | Auto-fill with penalty applied |
| TC-08 | Round completion | All calculations validated |
| TC-09 | Game progression | Round counter increments |
| TC-10 | Game completion | Summary screen with results |
| TC-11 | Reset functionality | Returns to initial state |
| TC-12 | Teacher settings | Changes apply to new game |
| TC-13 | Responsive design | Layout adapts to screen size |
| TC-14 | Seasonal price changes | Prices update correctly between rounds |
| TC-15 | Market condition display | Seasonal indicators show correctly |
| TC-16 | Price change indicators | ↑↓ arrows display for price changes |
| TC-17 | Market trends access | Historical price data available |
| TC-18 | Random price variations | ±$3 variations apply when enabled |
| TC-19 | Market difficulty settings | Easy/Medium/Hard affect price ranges |
| TC-20 | Seasonal cycle speed | Custom cycle lengths work correctly |

### Non-Functional Tests

| Test ID | Area | Criteria |
|---------|------|----------|
| NF-01 | Performance | <2s load time on school WiFi |
| NF-02 | Accessibility | Full keyboard navigation |
| NF-03 | Screen reader | All elements properly labeled |
| NF-04 | Color blind | Icons supplement color coding |

## Success Metrics

### Educational Effectiveness
- **Calculation Accuracy**: >80% of students improve multiplication accuracy after 3 game sessions
- **Engagement**: Average session duration >10 minutes
- **Completion Rate**: >90% of students complete all 4 rounds

### Technical Performance
- **Load Time**: <2 seconds on standard school devices
- **Error Rate**: <1% calculation validation failures
- **Browser Compatibility**: 100% functionality on supported browsers

## Development Phases

### Phase 1: Core Game (Week 1-2)
- Basic HTML structure
- CSS styling and responsive layout
- JavaScript game logic
- Calculation validation system

### Phase 2: Enhanced Features (Week 3)
- Teacher settings panel
- PDF report generation
- Accessibility improvements
- Performance optimization

### Phase 3: Polish & Testing (Week 4)
- Cross-browser testing
- User acceptance testing with target age group
- Teacher feedback integration
- Documentation completion

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Browser compatibility issues | Medium | High | Extensive testing on school devices |
| Student confusion with calculations | Low | Medium | Clear worked examples and hints |
| Teacher adoption resistance | Low | Medium | Simple setup and clear documentation |
| Performance on older devices | Medium | Medium | Optimize code and assets |

## Future Enhancements

### Version 1.1 (Post-launch)
- LocalStorage for session persistence
- Additional animal types (cattle, goats)
- Multi-language support
- Advanced difficulty modes

### Version 2.0 (Future)
- Multiplayer classroom competitions
- Real-time teacher dashboard
- Integration with learning management systems
- Advanced analytics and reporting

---

## Appendices

### Appendix A: Calculation Examples
```
Scenario 1: Spring Season (Round 1) - 4 sheep purchased
- Purchase cost: 4 × $45 = $180
- Housing cost: 4 × $8 = $32
- Feed cost: 4 × $12 = $48
- Wool income: 4 × $18 = $72
- Profit: $72 - ($32 + $48 + $180) = -$188

Scenario 2: Summer Season (Round 2) - 3 sheep purchased
- Purchase cost: 3 × $55 = $165
- Housing cost: 3 × $12 = $36
- Feed cost: 3 × $18 = $54
- Wool income: 3 × $22 = $66
- Profit: $66 - ($36 + $54 + $165) = -$189

Scenario 3: Winter Season (Round 4) - 2 sheep purchased
- Purchase cost: 2 × $40 = $80
- Housing cost: 2 × $15 = $30
- Feed cost: 2 × $20 = $40
- Wool income: 2 × $16 = $32
- Profit: $32 - ($30 + $40 + $80) = -$118
```

### Appendix B: Browser Support Matrix
| Browser | Minimum Version | Notes |
|---------|-----------------|--------|
| Chrome | 80+ | Full support |
| Firefox | 75+ | Full support |
| Safari | 13+ | Full support |
| Edge | 80+ | Full support |

### Appendix C: File Structure
```
sheep-business-game/
├── index.html
├── css/
│   ├── main.css
│   └── responsive.css
├── js/
│   ├── game.js
│   ├── calculations.js
│   ├── validation.js
│   └── pdf-export.js
├── assets/
│   └── sheep-icon.png
└── README.md
```

### Appendix D: Seasonal Market Data

#### Market Difficulty Levels
| Difficulty | Price Variation | Description |
|------------|----------------|-------------|
| Easy | ±$1 per season | Minimal price changes for beginners |
| Medium | ±$2-3 per season | Standard seasonal fluctuations |
| Hard | ±$4-5 per season | Significant market volatility |

#### Seasonal Market Patterns
| Season | Wool Demand | Feed Availability | Housing Needs | Strategic Notes |
|--------|-------------|------------------|---------------|-----------------|
| Spring | Low | High | Low | Best time to expand flock |
| Summer | High | Medium | Medium | Peak wool prices, higher costs |
| Autumn | Medium | Medium | Medium | Balanced market conditions |
| Winter | Low | Low | High | High costs, lower income |

#### Random Price Variation Algorithm
```javascript
// When random variation is enabled
const variation = Math.floor(Math.random() * 7) - 3; // -3 to +3
const adjustedPrice = basePrice + variation;
```

---

*Document prepared: 29 July 2025*  
*Next review: Post-development testing phase*  
*Contact: [Educational Technology Team]*
