import { createSlice, PayloadAction } from "@reduxjs/toolkit";



type appState = {
    isMouseEnter: boolean;
    searchValue: string;
    sortValue: string;
    selectValue: string;
    currentRepositoryId: string | null | undefined; 
}

const initialState: appState = {
    isMouseEnter: false,
    searchValue: '',
    sortValue: '',
    selectValue: '10',
    currentRepositoryId: null
}


const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
          doMouseEnterTrue(state) {
            state.isMouseEnter = true;
          },
          doMouseEnterFalse(state) {
            state.isMouseEnter = false;
          },
          addSearchValue(state, action: PayloadAction<string>){
            state.searchValue = action.payload;
          },
          addSortValue(state, action: PayloadAction<string>){
            state.sortValue = action.payload;
          },
          addSelectValue(state, action: PayloadAction<string>){
            state.selectValue = action.payload;
          },
          addCurrentRepositoryId(state, action: PayloadAction<string | null | undefined>){
            state.currentRepositoryId = action.payload;
          }
    },
  });






export const { doMouseEnterTrue, doMouseEnterFalse, addSearchValue, addSelectValue, addCurrentRepositoryId } = appSlice.actions;

export default appSlice.reducer;