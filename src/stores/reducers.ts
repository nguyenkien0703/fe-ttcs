import { combineReducers } from '@reduxjs/toolkit'
import authReducer from '@/stores/auth/slice'
import laptopListReducer from '@/stores/laptop/listSlice'
const rootReducer = combineReducers({
    auth: authReducer,
    laptopList: laptopListReducer,
})

export default rootReducer
