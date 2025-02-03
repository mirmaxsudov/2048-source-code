import {
  eight,
  eightTwoHundred,
  four,
  fourOneHundred,
  oneTwentyEight,
  sixteen,
  sixteenFourHundred,
  sixtyFour,
  thirtyTwo,
  thirtyTwoEightHundred,
  two,
  twoFiftySix,
} from "../features/2048/gameSlice";

export const isGameOver = (grid) => {
  const size = grid.length;

  for (let row = 0; row < size; row++)
    for (let col = 0; col < size; col++) if (!grid[row][col].val) return false;

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const currentVal = grid[row][col].val;
      if (
        (row > 0 && currentVal === grid[row - 1][col].val) ||
        (row < size - 1 && currentVal === grid[row + 1][col].val) ||
        (col > 0 && currentVal === grid[row][col - 1].val) ||
        (col < size - 1 && currentVal === grid[row][col + 1].val)
      ) {
        return false;
      }
    }
  }

  return true;
};

export const getValBasedOnOnlyOneCell = (grid) => {
  const size = grid.length;
  let emptyCell = null;

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (grid[row][col] === 0) {
        emptyCell = { row, col };
        break;
      }
    }
    if (emptyCell) break;
  }

  if (!emptyCell) return 2;

  const { row, col } = emptyCell;
  const neighbors = [];

  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < size - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < size - 1) neighbors.push(grid[row][col + 1]);

  const maxNeighbor = Math.max(...neighbors);

  if (maxNeighbor >= 8) return 8;
  if (maxNeighbor >= 4) return 4;

  return 2;
};

const calculateScoreBasedOnVal = (val) => {
  val = Number(val);

  switch (val) {
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 10;
    case 32:
      return 12;
    case 64:
      return 14;
    case 128:
      return 16;
    case 256:
      return 30;
    case 512:
      return 50;
    case 1024:
      return 100;
    case 2048:
      return 200;
    case 4096:
      return 400;
    default:
      return 0;
  }
};

export const makeUp = (grid) => {
  const newGrid = JSON.parse(JSON.stringify(grid));
  const size = newGrid.length;
  let score = 0;

  for (let col = 0; col < size; col++) {
    const column = [];
    for (let row = 0; row < size; row++) {
      if (newGrid[row][col].val !== null) {
        column.push(newGrid[row][col].val);
      }
    }

    for (let i = 0; i < column.length - 1; i++) {
      if (column[i] === column[i + 1]) {
        score += calculateScoreBasedOnVal(column[i]);
        column[i] *= 2;
        column[i + 1] = null;
      }
    }

    const newColumn = column.filter((val) => val !== null);

    for (let row = 0; row < size; row++) {
      newGrid[row][col].val = newColumn[row] || null;
    }
  }

  checkAndChange(newGrid);
  console.log(score);

  return {
    grid: newGrid,
    score,
  };
};

export const makeDown = (grid) => {
  const newGrid = JSON.parse(JSON.stringify(grid));
  const size = newGrid.length;

  let score = 0;

  for (let col = 0; col < size; col++) {
    const column = [];
    for (let row = 0; row < size; row++) {
      if (newGrid[row][col].val !== null) {
        column.push(newGrid[row][col].val);
      }
    }

    for (let i = column.length - 1; i > 0; i--) {
      if (column[i] === column[i - 1]) {
        score += calculateScoreBasedOnVal(column[i]);
        column[i] *= 2;
        column[i - 1] = null;
        i--;
      }
    }

    const newColumn = column.filter((val) => val !== null);

    const padLength = size - newColumn.length;
    const paddedColumn = Array(padLength).fill(null).concat(newColumn);

    for (let row = 0; row < size; row++) {
      newGrid[row][col].val = paddedColumn[row] ?? null;
    }
  }

  checkAndChange(newGrid);
  return {
    grid: newGrid,
    score,
  };
};

export const makeRight = (grid) => {
  const newGrid = JSON.parse(JSON.stringify(grid));
  let score = 0;

  for (let row = 0; row < newGrid.length; row++) {
    const currentRow = newGrid[row]
      .map((cell) => cell.val)
      .filter((val) => val !== null);

    for (let i = currentRow.length - 1; i > 0; i--) {
      if (currentRow[i] === currentRow[i - 1]) {
        score += calculateScoreBasedOnVal(currentRow[i]);
        currentRow[i] *= 2;
        currentRow[i - 1] = null;
        i--;
      }
    }

    const newRow = currentRow.filter((val) => val !== null);

    const paddedRow = Array(newGrid[row].length - newRow.length)
      .fill(null)
      .concat(newRow);

    for (let col = 0; col < newGrid[row].length; col++) {
      newGrid[row][col].val = paddedRow[col] ?? null;
    }
  }

  checkAndChange(newGrid);

  return {
    grid: newGrid,
    score,
  };
};

export const makeLeft = (grid) => {
  const newGrid = JSON.parse(JSON.stringify(grid));
  let score = 0;

  for (let row = 0; row < newGrid.length; row++) {
    const currentRow = newGrid[row]
      .map((cell) => cell.val)
      .filter((val) => val !== null);

    for (let i = 0; i < currentRow.length - 1; i++) {
      if (currentRow[i] === currentRow[i + 1]) {
        score += calculateScoreBasedOnVal(currentRow[i]);
        currentRow[i] *= 2;
        currentRow[i + 1] = null;
      }
    }

    const newRow = currentRow.filter((val) => val !== null);
    for (let col = 0; col < newGrid[row].length; col++) {
      newGrid[row][col].val = newRow[col] || null;
    }
  }

  checkAndChange(newGrid);

  return {
    grid: newGrid,
    score,
  };
};

export const getRandomValue = (grid) => {
  const emptyCells = [];
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col].val === null) {
        emptyCells.push({ row, col });
      }
    }
  }

  if (emptyCells.length === 0) {
    return grid;
  }

  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const { row, col } = emptyCells[randomIndex];

  const randomValue = (() => {
    const random = Math.random();
    if (random < 0.8) return 2;
    if (random < 0.95) return 4;
    return 8;
  })();

  const newGrid = JSON.parse(JSON.stringify(grid));
  newGrid[row][col].val = randomValue;

  return newGrid;
};

export const isPossibleToGenerateRandomValue = (grid, direction) => {
  if (!grid || grid.length === 0) return false;

  let newGrid;
  switch (direction) {
    case "up":
      newGrid = makeUp(grid);
      break;
    case "down":
      newGrid = makeDown(grid);
      break;
    case "left":
      newGrid = makeLeft(grid);
      break;
    case "right":
      newGrid = makeRight(grid);
      break;
    default:
      return false;
  }

  return !areGridsEqual(grid, newGrid);
};

export const areGridsEqual = (grid1, grid2) => {
  if (grid1.length !== grid2.length) return false;

  for (let row = 0; row < grid1.length; row++) {
    if (grid1[row].length !== grid2[row].length) return false;

    for (let col = 0; col < grid1[row].length; col++) {
      if (grid1[row][col].val !== grid2[row][col].val) {
        return false;
      }
    }
  }

  return true;
};

const checkAndChange = (newGrid) => {
  const size = newGrid.length;

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (newGrid[i][j].val === null) continue;

      switch (newGrid[i][j].val) {
        case 2: {
          newGrid[i][j] = {
            ...two,
            val: 2,
            id: newGrid[i][j].id,
          };
          break;
        }
        case 4: {
          newGrid[i][j] = {
            ...four,
            val: 4,
            id: newGrid[i][j].id,
          };
          break;
        }
        case 8: {
          newGrid[i][j] = {
            ...eight,
            val: 8,
            id: newGrid[i][j].id,
          };
          break;
        }
        case 16: {
          newGrid[i][j] = {
            ...sixteen,
            val: 16,
            id: newGrid[i][j].id,
          };
          break;
        }
        case 32: {
          newGrid[i][j] = {
            ...thirtyTwo,
            val: 32,
            id: newGrid[i][j].id,
          };
          break;
        }
        case 64: {
          newGrid[i][j] = {
            ...sixtyFour,
            val: 64,
            id: newGrid[i][j].id,
          };
          break;
        }
        case 128: {
          newGrid[i][j] = {
            ...oneTwentyEight,
            val: 128,
            id: newGrid[i][j].id,
          };
          break;
        }
        case 256: {
          newGrid[i][j] = {
            ...twoFiftySix,
            val: 256,
            id: newGrid[i][j].id,
          };
          break;
        }
        case 512: {
          newGrid[i][j] = {
            ...fourOneHundred,
            val: 512,
            id: newGrid[i][j].id,
          };
          break;
        }
        case 1024: {
          newGrid[i][j] = {
            ...eightTwoHundred,
            val: 1024,
            id: newGrid[i][j].id,
          };
          break;
        }
        case 2048: {
          newGrid[i][j] = {
            ...sixteenFourHundred,
            val: 2048,
            id: newGrid[i][j].id,
          };
          break;
        }
        case 4096: {
          newGrid[i][j] = {
            ...thirtyTwoEightHundred,
            val: 4096,
            id: newGrid[i][j].id,
          };
          break;
        }
        default: {
          newGrid[i][j] = {
            ...two,
            val: newGrid[i][j].val,
            id: newGrid[i][j].id,
          };
          break;
        }
      }
    }
  }
};
