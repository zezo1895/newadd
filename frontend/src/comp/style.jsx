import { cyan, teal } from "@mui/material/colors";

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          stander: {
            main: teal[500],
          },
          hover: {
            main: cyan[500],
          },
        }
      : {
          // palette values for dark mode
          stander: {
            main: cyan[500],
          },
          hover: {
            main: teal[500],
          },
        }),
  },
});
export default getDesignTokens ;