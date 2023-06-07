const GameController = (() => {
    //creates GameBoard object within GameController
    const Gameboard = (() => {
        const board = ['','','','','','','','','']
        const changeBoard = (i, symbol) => board[i] = symbol;
        const getBoard = () => board;
        const clearBoard = () => {
            for(let i=0;i<9;i++){
                board[i] = '';
            }
        };

        return{
            changeBoard,
            getBoard,
            clearBoard
        }
    })();

    const players = [
        {
            name: "playerOne",
            token: 'X'
        },
        {
            name: "playerTwo",
            token: 'Y'
        }
    ]

    var currentPlayer = players[0];

    //renders board in HTML, adds event listeners
    const renderBoard = () => {
        const boardDiv = document.getElementById("board");
        boardDiv.innerHTML = '';
        const board = Gameboard.getBoard();
        for(let i=0;i<9;i++){
            const square = document.createElement("div");
            square.classList = "square";
            square.id = i;
            square.textContent = board[i];
            square.addEventListener("click", () => {
                handleInput(square);
            })
            boardDiv.appendChild(square);
        }
    }

    const handleInput = (square) => {
        const board = Gameboard.getBoard();
        const content = square.textContent;
        const idx = square.id;

        if(content == ''){
            board[idx] = currentPlayer.token;
            playTurn();
            currentPlayer = currentPlayer == players[0] ? players[1] : players[0];
        }
    }

    const checkWinner = () => {
        var winner;
        
        const winningConditions = [
            // Rows
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            // Columns
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            // Diagonals
            [0, 4, 8],
            [2, 4, 6]
        ];
        const board = Gameboard.getBoard();
        // Check if any winning condition is met
        for (const condition of winningConditions) {
            const [a, b, c] = condition;
            if (
            board[a] !== '' &&
            board[a] === board[b] &&
            board[a] === board[c]
            ) {
            winner = board[a]; // Return the winning symbol (X or O)
            }
        }
        winner == currentPlayer.token ? showWinner(currentPlayer.name + ' wins!') : null;

        if(!winner){
            for (square of board){
                if(square == ''){
                    return;
                }
            }
            showWinner("Tie!")
        }
    } 

    function showWinner(message) {
        document.getElementById('popup').style.display = 'block'; // Display the popup
        document.getElementById('winMessage').textContent = message;
        document.getElementById('newGame').addEventListener('click', newGame);
    }

    const newGame = () => {
        Gameboard.clearBoard();
        document.getElementById('popup').style.display = 'none';
        playTurn();
    }

    const playTurn = () => {
        renderBoard();
        checkWinner();
    }

    return {
        playTurn
    }

})()

GameController.playTurn()

