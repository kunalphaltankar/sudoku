import React, { useEffect } from "react";
import "./styles.css";

export function Square(props: any) {
	const { row, col, number, onNumberChange, backgroundColor } = props;
	let inputRef: any;

	useEffect(() => {
		inputRef.value = number === 0 ? "" : number;
	});

	const handleNumberChange = (event: any) => {
		const numberFound = (event.target.value + "").match(/\d+$/);

		if (numberFound) {
			const number = parseInt(numberFound[0]);
			const lastDigit = number % 10;
			onNumberChange(lastDigit);
			inputRef.value = lastDigit === 0 ? "" : lastDigit;
		} else {
			inputRef.value = "";
		}
	};

	return (
		<div
			className="square"
			style={{
				borderLeftWidth: row === 1 ? 2 : 1,
				borderRightWidth: row % 3 === 0 ? 2 : 1,
				borderTopWidth: col === 1 ? 2 : 1,
				borderBottomWidth: col % 3 === 0 ? 2 : 1,
			}}
		>
			<input
				type="text"
				className="number-input"
				onChange={handleNumberChange}
				ref={(ref) => (inputRef = ref)}
				style={{ background: backgroundColor }}
				onFocus={() => {
					inputRef.style.background = "#f0dc82";
				}}
				onBlur={() => {
					inputRef.style.background = "white";
				}}
			/>
		</div>
	);
}
