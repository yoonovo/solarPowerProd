import styled from "styled-components";
import { Box } from "@mui/material";
import { blue, grey, indigo } from "@mui/material/colors";

const MainBox = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignContent: "start",
});

const HeaderBox = styled(Box)({
  display: "flex",
  width: "100%",
  height: 70,
  background: blue[500],
  alignItems: "center",
  gap: "10px",
});

const SubContentsBox = styled(Box)({
  display: "flex",
  width: "80%",
  height: 60,
  margin: "0 10%",
  justifyContent: "space-between",
  alignItems: "center",
});

const DataContentsBox = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  overflowY: "scroll",
  width: "calc(80% - 24px)",
  height: "calc(100vh - 178px)",
  background: grey[50],
  gap: "24px",
  padding: "24px 0 24px 24px",
  margin: "0 10%",
});

export default {
  MainBox,
  HeaderBox,
  SubContentsBox,
  DataContentsBox,
  sunIcon: {
    color: "#fff",
    fontSize: "50px",
    marginLeft: "10%",
  },
  headerTitle: {
    color: "#fff",
    fontWeight: 700,
    fontSize: "30px",
  },
  activeIcon: (type: string, curType: string) => ({
    color: type === curType ? blue[500] : grey[500],
  }),
  activeButtonGroup: (type: string, curType: string) => ({
    background: type === curType ? indigo[50] : "#fff",
  }),
};
