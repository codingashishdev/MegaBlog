import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: []
};

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        allPosts: (state, action) => {
            state.posts = action.payload.posts
        },
        
        addPost: (state, action) => {
            state.posts.push(action.payload)
        },

        updatePost: (state, action) => {
            const existingPost = state.posts.findIndex((post) => post.$id === action.payload.$id)
            if(existingPost != -1){
                state.posts[existingPost] = action.payload
            }
        },

        removePost: (state, action) => {
            return state.posts.filter((post) => post.$id !== action.payload)
        },
    },
});

export const { allPosts, addPost, updatePost, removePost } = postSlice.actions;
export default postSlice.reducer;
