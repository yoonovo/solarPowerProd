import { blue, green, pink } from "@mui/material/colors";

const unitTagColor: Record<string, any> = {
  kw: {
    background: blue[50],
    color: blue[700],
    border: `1px solid ${blue[100]}`,
  },
  kwh: {
    background: pink[50],
    color: pink[700],
    border: `1px solid ${pink[100]}`,
  },
  mw: {
    background: green[50],
    color: green[700],
    border: `1px solid ${green[100]}`,
  },
};

export default { unitTagColor };
