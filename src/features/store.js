import { configureStore } from "@reduxjs/toolkit";
import gameSlice from "./2048/gameSlice";
import languageSlice from "./language/languageSlice";

export const store = configureStore({
  reducer: {
    game: gameSlice,
    language: languageSlice,
  },
});
