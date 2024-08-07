# Rush Hour

## Description
A challenging puzzle game where the goal is to move cars around a grid to free the red car. Built using HTML, CSS, and JavaScript.

## Project Structure
- `index.html`: Main HTML file for the game.
- `style.css`: CSS stylesheet for styling the game.
- `script.js`: JavaScript file containing the game logic.
- `users.json`: Stores a list of authorized users.
- `board.json`: Contains board configurations.

## Technologies Used
- **HTML**: Structure of the game.
- **CSS**: Styling and layout.
- **JavaScript**: Game logic, DOM manipulation, and user interactions.
- **JSON**: Storing game data (users, board configurations).
- **Local Storage**: Saving game progress.

## Game Features
- **User Authentication**: Users must log in with a valid username and password to play.
- **Customizable Boards**: Load different board configurations from the `board.json` file.
- **Save Game Progress**: Save your current game state to local storage.
- **Win Condition**: The game is won when the red car reaches the exit.

## Class Structure

1. **Car Class**: Represents a car.
   - **Attributes**: `id`, `boardTop`, `boardLeft`, `direction`, `sumSquares`, `color`.

2. **RedCar Class**: Inherits from Car.
   - **Attributes**: Inherits all attributes from Car.
   - **Function**: `goOut` - Called when the red car exits the board.

3. **Board Class**: Contains an array of cars, with the red car as the first in the array.
   - **Attributes**: `carsArray`, `squareSize`, `numSquares`, `exitPoint`.
   - **Functions**: 
     - `printBoardStatus`
     - `placeIsAvailable`
     - `getCarById`
     - `setCarPlace`
     - `checkWin`

4. **Users JSON**: Contains a list of authorized users.

5. **Board JSON**: Contains board attributes.

## How to Play

### Objective
Move the red car off the board by sliding the other cars.

### Controls
- Use the arrow keys or the provided buttons to move the selected car.
- Click on a car to select it.

## Getting Started

### Prerequisites
- A modern web browser with JavaScript enabled.
- A code editor (e.g., Visual Studio Code, Sublime Text).

### Installation
1. Clone the repository:
   ```bash
   git clone https://your-repo-url.git
