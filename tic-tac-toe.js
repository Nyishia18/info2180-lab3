
(function ticTacToeGame() {

    let gameBoardState = ["", "", "", "", "", "", "", "", ""]; // Tracks X or O for each square
    let currentPlayer = "X"; // Starts with player X
    let gameActive = true; // Tracks if the game is still being played


    const checkWinner = () => {
        // Checking the possibility for a winner 
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]            // Diagonals
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            // Boolean expressions to check the boxes 
            if (
                gameBoardState[a] &&
                gameBoardState[a] === gameBoardState[b] &&
                gameBoardState[a] === gameBoardState[c]
            ) {
                gameActive = false; // Stop the game
                return gameBoardState[a]; // Return 'X' or 'O' (the winner)
            }
        }
      
        if (!gameBoardState.includes("")) {
            gameActive = false;
            return "Draw";
        }

        return null; // No winner yet
    };

  
    const handleSquareClick = (event) => {
        const square = event.target;
        const index = Array.from(square.parentElement.children).indexOf(square); // Get the square's index (0-8)

        // Disallow Cheating 
        if (!gameActive || gameBoardState[index] !== "") {
            return;
        }

        
        square.innerHTML = currentPlayer;
        square.classList.add(currentPlayer);
        gameBoardState[index] = currentPlayer;

        // Exercise 4: Check for winner and update status
        const winner = checkWinner();
        const statusDiv = document.getElementById("status");

        if (winner === "X" || winner === "O") {
            statusDiv.innerHTML = `Congratulations! ${winner} is the Winner!`;
            statusDiv.classList.add("you-won");
        } else if (winner === "Draw") {
            statusDiv.innerHTML = "It's a Draw!";
            statusDiv.classList.add("you-won"); // Use the same styling for draw
        } else {
            // Switch players for the next turn
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    };

    // Exercise 3: Handle mouse hover (enter)
    const handleMouseOver = (event) => {
        const square = event.target;
        // Only apply hover style if the game is active and the square is empty
        if (gameActive && !square.classList.contains("X") && !square.classList.contains("O")) {
            square.classList.add("hover");
        }
    };

    // Handle mouse leave (exit)
    const handleMouseOut = (event) => {
        event.target.classList.remove("hover");
    };

    // Handle New Game button click
    const resetGame = () => {
        // Reset global state
        gameBoardState = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        gameActive = true;

        // Reset board squares visually
        const squares = document.querySelectorAll("#board > div");
        squares.forEach(square => {
            square.innerHTML = "";
            square.className = "square"; // Resets classes added by styling/moves
            square.classList.add("square"); // Ensure 'square' class is present
        });

        // Reset status div
        const statusDiv = document.getElementById("status");
        statusDiv.innerHTML = "Move your mouse over a square and click to change it.";
        statusDiv.classList.remove("you-won");
    };

    /* --- Initialization --- */

    const setupGame = () => {
        const boardSquares = document.querySelectorAll("#board > div");

        // Apply 'square' class and add event listeners
        boardSquares.forEach(square => {
            square.classList.add("square");
            square.addEventListener("click", handleSquareClick);
            square.addEventListener("mouseover", handleMouseOver); 
            square.addEventListener("mouseout", handleMouseOut); 
        });

        // Attach click handler to the New Game button
        const newGameButton = document.querySelector(".controls button");
        newGameButton.addEventListener("click", resetGame);
    };

    window.addEventListener("DOMContentLoaded", setupGame);

})(); // The parentheses shown here is just to execute the function above.
