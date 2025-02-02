import { createSlice } from "@reduxjs/toolkit";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from "../../locale/en";
import { uz } from "../../locale/uz";
import { kr } from "../../locale/kr";
import { zh } from "../../locale/zh";
import { ru } from "../../locale/ru";

i18next.use(initReactI18next).init({
  resources: {
    uz: { translation: uz },
    kr: { translation: kr },
    zh: { translation: zh },
    ru: { translation: ru },
    en: { translation: en },
  },
  lng: "uz",
  fallbackLng: "uz",
});

const initLanguageState = {
  language: "uz",
};

const languageSlice = createSlice({
  name: "language",
  initialState: initLanguageState,
  reducers: {
    changeLanguage: (state, action) => {
      i18next.changeLanguage(action.payload);
      state.language = action.payload;
    },
  },
});

export const { changeLanguage } = languageSlice.actions;
export default languageSlice.reducer;
