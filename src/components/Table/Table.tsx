import { SolarPowerProdListType } from "../../types/solarPowerProdListType";
import { Chip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import S from "./table.css";
import { columns } from "./columns";

function UnitTag({ prodUnit }: { prodUnit: string }) {
  return <Chip size="small" label={prodUnit} sx={S.unitTagColor[prodUnit]} />;
}

function Table({ list }: { list: SolarPowerProdListType[] }) {
  return <DataGrid rows={list} columns={columns({ UnitTag })} />;
}

export default Table;
