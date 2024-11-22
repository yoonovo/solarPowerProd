import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { xml2json } from "xml-js";
import { GetSolarPowerProdListParams } from "../types/solarPowerProdListType";

const BASE_URL = "https://apis.data.go.kr";
const AUTH_KEY =
  "0Z6THCbSm4r3vTId92HN+7GWt8j4x1Gc2/zfzDbmbELmaQcuCsouinxnhl9lNnLE6WaMT8QHLNZxX9PsCbCAcg==";

const setSimpleToJson = ({ elements }: { elements: any }) => {
  return !elements[0].text
    ? elements.reduce((tot, el) => {
        tot[el.name] =
          el.name === "items" // items는 배열로 표시해야 함으로 예외처리
            ? el.elements.map((v) => setSimpleToJson(v))
            : setSimpleToJson(el);
        return tot;
      }, {})
    : elements[0].text;
};

const getSolarPowerProdList = (params: GetSolarPowerProdListParams) =>
  axios
    .get(
      `${BASE_URL}/B554066/GetSolarPowerProdListService/getSolarPowerProdListInfo`,
      {
        params: {
          serviceKey: AUTH_KEY,
          dataType: "XML",
          ...params,
        },
      }
    )
    .then(({ data }) => {
      const xml = xml2json(data, {
        compact: false,
        ignoreComment: true,
        spaces: 4,
      });

      return setSimpleToJson(JSON.parse(xml).elements[0]);
    });

const useSolarPowerProdList = (params: GetSolarPowerProdListParams) =>
  useQuery({
    queryKey: ["getSolarPowerProdList"],
    queryFn: () => getSolarPowerProdList(params),
  });

export default useSolarPowerProdList;
