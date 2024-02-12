import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [], // Array of posts initially empty
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload); // Use spread syntax for immutability
    },
    updatePost: (state, action) => {
      state.posts= state.posts.map(post=>{
        if(post.$id==action.payload.$id){
            return action.payload
        }
        return post
      })
    },
    removePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.$id !== action.payload); // Efficiently filter and assign using spread syntax
    },
    initPosts: (state, action) => {
      if (action.payload) {
        state.posts = action.payload; // Ensure action.payload is valid before assigning
      } else {
        console.warn("initPosts action payload is missing or invalid.");
      }
    },
  },
});

export default postSlice.reducer;
export const { addPost, removePost, initPosts ,updatePost} = postSlice.actions;
