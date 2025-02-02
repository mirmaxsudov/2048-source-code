import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

const two = {
  id: uuid(),
  val: 2,
  bgColor: "#EEE4DA",
  textColor: "#756452",
  defaultBgColor: "#BDAC97",
};

const four = {
  id: uuid(),
  val: 4,
  bgColor: "#EBD8B6",
  textColor: "#756452",
  defaultBgColor: "#BDAC97",
};

const eight = {
  id: uuid(),
  val: 8,
  bgColor: "#F1AF74",
  textColor: "#756452",
  defaultBgColor: "#BDAC97",
};

const sixteen = {
  id: uuid(),
  val: 16,
  bgColor: "#F6925F",
  textColor: "#756452",
  defaultBgColor: "#BDAC97",
};

const thirtyTwo = {
  id: uuid(),
  val: 32,
  bgColor: "#F25F5C",
  textColor: "#756452",
  defaultBgColor: "#BDAC97",
};

const sixtyFour = {
  id: uuid(),
  val: 64,
  bgColor: "#EB4D4B",
  textColor: "#756452",
  defaultBgColor: "#BDAC97",
};

const oneTwentyEight = {
  id: uuid(),
  val: 128,
  bgColor: "#EB4D4B",
  textColor: "#756452",
  defaultBgColor: "#BDAC97",
};

const twoFiftySix = {
  id: uuid(),
  val: 256,
  bgColor: "#EB4D4B",
  textColor: "#fff",
  defaultBgColor: "#BDAC97",
};

const fourOneHundred = {
  id: uuid(),
  val: 512,
  bgColor: "#EB4D4B",
  textColor: "#756452",
  defaultBgColor: "#BDAC97",
};

const eightTwoHundred = {
  id: uuid(),
  val: 1024,
  bgColor: "#EB4D4B",
  textColor: "#756452",
  defaultBgColor: "#BDAC97",
};

const sixteenFourHundred = {
  id: uuid(),
  val: 2048,
  bgColor: "#EB4D4B",
  textColor: "#756452",
  defaultBgColor: "#BDAC97",
};

const thirtyTwoEightHundred = {
  id: uuid(),
  val: 4096,
  bgColor: "#EB4D4B",
  textColor: "#756452",
  defaultBgColor: "#BDAC97",
};

const initGameState = {
  score: 0,
  bestScore: 0,
  gameLanguage: "uz",
  grid: [
    [
      {
        ...four,
      },
      {
        ...two,
      },
      {
        ...two,
      },
      {
        ...two,
      },
    ],
    [
      {
        ...two,
      },
      {
        ...two,
      },
      {
        ...two,
      },
      {
        ...two,
      },
    ],
    [
      {
        ...two,
      },
      {
        ...two,
      },
      {
        ...two,
      },
      {
        ...two,
      },
    ],
    [
      {
        ...four,
      },
      {
        ...twoFiftySix,
      },
      {
        ...two,
      },
      {
        ...two,
      },
    ],
  ],
};

const gameSlice = createSlice({
  name: "game",
  initialState: initGameState,
  reducers: {
    setGameLanguage: (state, action) => {
      state.gameLanguage = action.payload;
    },
    setScore: (state, action) => {
      state.score = action.payload;
    },
    setBestScore: (state, action) => {
      state.bestScore = action.payload;
    },
    setGrid: (state, action) => {
      state.grid = action.payload;
    },
  },
});

export const { setGameLanguage, setScore, setBestScore, setGrid } =
  gameSlice.actions;
export default gameSlice.reducer;
