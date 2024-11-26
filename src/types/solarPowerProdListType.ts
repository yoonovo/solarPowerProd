type SolarPowerProdListType = {
  targetFac: string;
  prodPeriod: string;
  prodInfo: string;
  prodUnit: string;
  prodStartDate: string;
  prodEndDate: string;
  frstRegistPnttm: string;
  lastRegistPnttm: string;
};

type GetSolarPowerProdListParams = {
  pageIndex: number;
  firstIndex: number;
};

export type { SolarPowerProdListType, GetSolarPowerProdListParams };
