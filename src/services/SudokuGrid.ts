export function shuffle(array: any[]) {
	var currentIndex = array.length,
		temporaryValue,
		randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

export default class SudokuGrid {
	static isPerfect(grid: number[]) {
		if (grid.length !== 81)
			console.error(
				"The grid must be a single-dimension grid of length 81"
			);

		//tests to see if the grid is perfect

		//for every box
		for (let i = 0; i < 9; i++) {
			let registered = [];
			registered[0] = true;
			let boxOrigin = ((i * 3) % 9) + parseInt("" + (i * 3) / 9) * 27;
			for (let j = 0; j < 9; j++) {
				let boxStep = boxOrigin + parseInt("" + j / 3) * 9 + (j % 3);
				let boxNum = grid[boxStep];
				registered[boxNum] = true;
			}
			for (let b of registered) if (!b) return false;
		}

		//for every row
		for (let i = 0; i < 9; i++) {
			let registered = [];
			registered[0] = true;
			let rowOrigin = i * 9;
			for (let j = 0; j < 9; j++) {
				let rowStep = rowOrigin + j;
				let rowNum = grid[rowStep];
				registered[rowNum] = true;
			}
			for (let b of registered) if (!b) return false;
		}

		//for every column
		for (let i = 0; i < 9; i++) {
			let registered = [];
			registered[0] = true;
			let colOrigin = i;
			for (let j = 0; j < 9; j++) {
				let colStep = colOrigin + j * 9;
				let colNum = grid[colStep];
				registered[colNum] = true;
			}
			for (let b of registered) if (!b) return false;
		}

		return true;
	}

	static generateGrid() {
		let grid: number[] = [];
		let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		for (let i = 0; i < 81; i++) {
			if (i % 9 === 0) {
				arr = shuffle(arr);
			}
			let perBox =
				(parseInt("" + i / 3) % 3) * 9 +
				parseInt("" + (i % 27) / 9) * 3 +
				parseInt("" + i / 27) * 27 +
				(i % 3);
			grid[perBox] = arr[i % 9];
		}

		let sorted = [];

		for (let i = 0; i < 9; i++) {
			let backtrack = false;
			//0 is row, 1 is column
			for (let a = 0; a < 2; a++) {
				let registered = [];
				let rowOrigin = i * 9;
				let colOrigin = i;
				ROW_COL: for (let j = 0; j < 9; j++) {
					//row/column stepping - making sure numbers are only registered once and marking which cells have been sorted
					let step = a % 2 === 0 ? rowOrigin + j : colOrigin + j * 9;
					let num = grid[step];

					if (!registered[num]) registered[num] = true;
					//if duplicate in row/column
					else {
						//box and adjacent-cell swap (BAS method)
						//checks for either unregistered and unsorted candidates in same box,
						//or unregistered and sorted candidates in the adjacent cells
						for (let y = j; y >= 0; y--) {
							let scan = a % 2 === 0 ? i * 9 + y : i + 9 * y;
							if (grid[scan] === num) {
								//box stepping
								for (
									let z = a % 2 === 0 ? ((i % 3) + 1) * 3 : 0;
									z < 9;
									z++
								) {
									if (a % 2 === 1 && z % 3 <= i % 3) continue;
									let boxOrigin =
										parseInt("" + (scan % 9) / 3) * 3 +
										parseInt("" + scan / 27) * 27;
									let boxStep =
										boxOrigin +
										parseInt("" + z / 3) * 9 +
										(z % 3);
									let boxNum = grid[boxStep];
									if (
										(!sorted[scan] &&
											!sorted[boxStep] &&
											!registered[boxNum]) ||
										(sorted[scan] &&
											!registered[boxNum] &&
											(a % 2 === 0
												? boxStep % 9 === scan % 9
												: parseInt("" + boxStep / 9) ===
												  parseInt("" + scan / 9)))
									) {
										grid[scan] = boxNum;
										grid[boxStep] = num;
										registered[boxNum] = true;
										continue ROW_COL;
									} else if (z === 8) {
										//if z === 8, then break statement not reached: no candidates available
										//Preferred adjacent swap (PAS)
										//Swaps x for y (preference on unregistered numbers), finds occurence of y
										//and swaps with z, etc. until an unregistered number has been found
										let searchingNo = num;

										//noting the location for the blindSwaps to prevent infinite loops.
										let blindSwapIndex = [];

										//loop of size 18 to prevent infinite loops as well. Max of 18 swaps are possible.
										//at the end of this loop, if continue or break statements are not reached, then
										//fail-safe is executed called Advance and Backtrack Sort (ABS) which allows the
										//algorithm to continue sorting the next row and column before coming back.
										//Somehow, this fail-safe ensures success.
										for (let q = 0; q < 18; q++) {
											SWAP: for (let b = 0; b <= j; b++) {
												let pacing =
													a % 2 === 0
														? rowOrigin + b
														: colOrigin + b * 9;
												if (
													grid[pacing] === searchingNo
												) {
													let adjacentCell = -1;
													let adjacentNo = -1;
													let decrement =
														a % 2 === 0 ? 9 : 1;

													for (
														let c = 1;
														c < 3 - (i % 3);
														c++
													) {
														adjacentCell =
															pacing +
															(a % 2 === 0
																? (c + 1) * 9
																: c + 1);

														//this creates the preference for swapping with unregistered numbers
														if (
															(a % 2 === 0 &&
																adjacentCell >=
																	81) ||
															(a % 2 === 1 &&
																adjacentCell %
																	9 ===
																	0)
														)
															adjacentCell -= decrement;
														else {
															adjacentNo =
																grid[
																	adjacentCell
																];
															if (
																i % 3 !== 0 ||
																c !== 1 ||
																blindSwapIndex[
																	adjacentCell
																] ||
																registered[
																	adjacentNo
																]
															)
																adjacentCell -= decrement;
														}
														adjacentNo =
															grid[adjacentCell];

														//as long as it hasn't been swapped before, swap it
														if (
															!blindSwapIndex[
																adjacentCell
															]
														) {
															blindSwapIndex[
																adjacentCell
															] = true;
															grid[
																pacing
															] = adjacentNo;
															grid[
																adjacentCell
															] = searchingNo;
															searchingNo = adjacentNo;

															if (
																!registered[
																	adjacentNo
																]
															) {
																registered[
																	adjacentNo
																] = true;
																continue ROW_COL;
															}
															break SWAP;
														}
													}
												}
											}
										}
										//begin Advance and Backtrack Sort (ABS)
										backtrack = true;
										break ROW_COL;
									}
								}
							}
						}
					}
				}

				if (a % 2 === 0)
					for (let j = 0; j < 9; j++) sorted[i * 9 + j] = true;
				//setting row as sorted
				else if (!backtrack)
					for (let j = 0; j < 9; j++) sorted[i + j * 9] = true;
				//setting column as sorted
				//reseting sorted cells through to the last iteration
				else {
					backtrack = false;
					for (let j = 0; j < 9; j++) sorted[i * 9 + j] = false;
					for (let j = 0; j < 9; j++) sorted[(i - 1) * 9 + j] = false;
					for (let j = 0; j < 9; j++) sorted[i - 1 + j * 9] = false;
					i -= 2;
				}
			}
		}

		if (!SudokuGrid.isPerfect(grid)) {
			throw "ERROR: Imperfect grid generated.";
		}

		let Grid2D = [];
		for (let i = 0; i < 9; i++) {
			Grid2D.push(grid.slice(i * 9, (i + 1) * 9));
		}
		console.log(Grid2D);
		return Grid2D;
	}

	static getRandomIndex = () => {
		return Math.floor(Math.random() * 10) % 9;
	};

	static unsolvedGrid() {
		const solution = SudokuGrid.generateGrid();
		const grid = JSON.parse(JSON.stringify(solution));
		for (let i = 0; i < 35; i++) {
			grid[this.getRandomIndex()][this.getRandomIndex()] = 0;
		}
		return {
			grid,
			solution,
			level: "easy",
		};
	}
}
