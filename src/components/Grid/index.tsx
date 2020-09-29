import React from "react";
import "./styles.css";
import { Square } from "../Square";

export function Grid(props: any) {
	const { grid, solution, doCheck, unsetDoCheck } = props;

	const backgroundColor = (i: number, j: number) => {
		if (doCheck) {
			return grid[j][i] !== solution[j][i] ? "red" : "green";
		}
		return "white";
	};

	return grid.map((row: number[], i: number) => (
		<div key={i}>
			{row.map((col: number, j: number) => (
				<Square
					number={grid[j][i]}
					row={i + 1}
					col={j + 1}
					key={j}
					onNumberChange={(num: number) => {
						grid[j][i] = num;
						unsetDoCheck();
					}}
					backgroundColor={backgroundColor(i, j)}
				/>
			))}
		</div>
	));
}
