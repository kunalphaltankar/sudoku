import React from "react";
import "./styles.css";
import { Square } from "../Square";

export function Grid(props: any) {
	const { grid } = props;
	// console.log(grid);

	return grid.map((row: number[], i: number) => (
		<div key={i}>
			{row.map((col: number, j: number) => (
				<Square number={grid[j][i]} row={i + 1} col={j + 1} key={j} />
			))}
		</div>
	));
}
