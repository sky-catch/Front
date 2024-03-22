import React, { useEffect, useState } from "react";
import "react-modern-drawer/dist/index.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import CalendarComponent from "../../components/CalendarComponent";
import { getRestaurant } from "../../respository/restaurant";

/**
 * 식당
 *
 * @author jimin
 */

const shopImgItem = {
  id: 0,
  name: "본디",
  detail:
    "비장탄 숯을 이용한 돼지 생갈비, 즉석 양념갈비, 장작으로 구워낸 껍데기 맛이 일품인 곳",
  star: 4.7,
  tags: "돼지고기구기 | 석촌",
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
  const [restaurant, setRestaturant] = useState();
  const [openBottom, setOpenBottom] = React.useState(false);
  const openDrawerBottom = () => setOpenBottom(true);
  const closeDrawerBottom = () => setOpenBottom(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const setRestaurantInfo = (name) => {
    getRestaurant(name)
      .then((res) => {
        //TODO: 데이터 적용 완료
        console.log(res.data);
        setRestaturant(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // setRestaurantInfo(1);
    setRestaurantInfo(encodeURIComponent("ㅁㅁ오마카세"));
  }, []);

  return (
    <main className="pb-[74px]">
      {/* 1. 식당 이미지 */}
      <section className="restaurant-detail-header">
        <Swiper
          className=""
          onClick={() => {
            toggleDrawer();
          }}
        >
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
          <div></div>
        </div>
      </section>
      {/* 2. 식당 이름 및 메인 정보 */}
      <section className="section">
        <div className="container gutter-sm pt-[24px] pb-[24px]">
          <div className="restaurant-summary">
            <span>{shopImgItem.tags}</span>
            <h2>{shopImgItem.name}</h2>
            <div>{shopImgItem.star}</div>
          </div>
          <div className="restaurant-detail">
            <p>{shopImgItem.detail}</p>
            <div>
              <span>점심 저녁 동일가 1-3만원</span>
            </div>
          </div>
          <div className="menu">
            <a className="call">전화</a>
            <a className="location">위치</a>
            <a className="building">매장정보</a>
          </div>
        </div>
      </section>
      <hr className="separator"></hr>
      {/* 3. 예약 일시 */}
      <div>
        <section className="waiting">
          <div className="section-header">
            <h3>예약 일시</h3>
          </div>
          <div className="section-body">
            <div className="mb-[8px]" onClick={openDrawerBottom}>
              <a
                href="#"
                className="btn btn-lg btn-outline btn-cta full-width arrowdown"
              >
                <span>
                  <span className="label calendar">오늘 (월) / 2 명</span>
                </span>
              </a>
            </div>
            <div></div>
            <div></div>
          </div>
        </section>
      </div>
      <hr className="separator"></hr>
      {/* 4. 탭 */}
      {/* 5. 편의시설 */}
      {/* 6. 메뉴 */}
      {/* 7. 사진 */}
      {/* 8. 추천 리뷰 */}
      {/* 9. 비슷한 레스토랑 추천 */}
      {/* 10. 매장 위치 */}
      {/* 11. 상세정보 */}
      {/* 12. 이 주변 예약이 많은 레스토랑 */}
      {/* 예약 슬라이드 페이지 */}
      <CalendarComponent
        isOpen={isOpen}
        restaurant={restaurant}
        toggleDrawer={toggleDrawer}
      ></CalendarComponent>
    </main>
  );
}
