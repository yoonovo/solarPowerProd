import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { xml2json } from "xml-js";
import { GetSolarPowerProdListParams } from "../types/solarPowerProdListType";

const BASE_URL = "https://apis.data.go.kr";
const AUTH_KEY =
  "0Z6THCbSm4r3vTId92HN+7GWt8j4x1Gc2/zfzDbmbELmaQcuCsouinxnhl9lNnLE6WaMT8QHLNZxX9PsCbCAcg==";

// xml-js로 바꾼 json을 간소화
const setSimpleToJson = (
  arrFrom: string[],
  { elements }: { elements: any }
) => {
  return !elements[0].text
    ? elements.reduce((tot: Record<string, any>, el: any) => {
        tot[el.name] = arrFrom.includes(el.name) // items는 배열로 표시해야 함으로 예외처리
          ? el.elements.map((v: any) => setSimpleToJson(arrFrom, v))
          : setSimpleToJson(arrFrom, el);
        return tot;
      }, {})
    : elements[0].text;
};

// 공공데이터포탈 open api - 태양광발전생산정보조회서비스(시흥)
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

      const list = setSimpleToJson(["items"], JSON.parse(xml).elements[0]);
      let result;
      if (list.body) {
        result = list;
      } else {
        switch (list.cmmMsgHeader.returnAuthMsg) {
          case "LIMITED_NUMBER_OF_SERVICE_REQUESTS_EXCEEDS_ERROR":
            result =
              "요청 가능한 횟수를 초과 했습니다. 조금 뒤 다시 시도해주세요.";
            break;
        }
      }

      return result;
    })
    .catch((err) => {
      console.log(err);
    });

const useSolarPowerProdList = (params: GetSolarPowerProdListParams) =>
  useQuery({
    queryKey: ["getSolarPowerProdList", params],
    queryFn: () => getSolarPowerProdList(params),
  });

export default useSolarPowerProdList;
