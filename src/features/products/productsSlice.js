import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import app from "../../api/axios";


exports.viewProducts = createAsyncThunk(
    "products/showProducts",
    async(_, { rejectWithValue }) => {
        const response = await app.get("/products");
        return response.data;
    }
)

const initialState = {
    products:null,
    loading:true,
    error:null,
}

const productSlice = createSlice({
    name:"products",
    initialState,
    reducers:{
         clearAuthState(state){
           state.products= null;
           state.loading = false;
           state.error = null;
       },
    },
    extraReducers : (builder) => {
        builder
        .addCase(viewProducts.pending,(state)=>{
            state.loading = true;
            state.products = null;
        })
        .addCase(viewProducts.fullfilled, (state,action)=>{
            state.loading = false;
            state.products = action.payload;
        })
        .addCase(viewProducts.rejected,(state,action) => {
            state.loading = false;
            state.error = action.payload.error
        })
    }
})