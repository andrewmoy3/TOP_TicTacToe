const GameController = (() => {
    //creates GameBoard object within GameController
    const Gameboard = (() => {
        const board = ['','','','','','','','','']
        const changeBoard = (i, symbol) => board[i] = symbol;
        const getBoard = () => board;
        return{
            changeBoard,
            getBoard
        }
    })();

    const players = [
        {
            playerOne: "playerOne",
            token: 1
        },
        {
            playerTwo: "playerTwo",
            token: 2
        }
    ]

    //renders board in HTML, adds event listeners
    const renderBoard = () => {
        const boardDiv = document.getElementById("board");
        boardDiv.innerHTML = '';
        const board = Gameboard.getBoard();
        for(let i=0;i<9;i++){
            const square = document.createElement("div");
            square.classList = "square";
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

        content == '' ? board[0] = 'x' : board[0] = '' 
        renderBoard();
    }


    const playTurn = () => {
        renderBoard();
    }

    return {
        playTurn
    }

})()

GameController.playTurn()