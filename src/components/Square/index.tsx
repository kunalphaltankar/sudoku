import React, { useEffect } from "react";
import "./styles.css";

export function Square(props: any) {
	const { row, col, number } = props;
	let inputRef: any;

	useEffect(() => {
		inputRef.value = number === 0 ? "" : number;
	});

	const handleNumberChange = (event: any) => {
		const number = parseInt(event.target.value);
		console.log(number);

		if (!isNaN(number)) {
			const lastDigit = number % 10;
			inputRef.value = lastDigit === 0 ? "" : lastDigit;
		} else {
			inputRef.value = "";
		}
	};

	return (
		<div
			className="square"
			style={{
				borderLeftWidth: row === 1 ? 4 : 1,
				borderRightWidth: row % 3 === 0 ? 4 : 1,
				borderTopWidth: col === 1 ? 4 : 1,
				borderBottomWidth: col % 3 === 0 ? 4 : 1,
			}}
		>
			<input
				type="text"
				className="number-input"
				onChange={handleNumberChange}
				ref={(ref) => (inputRef = ref)}
			/>
		</div>
	);
}
