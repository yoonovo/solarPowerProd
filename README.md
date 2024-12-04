# 시흥 태양광발전생성량 정보 조회 페이지

## 소개

- 블로그 내용 참고 (https://yoonovo.tistory.com/14)

## Tech stack

- node v22
- npm v10
- React v18
- typescript v5
- vite v5
- tanstack/react-query v5
- axios v1
- material ui v6

## Open API

- 공공데이터포탈(https://www.data.go.kr/)에서 제공하는 open api 사용

|                    API명                    |        활용기간         | 데이터포멧 |                                 설명                                  |
| :-----------------------------------------: | :---------------------: | :--------: | :-------------------------------------------------------------------: |
| `시흥도시공사_태양광발전생산정보조회서비스` | 2024-11-20 ~ 2026-11-20 |    XML     | 시흥 태양광 발전소의 생산시작일자, 종료일자, 생산주기, 생산량 등 조회 |

## 시작 가이드

```
// Git clone
git clone https://github.com/yoonovo/solarPowerProd.git
// 패키지 설치
npm install
// 프로젝트 실행 후 http://localhost:5173/ 으로 접속
npm run dev
```
