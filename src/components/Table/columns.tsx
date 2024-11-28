import { JSX } from "react/jsx-runtime";
import { SolarPowerProdListType } from "../../types/solarPowerProdListType";

export const columns = ({
  UnitTag,
}: {
  UnitTag: ({ prodUnit }: { prodUnit: string }) => JSX.Element;
}) => [
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
    renderCell: (v: { row: SolarPowerProdListType }) => (
      <UnitTag prodUnit={v.row.prodUnit.toLowerCase()} />
    ),
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
