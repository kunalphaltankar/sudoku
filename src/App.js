import React, { useState } from "react";
import "./App.css";
import { Grid } from "./components/Grid";
import SudokuGrid from "./services/SudokuGrid";

function App() {
	const initGrid = () => {
		let grid = [];
		let temp = [];
		for (let i = 1; i <= 9; i++) {
			for (let j = 1; j <= 9; j++) {
				temp.push(0);
			}
			grid.push(temp);
			temp = [];
		}
		return grid;
	};

	const [grid, setGrid] = useState(initGrid());

	// const solvedGrid = [
	// 	[5, 9, 4, 7, 3, 8, 6, 1, 2],
	// 	[8, 3, 6, 5, 2, 1, 7, 4, 9],
	// 	[7, 1, 2, 6, 4, 9, 3, 8, 5],
	// 	[4, 7, 1, 8, 9, 5, 2, 6, 3],
	// 	[3, 5, 8, 2, 1, 6, 4, 9, 7],
	// 	[2, 6, 9, 4, 7, 3, 8, 5, 1],
	// 	[1, 2, 3, 9, 8, 4, 5, 7, 6],
	// 	[9, 8, 5, 3, 6, 7, 1, 2, 4],
	// 	[6, 4, 7, 1, 5, 2, 9, 3, 8],
	// ];

	// const getRandomIndex = () => {
	// 	return Math.floor(Math.random() * 10) % 9;
	// };

	// const getRandomNumber = () => {
	// 	let randomNum = Math.floor(Math.random() * 10);
	// 	return randomNum === 0 ? getRandomNumber() : randomNum;
	// };

	// const isInRow = (row, num, grid) => {
	// 	for (let i = 0; i < 9; i++) {
	// 		if (grid[row][i] === num) {
	// 			return true;
	// 		}
	// 	}
	// 	return false;
	// };

	// const isInColumn = (col, num, grid) => {
	// 	for (let i = 0; i < 9; i++) {
	// 		if (grid[i][col] === num) {
	// 			return true;
	// 		}
	// 	}
	// 	return false;
	// };

	// const isInBox = (row, col, num, grid) => {
	// 	const rowStart = getBoxStartIndex(row);
	// 	const colStart = getBoxStartIndex(col);
	// 	for (let i = 0; i < 3; i++) {
	// 		for (let j = 0; j < 3; j++) {
	// 			if (grid[rowStart + i][colStart + j] === num) {
	// 				return true;
	// 			}
	// 		}
	// 	}
	// 	return false;
	// };

	// const getBoxStartIndex = (index) => {
	// 	if (index < 3) return 0;
	// 	if (index < 6) return 3;
	// 	if (index < 9) return 6;
	// };

	// const fillOffDiagonal = (grid) => {
	// 	for (let i = 0; i < 9; i++) {
	// 		for (let j = 0; j < 9; j++) {
	// 			if (grid[i][j] === 0) {
	// 				for (let num = 1; num <= 9; num++) {
	// 					if (
	// 						!isInBox(i, j, num, grid) &&
	// 						!isInRow(i, num, grid) &&
	// 						!isInColumn(j, num, grid)
	// 					) {
	// 						grid[i][j] = num;
	// 					}
	// 				}

	// 				if (grid[i][j] === 0) {
	// 					return grid;
	// 				}
	// 			}
	// 		}
	// 	}
	// 	return grid;
	// };

	// function CheckIfSafe(i, j, num, grid) {
	// 	return (
	// 		!isInBox(i, j, num, grid) &&
	// 		!isInRow(i, num, grid) &&
	// 		!isInColumn(j, num, grid)
	// 	);
	// }

	// const fillDiagonal = () => {
	// 	let num;
	// 	let tempGrid = initGrid();
	// 	for (let k = 0; k < 3; k++) {
	// 		for (let i = 3 * k; i < 3 * (k + 1); i++) {
	// 			for (let j = 3 * k; j < 3 * (k + 1); j++) {
	// 				do {
	// 					num = getRandomNumber();
	// 				} while (isInBox(i, j, num, tempGrid));
	// 				tempGrid[i][j] = num;
	// 			}
	// 		}
	// 	}

	// 	console.log(tempGrid);
	// 	setGrid(tempGrid);
	// };

	return (
		<div className="App">
			<div style={{ display: "flex" }}>
				<Grid grid={grid} />
			</div>
			<button
				className="button green"
				onClick={() => {
					setGrid(SudokuGrid.unsolvedGrid().grid);
				}}
			>
				Generate
			</button>
		</div>
	);
}

export default App;
