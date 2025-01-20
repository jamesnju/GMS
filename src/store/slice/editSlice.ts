import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of the editData if known, otherwise use a generic type
interface EditData {
  id: number;
  name: string;
  // Add other fields as necessary
}

// Initialize the state
interface EditState {
  editData: EditData | null;
  isOpen: boolean;
  active: string;
}

const initialState: EditState = {
  editData: null, //initially it's null
  isOpen: false,
  active: "",
};

// Create slice
const editSlice = createSlice({
  name: "edit",
  initialState,
  reducers: {
    // Set items to be edited
    seteditData(state, action: PayloadAction<EditData>) {
      state.editData = action.payload;
    },
    // Clear the edited data when done
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
    setActive: (state, action: PayloadAction<string>) =>{
      state.active = action.payload;
    },
  },
});

export const { seteditData, cleareditData, toggleEdit, setActive } =
  editSlice.actions;
export default editSlice.reducer;