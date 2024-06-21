// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import countReducer from './countSlice';
import formReducer from './formSlice';

const store = configureStore({
    reducer: {
        count: countReducer,
        form: formReducer
    }
});

export default store;
