import { Box, Card, CardContent, Chip, Grid2, Typography } from "@mui/material";
import { SolarPowerProdListType } from "../../types/solarPowerProdListType";
import S from "./card.css";

function CardContainer({ value }: { value: SolarPowerProdListType }) {
  return (
    <Card variant="outlined" sx={S.cardContainer}>
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
  );
}

export default CardContainer;
