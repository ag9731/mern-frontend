import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";


export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async(credentials,{rejectWithValue}) => {
        try{
            const response = await api.post("/api/v1/create",credentials);
            return response.data.user;
        }catch{
            console.error("Registration Failed:", err.response?.data); 
            return rejectWithValue(err.response?.data || err.message);
        }
    }
)


// Forgot Password
export const forgotPassword = createAsyncThunk(
    "auth/forgotPassword",
    async(credentials,{rejectWithValue}) => {
        try{
            const response = await api.post("/api/v1/sendEmail", credentials);
            return response.data.user;
        }catch (error) {
    console.error(error);
    return rejectWithValue(error.response?.data || { message: error.message });
  }
    }
)


// Reset Password
export const resetPassword = createAsyncThunk(
    "auth/resetPassword",
    async(credentials,thunkApi) => {
        try{
            const response = await api.post(`/api/v1/reset-password/${credentials.token}`,credentials);
            return response.data.user;
        }catch (error) {
    console.error(error);
    return rejectWithValue(error.response?.data || { message: error.message });
  }
    }
)


//Login Users
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/v1/login", credentials);
      return response.data.user;
    } catch (err) {
        console.error("Login failed:", err.response?.data); 
      return rejectWithValue(err.response.data);
    }
  }
);



// Show Users
export const loadUser = createAsyncThunk(
    "auth/showUser",
    async(_, rejectWithValue) => {
        try{
            const response = await api.get("/showuser");
            return response.data;
        }catch(err){
            return rejectWithValue(err.response.data);
        }
    }
)


// logout Users
export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async(_,rejectWithValue) => {
        try{
            await app.post("/logout");
        }catch(err){
            return rejectWithValue(err.response.data);
        }
    }
)

// initial State
const initialState = {
    user:null,
    loading:true,
    isAuthenticated:false,
    error:null,
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
       clearAuthState(state){
           state.user = null;
           state.isAuthenticated = false;
           state.error = null;
           state.loading = false;
       },
    },
    extraReducer : (builder) => {
        builder
        // login
        .addcase(registerUser.pending,(state) => {
            state.loading = true,
            state.error = null
        })
        .addcase(registerUser.fulfilled,(state,action) => {
            state.user = action.payload,
            state.loading = false,
            state.isAuthenticated = true
        })
        .addcase(registerUser.rejected,(state,action) => {
            state.loading = false,
            state.error = action.payload,
            state.user = null;
            state.isAuthenticated = false
        })
        .addcase(resetPassword.pending, (state) => {
            state.loading = true,
            state.error = null
        })
        .addCase(resetPassword.fulfilled,(state,action)=>{
            state.error=null,
            state.loading = false,
            state.user = action.payload
        })
        .addcase(resetPassword.rejected,(state,action) => {
            state.loadibng = false,
            state.error = action.payload
        })
        .addcase(forgotPassword.pending,(state) => {
            state.loading = true,
            state.error = null
        })
        .addcase(forgotPassword.fulfilled, (state,action) => {
            state.loading = false,
            state.user = action.payload,
            state.isAuthenticated = true
        })
        .addcase(forgotPassword.rejected,(state,action) => {
            state.loading = false;
            state.error = action.payload;
            state.user = null;
            state.isAuthenticated = false;
        })
        .addCase(loginUser.pending,(state) => {
            state.loading = true,
            state.error = null
        })
        .addcase(loginUser.fulfilled, (state,action) => {
            state.loading = false,
            state.user = action.payload,
            state.isAuthenticated = true
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
            state.user = null;
            state.isAuthenticated = false;
        })
        .addCase(loadUser.pending,(state)=>{
            state.isAuthenticated = true,
            state.loading = true
        })
        .addCase(loadUser.fulfilled,(state,action)=>{
            state.loading = false,
            state.isAuthenticated = true,
            state.user = action.payload
            // state.error = null,
        })
        .addcase(loadUser.rejected,(state,action) => {
            state.loading = false;
            state.user = null;
            state.isAuthenticated = false;
        })
        .addcase(logoutUser.fulfilled,(state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
        })
    }
})

export const { clearAuthState } = authSlice.actions;
export default authSlice.reducer;