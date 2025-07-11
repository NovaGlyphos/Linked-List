import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name:'feed',
    initialState:null,
    reducers:{
        addFeed:(state,action) => {
            return action.payload
        },
        removeUserFromFeed:(state,action) => {
            //existing state is feed
            const newFeed = state.filter((user) => user._id !== action.payload);
            //action.payload is the id that we will be sending
            return newFeed;
        },
        clearFeed:()=>null
    }
});

export const {addFeed,removeUserFromFeed,clearFeed} = feedSlice.actions
export default feedSlice.reducer