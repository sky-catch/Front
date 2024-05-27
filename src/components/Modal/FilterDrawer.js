import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useEffect, useRef, useState } from "react";
import Drawer from "react-modern-drawer";
import { Swiper, SwiperSlide } from "swiper/react";

/**
 * 검색 필터 Drawer
 * @returns
 */
const FilterDrawer = ({ isFilter, toggleFilterDrawer, setFilterInfo }) => {
  const regionBox = useRef(null);
  const costBox = useRef(null);
  const placeRef = useRef([]);
  const sliderRef = useRef([]);

  const [isContent, setIsContent] = useState(1);
  const [isSelect, setIsSelect] = useState(0);
  const [cities, setCities] = useState([]);

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
  const addressItems = [
    [ //핫플
      "서울 전체", "강남/역삼/선릉", "강남구청", "건대/군자/구의", "금호/옥수/신당", "명동/을지로/충무로", "방이", "북촌/삼청", "삼성/대치", "상수/합정/망원", "서울역/회현", "서초/방배", "서촌", 
      "성수/서울숲", "신사/논현", "신촌/홍대/서교", "압구정/청담", "양재/도곡", "연남", "영등포/여의도", "용산/삼각지", 
    ],
    [ //서울
      "서울 전체", "강남/역삼/선릉", "강남구청", "건대/군자/구의", "금호/옥수/신당", "명동/을지로/충무로", "방이", "북촌/삼청", "삼성/대치", "상수/합정/망원", "서울역/회현", "서초/방배", "서촌", 
      "성수/서울숲", "신사/논현", "신촌/홍대/서교", "압구정/청담", "양재/도곡", "연남", "영등포/여의도", "용산/삼각지", 
    ],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ];
  const costItems = [
    { name: "10만원 이하", min: 0, max: 10 },
    { name: "10만원대", min: 10, max: 20 },
    { name: "20만원대", min: 20, max: 30 },
    { name: "30만원대", min: 30, max: 40 },
    { name: "40만원대 이상", min: 40, max: 40 },
  ];
  const [selected, setSelected] = useState([]);
  const [cost, setCost] = useState(); /* rc-slider 값 */
  const [Value, setValue] = useState([0,40]);

  /* tap 클릭이벤트 */
  const contentClick = (e, index) => {
    if (index === 0) {
      setIsContent(1);
      regionBox.current.scrollIntoView({ behavior: "smooth" });
    } else if (index === 1) {
      setIsContent(2);
      costBox.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  /* button 클릭이벤트 */
  const buttonClick = (e, index) => {
    setIsSelect(index);
  };

  /* function : 도시선택 */
  const onSelectCity = (e, newCity) => {
    setCities([newCity, ...cities]);

    const recent = e.currentTarget.classList;
    const recentText = e.currentTarget.innerText;
    //서울 전체인 경우
    const list = placeRef.current;
    if (recentText == "서울 전체") {
      if (recent.length < 2) {
        list.map((item) => {
          const arr1 = item.classList;
          arr1.add("active");
        });
      } else {
        list.map((item) => {
          const arr1 = item.classList;
          arr1.remove("active");
        });
        setCities([]);
      }
    } else {
      // 각각인 경우
      if (recent.length < 1) {
        recent.add("active");
      } else {
        recent.forEach((item, idx) => {
          if (item == "active") {
            recent.remove("active");
            setCities(cities.filter((word) => word !== newCity));
          } else {
            recent.add("active");
          }
        });
      }
    }
  };

  /* function : 검색적용 */
  const handleSearch = (e) => {
    console.log(cityItems[isSelect].name, cities,cost);
    if(cities.length > 0 ) {
      setFilterInfo((prevFilterInfo)=> ({
        ...prevFilterInfo,
        cities: {
          city: cityItems[isSelect].name,
          address: cities,
        }
      }));
    } else {
      setFilterInfo();
    }
    if (cost) {
      setFilterInfo((prevFilterInfo)=> ({
        ...prevFilterInfo,
        'cost' : cost
      }));
    } else {
      setCost();
    }

    toggleFilterDrawer(e);
  };

  /* function : 초기화 */
  const handleReset = (e) => {
    const name = e.currentTarget.classList;
    let cityselected = false;
    let costselected = false;
    
    name.forEach((item)=>{
      if(item.indexOf('city') > -1) {
        cityselected = true;
      }
      if(item.indexOf('cost') > -1) {
        costselected = true;
      }
    });
    
    if(cityselected) {
      setCities([]);
      const list = placeRef.current;
      list.map((item) => {
        const arr1 = item.classList;
        arr1.remove("active");
      });
    } else if (costselected) {
      setCost();
      setValue([0,40]);
    }
      
  };

  /* function : 전체초기화 */
  const handleResetAll = (e) => {
    /* 1. 지역리셋 */
    setCities([]);
    const list = placeRef.current;
    list.map((item) => {
      const arr1 = item.classList;
      arr1.remove("active");
    });
    /* 2. 가격리셋 */
    setCost();
    setValue([0,40]);
  }

  /* function : 닫기 */
  const handleClose = (e) => {
    handleResetAll();
    toggleFilterDrawer(e);
  };

  /* function : 가격 설정 */
  const handleChange = (props) => {
    const [min, max] = props;
    if(max<1) return;
    setCost({
      min: min,
      max: max,
    });
    setValue([min,max]);
  };

  /* function : 가격 설정 */
  const handleClickCost = (e) => {
    const min = e.currentTarget.getAttribute("min");
    const max = e.currentTarget.getAttribute("max");

    handleChange([min, max]);
  };
  useEffect(()=>{
    // console.log(cost,Value);
  },[cost,Value])
  useEffect(() => {
    console.log(cities);
  }, [cities]);

  return (
    <div className="filter-drawer">
      <Drawer
        open={isFilter}
        onClose={handleClose}
        direction="bottom"
        className="drawer-box custom-box"
        size="calc(100vh - 150px)"
      >
        <div className="filter-wrapper">
          <header className="sticky">
            <Swiper className="swiper-container">
              <div className="swiper-wrapper box-content custom-tap">
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
              <section
                className="py-[15px] pl-[20px] pr-[20px] region-box"
                ref={regionBox}
              >
                <div className="flex justify-between">
                  <h3 className="title">지역</h3>
                  <button className="reset-btn city" onClick={handleReset}>
                    초기화
                  </button>
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
                  {addressItems[isSelect].map((item, index) => {
                    return (
                      <button
                        type="button"
                        className="hotplace-item"
                        key={index}
                        onClick={(e) => {
                          onSelectCity(e, item);
                        }}
                        ref={(el) => (placeRef.current[index] = el)}
                      >
                        <span>{item}</span>
                      </button>
                    );
                  })}
                </div>
              </section>
              <hr className="seperator"></hr>
            </div>
            <div>
              <section
                className="py-[15px] pl-[20px] pr-[20px] cost-box"
                ref={costBox}
              >
                <div className="flex justify-between">
                  <h3 className="title">가격</h3>
                  <button className="reset-btn cost" onClick={handleReset}>초기화</button>
                </div>
                <div className="slider-wrapper">
                  <h3 className="title">
                    {
                      cost ? cost.min > 0 ? `${cost.min}만원 ~ ${cost.max}만원` : `${cost.min}원 ~ ${cost.max}만원` : `0원 ~ 40만원`
                    }
                  </h3>
                  <div className="slider-wrapper-inner">
                    <Slider
                      range
                      min={0}
                      max={40}
                      defaultValue={Value}
                      marks={{ 0: "0원", 20: "20만원", 40: "40만원 이상" }}
                      onChange={handleChange}
                      value={Value}
                    />
                  </div>
                  <div className="slider-help">
                    {costItems.map((item, index) => {
                      return (
                        <button
                          key={index}
                          onClick={handleClickCost}
                          min={item.min}
                          max={item.max}
                        >
                          {item.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </section>
            </div>
          </main>
          <footer className="fixed">
            <div className="gradient"></div>
            { cities.length >0 || cost ? 
            <div className="selected-itmes">
                    <div className="delete-button">
                      <button type="button" className="delete" onClick={handleResetAll}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M4.16699 6.24992L5.13921 2.08325L14.8614 2.08332L15.8337 6.24992" stroke="currentColor" strokeWidth="1.25" strokeMiterlimit="10" strokeLinejoin="round"></path>
                        <path d="M4.16699 6.24992L5.13921 2.08325L14.8614 2.08332L15.8337 6.24992" stroke="currentColor" strokeWidth="1.25" strokeMiterlimit="10" strokeLinejoin="round"></path>
                        <path d="M1.66699 6.66675H18.3337" stroke="currentColor" strokeWidth="1.25" strokeMiterlimit="10"></path>
                        <path d="M8.33301 9.16675V15.0001" stroke="currentColor" strokeWidth="1.25" strokeMiterlimit="10"></path>
                        <path d="M11.667 9.16675V15.0001" stroke="currentColor" strokeWidth="1.25" strokeMiterlimit="10"></path>
                        <path d="M3.33301 6.25L4.69304 15.7702C4.86899 17.0018 5.92379 17.9167 7.16791 17.9167H12.8314C14.0756 17.9167 15.1304 17.0018 15.3063 15.7702L16.6663 6.25" stroke="currentColor" strokeWidth="1.25"></path>
                          </svg>
                      </button>
                    </div>
                    <div className="items">
                      {cities.map((item,index)=>{
                        return(
                          <button className="item-btn font-md">
                            <span>{item}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none" class="design_system_1mb4yfk4 design_system_1mb4yfk5 city" onClick={handleReset}>
                              <path d="M9 1L1 9" stroke="currentColor" strokeWidth="0.75" strokeMiterlimit="10"></path>
                              <path d="M1 1L9 9" stroke="currentColor" strokeWidth="0.75" strokeMiterlimit="10"></path>
                            </svg>
                          </button>
                        )
                      })}
                      { 
                        (cost && (cost.min || cost.max)) ? <button className="item-btn font-md"><span>{cost.min}원 ~ {cost.max}만원</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none" class="design_system_1mb4yfk4 design_system_1mb4yfk5 cost" onClick={handleReset}>
                          <path d="M9 1L1 9" stroke="currentColor" strokeWidth="0.75" strokeMiterlimit="10"></path>
                          <path d="M1 1L9 9" stroke="currentColor" strokeWidth="0.75" strokeMiterlimit="10"></path>
                        </svg>
                        </button> : ''
                      }
                    </div>
            </div> : "" }
            <div className="flex items-center bg-[#fff] btn-box btn-grp">
              <button
                className="flex items-center justify-center"
                onClick={(e) => handleClose(e)}
              >
                닫기
              </button>
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
