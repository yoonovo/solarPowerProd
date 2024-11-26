import { Box, Card, CardContent, Chip, Grid2, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import getSolarPowerProdList from "../services/getSolarPowerProdList";
import { SolarPowerProdListType } from "../types/solarPowerProdListType";
import { insertComma } from "../utils/number";
import { blue, grey } from "@mui/material/colors";

function CardContainer({ value }: { value: SolarPowerProdListType }) {
  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        width: "calc(20% - 24px)",
        height: 220,
        bgcolor: "#fff",
        borderColor: blue[100],
        boxShadow: "3px 2px 5px " + blue[50],
      }}
    >
      <CardContent>
        <Chip
          label={value.targetFac}
          variant="outlined"
          sx={{
            fontSize: "15px",
            // borderWidth: 0,
            backgroundColor: blue[50],
            color: blue[700],
            borderColor: blue[100],
          }}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            mt: 1,
            mb: 2,
          }}
        >
          {/* <Typography sx={{ fontSize: "px", fontWeight: 700 }}>
            {value.prodPeriod}
          </Typography> */}
          <Typography sx={{ fontSize: "35px", fontWeight: 700 }}>
            {insertComma(
              value.prodPeriod === "월간"
                ? String(Number(value.prodInfo) * 12)
                : value.prodInfo
            )}
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
