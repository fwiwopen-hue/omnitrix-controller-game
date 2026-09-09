# Omnitrix Controller Game

🎮 An interactive web-based game inspired by Ben 10's Omnitrix device! Transform between different alien forms while managing energy consumption.

## Features

✨ **Interactive Gameplay**
- Transform between 4 different forms: Human, Heatblast, Four Arms, and XLR8
- Real-time energy management system
- Automatic timeout when energy depletes
- Cooldown system with full recharge requirement

⚡ **Energy System**
- Each alien form consumes **10 energy points per second**
- Human form recharges **15 energy points per second**
- Maximum energy pool: **100 points**
- Visual energy bar with status indicators

🎨 **Visual Design**
- Neon green cyberpunk aesthetic
- Smooth animations and transitions
- Responsive design for mobile and desktop
- Real-time stats display
- Floating notification messages

## How to Play

1. **Open** `index.html` in your web browser
2. **Transform** using keyboard keys:
   - Press `0` → Human (base form)
   - Press `1` → Heatblast (🔥 fire-based alien)
   - Press `2` → Four Arms (💪 strength-based alien)
   - Press `3` → XLR8 (⚡ speed-based alien)
3. **Manage** your energy:
   - Alien forms drain energy quickly
   - Return to human form to recharge
   - Energy must fully recharge after depletion
4. **Watch** your stats in real-time

## Game Mechanics

### Energy Drain (Alien Forms)
Each alien transformation consumes 10 energy points per second. You must manage your transformation time carefully.

### Energy Recharge (Human Form)
When you transform back to human form, you recharge at 15 points per second, making the human form the recovery state.

### Timeout System
When energy reaches 0, you automatically revert to human form and enter cooldown. The omnitrix cannot transform to alien forms until fully recharged.

### Cooldown Status
- 🟢 **Ready**: Omnitrix is fully charged
- 🔴 **Cooldown**: Omnitrix is recharging (can only be human form)

## File Structure

```
omnitrix-controller-game/
├── index.html      # Main HTML structure
├── styles.css      # Game styling and animations
├── script.js       # Game logic and controls
└── README.md       # This file
```

## Technical Details

- **Pure JavaScript**: No external frameworks required
- **CSS Animations**: Smooth transitions and effects
- **Responsive Design**: Works on all screen sizes
- **Event-Driven**: Keyboard and mouse input handling
- **Game Loop**: 60 FPS using requestAnimationFrame

## Browser Compatibility

Works on all modern browsers:
- Chrome
- Firefox
- Safari
- Edge

## Game State Management

The game maintains a complete state object tracking:
- Current energy level
- Active transformation
- Cooldown status
- Game elapsed time
- Energy drain/recharge rates

## Inspired By

This game is inspired by the Omnitrix device from the **Ben 10** animated series, where a hero can transform into powerful alien forms with limited time before automatic reversion.

---

Enjoy the game! 🌟