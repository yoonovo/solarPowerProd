import { useMemo, useState } from "react";
import getSolarPowerProdList from "../../services/getSolarPowerProdList";
import { SolarPowerProdListType } from "../../types/solarPowerProdListType";
import CardContainer from "../../components/Card/Card";
import Table from "../../components/Table/Table";
import { insertComma } from "../../utils/number";
import S from "./main.css";

import {
  Box,
  Button,
  IconButton,
  Typography,
  ButtonGroup,
  Alert,
} from "@mui/material";
import GridViewSharpIcon from "@mui/icons-material/GridViewSharp";
import TableRowsSharpIcon from "@mui/icons-material/TableRowsSharp";
import LightModeIcon from "@mui/icons-material/LightMode";

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
  const [isData, setIsData] = useState<boolean>(false);
  const [dateOpt, setDateOpt] = useState<"월간" | "연간">("월간");
  const [listTypeOpt, setListTypeOpt] = useState<"카드형" | "테이블형">(
    "테이블형"
  );

  const { data } = getSolarPowerProdList({
    pageIndex: 100,
    firstIndex: 0,
  });

  const list = useMemo(() => {
    setIsData(data && data.body);
    const items = data && data.body ? data.body.items : mockData;
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

  return (
    <S.MainBox>
      <S.HeaderBox>
        <LightModeIcon sx={S.sunIcon} />
        <Typography sx={S.headerTitle}>시흥 태양광발전소 정보 조회</Typography>
      </S.HeaderBox>
      <S.SubContentsBox>
        <Typography color="textSecondary">
          {!isData &&
            "※ 공공데이터포탈 서비스 요청제한 횟수가 초과되어 임시 데이터로 대신 출력합니다."}
        </Typography>
        <Box>
          <ButtonGroup size="small">
            <Button
              onClick={() => setDateOpt("연간")}
              sx={S.activeButtonGroup(dateOpt, "연간")}
            >
              연간
            </Button>
            <Button
              onClick={() => setDateOpt("월간")}
              sx={S.activeButtonGroup(dateOpt, "월간")}
            >
              월간
            </Button>
          </ButtonGroup>
          <IconButton onClick={() => setListTypeOpt("테이블형")}>
            <TableRowsSharpIcon sx={S.activeIcon(listTypeOpt, "테이블형")} />
          </IconButton>
          <IconButton onClick={() => setListTypeOpt("카드형")}>
            <GridViewSharpIcon sx={S.activeIcon(listTypeOpt, "카드형")} />
          </IconButton>
        </Box>
      </S.SubContentsBox>
      <S.DataContentsBox>
        {listTypeOpt === "카드형" ? (
          list.length == 0 ? (
            <Alert severity="info" sx={{ width: "100%", height: 40 }}>
              조회된 데이터가 없습니다.
            </Alert>
          ) : (
            list.map((v: SolarPowerProdListType, i: number) => (
              <CardContainer key={"card" + i} value={v} />
            ))
          )
        ) : (
          <Table list={list} />
        )}
      </S.DataContentsBox>
    </S.MainBox>
  );
}

export default Main;
