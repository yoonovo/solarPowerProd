import { useEffect, useState } from "react";
import getSolarPowerProdList from "../services/getSolarPowerProdList";
import { SolarPowerProdListType } from "../types/solarPowerProdListType";
import CardContainer from "../components/Card";

import {
  Box,
  Button,
  IconButton,
  Typography,
  ButtonGroup,
} from "@mui/material";
import { blue, grey, indigo } from "@mui/material/colors";
import GridViewSharpIcon from "@mui/icons-material/GridViewSharp";
import TableRowsSharpIcon from "@mui/icons-material/TableRowsSharp";

const mockData = [
  {
    frstRegistPnttm: "2024-05-14",
    lastRegistPnttm: "2024-05-28",
    prodEndDate: "2023-12-31",
    prodInfo: "54450",
    prodPeriod: "연간",
    prodStartDate: "2023-01-01",
    prodUnit: "kw",
    targetFac: "은계어울림센터",
  },
  {
    frstRegistPnttm: "2024-05-14",
    lastRegistPnttm: "2024-05-28",
    prodEndDate: "2023-12-31",
    prodInfo: "78550",
    prodPeriod: "연간",
    prodStartDate: "2023-01-01",
    prodUnit: "kw",
    targetFac: "abc행복학습타운 한마음관",
  },
  {
    frstRegistPnttm: "2024-05-14",
    lastRegistPnttm: "2024-05-28",
    prodEndDate: "2023-12-31",
    prodInfo: "68453",
    prodPeriod: "연간",
    prodStartDate: "2023-01-01",
    prodUnit: "kw",
    targetFac: "오이도박물관",
  },
];

function Main() {
  const [list, setList] = useState<SolarPowerProdListType[]>(mockData);
  const [msg, setMsg] = useState<string>("조회된 데이터가 없습니다.");
  const [dateOpt, setDateOtp] = useState<string>("월간");

  const { data, isLoading } = getSolarPowerProdList({
    pageIndex: 20,
    firstIndex: 0,
  });

  useEffect(() => {
    if (!data) return;
    setList(data.body ? data.body.items : mockData);
    setMsg(data.body ? "조회된 데이터가 없습니다." : data);
  }, [data]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignContent: "start",
        // alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: 70,
          background: grey[500],
        }}
      >
        <Typography variant="h4">시흥 태양광발전소 정보 조회</Typography>
      </Box>
      <Box
        sx={{
          width: "80%",
          height: 60,
          mx: "10%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography>총 {list.length} 개</Typography>
        <Box>
          <ButtonGroup size="small">
            <Button
              onClick={() => setDateOtp("연간")}
              sx={{ background: dateOpt === "연간" ? indigo[50] : "#fff" }}
            >
              연간
            </Button>
            <Button
              onClick={() => setDateOtp("월간")}
              sx={{ background: dateOpt === "월간" ? indigo[50] : "#fff" }}
            >
              월간
            </Button>
          </ButtonGroup>
          <IconButton>
            {/* 테이블로 보기 */}
            <TableRowsSharpIcon sx={{ color: blue[500] }} />
          </IconButton>
          <IconButton>
            {/* 카드형으로 보기 */}
            <GridViewSharpIcon />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          overflowY: "scroll",
          width: "calc(80% - 24px)",
          height: "calc(100vh - 178px)",
          background: grey[50],
          gap: "24px",
          py: 3,
          pl: 3,
          mx: "10%",
        }}
      >
        {list.length == 0 ? (
          <Typography>{msg}</Typography>
        ) : (
          list.map((v, i) => <CardContainer key={"card" + i} value={v} />)
        )}
      </Box>
    </Box>
  );
}

export default Main;
