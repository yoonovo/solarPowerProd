import { useEffect, useMemo, useState } from "react";
import getSolarPowerProdList from "../services/getSolarPowerProdList";
import { SolarPowerProdListType } from "../types/solarPowerProdListType";
import CardContainer from "../components/Card";
import Table from "../components/Table";
import { insertComma } from "../utils/number";

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
    id: 1,
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
    id: 2,
    frstRegistPnttm: "2024-05-14",
    lastRegistPnttm: "2024-05-28",
    prodEndDate: "2023-12-31",
    prodInfo: "78550",
    prodPeriod: "연간",
    prodStartDate: "2023-01-01",
    prodUnit: "kwh",
    targetFac: "abc행복학습타운 한마음관",
  },
  {
    id: 3,
    frstRegistPnttm: "2024-05-14",
    lastRegistPnttm: "2024-05-28",
    prodEndDate: "2023-12-31",
    prodInfo: "68453",
    prodPeriod: "연간",
    prodStartDate: "2023-01-01",
    prodUnit: "mw",
    targetFac: "오이도박물관",
  },
];

function Main() {
  const [msg, setMsg] = useState<string>("조회된 데이터가 없습니다.");
  const [dateOpt, setDateOpt] = useState<"월간" | "연간">("월간");
  const [listTypeOpt, setListTypeOpt] = useState<"카드형" | "테이블형">(
    "테이블형"
  );

  const { data } = getSolarPowerProdList({
    pageIndex: 20,
    firstIndex: 0,
  });

  const list = useMemo(() => {
    if (!data || !data.body) return [...mockData];

    const { items } = data.body;
    return items.map((v: SolarPowerProdListType, i: number) => {
      let result = "";
      switch (true) {
        case dateOpt === "월간" && v.prodPeriod === "연간":
          result = String(Math.round(Number(v.prodInfo) / 12));
          break;
        case dateOpt === "연간" && v.prodPeriod === "월간":
          result = String(Number(v.prodInfo) * 12);
          break;
        default:
          result = v.prodInfo;
          break;
      }
      return { ...v, prodInfo: insertComma(result), id: i + 1 };
    });
  }, [data, dateOpt]);

  useEffect(() => {
    if (!data) return;
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
              onClick={() => setDateOpt("연간")}
              sx={{ background: dateOpt === "연간" ? indigo[50] : "#fff" }}
            >
              연간
            </Button>
            <Button
              onClick={() => setDateOpt("월간")}
              sx={{ background: dateOpt === "월간" ? indigo[50] : "#fff" }}
            >
              월간
            </Button>
          </ButtonGroup>
          <IconButton onClick={() => setListTypeOpt("테이블형")}>
            <TableRowsSharpIcon
              sx={{ color: listTypeOpt === "테이블형" ? blue[500] : grey[500] }}
            />
          </IconButton>
          <IconButton onClick={() => setListTypeOpt("카드형")}>
            <GridViewSharpIcon
              sx={{ color: listTypeOpt === "카드형" ? blue[500] : grey[500] }}
            />
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
        {listTypeOpt === "카드형" ? (
          list.length == 0 ? (
            <Typography>{msg}</Typography>
          ) : (
            list.map((v: SolarPowerProdListType, i: number) => (
              <CardContainer key={"card" + i} value={v} />
            ))
          )
        ) : (
          <Table list={list} />
        )}
      </Box>
    </Box>
  );
}

export default Main;
