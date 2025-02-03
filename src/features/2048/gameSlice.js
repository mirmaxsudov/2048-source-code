import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import {
  getRandomValue,
  isGameOver,
  isPossibleToGenerateRandomValue,
  makeDown,
  makeLeft,
  makeRight,
  makeUp,
} from "../../helper/gameHelperMethods";

export const two = {
  id: uuid(),
  val: 2,
  bgColor: "#EEE4DA",
  textColor: "#756452",
  defaultBgColor: "#BDAC97",
};

export const four = {
  id: uuid(),
  val: 4,
  bgColor: "#EBD8B6",
  textColor: "#756452",
  defaultBgColor: "#BDAC97",
};

export const eight = {
  id: uuid(),
  val: 8,
  bgColor: "#F1AF74",
  textColor: "#756452",
  defaultBgColor: "#BDAC97",
};

export const sixteen = {
  id: uuid(),
  val: 16,
  bgColor: "#F6925F",
  textColor: "#756452",
  defaultBgColor: "#BDAC97",
};

export const thirtyTwo = {
  id: uuid(),
  val: 32,
  bgColor: "#F25F5C",
  textColor: "#756452",
  defaultBgColor: "#BDAC97",
};

export const sixtyFour = {
  id: uuid(),
  val: 64,
  bgColor: "#EB4D4B",
  textColor: "#756452",
  defaultBgColor: "#BDAC97",
};

export const oneTwentyEight = {
  id: uuid(),
  val: 128,
  bgColor: "#EB4D4B",
  textColor: "#756452",
  defaultBgColor: "#BDAC97",
};

export const twoFiftySix = {
  id: uuid(),
  val: 256,
  bgColor: "#EB4D4B",
  textColor: "#fff",
  defaultBgColor: "#BDAC97",
};

export const fourOneHundred = {
  id: uuid(),
  val: 512,
  bgColor: "#EB4D4B",
  textColor: "#756452",
  defaultBgColor: "#BDAC97",
};

export const eightTwoHundred = {
  id: uuid(),
  val: 1024,
  bgColor: "#EB4D4B",
  textColor: "#756452",
  defaultBgColor: "#BDAC97",
};

export const sixteenFourHundred = {
  id: uuid(),
  val: 2048,
  bgColor: "#EB4D4B",
  textColor: "#756452",
  defaultBgColor: "#BDAC97",
};

export const thirtyTwoEightHundred = {
  id: uuid(),
  val: 4096,
  bgColor: "#EB4D4B",
  textColor: "#756452",
  defaultBgColor: "#BDAC97",
};

const initGameState = {
  score: 0,
  bestScore: 0,
  status: "PLAYING", // || "GAMEOVER",
  grid: [
    [
      {
        ...four,
        val: null,
      },
      {
        ...two,
        val: null,
      },
      {
        ...two,
        val: null,
      },
      {
        ...two,
        val: null,
      },
    ],
    [
      {
        ...two,
        val: null,
      },
      {
        ...two,
        val: null,
      },
      {
        ...two,
        val: null,
      },
      {
        ...two,
        val: null,
      },
    ],
    [
      {
        ...two,
        val: null,
      },
      {
        ...two,
        val: null,
      },
      {
        ...two,
        val: null,
      },
      {
        ...two,
        val: null,
      },
    ],
    [
      {
        ...four,
        val: null,
      },
      {
        ...twoFiftySix,
        val: null,
      },
      {
        ...two,
        val: null,
      },
      {
        ...two,
        val: null,
      },
    ],
  ],
};

const gameSlice = createSlice({
  name: "game",
  initialState: initGameState,
  reducers: {
    setScore: (state, action) => {
      state.score = action.payload;
    },
    setBestScore: (state, action) => {
      state.bestScore = action.payload;
    },
    setGrid: (state, action) => {
      state.grid = action.payload;
    },
    setInitValues: (state, _) => {
      state.score = 0;
      const bestScore = localStorage.getItem("bestScore") || 0;

      state.bestScore = bestScore;

      const newGrid = [[], [], [], []];

      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          newGrid[i][j] = {
            id: uuid(),
            ...two,
            val: null,
          };
        }
      }

      const i1 = getRandom(0, 3);
      const j1 = getRandom(0, 3);

      newGrid[i1][j1] = {
        id: uuid(),
        ...two,
      };

      const i2 = getRandom(0, 3);
      const j2 = getRandom(0, 3);

      newGrid[i2][j2] = {
        id: uuid(),
        ...two,
      };

      state.grid = newGrid;
    },
    moveUp: (state, _) => {
      if (isGameOver(state.grid)) {
        state.status = "GAMEOVER";
        return;
      }

      const isPossible = isPossibleToGenerateRandomValue(state.grid, "u");

      const newGridObj = makeUp(state.grid);
      state.grid = newGridObj.grid;
      state.score += newGridObj.score;
      if (isPossible) state.grid = getRandomValue(state.grid);
    },
    moveDown: (state, _) => {
      if (isGameOver(state.grid)) {
        state.status = "GAMEOVER";
        return;
      }

      const isPossible = isPossibleToGenerateRandomValue(state.grid, "down");

      const newGrid = makeDown(state.grid);
      state.grid = newGrid.grid;
      state.score += newGrid.score;

      if (isPossible) state.grid = getRandomValue(state.grid);
    },
    moveLeft: (state, _) => {
      if (isGameOver(state.grid)) {
        state.status = "GAMEOVER";
        return;
      }

      const isPossible = isPossibleToGenerateRandomValue(state.grid, "left");

      const newGrid = makeLeft(state.grid);
      state.grid = newGrid.grid;
      state.score += newGrid.score;
      if (isPossible) state.grid = getRandomValue(state.grid);
    },
    moveRight: (state, _) => {
      if (isGameOver(state.grid)) {
        state.status = "GAMEOVER";
        return;
      }

      const isPossible = isPossibleToGenerateRandomValue(state.grid, "right");

      const newGrid = makeRight(state.grid);
      state.grid = newGrid.grid;
      state.score += newGrid.score;
      if (isPossible) state.grid = getRandomValue(state.grid);
    },
    setGameScore: (state, action) => {
      if (action.payload < 0) return;
      state.score += action.payload;
    },
  },
});

function getRandom(min = 1, max = 4) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const {
  setGameLanguage,
  setScore,
  setBestScore,
  setGrid,
  setInitValues,
  moveUp,
  moveDown,
  moveLeft,
  moveRight,
  setGameScore,
} = gameSlice.actions;
export default gameSlice.reducer;
