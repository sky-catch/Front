import { useEffect, useState } from "react";
import Drawer from "react-modern-drawer";
import { Swiper, SwiperSlide } from "swiper/react";

/**
 * 검색 필터 Drawer
 * @returns
 */
const FilterDrawer = ({ isFilter, toggleFilterDrawer, setFilterInfo }) => {
  const [isContent, setIsContent] = useState(1);
  const [isSelect, setIsSelect] = useState(0);
  const [isCities, setIsCities] = useState("");
  const cityItems = [
    { name: "핫플" },
    { name: "서울" },
    { name: "경기" },
    { name: "인천" },
    { name: "부산" },
    { name: "제주" },
    { name: "울산" },
    { name: "경남" },
    { name: "대구" },
    { name: "경북" },
    { name: "강원" },
    { name: "대전" },
    { name: "충남" },
    { name: "충북" },
    { name: "세종" },
    { name: "전남" },
    { name: "광주" },
    { name: "전북" },
  ];
  const hotplaces = [
    { name: "서울 전체" },
    { name: "강남/역삼/선릉" },
    { name: "강남구청" },
    { name: "건대/군자/구의" },
    { name: "금호/옥수/신당" },
    { name: "명동/을지로/충무로" },
    { name: "방이" },
    { name: "북촌/삼청" },
    { name: "삼성/대치" },
    { name: "상수/합정/망원" },
    { name: "서울역/회현" },
    { name: "서초/방배" },
    { name: "서촌" },
    { name: "성수/서울숲" },
    { name: "신사/논현" },
    { name: "신촌/홍대/서교" },
    { name: "압구정/청담" },
    { name: "양재/도곡" },
    { name: "연남" },
    { name: "영등포/여의도" },
    { name: "용산/삼각지" },
  ];

  /* tap 클릭이벤트 */
  const contentClick = (e, index) => {
    if (index === 0) {
      setIsContent(1);
    } else if (index === 1) {
      setIsContent(2);
    }
  };

  /* button 클릭이벤트 */
  const buttonClick = (e, index) => {
    setIsSelect(index);
  };

  /* function : 도시선택 */
  const onSelectCity = (e, city) => {
    setIsCities(city);
  };

  /* function : 검색적용 */
  const handleSearch = (e) => {
    toggleFilterDrawer(e);
    setFilterInfo(isCities);
  };

  /* function : 초기화 */
  const handleReset = (e) => {
    setIsCities("");
  };

  useEffect(() => {}, []);

  return (
    <div className="filter-drawer">
      <Drawer
        open={isFilter}
        onClose={toggleFilterDrawer}
        direction="bottom"
        className="drawer-box"
        size="calc(100vh - 150px)"
      >
        <div className="filter-wrapper">
          <header className="sticky">
            <Swiper className="swiper-container">
              <div className="swiper-wrapper box-content">
                <SwiperSlide className="w-fit">
                  <li
                    className={`flex justify-start
                                        ${isContent == 1 ? "selected-tap" : ""}
                                        `}
                    onClick={(e) => contentClick(e, 0)}
                  >
                    지역
                  </li>
                </SwiperSlide>
                <SwiperSlide className="w-fit">
                  <li
                    className={`flex justify-start
                                        ${isContent == 2 ? "selected-tap" : ""}
                                        `}
                    onClick={(e) => contentClick(e, 1)}
                  >
                    가격
                  </li>
                </SwiperSlide>
              </div>
            </Swiper>
          </header>
          <main>
            <div>
              <section className="py-[15px] pl-[20px] pr-[20px]">
                <div className="flex justify-between">
                  <h3>지역</h3>
                  <button onClick={handleReset}>초기화</button>
                </div>
                <div className="flex city-wrapper">
                  <div className="grid grid-cols-5">
                    {cityItems.map((item, index) => {
                      return (
                        <button
                          key={index}
                          className={`${isSelect == index ? "active" : ""}`}
                          onClick={(e) => buttonClick(e, index)}
                        >
                          {item.name}
                        </button>
                      );
                    })}
                  </div>
                  <div></div>
                </div>
                <div className="flex hotplace-wrapper">
                  {hotplaces.map((item, index) => {
                    return (
                      <button
                        className={`${
                          isCities == "서울 전체"
                            ? "active"
                            : isCities == item.name
                            ? "active"
                            : ""
                        }`}
                        key={index}
                        onClick={(e) => {
                          onSelectCity(e, item.name);
                        }}
                      >
                        <span>{item.name}</span>
                      </button>
                    );
                  })}
                </div>
              </section>
            </div>
            <hr className="seperator"></hr>
            <div>
              <section className="py-[15px] pl-[20px] pr-[20px]">
                <div className="flex justify-between">
                  <h3>가격</h3>
                  <button>초기화</button>
                </div>
                asdasdasdasda
              </section>
            </div>
          </main>
          <footer className="fixed">
            <div className="gradient"></div>
            <div className="flex items-center bg-[#fff] btn-box">
              <button className="flex items-center justify-center">닫기</button>
              <button
                className="flex items-center justify-center"
                onClick={(e) => handleSearch(e)}
              >
                적용하기
              </button>
            </div>
          </footer>
        </div>
      </Drawer>
    </div>
  );
};
export default FilterDrawer;
