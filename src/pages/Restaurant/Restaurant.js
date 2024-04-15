import React, { useEffect, useState } from "react";
import "react-modern-drawer/dist/index.css";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import CalendarComponent from "../../components/CalendarComponent";
import RestaurantTap from "../../components/RestaurantTap.js";
import SaveConfirmComponent from "../../components/SaveConfirmComponent.js";
import StarsComponent from "../../components/StarsComponent.js";
import RestaurantTap from "../../components/RestaurantTap.js";
import ConfirmReserve from "../../components/ConfirmReserve.js";
import lunch_dark from "../../assets/icons/time-lunch-dark.svg";
import dinner_dark from "../../assets/icons/time-dinner-dark.svg";
import { getRestaurant, saveRestaurant } from "../../respository/restaurant";
import RestaurantInfor from "./RestaurantInfor";

/**
 * 식당
 *
 * @author jimin
 */

const shopImgItem = {
  shopImg: [
    {
      id: 0,
      url: "https://ugc-images.catchtable.co.kr/catchtable/shopinfo/stwQPDWOYfWA52EG2k_1v2g/b435c102ae5d42ef8db5729ac781e208?detail750",
    },
    {
      id: 1,
      url: "https://ugc-images.catchtable.co.kr/admin/marketing/banner/images/3bf5d2c1564a46368375bae358767d3f",
    },
  ],
};

export default function Restaurant() {
  const [restaurant, setRestaurant] = useState();
  const [openBottom, setOpenBottom] = React.useState(false);
  const openDrawerBottom = () => setOpenBottom(true);
  const closeDrawerBottom = () => setOpenBottom(false);
  const [isInforOpen, setIsInforOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false); /* 예약하기 모달창 오픈 */
  const [isSave, setIsSave] = useState(false); /* 저장하기 모달창 오픈 */
  const [isConfirmOpen, setIsConfirmOpen] =
    useState(false); /* 예약 컨펌 모달창 오픈 */

  const [isSelect, setIsSelect] = useState(true);
  const [isReserve, setIsReserve] = useState(true); /* 탭 true : 예약, false : 웨이팅 */
  const { state } = useLocation();

  const [isContent, setIsContent] = useState("home");

  const navigate = useNavigate();
  const location = useLocation();
  const toggleDrawer = (e) => {
    console.log(e.target.className,);
    
    if (e.target.className.indexOf('closeSaveModal') != -1) {
      setIsSave((prevState) => !prevState);
    } else if (e.target.className.indexOf('confirm-close') != -1) {
      setIsConfirmOpen((prevState) => !prevState);
    } else if( e.target.className.indexOf('close-modal-btn') != -1 ) {
      setIsConfirmOpen((prevState) => !prevState);

    if (e.target.className.indexOf("closeSaveModal") == -1) {
      setIsOpen((prevState) => !prevState);
    } else {
      setIsOpen((prevState) => !prevState);
    }
  };
  const toggleDrawerInfor = () => {
    setIsInforOpen((prevState) => !prevState);
  };
  const onReserveCalendar = () => {
    setIsOpen((prevState) => !prevState);
  };

  const onReserveInfor = () => {
    setIsInforOpen((prevState) => !prevState);
  };
  const menuClick = (e, index) => {
    if (index === 0) {
      setIsSelect(true);
      setIsReserve(true);
    } else {
      setIsSelect(false);
      setIsReserve(false);
    }
  };

  const contentClick = (e, index) => {
    if (index === 0) {
      setIsContent("home");
    } else if (index === 1) {
      setIsContent("menu");
    } else if (index === 2) {
      setIsContent("image");
    } else if (index === 3) {
      setIsContent("review");
    }
  };

  /* Function : 식당 정보 조회 */
  const setRestaurantInfo = (name) => {
    getRestaurant(name)
      .then((res) => {
        //TODO: 데이터 적용 완료
        setRestaurant(res.data);
        console.log(res.data, ',', restaurant);
        setRestaturant(res.data);
        console.log(res.data, ",", restaurant);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /* Function : 식당 저장 */
  const saveMyRestaurant = (e) => {
    setIsSave((prevState) => !prevState);
    console.log(restaurant.restaurantId);
    const restaurantId = restaurant.restaurantId;
    saveRestaurant(restaurantId)
      .then((res) => {
        console.log(res);
        /* 저장 완료 모달창 노출 */
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log(state, restaurant);
    if( !restaurant ) {
      setRestaurantInfo(state);
    } 
    // console.log(restaurant.reviewAvg);

    console.log(state);
    if (!restaurant) {
      setRestaurantInfo(state);
    }

  }, [restaurant]);

  return (
    <main className="pb-[74px]">
      {/* 1. 식당 이미지 */}
      <Section>
        <Swiper>
          {shopImgItem.shopImg.map((item, index) => {
            return (
              <SwiperSlide key={item.id}>
                <a>
                  <img src={item.url}></img>
                </a>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <div className="restaurant-img-detail">
          <span>명이 보는중!</span>
          <div>n/m</div>
        </div>
      </Section>
      {/* 2. 식당 이름 및 메인 정보 */}
      {restaurant && (
        <Section>
          <div className="container gutter-sm pt-[7px] pb-[7px]">
            <div className="restaurant-summary">
              <span>{restaurant.category}</span>
              <h2>{restaurant.name}</h2>
              <div className="flex align-center">
                <StarsComponent
                  startAvg={restaurant.reviewAvg}
                ></StarsComponent>
              </div>
            </div>
            <div className="restaurant-detail">
              <p>{restaurant.content}</p>
              <div className="lunchDinner">
                <span className="detail lunch">저녁 동일가 1-3만원</span>
                <span className="detail dinner">저녁 동일가 1-3만원</span>
              </div>
            </div>
            <div className="menu">
              <a className="call" href={`tel:${restaurant.phone}`}>
                전화
              </a>
              <a className="location">위치</a>
              <a
                className="building"
                onClick={() => {
                  onReserveInfor();
                }}
              >
                매장정보
              </a>
            </div>
          </div>
        </Section>
      )}
      <Seperator></Seperator>
      {/* 3. 예약 일시 */}
      <div>
        <ul className="tab-menu sticky top-[47px]  bg-white">
          <li
            className={`w-[50%] leading-[48px] text-center ${
              isSelect ? " active" : ""
            }`}
            onClick={(e) => menuClick(e, 0)}
          >
            예약
          </li>
          <li
            className={`w-[50%] leading-[48px] text-center ${
              isSelect ? "" : "active"
            }`}
            onClick={(e) => {
              menuClick(e, 1);
            }}
          >
            웨이팅
          </li>
        </ul>
        {isReserve ? (
          <ReserveSection>
            <div className="container gutter-sm">
              <div className="section-header">
                <h3>예약 일시</h3>
              </div>
              <div className="section-body">
                <div className="mb-[8px]" onClick={openDrawerBottom}>
                  <a
                    href={`#`}
                    className="btn btn-lg btn-outline btn-cta full-width arrowdown"
                  >
                    <span>
                      <span className="label calendar">오늘 (월) / 2 명</span>
                    </span>
                  </a>
                </div>
                <div className="section-time-slot">
                  <div className="time-slot-unavailable-box">
                    <p className="time-slot-unavailable">예약 오픈전입니다.</p>
                  </div>
                </div>
                <div className="btn-centered">
                  <a className="btn btn-rounded btn-outline-red">
                    <span className="label arrow">예약가능 날짜 찾기</span>
                  </a>
                </div>
              </div>
            </div>
          </ReserveSection>
        ) : (
          <WaitingSection></WaitingSection>
        )}
      </div>
      <Seperator></Seperator>
      {/* 4. 탭 */}
      <RestaurantTap restaurantInfo={restaurant}></RestaurantTap>

      {/* 5. 편의시설 */}
      {/* 6. 메뉴 */}
      {/* 7. 사진 */}
      {/* 8. 추천 리뷰 */}
      {/* 9. 비슷한 레스토랑 추천 */}
      {/* 10. 매장 위치 */}
      {/* 11. 상세정보 */}
      {/* 12. 이 주변 예약이 많은 레스토랑 */}
      {/* 예약 슬라이드 페이지 */}
      <BottomBtn>
        <div className="savebtn">
          <button onClick={saveMyRestaurant}>저장</button>
          <span>{restaurant ? restaurant.savedCount : 0}</span>
        </div>
        <button className="reservebtn" onClick={onReserveCalendar}>
          <div>예약하기</div>
        </button>
      </BottomBtn>
      <CalendarComponent
        isOpen={isOpen}
        restaurant={restaurant}
        toggleDrawer={toggleDrawer}
      ></CalendarComponent>

      <RestaurantInfor
        isInforOpen={isInforOpen}
        restaurant={restaurant}
        toggleDrawerInfor={toggleDrawerInfor}
      ></RestaurantInfor>

      <SaveConfirmComponent
        isSave={isSave}
        toggleDrawer={toggleDrawer}
      >
      </SaveConfirmComponent>

      <ConfirmReserve
      ></SaveConfirmComponent>
      {/* <ConfirmReserve
        isConfirmOpen={isConfirmOpen}
        restaurant={restaurant}
        toggleDrawer={toggleDrawer}
      ></ConfirmReserve> */}
    </main>
  );
}
const Section = styled.section`
  position: relative;
  display: block;
  .restaurant-img-detail {
    position: absolute;
    bottom: 12px;
    left: 20px;
    right: 20px;
    height: 24px;
    z-index: 50;
    display: flex;
  }
  .restaurant-img-detail > span {
    display: inline-flex;
    padding: 0 12px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    border-radius: 16px;
    border: 0.5px solid var(--gray-0, #fff);
    background: rgba(0, 0, 0, 0.8);
    color: #fff;
    font-size: 10px;
    font-weight: 700;
    line-height: 150%;
  }
  .restaurant-img-detail > div {
    position: initial;
    display: inline-flex;
    width: 44px;
    margin-left: auto;
    justify-content: center;
    align-items: center;
    gap: 2px;
    border-radius: 16px;
    border: 0.5px solid var(--gray-0, #fff);
    background: rgba(0, 0, 0, 0.8);
    text-align: center;
    color: #fff;
    font-size: 10px;
    font-weight: 700;
    line-height: 150%;
  }
  .container .restaurant-summary > span {
    color: #666666;
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
  }
  .container .restaurant-summary > h2 {
    font-weight: 700;
    font-size: 20px;
    line-height: 150%;
  }
  .container .menu {
    display: flex;
    margin-top: 20px;
    /* margin-bottom: 5px; */
    height: 30px;
  }
  .container .menu a {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    height: 18px;
    margin: 2px;
    color: #222222;
    line-height: 21px;
    font-size: 14px;
    font-weight: 400;
  }
  .container .menu a:before {
    content: "";
    display: block;
    width: 16px;
    height: 16px;
    position: relative;
    margin-right: 4px;
  }
  .container .menu a:nth-child(1):before {
    background: url("https://app.catchtable.co.kr/public/img/icon/Outlined/call.svg")
      0% 50% no-repeat;
  }
  .container .menu a:nth-child(2):before {
    background: url("https://app.catchtable.co.kr/public/img/icon/Outlined/location.svg")
      0% 50% no-repeat;
  }
  .container .menu a:nth-child(3):before {
    background: url("https://app.catchtable.co.kr/public/img/icon/Outlined/building.svg")
      0% 50% no-repeat;
  }
  .container .menu a:not(:last-child) {
    border-right: 1px solid #d5d5d5;
    line-height: 18px;
  }
  .restaurant-detail .lunchDinner {
    display : flex;
    font-size : 14px;
    align-items : center;
    color : #333;
  }
  .restaurant-detail .lunchDinner .detail {
    margin-right : 20px;
    padding-left : 21px;
    position : relative;
    word-break : break-word;
  }
  .restaurant-detail .lunchDinner .detail:before {
    content : "";
    width : 18px;
    height : 18px;
    position : absolute;
    left : 0;
    top : 50%;
    transform : translateY(-50%);
  }
  .restaurant-detail .lunchDinner .detail.lunch:before {
    background : url(${lunch_dark}) 0% 50% no-repeat;
  }
  .restaurant-detail .lunchDinner .detail.dinner:before {
    background : url(${dinner_dark}) 0% 50% no-repeat;
  }
`;
const Seperator = styled.hr`
  height: 9px;
  background: #ececec !important;
`;
const Tab = styled.div`
  display: flex;
  button {
    color: #666666;
    border-bottom: 2px solid #f4f4f4;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50px;
  }
`;
const BottomBtn = styled.aside`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 0 auto;
  width: 100%;
  max-width: 480px;
  padding: 10px 16px;
  box-sizing: border-box;
  height: 72px;
  background-color: #ffffff;
  border-top: 1px solid #e5e5e5;
  .savebtn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
  }
  .savebtn > button {
    overflow: hidden;
    display: block;
    width: 24px;
    height: 24px;
    text-indent: -999em;
    background: url("https://app.catchtable.co.kr/public/img/icons/header-mark.svg")
      50% 50% no-repeat;
  }
  .savebtn > span {
    color: #666;
  }
  .reservebtn {
    display: block;
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 480px;
  }
  .reservebtn > div {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 52px;
    border-radius: 4px;
    box-sizing: border-box;
    background-color: #ff3d00;
    color: #ffffff;
  }
`;
const ReserveSection = styled.section`
  padding: 24px 0 30px 0;
  .section-header {
    padding-bottom: 12px;
    margin-bottom: 0px;
  }
  .section-header h3 {
    font-weight: 700;
    font-size: 20px;
    align-items: center;
    display: flex;
    letter-spacing: 0;
    min-width: 1px;
  }
  .section-body {
  }
`;
const WaitingSection = styled.section``;
