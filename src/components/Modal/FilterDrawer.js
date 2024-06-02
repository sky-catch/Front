import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useEffect, useRef, useState } from "react";
import Drawer from "react-modern-drawer";
import { Swiper, SwiperSlide } from "swiper/react";

/**
 * 검색 필터 Drawer
 * @returns
 */
const FilterDrawer = ({ isFilter, toggleFilterDrawer, setFilterInfo , searchFilter }) => {
  const regionBox = useRef(null);
  const costBox = useRef(null);
  const placeRef = useRef([]);
  const sliderRef = useRef([]);

  const [isContent, setIsContent] = useState(1);
  const [isSelect, setIsSelect] = useState("핫플");
  const [selectedCities, setSelectedCities] = useState(typeof searchFilter?.hotPlace =='string' ? searchFilter?.hotPlace?.split(',').filter(item=>item!=='') : searchFilter?.hotPlace);  // 선택된 지역 필터 //searchFilter?.hotPlace.split(',')
  const [selectedCost, setSelectedCost] = useState({}); // 선택된 가격 필터
  const [cities, setCities] = useState([]); // 적용된 지역 필터
  const [cost, setCost] = useState(); /* rc-slider 값 */
  const [Value, setValue] = useState([searchFilter?.minPrice || 0, searchFilter?.maxPrice || 40]);

  const defaultCity = [
    { city : "핫플",
      detail : [ //핫플
        "서울 전체", "강남/역삼/선릉", "강남구청", "건대/군자/구의", "금호/옥수/신당", "명동/을지로/충무로", "방이", "북촌/삼청", "삼성/대치", "상수/합정/망원", "서울역/회현", "서초/방배", "서촌", 
        "성수/서울숲", "신사/논현", "신촌/홍대/서교", "압구정/청담", "양재/도곡", "연남", "영등포/여의도", "용산/삼각지", 
      ]
     },
    { city : "서울",
      detail :  [//서울
        "서울 전체", "강남/역삼/선릉", "강남구청", "건대/군자/구의", "금호/옥수/신당", "명동/을지로/충무로", "방이", "북촌/삼청", "삼성/대치", "상수/합정/망원", "서울역/회현", "서초/방배", "서촌", 
        "성수/서울숲", "신사/논현", "신촌/홍대/서교", "압구정/청담", "양재/도곡", "연남", "영등포/여의도", "용산/삼각지", 
      ],
     },
    { city : "경기", detail : ["경기 전체"] },
    { city : "인천", detail : ["인천 전체"] },
    { city : "부산", detail : ["부산 전체"] },
    { city : "제주", detail : ["제주도 전체"] },
    { city : "울산", detail : ["울산 전체"] },
    { city : "경남", detail : ["경남 전체"] },
    { city : "대구", detail : ["대구 전체"] },
    { city : "경북", detail : ["경북 전체"] },
    { city : "강원", detail : ["강원 전체"] },
    { city : "대전", detail : ["대전 전체"] },
    { city : "충남", detail : ["충남 전체"] },
    { city : "충북", detail : ["충북 전체"] },
    { city : "세종", detail : ["세종 전체"] },
    { city : "전남", detail : ["전남 전체"] },
    { city : "광주", detail : ["광주 전체"] },
    { city : "전북", detail : ["전북 전체"] },
  ];

  const costItems = [
    { name: "10만원 이하", min: 0, max: 10 },
    { name: "10만원대", min: 10, max: 20 },
    { name: "20만원대", min: 20, max: 30 },
    { name: "30만원대", min: 30, max: 40 },
    { name: "40만원대 이상", min: 40, max: 40 },
  ];
  const [selected, setSelected] = useState([]);
  // console.log(searchFilter)


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
  const buttonClick = (e, id) => {
    setIsSelect(id);
  };

  /* function : 도시선택 */
  const onSelectCity = (e, newCity) => {
    const list = placeRef.current;
    const recentClass = e.currentTarget.classList;
    const isActive = e.currentTarget.classList.length > 1 ? true : false; //active 여부

    let newCitiess = [];
    // 서울 전체인경우
    if(newCity=="서울 전체") { 
      if(!isActive) {
        list.map((item)=>item.classList.add('active'));
        setSelectedCities(...defaultCity.filter(item=>item.city == '서울').map(item=>item.detail));
      } else {
        list.map((item)=>item.classList.remove('active'));
        setSelectedCities([]);
      }
    }else {
      if(!isActive) {
        recentClass.add('active');
        setSelectedCities([...selectedCities, newCity]);
      } else {
        recentClass.remove('active');
        setSelectedCities([...selectedCities.filter(city=>city!==newCity) ]);
      }
    }
  };

  /* function : 검색적용 */
  const handleSearch = (e) => {
    console.log('?');
    setCities([...selectedCities]); // 필터 확정
    setFilterInfo((prevState)=> ({
      ...prevState, 
      hotPlace : selectedCities?.length > 0 ? selectedCities : [],
      koreanCity : isSelect=="핫플" ? "서울" : isSelect,
      minPrice : cost ? Number(cost?.min) : 0,
      maxPrice : cost ? Number(cost?.max) : 0
    }));
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
    
    let now = e.currentTarget.parentNode.id;
    if(cityselected) {
      let newData = selectedCities.filter(item=>item!==now);
      setSelectedCities(newData);
    } else if (costselected) {
      setCost();
      setValue([0,40]);
    }
      
  };

  /* function : 전체초기화 */
  const handleResetAll = (e) => {
    /* 1. 지역리셋 */
    // setSelectedCities([]);
    // const list = placeRef.current;
    // list.map((item) => {
    //   const arr1 = item.classList;
    //   arr1.remove("active");
    // });
    /* 2. 가격리셋 */
    // setCost();
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
  
  console.log('selected!🌷', selectedCities, 'isSelect', isSelect, 'cities', cities,'searchFilter⭐️',searchFilter);

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
                    className={`flex justify-start ${isContent == 1 ? "selected-tap" : ""}`}
                    onClick={(e) => contentClick(e, 0)}
                  >
                    지역
                  </li>
                </SwiperSlide>
                <SwiperSlide className="w-fit">
                  <li
                    className={`flex justify-start${isContent == 2 ? "selected-tap" : ""}`}
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
                    {defaultCity.map((item, index) => {
                      return (
                        <button
                          key={index}
                          className={`${isSelect == item.city ? "active" : ""}`}
                          onClick={(e) => buttonClick(e, item.city)}
                          id={item.city}>
                          {item.city}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="flex hotplace-wrapper">
                  {
                    defaultCity.map(item=>(isSelect==item.city ? item.detail?.map((data,index)=>
                      <button
                        type="button"
                        id="hotplace-list-item"
                        className={`hotplace-item ${cities?.length < 1 ? selectedCities?.includes(data) ? 'active' : ''
                          : cities?.includes(data) ? 'active' : ''
                        }`}
                        key={index}
                        onClick={(e) => {onSelectCity(e, data);}}
                        ref={(el) => (placeRef.current[index] = el)}
                      ><span>{data}</span></button>
                    ):<></>))
                  }
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
            { selectedCities?.length >0
            || cost ? 
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
                      { selectedCities?.map((item,index)=>{
                        return(
                          <button className="item-btn font-md" id={item} key={index}>
                            <span>{item}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none" className="design_system_1mb4yfk4 design_system_1mb4yfk5 city" onClick={handleReset}>
                              <path d="M9 1L1 9" stroke="currentColor" strokeWidth="0.75" strokeMiterlimit="10"></path>
                              <path d="M1 1L9 9" stroke="currentColor" strokeWidth="0.75" strokeMiterlimit="10"></path>
                            </svg>
                          </button>
                        )
                      })}
                      { 
                        (cost && (cost.min || cost.max)) ? <button className="item-btn font-md"><span>{cost.min}원 ~ {cost.max}만원</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none" className="design_system_1mb4yfk4 design_system_1mb4yfk5 cost" onClick={handleReset}>
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
