import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signIn, signUp, signOut, getCurrentUser } from "../api/auth";
import { setAuthHeader, clearAuthHeader } from "../api/client";
import { saveToken, deleteToken, getToken } from "../utils/secureStore";

type AuthUser = {
  name: string;
  email: string;
};

function mapAuthUser(data: {
  name: string;
  email: string;
}): AuthUser {
  return {
    name: data.name,
    email: data.email,
  };
}

function getErrorMessage(error: unknown, fallbackMessage: string) {
  if (axios.isAxiosError(error)) {
    const responseMessage = error.response?.data?.message;

    if (Array.isArray(responseMessage)) {
      return responseMessage.join(", ");
    }

    if (typeof responseMessage === "string" && responseMessage.trim()) {
      return responseMessage;
    }
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return fallbackMessage;
}

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (
    payload: { name: string; email: string; password: string },
    thunkAPI,
    ) => {
    try {
      const data = await signUp(payload);
      setAuthHeader(data.token);
      await saveToken(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Register failed"),
      );
    }
  },
);

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (payload: { email: string; password: string }, thunkAPI) => {
    try {
      const data = await signIn(payload);
      setAuthHeader(data.token);
      await saveToken(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error, "Login failed"));
    }
  },
);
export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await signOut();
      await deleteToken();
      clearAuthHeader();
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error, "Logout failed"));
    }
  },
);
export const restoreSessionThunk = createAsyncThunk(
  "auth/restoreSession",
  async (_, thunkAPI) => {
    try {
      const token = await getToken();

      if (!token) {
        return thunkAPI.rejectWithValue("No token found");
      }

      setAuthHeader(token);
      const user = await getCurrentUser();

      return { token, user };
    } catch (error) {
      await deleteToken();
      clearAuthHeader();
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Session restore failed"),
      );
    }
  },
);
type AuthState = {
  user: AuthUser | null;
  token: string | null;
  isAuth: boolean;
  isLoading: boolean;
  error: string | null;
  isRestoringSession: boolean;
};

const initialState: AuthState = {
  user: null,
  token: null,
  isAuth: false,
  isLoading: false,
  error: null,
  isRestoringSession: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.token = action.payload.token;
        state.user = mapAuthUser(action.payload);
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.token = action.payload.token;
        state.user = mapAuthUser(action.payload);
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuth = false;
        state.token = null;
        state.user = null;
        state.error = null;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(restoreSessionThunk.pending, (state) => {
        state.isLoading = true;
        state.isRestoringSession = true;
        state.error = null;
      })
      .addCase(restoreSessionThunk.fulfilled, (state, action) => {
        state.isRestoringSession = false;
        state.isLoading = false;
        state.isAuth = true;
        state.token = action.payload.token;
        state.user = mapAuthUser(action.payload.user);
        state.error = null;
      })
      .addCase(restoreSessionThunk.rejected, (state, action) => {
        state.isRestoringSession = false;
        state.isLoading = false;
        state.isAuth = false;
        state.token = null;
        state.user = null;

        if (action.payload === "No token found") {
          state.error = null;
        } else {
          state.error = action.payload as string;
        }
      });
  },
});

export default authSlice.reducer;
