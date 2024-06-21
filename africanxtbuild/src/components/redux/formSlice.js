// // src/redux/formSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//     step: 1,
//     formData: {}
// };

// const formSlice = createSlice({
//     name: 'form',
//     initialState,
//     reducers: {
//         nextStep: (state) => {
//             state.step += 1;
//         },
//         prevStep: (state) => {
//             state.step -= 1;
//         },
//         setFormData: (state, action) => {
//             state.formData = { ...state.formData, ...action.payload };
//         }
//     }
// });

// export const { nextStep, prevStep, setFormData } = formSlice.actions;
// export default formSlice.reducer;
// src/redux/formSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    step: 1,
    formData: {}
};

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        nextStep: (state) => {
            state.step += 1;
        },
        prevStep: (state) => {
            state.step -= 1;
        },
        setFormData: (state, action) => {
            state.formData = { ...state.formData, ...action.payload };
        }
    }
});

export const { nextStep, prevStep, setFormData } = formSlice.actions;
export default formSlice.reducer;
