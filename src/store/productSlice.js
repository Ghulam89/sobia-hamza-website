import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    productData: [],
    favoriteData: [],
    allProducts: [],
    userInfo: null,
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingProduct = state.productData.find(
                (item) => item._id === action.payload._id
            );
            if (existingProduct) {
                existingProduct.quantity += action.payload.quantity;
            } else {
                state.productData.push(action.payload);
            }
        },
        addToFavorite: (state, action) => {
            const existingProduct = state.favoriteData.find(
                (item) => item._id === action.payload._id
            );
            if (existingProduct) {
                existingProduct.quantity += action.payload.quantity;
            } else {
                state.favoriteData.push(action.payload);
            }
        },
        increaseQuantity: (state, action) => {
            const existingProduct = state.productData.find(
                (item) => item._id === action.payload._id
            );
            if (existingProduct) {
                existingProduct.quantity++;
            }
        },
        decreaseQuantity: (state, action) => {
            const existingProduct = state.productData.find(
                (item) => item._id === action.payload._id
            );
            if (existingProduct) {
                if (existingProduct.quantity > 1) {
                    existingProduct.quantity--;
                } else {
                    existingProduct.quantity = 1;
                }
            }
        },
        deleteProduct: (state, action) => {
            state.productData = state.productData.filter(
                (item) => item._id !== action.payload
            );
        },
        resetCart: (state) => {
            state.productData = [];
        },
        addUser: (state, action) => {
            state.userInfo = action.payload;
        },
        removeUser: (state) => {
            state.userInfo = null;
        },
        setAllProducts: (state, action) => {
            state.allProducts = action.payload;
        },
    },
});

export const {
    addToCart,
    addToFavorite,
    increaseQuantity,
    decreaseQuantity,
    deleteProduct,
    resetCart,
    addUser,
    removeUser,
    setAllProducts,
} = productSlice.actions;

export default productSlice.reducer;
