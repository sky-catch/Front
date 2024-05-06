import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import arrow_d from "../../assets/icons/arrow-down-red.svg";
import calendar from "../../assets/icons/calendar.svg";
import search_g from "../../assets/icons/search-gray.svg";
import FilterDrawer from "../../components/FilterDrawer.js";
import Restaurants_sm from "../../components/Restaurants-sm.js";
import { searchByFilter } from "../../respository/search.js";

/**
 * 검색하기 화면
 * @author jimin
 */
export default function Search() {
  const navigate = useNavigate();
  const [isFilter, setIsFilter] = useState(false);
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const [date, setDate] = useState(new Date()); // 오늘 날짜
  const [minNum, setMinNum] = useState(2); // 최소 인원
  const [time, setTime] = useState("7:00"); // 기본 시간
  const [filterInfo, setFilterInfo] = useState([]);
  const menuItems = [
    {
      id: 0,
      title: "내 주변",
    },
    {
      id: 1,
      title: "지역",
    },
    {
      id: 2,
      title: "음식 종류",
    },
    {
      id: 3,
      title: "가격",
    },
    {
      id: 4,
      title: "테이블 타입",
    },
    {
      id: 5,
      title: "분위기",
    },
    {
      id: 6,
      title: "편의시설",
    },
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
    console.log(e.target.className);

    setIsFilter((prevState) => !prevState);
  };

  /* 필터 검색하기 */
  const handleSearch = (e) => {
    const formatDate =
      date.getFullYear() +
      "-" +
      String(date.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(date.getDate()).padStart(2, "0");

    const params = {
      date: formatDate,
      time: time,
      personCount: minNum,
      koreanCity: filterInfo.cities.city || "",
      hotPlace: filterInfo.cities.address[0] || "",
      category: "",
      minPrice: 0,
      maxPrice: 0,
      orderType: "기본순",
    };
    // console.log(filterInfo, 'params : ', JSON.parse(params), JSON.stringify(params));
    searchByFilter(params);
    // .then((res)=>{
    // console.log(filterInfo);
    // searchByFilter(filterInfo).then((res) => {});
  };

  useEffect(() => {
    console.log(filterInfo, filterInfo.length);
  }, [filterInfo]);

  return (
    <SearchSection>
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
          <div className="datetime-selector">
            <a>
              <span>
                {String(date.getMonth() + 1).padStart(2, "0") +
                  "." +
                  String(date.getDate()).padStart(2, "0") +
                  "(" +
                  week[date.getDay()] +
                  ")"}
                / {minNum}명 / {time}
              </span>
            </a>
          </div>
          <div className="chip-filter">
            <div className="filter-icon">
              <button
                className={`design_system ${
                  filterInfo.length > 0 ? "active" : ""
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
        </div>
        <hr className="separator mb-[30px]" />
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
    </SearchSection>
  );
}

const SearchSection = styled.div`
  .search-header .keyword input {
    cursor: pointer;
    font-size: 13px;
    height: 56px;
    padding: 0 20px 0 52px;
    width: 100%;
    background: url("${search_g}") 20px 50% no-repeat;
  }
  .search-header .datetime-selector {
    border-bottom: 1px solid #e5e5e5;
    position: relative;
  }
  .search-header .datetime-selector a {
    cursor: pointer;
    position: relative;
    display: block;
    width: 100%;
    height: 48px;
    padding: 0 20px 0 48px;
    font-size: 14px;
    line-height: 48px;
    background: url("${calendar}") 20px 50% no-repeat;
  }
  .search-header .datetime-selector a::after {
    background: url("${arrow_d}") 50% 50% no-repeat;
    width: 16px;
    height: 16px;
    content: "";
    display: block;
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
  }
  .chip-filter {
    display: flex;
    align-items: center;
    padding: 12px 0;
  }
  .filter-icon {
    display: flex;
    padding-left: 20px;
    margin-right: 16px;
    gap: 8px;
  }
  .design_system {
    border: 1px solid #d5d5d5;
    width: 40px;
    height: 40px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .seperator-vt {
    display: block;
    width: 1px;
    height: 40px;
    background-color: #d5d5d5;
  }
  .filter-menu {
    flex: 1;
    overflow: hidden;
    padding-right: 20px;
    padding-left: 16px;
  }
  .slide-button {
    border: 1px solid #d5d5d5;
    box-sizing: border-box;
    border-radius: 18px;
    display: flex;
    height: 36px;
    align-items: center;
    padding: 0 14px;
    font-size: 14px;
  }
`;
