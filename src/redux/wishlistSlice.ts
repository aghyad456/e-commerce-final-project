import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { WishlistResponse } from "@/interfaces";

export const getWishlist = createAsyncThunk<WishlistResponse, string>(
  "wishlist/get",
  async (token) => {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
      method: "GET",
      headers: { "token": token }
    });
    return await res.json();
  }
);

export const toggleWishlist = createAsyncThunk(
  "wishlist/toggle",
  async ({ productId, token, isExist }: { productId: string; token: string; isExist: boolean }) => {
    const url = isExist 
      ? `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`
      : "https://ecommerce.routemisr.com/api/v1/wishlist";

    await fetch(url, {
      method: isExist ? "DELETE" : "POST",
      headers: {
        "Content-Type": "application/json",
        "token": token
      },
      body: isExist ? undefined : JSON.stringify({ productId })
    });
    return { productId, isExist };
  }
);

interface WishlistState {
  items: string[];
  count: number;
}

const initialState: WishlistState = {
  items: [],
  count: 0
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWishlist.fulfilled, (state, action: PayloadAction<WishlistResponse>) => {
      if (action.payload.data) {
        state.items = action.payload.data.map((i) => i._id);
        state.count = action.payload.count || action.payload.data.length;
      }
    });
    builder.addCase(toggleWishlist.fulfilled, (state, action) => {
      if (action.payload.isExist) {
        state.items = state.items.filter(id => id !== action.payload.productId);
        state.count = Math.max(0, state.count - 1);
      } else {
        if (!state.items.includes(action.payload.productId)) {
          state.items.push(action.payload.productId);
          state.count++;
        }
      }
    });
  }
});

export default wishlistSlice.reducer;