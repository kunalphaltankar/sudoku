import React, { useEffect, useState } from "react";
import "./App.css";
import { Grid } from "./components/Grid";
import SudokuGrid from "./services/SudokuGrid";

function App() {
	const gridData = SudokuGrid.unsolvedGrid();
	const [grid, setGrid] = useState(gridData.grid);
	const [solution, setSolution] = useState(gridData.solution);

	const onCheck = () => {
		for (let i = 0; i < 9; i++) {
			for (let j = 0; j < 9; j++) {
				if (grid[i][j] !== solution[i][j]) {
					alert("Wrong");
					return;
				}
			}
		}

		const gridData = SudokuGrid.unsolvedGrid();
		setGrid(gridData.grid);
		setSolution(gridData.solution);
		alert("Correct");
	};

	return (
		<div className="App">
			<div style={{ display: "flex" }}>
				<Grid
					grid={grid}
					solution={solution}
					onGridChange={(grid) => {
						setGrid(grid);
					}}
				/>
			</div>

			<button className="button green" onClick={onCheck}>
				Check
			</button>
		</div>
	);
}

export default App;
