# 🚘 TMI-Nexon

넥슨 카트라이더 API를 활용하여 TMI 서비스의 기능을 일부 구현한 서비스입니다.
## [배포 사이트](https://nexon-tmi-yeyo.netlify.app)

### 실행 방법

1. `git clone https://github.com/ye-yo/wanted-codestates-project-2.git`
2. `npm install`
3. `npm run start`

`\* API Key는 환경변수로 추가가 필요합니다.`


## 🔨 사용한 기술 스택

<img src="https://img.shields.io/badge/React-61DAFB.svg?&style=for-the-badge&logo=React&logoColor=000"/> <img src="https://img.shields.io/badge/Typescript-1255bb.svg?&style=for-the-badge&logo=typescript&logoColor=fff"/> <img src="https://img.shields.io/badge/Redux-7248B6.svg?&style=for-the-badge&logo=Redux&logoColor=fff"/> <img src="https://img.shields.io/badge/Redux Toolkit-7248B6.svg?&style=for-the-badge&logo=Redux&logoColor=fff"/> <img src="https://img.shields.io/badge/Styled Components-E6526F.svg?&style=for-the-badge&logo=StyledComponents&logoColor=fff"/>
> 가장 익숙한 **React** 프레임워크, 지난번 프로젝트 때 처음 사용해보았던 **Typescript**, 한 번 만들어두면 편한 **Redux, Redux toolkit**, 가장 좋아하는 **styled-components**를 사용하여 프로젝트를 진행했습니다!. Typescript는 코드에 대한 이해도가 높아지는 것이 장점으로 느껴져 다시 한 번 적용하게 되었고, Redux는 복잡하지만 한 번 만들어두면 사용에 있어서는 편리하다는 점이 좋았으며, 복잡한 생성 단계를 간소화하는 Redux toolkit을 사용하여 아쉬운 점을 보완하였습니다. 마지막으로 styled-components는 벤더 프리픽스 지원 뿐만아니라 extends 등의 유용한 기능을 제공하고 실제로도 사용하면서 편리함을 느꼈었기 때문에 선택하였습니다!

## 프로젝트 구조

```
--📁 src
  ---📁 components ➡ 컴포넌트 폴더
  ---📁 constants ➡ 전역 상수 폴더
  ---📁 datas ➡ 데이터 폴더
  ---📁 hooks ➡ custom hooks 폴더
  ---📁 interfaces ➡ interface 정의 폴더
  ---📁 pages ➡ 페이지 컴포넌트 폴더
  ---📁 services ➡ redux toolkit asyncThunk 폴더
  ---📁 store ➡ store폴더
  ---📁 styles ➡ 스타일 관련 파일 폴더
  ---📁 utils ➡ 모듈화된 함수 폴더
  ---📁 styles ➡ 스타일 관련 파일 폴더
```
---

## 구현 기능 요약

## * 필수 구현 항목

> 1. 개인 전적 조회 페이지를 비롯한 1개 이상의 추가 페이지 개발 
**검색 페이지, 개인 전적 조회 페이지**
> 2. 페이지 이동과 닉네임 검색이 가능한 상단 메뉴바 **Menu, SearchBar**
> 3. 두 종류 이상의 그래프 포함 **라인, 도넛, 프로그레스바**
> 4. 다섯 종류 이상의 애니메이션 포함 **move, rotate, gradient, fadeUp, skeleton 등**
> 5. 하나 이상의 vanila script로 만들어진 모듈 구현 **utils/ 하위에 위치한 대부분이 모듈화된 함수**
<br></br>

## 구현 기능 상세

### --- 검색 페이지(HOME) ----
### 1. 상단 메뉴바
<img width="1044" alt="스크린샷 2022-03-26 오전 1 23 38" src="https://user-images.githubusercontent.com/50618754/160161086-4a2bec49-1738-4362-893c-b10e05dad5b2.png">
<img width="1009" alt="스크린샷 2022-03-26 오전 1 23 20" src="https://user-images.githubusercontent.com/50618754/160161095-db016309-638f-4a57-826f-2c9d2998314a.png">

페이지 이동 및 검색이 가능한 메뉴바를 구현하였습니다. 검색창은 메인 검색창이 존재하는 홈 페이지를 제외한 나머지 페이지에서만 나타납니다.
메뉴 클릭 시 페이지 이동이 가능하나 랭크 페이지는 구현되어 있지 않습니다.


### 2. 검색창
![화면 기록 2022-03-26 오전 12 27 47](https://user-images.githubusercontent.com/50618754/160171177-84a97efb-52d0-4ec4-a155-320a31651873.gif)

검색창은 검색어를 입력할 때마다 추천 검색어를 자동 완성 시켜주며, 검색 시에는 자음 입력 시에도 검색어를 찾도록 퍼지 검색 기능을 구현하여 적용했습니다.
또한 컴포넌트로 만들어 두고 상단 메뉴바에서 재사용했으며, 상단 메뉴바에서 사용시에는 props로 작은 크기의 검색창인지 전달하여 스타일을 변경시켜주었습니다.

### --- 개인 전적 조회 페이지(UserPage) ---

전적 페이지는 API 데이터를 활용하여 구현이 가능한 부분을 구현하였습니다.

### 1. 유저 프로필
<img width="1034" alt="스크린샷 2022-03-26 오전 12 28 27" src="https://user-images.githubusercontent.com/50618754/160151142-499fcdb5-5f0d-4913-8fb4-9ecf2de7eb79.png">

- 유저 프로필 영역 : `/users/${access_id}`를 통해 유저 정보 획득.
- 최근 업데이트 일자 : 데이터 업데이트 시/전적 갱신 버튼 클릭 시 갱신되며 1분마다 최근 업데이트 시간이 업데이트됩니다.
- 그 외 신고하기, 공유하기, 프로필 저장 버튼은 구현을 고려하였으나 시간관계상 구현하지 못했습니다.

### 2. 차트 및 보드 영역
<img width="1040" alt="스크린샷 2022-03-26 오전 12 55 33" src="https://user-images.githubusercontent.com/50618754/160157160-c61c707d-3d39-4d18-860e-07b92c0604fe.png">

기존 사이트의 레이아웃 및 차트 구성에서 약간 수정하여 구현하였습니다. 종합 전적에는 비율만으로 데이터를 구성하고 전,승,패 데이터는 좀 더 한눈에 들어올 수 있도록 따로 분리하였습니다. 또한 종합전적에 포함되어있던 최다 주행 모드 역시 분리하였고, 평균 등수는 추가적으로 구현하였습니다.

### 3. 탭 영역
 <img width="264" alt="스크린샷 2022-03-26 오전 1 44 02" src="https://user-images.githubusercontent.com/50618754/160164280-0dc34193-9fbd-4b38-b484-c165eda6c187.png"> 
 통합/매우빠름/무한부스터 탭은 데이터를 필터링하는 용도로 사용하였습니다. API를 이용해 각각의 데이터만을 가져오는 것은 불가능하여 받아온 데이터의 channelType 값을 확인하여 필터링한 데이터를 나타내었습니다.
 
### 4. 트랙/차트 영역
<img width="367" alt="스크린샷 2022-03-26 오전 1 11 37" src="https://user-images.githubusercontent.com/50618754/160163481-8f200a51-fcdc-4143-a071-be04131e8d85.png"> <img width="361" alt="스크린샷 2022-03-26 오전 1 15 25" src="https://user-images.githubusercontent.com/50618754/160162814-346f22ee-7e19-494d-aaa8-5bd8601be1dd.png">

트랙/차트 영역은 버튼 클릭을 통해 탭 전환이 가능하고, 테이블의 항목을 클릭하면 해당하는 데이터 정보가 나타나게 됩니다. 트랙의 경우 주행 시간에 대한 데이터가 API에서 제공되지 않아 임시 데이터를 적용해두었습니다. 카트의 경우엔 선택시 해당 카트를 사용한 트랙 목록을 최대 4개까지 표시하게 됩니다.
직접 구현한 차트 외에는 `chart.js` 라이브러리를 사용하였습니다.


### 5. 전적 데이터 조회
<img width="480" alt="스크린샷 2022-03-26 오전 1 15 56" src="https://user-images.githubusercontent.com/50618754/160164179-93f232bb-f5ac-41cc-912e-61cef1107b74.png">

전적 데이터는 무한스크롤을 적용하여 구현했으며 `/users/{access_id}/matches`API를 통해 유저의 데이터를 30개씩 불러오도록 했습니다.

<img width="480" alt="스크린샷 2022-03-26 오전 1 16 05" src="https://user-images.githubusercontent.com/50618754/160166905-624ba127-bc29-46f7-9dc0-43a5d853943d.png">
또한 각 데이터를 클릭 시, `/matches/{match_id}` API를 통해 플레이어 정보를 가져왔습니다.
각 열은 승리, 리타이어 여부에 따라 다른 색상으로 표시되며, 팀전의 경우 유저가 속한 팀의 플레이어들에게 배경색이 적용됩니다.
또한 각 플레이어의 이름을 클릭 시, 바로 검색되도록 구현해두었습니다.


## 선택 조건 구현 상세
- 컴포넌트 기반 구조 가질 수 있도록 설계
- 라이브러리 사용하지 않고 그래프, 애니메이션 구현
- UI/UX 고려한 기능 및 페이지 구성

### 1. 컴포넌트 기반 구조

화면을 구성하는 요소들은 최대한 작은 단위까지 컴포넌트로 분리하여 작성하였습니다.
분리된 컴포넌트들은 하나의 폴더로 그룹을 지어 페이지에서 필요한 컴포넌트를 쉽게 가져와 사용할 수 있게 하였습니다
또한 공통적으로 사용되는 탭, 메시지창 등의 기능 역시 컴포넌트로 분리하여 재사용이 가능하게 만들었습니다.

## 2. 라이브러리를 사용하지 않고 그래프, 애니메이션 구현
그래프는 일부, 애니메이션은 전체 모두 라이브러리를 사용하지 않고 구현하였습니다.
구현한 목록은 다음과 같습니다.

### 그래프
<img width="319" alt="스크린샷 2022-03-26 오전 2 05 56" src="https://user-images.githubusercontent.com/50618754/160167958-27a7798a-d5a7-4736-83a5-3306db3238fd.png"> <img width="323" alt="스크린샷 2022-03-26 오전 2 04 27" src="https://user-images.githubusercontent.com/50618754/160167974-cce77ba9-cedf-4cbd-a9cf-e80521c90afe.png">

단순한 그래프의 경우에는 구현하는데 많은 시간이 소요되지 않을 것 같아 도넛 차트 및 프로그레스 바를 구현했습니다. 도넛차트는 `svg`를 활용하여 구현하였고, 프로그레스바는 `div` 등의 기본적인 태그를 활용하여 구현하였습니다.

### 애니메이션

<img height="140" src="https://user-images.githubusercontent.com/50618754/160170801-bcc0a9af-b882-4a2f-9833-472248da0b55.gif"/> <img height="140" src="https://user-images.githubusercontent.com/50618754/160170946-e8e299e7-4049-4847-9704-d2e46b8a4f4a.gif"/> <img height="140" src="https://user-images.githubusercontent.com/50618754/160171016-33f728a8-11d6-416f-a6dd-474ef39d2356.gif"/> <img width="100%" src="https://user-images.githubusercontent.com/50618754/160171080-92f7353c-a557-4d8e-940e-7155ba8b3937.gif"/> <img height="140" src="https://user-images.githubusercontent.com/50618754/160170877-ebb917bf-0e11-460d-ab44-e1239a7424bc.gif"/> 
<img height="140" src="https://user-images.githubusercontent.com/50618754/160171464-c50f18de-6526-4f4c-b830-e00011b90832.gif"/>
- move, rotate, gradient, fillColor, skeleton 등

## 3. UI/UX 고려한 기능 및 페이지 구성
> 사용자 경험을 개선하기 위해 스켈레톤 UI, 로딩중과 같은 로딩중일 때의 안내 요소들을 추가하였으며, 데이터가 없을 경우에도 문구를 나타내어 사용자가 인지할 수 있도록 구현했습니다. 또한 메시지 창을 컴포넌트로 구현하여 결과가 없을 경우, 입력 값이 잘못되었을 경우 등의 안내를 할 수 있도록 하였습니다. 이미지를 로드하지 못했을 경우에도 대체 이미지를 `onError` 이벤트를 통해 설정해주었으며, 이 외에도 버튼 클릭을 용이하게 할 수 있도록 작은 요소에 padding을 주어 영역을 넓히거나 상위 영역에 clcik event를 할당하기도 했습니다. 또한 전적 데이터에서 어떤 데이터를 가장 보고싶을지를 고려하여 한 눈에 데이터를 확인하기 좋도록 데이터의 배치나 폰트 사이즈 등을 적절하게 조정하였습니다. 


## 어려웠던 점
### Typescript + eslint 문제
가장 어려웠던 점은 아무래도 Typescript 타입 오류와 eslint 문제였습니다. Typescript의 경우 이번이 두 번째 사용해보는 것이지만 지난 번에 정말 다양한 오류를 마주하고 해결했었기 때문에 이번에는 순조롭지 않을까 생각했었고, 기대와는 달리 airbnb eslint 설정과의 조합으로 인한 더 많은 에러를 경험했습니다. 이번에 처음으로 airbnb eslint 설정을 사용해보게 되었는데 사용해보니 기본에 아무렇지 않게 작성해왔던 코드들에서 예상치 못한 오류가 많이 발생하였습니다. 예를 들어 `require-default-props` 에러나 `Object.freeze`가 적용된 데이터의 타입 지정 시 `'readonly' and cannot be assigned to the mutable type` 오류가 발생하였으며, 필요한 경우에만 return을 했더니 `consistent-return` 오류, number에다 string 변수를 합치는 것에서도 `Unexpected string concatenation` 오류가 발생하였습니다. 모두 끊임없는 고민과 검색을 통해 해결해나갔고 시간을 많이 소요하였지만 좋은 경험이었다고 생각하며, 지난 번과 이번 프로젝트에서 마주한 에러 및 해결 방법에 대한 것은 별도로 정리해두어 기록해 보려고 합니다.

### 무한 스크롤 문제
무한 스크롤 구현은 intersection Observer를 활용하여 구현하였으며, 지난 프로젝트를 통해 다른 팀원들이 구현한 코드를 본 적도 있었고, 예제 코드가 다양하여 비교적 구현하기에 좋았습니다. 하지만 작동을 테스트해보니 처음 옵저버가 실행된후 한 번 더 실행되는 문제가 있었습니다. 원인을 파악해보니 데이터가 전부 렌더링 되기 전까지는 타겟 요소가 화면 상단에 위치하게 되므로 교차가 감지되어 옵저버가 실행된 것이었습니다. 로딩중일 때에는 요소가 렌더링 되지 않도록 설정이 되어있었으나 로딩완료 ~ 데이터가 렌더링되기 전까지의 시점에서 문제가 발생하였기 떄문에 타겟 요소의 높이를 조정하고 상위에는 CardUI를 두어 어느 정도 해결은 했으나 완벽한 해결 방법으로 생각되지 않아 아예 다른 해결 방법을 고민해보고 있습니다.

## 프로젝트 후기

계속해서 팀 프로젝트를 해오다가 개인 프로젝트를 진행하게 되어 평소와 다른 점이 많았는데 혼자 다 구현해야 한다는 압박과 부담감도 있었지만 좋았었던 기술들을 다시 사용해보거나, 평소에 해보지 못했던 것들을 다양하게 활용해볼 수 있어서 좋았습니다. 특히 이번에 github에서 지원하는 기능들을 다양하게 활용해보았는데, **milstone**이나 **project** 탭의 칸반보드를 활용하여 개인적으로 일정 관리를 할 수 있었습니다. 
이번 프로젝트에는 API가 제공하는 데이터에 따라 구현할 수 있는 기능이 제한적이어서 구체적인 설계가 매우 중요했습니다. 개인적으로 노션을 이용하여 기존 사이트의 기능들을 분석하고, API를 분석하여 구현 가능한 기능에는 어떤 것이 있을지 정리해보는 시간을 가졌고, 사이트 기능들을 분석하면서 아쉬운 부분이나 추가하면 좋을 만한 기능등을 생각하여 구현해보기도 했습니다. 다만 설계를 했음에도 직접 구현해보면서 달라지는 부분이 많아 데이터 파싱 함수도 여러 번 수정을 거듭하였습니다. 많은 수정으로 인해 계획했던 기능은 반도 구현하지 못했고, 프로필 저장이나 1:1 매칭 시뮬레이션은 프로젝트 설계하면서도 구현해보고 싶은 기능이었는데 구현하지 못한 것이 아쉽게 느껴집니다. 또한 좀더 보기 좋은 UI를 위해 레이아웃이나 세세한 투명도까지 조절해가면서 구현하다보니 레이아웃, 디자인을 구현하는데에도 시간을 많이 소요하였습니다. 하지만 그만큼 다양한 레이아웃을 구현해 볼 수 있어서 재미있었고, 스켈레톤 UI나 도넛 차트 등은 평소에 언젠가 구현해보고 싶다 생각했었던 것들이었는데 이번 기회에 구현하게 되어 좋았습니다. 이번 프로젝트에서 경험한 내용과 아쉬운 점들은 앞으로의 개인 프로젝트에서 개선해나가고자 합니다!
