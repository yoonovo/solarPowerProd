import { SolarPowerProdListType } from "../types/solarPowerProdListType";

import { Chip } from "@mui/material";
import { blue, green, pink } from "@mui/material/colors";
import { DataGrid } from "@mui/x-data-grid";

const unitColor: Record<string, any> = {
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

const columns = [
  { field: "id", headerName: "ID", flex: 0.5 },
  {
    field: "targetFac",
    headerName: "발전소명",
    flex: 2,
  },
  {
    field: "prodInfo",
    headerName: "생산량",
    flex: 1,
  },
  {
    field: "prodUnit",
    headerName: "단위",
    flex: 0.7,
    renderCell: (v: { row: SolarPowerProdListType }) => {
      return (
        <Chip
          size="small"
          label={v.row.prodUnit.toLowerCase()}
          sx={unitColor[v.row.prodUnit.toLowerCase()]}
        />
      );
    },
  },
  {
    field: "prodStartDate",
    headerName: "생산시작일자",
    flex: 1,
  },
  {
    field: "prodEndDate",
    headerName: "생산종료일자",
    flex: 1,
  },
  {
    field: "frstRegistPnttm",
    headerName: "등록일자",
    flex: 1,
  },
  {
    field: "lastRegistPnttm",
    headerName: "수정일자",
    flex: 1,
  },
];

function Table({ list }: { list: SolarPowerProdListType[] }) {
  return <DataGrid rows={list} columns={columns} />;
}

export default Table;
