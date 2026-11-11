import { createSlice } from "@reduxjs/toolkit"
const initialState={
    cart:[],
}
const cartSlice=createSlice({
name:"cart",
initialState,
reducers:{
    addItem(state,action){
        state.cart.push(action.payload)
    },
   deleteItem(state, action) {
  state.cart = state.cart.filter(
    (item) => item.pizzaId !== action.payload
  );
},
increaseItem(state,action){
    const item = state.cart.find(item => item.pizzaId === action.payload);
    if (!item) return;
    item.quantity++;
    item.totalPrice = item.unitPrice * item.quantity;
},
decreaseItem(state,action){
    const item = state.cart.find(item => item.pizzaId === action.payload);
    if (!item) return;
    item.quantity--;
    item.totalPrice = item.unitPrice * item.quantity;
    if (item.quantity <= 0) {
        state.cart = state.cart.filter(cartItem => cartItem.pizzaId !== action.payload);
    }
},
    clearCart(state){
        state.cart=[]
    },
}
}
)
export const{clearCart,decreaseItem,deleteItem,increaseItem,addItem}=cartSlice.actions;
export default cartSlice.reducer;
export const getCart=state=>state.cart.cart;
export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

export const getTotalCartPtice = (state) =>
  state.cart.cart.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );
export const getCurrentQuantityById=id=>state=>state.cart.cart.find(item=>item.pizzaId===id)?.quantity??0;