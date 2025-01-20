import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface Items {
//   name: string;
//   isOpen:boolean;
//   active:string;
// }
//initialize the state
interface EditState {
  editData: {} | null;
  isOpen: boolean;
  active: "";
}

const initialState: EditState = {
  editData: {}, //initially its null
  isOpen: false,
  active: "",
};
//create slice

const editSlice = createSlice({
  name: "edit",
  initialState,
  reducers: {
    //set items to be editted
    seteditData(state, action) {
      state.editData = action.payload;
    },
    //clear the edited when done
    cleareditData(state) {
      state.editData = null;
    },
    // Edit item by updating its values
    // editItem(state, action) {
    //   if (state.editData && state.editData.id === action.payload.id) {
    //     state.editData = action.payload;
    //   }
    // },
    toggleEdit: (state) => {
      state.isOpen = !state.isOpen;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const { seteditData, cleareditData, toggleEdit, setActive } =
  editSlice.actions;
export default editSlice.reducer;
