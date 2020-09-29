import React from "react";
import "./App.css";
import { Grid } from "./components/Grid";
import SudokuGrid from "./services/SudokuGrid";

class App extends React.Component {
	state = {
		grid: [],
		solution: [],
		level: "easy",
		doCheck: false,
	};

	componentDidMount() {
		const gridData = SudokuGrid.unsolvedGrid("easy");
		this.setState({
			grid: gridData.grid,
			solution: gridData.solution,
			doCheck: false,
		});
	}

	generateNewGrid = () => {
		const { level } = this.state;
		console.log(level);
		const gridData = SudokuGrid.unsolvedGrid(level);
		this.setState({
			grid: gridData.grid,
			solution: gridData.solution,
			doCheck: false,
		});
	};

	onCheck = () => {
		const { grid, solution } = this.state;

		for (let i = 0; i < 9; i++) {
			for (let j = 0; j < 9; j++) {
				if (grid[i][j] !== solution[i][j]) {
					this.setState({ doCheck: true });
					return;
				}
			}
		}
		this.generateNewGrid();
		alert("Correct");
	};

	onSolve = () => {
		this.setState({ grid: this.state.solution });
	};

	render() {
		const { grid, solution, doCheck } = this.state;
		return (
			<div className="App">
				<div className="header">
					<h1>Sudoku</h1>
				</div>

				<div style={{ display: "flex" }}>
					<Grid
						grid={grid}
						solution={solution}
						onGridChange={(grid) => {
							this.setState({ grid });
						}}
						doCheck={doCheck}
						unsetDoCheck={() => {
							this.setState({ doCheck: false });
						}}
					/>
				</div>

				<div className="button-container">
					<button
						className="level-button"
						onClick={() => {
							this.setState({ level: "easy" }, () => {
								this.generateNewGrid();
							});
						}}
					>
						Easy
					</button>

					<button
						className="level-button"
						onClick={() => {
							this.setState({ level: "medium" }, () => {
								this.generateNewGrid();
							});
						}}
					>
						Medium
					</button>

					<button
						className="level-button"
						onClick={() => {
							this.setState({ level: "hard" }, () => {
								this.generateNewGrid();
							});
						}}
					>
						Hard
					</button>
				</div>

				<div className="button-container">
					<button className="button" onClick={this.onCheck}>
						Check
					</button>
					<button className="button" onClick={this.onSolve}>
						Solve
					</button>
				</div>
			</div>
		);
	}
}

export default App;
