import { combineReducers } from '@reduxjs/toolkit'
import authReducer from '@/stores/auth/slice'
import laptopListReducer from '@/stores/laptop/listSlice'
import laptopDetailReducer from '@/stores/laptop/detailSlice'
import userDetailReducer from '@/stores/user/detailSlice'
import commentLaptopReducer from '@/stores/comment/listSlice'
import signUpReducer from '@/stores/auth/registerSlice'
import createCommentReducer from '@/stores/comment/createSlice'
const rootReducer = combineReducers({
    auth: authReducer,
    laptopList: laptopListReducer,
    laptopDetail: laptopDetailReducer,
    commentLaptop: commentLaptopReducer,
    userDetail: userDetailReducer,
    signUp: signUpReducer,
    createComment: createCommentReducer,
})

export default rootReducer
