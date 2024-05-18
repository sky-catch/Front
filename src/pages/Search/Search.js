import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import arrow_d from "../../assets/icons/arrow-down-red.svg";
import calendar from "../../assets/icons/calendar.svg";
import search_g from "../../assets/icons/search-gray.svg";
import FilterDrawer from "../../components/Modal/FilterDrawer.js";
import Restaurants_sm from "../../components/Restaurants-sm.js";
// import { searchByFilter } from "../../respository/search.js";
import CalendarComponent from "../../components/CalendarComponent";

/**
 * 검색하기 화면
 * @author jimin
 */
export default function Search() {
  const navigate = useNavigate();
  const [isFilter, setIsFilter] = useState(false);  // 필터패널 open 여부 (false : 닫음, true : 열림)
  const [isOpen, setIsOpen] = useState(false);    // 캘린더 패널 open 여부 (false : 닫음, true : 열림)
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const [date, setDate] = useState(new Date()); // 오늘 날짜
  const [minNum, setMinNum] = useState(2); // 최소 인원
  const [time, setTime] = useState("19"); // 기본 시간
  const [filterInfo, setFilterInfo] = useState();
  // const [reserveInfo, setReserveInfo] = useState(); // 예약 정보 (기본 : 오늘 오후7시 / 설정 시 설정 날짜)
  const menuItems = [{
      id: 1,
      title: "지역",
    },{
      id: 2,
      title: "가격",
    }
  ];
  const hashtagItems = [
    { title: "#웨이팅 라인업 공개" },
    { title: "#스시오마카세" },
    { title: "#믿고먹는 브랜드관" },
    { title: "#예약 오픈 달력" },
  ];

  const moveToPage = () => {
    navigate("/search/total");
  };

  /* 상세 검색 패널 열기 */
  const toggleFilterDrawer = (e) => {
    setIsFilter((prevState) => !prevState);
  };

  const toggleDrawer = (e) => {
    setIsOpen((prevState) => !prevState);
  }
  console.log('time:',time);
  /* 필터 검색하기 */
  const handleSearch = (e) => {
    const cost = filterInfo?.cost;
    const cityList = filterInfo?.cities;
    const hotPl = filterInfo?.cities?.city;
    console.log(filterInfo);
    const formatDate =
      date.getFullYear() +
      "-" +
      String(date.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(date.getDate()).padStart(2, "0");

    const params = {
      date: formatDate,
      time: `${time}:00`,
      personCount: minNum,
      koreanCity: JSON.stringify(cityList),
      hotPlace:  hotPl,
      category: "",
      minPrice: cost ? cost.min : 0,
      maxPrice: cost ? cost.max : 0,
      orderType: "기본순",
    };
    
    navigate(`/search/list?`, {state : params});
    // searchByFilter(params)
    //   .then((res)=>{
    //     console.log(res.data);
    //   });
  };

  /* 캘린더 다이얼로그 열기 */
  const handleCalendarDialog = (e) => {
    toggleDrawer(e);
  }

  useEffect(() => {
    console.log(filterInfo);
  }, [filterInfo]);

  return (
    <div>
      <main id="main">
        <div className="search-header">
          <div className="keyword">
            <input
              type="text"
              name="keyword"
              placeholder="지역, 음식, 매장명 검색"
              onClick={moveToPage}
            ></input>
          </div>
          <div className="datetime-selector" onClick={handleCalendarDialog}>
            <a>
              <span>
                {String(date.getMonth() + 1).padStart(2, "0") +
                  "." +
                  String(date.getDate()).padStart(2, "0") +
                  "(" +
                  week[date.getDay()] +
                  ")"}
                / {minNum}명 / {time > 12 ? '오후 '+ time%12 + ':00' : time + ':00'}
              </span>
            </a>
          </div>
          <div className="chip-filter">
            <div className="filter-icon">
              <button
                className={`design_system ${
                  filterInfo?.cities?.address.length > 0 || (filterInfo?.cost && Object.values(filterInfo.cost).length > 0) ? "active" : ""
                }`}
                onClick={toggleFilterDrawer}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6 8C6 9.10457 6.89543 10 8 10C9.10457 10 10 9.10457 10 8M6 8C6 6.89543 6.89543 6 8 6C9.10457 6 10 6.89543 10 8M6 8H3M10 8H21M14 15C14 16.1046 14.8954 17 16 17C17.1046 17 18 16.1046 18 15M14 15C14 13.8954 14.8954 13 16 13C17.1046 13 18 13.8954 18 15M14 15H3M18 15H21"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  ></path>
                </svg>
                <span className={`filters ${ filterInfo?.cities?.address.length > 0 || (filterInfo?.cost && Object.values(filterInfo.cost).length > 0)  ? "active" : "" }`}>
                  {filterInfo?Object.values(filterInfo).length:''}</span>
              </button>
            </div>
            <span className="seperator-vt"></span>
            <div className="filter-menu">
              <div className="swiper swiper-container swiper-container-initialized swiper-container-horizontal">
                <Swiper slidesPerView={"auto"} className="swiper-wrapper">
                  {menuItems.map((item, index) => {
                    return (
                      <SwiperSlide
                        className={`swiper-slide-chip mr-[8px]`}
                        key={index}
                        id={index}
                      >
                        <button type="button" className={`slide-button
                          ${filterInfo && (( filterInfo.cities && filterInfo.cities.address.length > 0 && index==0 )
                            || (filterInfo.cost && index==1)) ? 'active' : ''}
                        `} onClick={toggleFilterDrawer}>
                          <span>{filterInfo?.cities && index==0 ? filterInfo.cities.address : item.title}</span>
                        </button>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
        <hr className="seperator mb-[30px]" />
        <section className="section section-overflow-hidden">
          <div className="container gutter-sm">
            <div>
              <div className="section-header mb-[16px]">
                <h3 className="color-gray">어떤 레스토랑을 찾으세요?</h3>
              </div>
              <div className="section-body mb-[24px]">
                <div className="v-scroll">
                  <div className="v-scroll-inner">
                    <Restaurants_sm />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="section-header mb-[16px]">
                <h3 className="color-gray">추천 해시태그</h3>
              </div>
              <div>
                <div className="swiper swiper-container swiper-container-initialized swiper-container-horizontal">
                  <Swiper slidesPerView={"auto"} className="swiper-wrapper">
                    {hashtagItems.map((item, index) => {
                      return (
                        <SwiperSlide
                          className="swiper-slide-chip mr-[8px]"
                          key={index}
                        >
                          <button type="button" className="slide-button">
                            <span>{item.title}</span>
                          </button>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </section>
      </main>
      <div className="sticky-bottom-btns upper">
        <button className="btn btn-lg btn-red" onClick={handleSearch}>
          검색
        </button>
      </div>

      {/* 필터 패널 Drawer */}
      <FilterDrawer
        isFilter={isFilter}
        toggleFilterDrawer={toggleFilterDrawer}
        setFilterInfo={setFilterInfo}
      ></FilterDrawer>
      {/* 캘린더 패널 Drawer */}
      <CalendarComponent
        isOpen={isOpen}
        restaurant={""}
        setReserveInfo={(params)=> {
          // 날짜랑 인원수 state 저장하기
          let date = params.date;
          let people = params.people;

          setDate(date);
          setMinNum(people);
        }}
        toggleDrawer={toggleDrawer}
      ></CalendarComponent>

    </div>
  );
}

