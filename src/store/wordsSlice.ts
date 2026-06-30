import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  createWord,
  fetchCategories,
  fetchOwnWords,
  fetchStatistics,
} from "../api/words";
import {
  mapBackendWordToDictionaryWord,
  type DictionaryWord,
} from "../store/wordMapper";
import type { RootState } from "./store";
import type { CreateWordPayload, VerbType, WordCategory } from "../types/word";

function getErrorMessage(error: unknown, fallback: string) {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message;

    if (typeof message === "string" && message.trim()) {
      return message;
    }
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return fallback;
}

type FetchDictionaryParams = {
  keyword?: string;
  category?: WordCategory | null;
  verbType?: VerbType;
  page?: number;
  limit?: number;
};

export const fetchDictionaryWordsThunk = createAsyncThunk(
  "words/fetchDictionaryWords",
  async (params: FetchDictionaryParams, thunkAPI) => {
    try {
      const data = await fetchOwnWords({
        keyword: params.keyword?.trim() || undefined,
        category: params.category ?? undefined,
        isIrregular:
          params.category === "verb"
            ? params.verbType === "irregular"
            : undefined,
        page: params.page ?? 1,
        limit: params.limit ?? 7,
      });

      return {
        words: data.results.map(mapBackendWordToDictionaryWord),
        totalPages: data.totalPages,
        page: data.page,
        perPage: data.perPage,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Dictionary words could not be loaded"),
      );
    }
  },
);

export const fetchCategoriesThunk = createAsyncThunk(
  "words/fetchCategories",
  async (_, thunkAPI) => {
    try {
      return await fetchCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Categories could not be loaded"),
      );
    }
  },
);

export const fetchStatisticsThunk = createAsyncThunk(
  "words/fetchStatistics",
  async (_, thunkAPI) => {
    try {
      return await fetchStatistics();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Statistics could not be loaded"),
      );
    }
  },
);

export const createWordThunk = createAsyncThunk(
  "words/createWord",
  async (payload: CreateWordPayload, thunkAPI) => {
    try {
      const data = await createWord({
        en: payload.word.trim(),
        ua: payload.ua.trim(),
        category: payload.category,
        isIrregular:
          payload.category === "verb"
            ? payload.verbType === "irregular"
            : undefined,
      });

      return mapBackendWordToDictionaryWord(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Word could not be created"),
      );
    }
  },
);

type WordsState = {
  dictionaryWords: DictionaryWord[];
  categories: WordCategory[];
  statisticsCount: number;
  currentPage: number;
  totalPages: number;
  perPage: number;
  isLoadingWords: boolean;
  isLoadingCategories: boolean;
  isLoadingStatistics: boolean;
  error: string | null;
};

const initialState: WordsState = {
  dictionaryWords: [],
  categories: [],
  statisticsCount: 0,
  currentPage: 1,
  totalPages: 1,
  perPage: 7,
  isLoadingWords: false,
  isLoadingCategories: false,
  isLoadingStatistics: false,
  error: null,
};

const wordsSlice = createSlice({
  name: "words",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDictionaryWordsThunk.pending, (state) => {
        state.isLoadingWords = true;
        state.error = null;
      })
      .addCase(fetchDictionaryWordsThunk.fulfilled, (state, action) => {
        state.isLoadingWords = false;
        state.dictionaryWords = action.payload.words;
        state.currentPage = action.payload.page;
        state.totalPages = action.payload.totalPages;
        state.perPage = action.payload.perPage;
      })
      .addCase(fetchDictionaryWordsThunk.rejected, (state, action) => {
        state.isLoadingWords = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCategoriesThunk.pending, (state) => {
        state.isLoadingCategories = true;
      })
      .addCase(fetchCategoriesThunk.fulfilled, (state, action) => {
        state.isLoadingCategories = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategoriesThunk.rejected, (state, action) => {
        state.isLoadingCategories = false;
        state.error = action.payload as string;
      })
      .addCase(fetchStatisticsThunk.pending, (state) => {
        state.isLoadingStatistics = true;
      })
      .addCase(fetchStatisticsThunk.fulfilled, (state, action) => {
        state.isLoadingStatistics = false;
        state.statisticsCount = action.payload.totalCount;
      })
      .addCase(fetchStatisticsThunk.rejected, (state, action) => {
        state.isLoadingStatistics = false;
        state.error = action.payload as string;
      })
      .addCase(createWordThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(createWordThunk.fulfilled, (state, action) => {
        state.dictionaryWords = [action.payload, ...state.dictionaryWords];
        state.statisticsCount += 1;
      })
      .addCase(createWordThunk.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const selectDictionaryWords = (state: RootState) =>
  state.words.dictionaryWords;

export const selectWordCategories = (state: RootState) =>
  state.words.categories;

export const selectWordStatisticsCount = (state: RootState) =>
  state.words.statisticsCount;

export const selectWordsCurrentPage = (state: RootState) =>
  state.words.currentPage;

export const selectWordsTotalPages = (state: RootState) =>
  state.words.totalPages;

export const selectWordsPerPage = (state: RootState) => state.words.perPage;

export const selectIsLoadingWords = (state: RootState) =>
  state.words.isLoadingWords;

export const selectIsLoadingCategories = (state: RootState) =>
  state.words.isLoadingCategories;

export const selectIsLoadingStatistics = (state: RootState) =>
  state.words.isLoadingStatistics;

export const selectWordsError = (state: RootState) => state.words.error;

export default wordsSlice.reducer;
