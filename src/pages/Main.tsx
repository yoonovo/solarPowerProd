import { Box, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import getSolarPowerProdList from "../services/getSolarPowerProdList";
import { SolarPowerProdListType } from "../types/solarPowerProdListType";

function Main() {
  const [list, setList] = useState<SolarPowerProdListType[]>([]);
  const { data } = getSolarPowerProdList({
    pageIndex: 20,
    firstIndex: 0,
  });

  useEffect(() => {
    data && setList(data.body.items);
  }, [data]);

  return (
    <Box
      sx={{
        width: "80%",
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        margin: "auto",
      }}
    >
      {list.length == 0 ? (
        <Typography>조회된 데이터가 없습니다.</Typography>
      ) : (
        list.map((v, i) => (
          <Card
            key={"card" + i}
            variant="outlined"
            sx={{ display: "flex", width: "calc(20% - 20px)", height: 300 }}
          >
            <CardContent>
              <Typography variant="h5">{v.targetFac}</Typography>
              <Typography>생산주기 : {v.prodPeriod}</Typography>
              <Typography>
                생산량 : {v.prodInfo} ({v.prodUnit})
              </Typography>
              <Typography>
                생산기간 : {v.prodStartDate} ~ {v.prodEndDate}
              </Typography>
              <Typography>등록일자 : {v.frstRegistPnttm}</Typography>
              <Typography>수정일자 : {v.lastRegistPnttm}</Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
}

export default Main;
