import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  registerUser, 
  loginUser, 
  getCurrentUser, 
  updateProfile,
  logout 
} from '../services/authAPI';

// Async thunks
export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerUser(userData);
      // Save token and user
      localStorage.setItem('access_token', response.access_token);
      const user = await getCurrentUser();
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error) {
      return rejectWithValue(error.detail || 'Registration failed');
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await loginUser(credentials);
      // Save token
      localStorage.setItem('access_token', response.access_token);
      // Fetch user data
      const user = await getCurrentUser();
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error) {
      return rejectWithValue(error.detail || 'Login failed');
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const user = await getCurrentUser();
      return user;
    } catch (error) {
      return rejectWithValue(error.detail || 'Failed to fetch user');
    }
  }
);

export const updateProfileAsync = createAsyncThunk(
  'auth/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await updateProfile(profileData);
      // Update stored user
      localStorage.setItem('user', JSON.stringify(response));
      return response;
    } catch (error) {
      return rejectWithValue(error.detail || 'Failed to update profile');
    }
  }
);

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('access_token') || null,
  isLoading: false,
  isAuthenticated: !!localStorage.getItem('access_token'),
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      logout();
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Register
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch Current User
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      // Update Profile
      .addCase(updateProfileAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProfileAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updateProfileAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout: logoutAction, clearError } = authSlice.actions;
export default authSlice.reducer;