import { configureStore } from "@reduxjs/toolkit";
import gameSlice from "./2048/gameSlice";

export const store = configureStore({
  reducer: {
    game: gameSlice,
  },
});
