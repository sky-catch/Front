import { useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import Restaurants_sm from "../../components/Restaurants-sm.js";

/**
 * 검색하기 화면
 * @author jimin
 */
export default function Search() {
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const [date, setDate] = useState(
    String(new Date().getMonth() + 1).padStart(2, "0") +
      "." +
      String(new Date().getDate()).padStart(2, "0") +
      "(" +
      week[new Date().getDay()] +
      ")"
  );
  const [minNum, setMinNum] = useState(2);
  const [time, setTime] = useState();
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

  return (
    <SearchSection>
      <main id="main">
        <div className="search-header">
          <div className="keyword">
            <input
              type="text"
              name="keyword"
              placeholder="지역, 음식, 매장명 검색"
            ></input>
          </div>
          <div className="datetime-selector">
            <a>
              <span>
                {date} / {minNum}명 / {time}{" "}
              </span>
            </a>
          </div>
          <div className="chip-filter">
            <div className="filter-icon">
              <button className="design_system">
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
                {/* <span className="">0</span> */}
              </button>
            </div>
            <span className="seperator"></span>
            <div className="filter-menu">
              <div className="swiper swiper-container swiper-container-initialized swiper-container-horizontal">
                <Swiper slidesPerView={4} className="swiper-wrapper">
                  {menuItems.map((item, index) => {
                    return (
                      <SwiperSlide className="swiper-slide-chip mr-[8px]">
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
                  <Swiper slidesPerView={4} className="swiper-wrapper">
                    {hashtagItems.map((item, index) => {
                      return (
                        <SwiperSlide className="swiper-slide-chip mr-[8px]">
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
        <button className="btn btn-lg btn-red">검색</button>
      </div>
    </SearchSection>
  );
}

const SearchSection = styled.div`
  .keyword input {
    cursor: pointer;
    font-size: 13px;
  }
  .search-header .datetime-selector a {
    cursor: pointer;
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
