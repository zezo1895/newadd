import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newadd: localStorage.getItem("selected")
    ? JSON.parse(localStorage.getItem("selected"))
    : [],
  aboutid: localStorage.getItem("selectedid")
    ? JSON.parse(localStorage.getItem("selectedid"))
    : [],
};

export const counterSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addtocart: (state, action) => {
      // console.log(action.payload.id)
      if (!state.newadd.some((item) => item.id === action.payload.id)) {
        console.log("جديد");
        state.newadd.push({ ...action.payload, quant: 1 });
        state.aboutid.push(action.payload.id);
        localStorage.setItem("selected", JSON.stringify(state.newadd));
        localStorage.setItem("selectedid", JSON.stringify(state.aboutid));
      }
    },
    incrementByAmount: (state, action) => {
      const pro = state.newadd.find((item) => {
        return item.id === action.payload.id;
      });
      pro.quant += 1;
      console.log(pro.quant);
      localStorage.setItem("selected", JSON.stringify(state.newadd));
    },
    decrementByAmount: (state, action) => {
      const pro = state.newadd.find((item) => {
        return item.id === action.payload.id;
      });
      pro.quant -= 1;
      if (pro.quant === 0) {
        const newarrr = state.newadd.filter((item) => {
          return item.id !== action.payload.id;
        });
        state.newadd = newarrr;
        const newarrr2 = state.aboutid.filter((item) => {
          return item !== action.payload.id;
        });

        state.aboutid = newarrr2;

        localStorage.setItem("selectedid", JSON.stringify(state.aboutid));
      }
      localStorage.setItem("selected", JSON.stringify(state.newadd));
    },
    deletee: (state, action) => {
      const newarrr = state.newadd.filter((item) => {
        return item.id !== action.payload.id;
      });
      const newarrr2 = state.aboutid.filter((item) => {
        return item !== action.payload.id;
      });
      state.newadd = newarrr;
      state.aboutid = newarrr2;
      localStorage.setItem("selectedid", JSON.stringify(state.aboutid));

      localStorage.setItem("selected", JSON.stringify(state.newadd));
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addtocart,
  morequant,
  minsquant,
  incrementByAmount,
  decrementByAmount,
  addname,
  deletee,
} = counterSlice.actions;

export default counterSlice.reducer;
