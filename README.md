# Sheep Business Game

An educational web application designed for Year 5 students (ages 10-11) to practice multiplication, unit rates, and basic profit-loss analysis through an engaging sheep farming simulation.

## 🎯 Learning Objectives

- **Mathematical Skills**: Multiplication tables up to 20×20, addition/subtraction with 3-digit numbers
- **Financial Literacy**: Understanding income, expenses, and profit calculation
- **Data Analysis**: Interpreting tabular data and trend visualization
- **Decision Making**: Strategic thinking based on mathematical outcomes

## 🚀 Features

### Core Gameplay
- **Seasonal Economics**: Four seasons with varying market conditions
- **Real-time Validation**: Immediate feedback on calculations with guided learning
- **Progressive Difficulty**: Adaptive learning with hints and worked examples
- **Financial Tracking**: Complete ledger system with profit/loss analysis

### Educational Support
- **Worked Examples**: Step-by-step solutions after multiple incorrect attempts
- **Visual Feedback**: Color-coded responses with accessibility considerations
- **Market Trends**: Historical price data and seasonal patterns
- **Teacher Controls**: Configurable difficulty and game parameters

### Accessibility
- **Keyboard Navigation**: Full keyboard support for all interactions
- **Screen Reader Support**: ARIA labels and semantic HTML structure
- **Color Blind Friendly**: Icons and text supplement color coding
- **Responsive Design**: Works on devices from 320px to 1920px width

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3 (Flexbox/Grid), Vanilla JavaScript (ES6+)
- **No Backend**: All data stored in-memory (resets on refresh)
- **No External Dependencies**: No frameworks or libraries required
- **Browser Support**: Chrome 80+, Firefox 75+, Safari 13+, Edge 80+

## 📁 Project Structure

```
sheep-business-game/
├── index.html              # Main HTML file
├── css/
│   ├── main.css           # Primary stylesheet
│   └── responsive.css     # Responsive design rules
├── js/
│   ├── game.js            # Core game logic
│   ├── calculations.js    # Mathematical operations
│   ├── validation.js      # Input validation
│   └── pdf-export.js      # Report generation
├── assets/                # Images and icons
└── README.md             # This file
```

## 🎮 How to Play

### Game Flow
1. **Purchase Housing**: Choose how much to spend on housing units
2. **Purchase Sheep**: Choose how many sheep to buy (0-20, limited by housing capacity)
3. **Calculate Costs**: Work out feed costs for your sheep
4. **Calculate Income**: Determine wool income from your sheep
5. **Calculate Profit**: Find your net profit or loss (Wool Income - Feed Cost - Purchase Cost - Housing Cost)
6. **Advance**: Move to the next round when all calculations are correct

### Seasonal Changes
Each round represents a different season with varying market conditions. Wool prices are dynamically calculated to achieve 60-70% profit margins with random fluctuations within this range, ensuring realistic business scenarios with consistent profitability.

| Season | Wool Price | Feed Cost | Housing Cost | Sheep Price | Market Condition |
|--------|------------|-----------|--------------|-------------|------------------|
| Spring | $72 (60-70% profit margin) | $12 | $8 | $45 | Growing season |
| Summer | $88 (60-70% profit margin) | $18 | $12 | $55 | Peak demand |
| Autumn | $80 (60-70% profit margin) | $15 | $10 | $50 | Stable market |
| Winter | $64 (60-70% profit margin) | $20 | $15 | $40 | High costs |

### Getting Help
- **Hints**: Available after 2 incorrect attempts
- **Worked Examples**: Step-by-step solutions after 3+ attempts
- **Auto-fill**: Correct answer provided after 5 attempts (with penalty)

## 👨‍🏫 Teacher Features

### Settings Panel
- **Seasonal Fluctuations**: Toggle seasonal price changes
- **Random Variations**: Enable ±$3 price variations
- **Sheep Mortality**: 5% chance of sheep loss per round
- **Starting Balance**: Adjustable from $50-$500
- **Maximum Rounds**: Configurable from 2-8 rounds
- **Market Difficulty**: Easy/Medium/Hard settings

### Analytics
- **Calculation Tracking**: Monitor student progress
- **PDF Reports**: Downloadable game summaries
- **Round-by-round Data**: Detailed performance analysis

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome 80+, Firefox 75+, Safari 13+, Edge 80+)
- No additional software installation required

### Installation
1. Clone or download the project files
2. Open `index.html` in your web browser
3. Start playing immediately!

### For Teachers
1. Click "Teacher Settings" to configure game parameters
2. Adjust difficulty and settings as needed
3. Students can begin playing with the configured settings
4. Generate PDF reports after game completion

## 🧪 Testing

### Functional Tests
- Game initialization and state management
- Calculation validation and feedback
- Seasonal price changes
- Round progression and completion
- Teacher settings functionality

### Browser Compatibility
- Chrome 80+ ✅
- Firefox 75+ ✅
- Safari 13+ ✅
- Edge 80+ ✅

### Performance
- Load time: <2 seconds
- Bundle size: <500KB
- Memory usage: <50MB

## 📊 Educational Standards

This game aligns with **Australian Curriculum v9 Mathematics** standards:

- **ACMNA100**: Solve problems involving multiplication of large numbers by one- or two-digit numbers
- **ACMNA101**: Solve problems involving division by a one digit number
- **ACMNA123**: Select and apply efficient mental and written strategies and appropriate digital technologies to solve problems
- **ACMNA124**: Investigate index notation and represent whole numbers as products of powers of prime numbers

## 🔧 Development

### Local Development
1. Clone the repository
2. Open `index.html` in your browser
3. Use browser developer tools for debugging
4. No build process required

### Code Structure
- **Modular Design**: Separate concerns across multiple JavaScript files
- **ES6 Classes**: Object-oriented approach for maintainability
- **CSS Custom Properties**: Consistent theming and easy customization
- **Responsive Design**: Mobile-first approach with progressive enhancement

### Adding Features
1. Follow existing code patterns
2. Maintain accessibility standards
3. Test across multiple browsers
4. Update documentation

## 📈 Future Enhancements

### Version 1.1
- LocalStorage for session persistence
- Additional animal types (cattle, goats)
- Multi-language support
- Advanced difficulty modes

### Version 2.0
- Multiplayer classroom competitions
- Real-time teacher dashboard
- Integration with learning management systems
- Advanced analytics and reporting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Australian Curriculum v9 Mathematics standards
- Educational technology best practices
- Accessibility guidelines (WCAG 2.1)
- Modern web development standards

## 📞 Support

For questions or support:
- Check the help section in the game
- Review the teacher settings documentation
- Contact the development team

---

**Version**: 1.0  
**Last Updated**: July 2025  
**Target Audience**: Year 5 students (ages 10-11) 