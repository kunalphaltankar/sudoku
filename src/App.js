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
	const [solvedGrid, setSolvedGrid] = useState(initGrid());

	return (
		<div className="App">
			<div style={{ display: "flex" }}>
				<Grid
					grid={grid}
					onGridChange={(grid) => {
						setGrid(grid);
					}}
				/>
			</div>
			<button
				className="button green"
				onClick={() => {
					const { grid, solution } = SudokuGrid.unsolvedGrid();
					setGrid(grid);
					setSolvedGrid(solution);
				}}
			>
				Generate
			</button>

			<button
				className="button green"
				onClick={() => {
					console.log(grid);
					for (let i = 0; i < 9; i++) {
						for (let j = 0; j < 9; j++) {
							if (grid[i][j] !== solvedGrid[i][j]) {
								alert("Wrong");
								return;
							}
						}
					}
					alert("Correct");
				}}
			>
				Check
			</button>
		</div>
	);
}

export default App;
