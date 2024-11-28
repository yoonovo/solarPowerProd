import { blue } from "@mui/material/colors";

export default {
  cardContainer: {
    display: "flex",
    width: "calc(20% - 24px)",
    height: 220,
    bgcolor: "#fff",
    borderColor: blue[100] + "!important",
    boxShadow: `3px 2px 5px ${blue[50]}` + "!important",
  },
  tag: {
    fontSize: "15px",
    backgroundColor: blue[50],
    color: blue[700],
    borderColor: blue[100],
  },
  prodBox: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    mt: 1,
    mb: 2,
  },
};
