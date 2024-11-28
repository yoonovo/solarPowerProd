import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  Grid2,
  Typography,
} from "@mui/material";
import { SolarPowerProdListType } from "../../types/solarPowerProdListType";
import S from "./cards.css";

function Cards({ list }: { list: SolarPowerProdListType[] }) {
  return list.length == 0 ? (
    <Alert severity="info" sx={{ width: "100%", height: 40 }}>
      조회된 데이터가 없습니다.
    </Alert>
  ) : (
    list.map((value: SolarPowerProdListType) => (
      <Card
        key={`${value.targetFac}_${value.id}`}
        variant="outlined"
        sx={S.cardContainer}
      >
        <CardContent>
          <Chip label={value.targetFac} variant="outlined" sx={S.tag} />
          <Box sx={S.prodBox}>
            <Typography sx={{ fontSize: "35px", fontWeight: 700 }}>
              {value.prodInfo}
            </Typography>
            <Typography sx={{ fontSize: "20px", fontWeight: 700 }}>
              ({value.prodUnit})
            </Typography>
          </Box>
          <Grid2 container sx={{ fontSize: "12px", color: "gray" }}>
            <Grid2 size={4}>생산기간</Grid2>
            <Grid2 size={8}>
              {value.prodStartDate}
              <br /> ~ {value.prodEndDate}
            </Grid2>
            <Grid2 size={4}>등록일자</Grid2>
            <Grid2 size={8}>{value.frstRegistPnttm}</Grid2>
            <Grid2 size={4}>수정일자</Grid2>
            <Grid2 size={8}>{value.lastRegistPnttm}</Grid2>
          </Grid2>
        </CardContent>
      </Card>
    ))
  );
}

export default Cards;
