import { getAddress } from "../../services/apiGeocoding";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const fetchAddress=createAsyncThunk("user/fetchAddress",async function(){
      // 1) We get the user's geolocation position
  const positionObj = await getPosition();
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

  // 3) Then we return an object with the data that we are interested in
  return { position, address };
})
const initialState = {
  username: "",
  status:"idle",
  position:{},
  address:"",
  errors:"",
}
const userSlice=createSlice({
  name:"user",
  initialState:initialState,
  reducers:{
  updateName(state,action){
    state.username=action.payload;
  },
  
},
extraReducers:(bulider)=>bulider.addCase(fetchAddress.pending,(state)=>{state.status="loading";
  state.errors="";
}).addCase(fetchAddress.fulfilled,(state, action)=>{
  state.position=action.payload.position;
  state.address=action.payload.address;
  state.status="idle";
  state.errors="";
}).
addCase(fetchAddress.rejected,(state,action)=>{
  state.status="error";
  state.errors=action.error.message || "Unable to get your location. Check your browser's location permissions and try again.";
})
})
export const {updateName}=userSlice.actions;
export default userSlice.reducer;
