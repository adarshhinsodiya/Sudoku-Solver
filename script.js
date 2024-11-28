document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector("#sudoku-grid tbody");

    // Create 9x9 grid
    for (let row = 0; row < 9; row++) {
        const tr = document.createElement("tr");
        for (let col = 0; col < 9; col++) {
            const td = document.createElement("td");
            const input = document.createElement("input");
            input.setAttribute("type", "number");
            input.setAttribute("min", "1");
            input.setAttribute("max", "9");
            td.appendChild(input);
            tr.appendChild(td);
        }
        grid.appendChild(tr);
    }

    // Sudoku Solver Button
    document.getElementById("solve-btn").addEventListener("click", solveSudoku);

    function getGridValues() {
        // Retrieve the Sudoku grid as a 2D array
        const sudoku = [];
        for (let row = 0; row < 9; row++) {
            const rowArr = [];
            for (let col = 0; col < 9; col++) {
                const val = grid.rows[row].cells[col].firstChild.value;
                rowArr.push(val === "" ? 0 : parseInt(val));
            }
            sudoku.push(rowArr);
        }
        return sudoku;
    }

    function setGridValues(sudoku) {
        // Update the grid inputs with the solved Sudoku puzzle
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                grid.rows[row].cells[col].firstChild.value = sudoku[row][col] || "";
            }
        }
    }

    function solveSudoku() {
        const sudoku = getGridValues();
        if (solve(sudoku)) {
            setGridValues(sudoku);
            document.getElementById("status").innerText = "Solved!";
        } else {
            document.getElementById("status").innerText = "No solution exists!";
        }
    }

    function solve(board) {
        // Implement the backtracking algorithm to solve the Sudoku puzzle
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === 0) {
                    for (let num = 1; num <= 9; num++) {
                        if (isValid(board, row, col, num)) {
                            board[row][col] = num;
                            if (solve(board)) return true;
                            board[row][col] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    function isValid(board, row, col, num) {
        // Check if `num` can be placed in board[row][col]
        for (let x = 0; x < 9; x++) {
            if (board[row][x] === num || board[x][col] === num ||
                board[3 * Math.floor(row / 3) + Math.floor(x / 3)][3 * Math.floor(col / 3) + x % 3] === num) {
                return false;
            }
        }
        return true;
    }
});
