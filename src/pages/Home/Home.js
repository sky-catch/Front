import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { RestaurantsAll } from "../../States/LoginState.js";
import BottomSheet from "../../components/BottomSheet.js";
import Loading from "../../components/Loading.js";
import ModalDrawer from "../../components/ModalDrawer.js";
import Restaurants from "../../components/Restaurants.js";
import { getRestaurantsAll } from "../../respository/reservation.js";
import Carousel from "./Carousel.js";
import QuickSearch from "./QuickSearch.js";
import ShortCut from "./ShortCut.js";
/**
 * 메인 홈
 * @returns
 */
export default function Home() {
  const [visible, setVisible] = useState(false);
  const [restaurantsList, setRestaurantsList] = useRecoilState(RestaurantsAll);
  const [isModalOpen, setIsModalOpen] = useState(false); // Drawer 오픈여부 (true : 오픈, false : 닫음)
  const { data, isLoading, isError } = useQuery({
    queryKey: ["getRestaurantsAll"],
    queryFn: () => {
      return getRestaurantsAll()
        .then((res) => {
          setRestaurantsList(res.data);
          return res.data;
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
  });
  function onBottomSheet() {
    setVisible(!visible);
  }

  function getVisible(value) {
    setVisible(value);
  }

  const toggleDrawer = (e) => {
    setIsModalOpen((prevState) => !prevState);
  };

  const handleWhereTogo = (e) => {
    // console.log(e.currentTarget.id);
    const num = e.currentTarget.id;
    if (num == 0) {
      setIsModalOpen(true);
    } else {
    }
  };
  if (isLoading) {
    return <Loading></Loading>;
  }

  // useEffect(() => {
  //   console.log("restaurantsList", restaurantsList);
  // }, [restaurantsList]);

  return (
    <>
      <main className="main">
        <div className="myArea">
          <button onClick={onBottomSheet}>
            <i>위치설정</i>
            <span>전국</span>
          </button>
        </div>
        {/* 바텀시트 */}
        {visible && <BottomSheet visible={visible} getVisible={getVisible} />}
        {/* 캐러셀 */}
        <Carousel />
        <section className="gap"></section>
        {/* 숏컷 */}
        <ShortCut />
        <section className="gap shortcut-gap"></section>
        {/* 어디로 가시나요? */}
        <section className="section pb-[45px]">
          <div className="px-[20px]">
            <div className="section-header">
              <h3 className="font-bold">어디로 가시나요?</h3>
            </div>
            <div className="section-body">
              <div className="v-scroll">
                <div className="v-scroll-inner">
                  <QuickSearch handleWhereTogo={handleWhereTogo} />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* 웨이팅 핫플레이스 BEST */}
        <section className="section pb-[45px]">
          <div className="px-[20px]">
            <div className="section-header section-header-v">
              <h3 className="font-bold">웨이팅 핫플레이스 BEST</h3>
              <p>핫 한 웨이팅 라인업, 이제 캐치테이블에서!</p>
              <a className="btn-more">전체보기</a>
            </div>
            <div className="section-body">
              <div className="v-scroll">
                <div className="v-scroll-inner">
                  <Restaurants data={data} index={0} />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* 유저의 리얼리뷰 Pick */}
        <section className="section pb-[45px]">
          <div className="px-[20px]">
            <div className="section-header section-header-v">
              <h3 className="font-bold">유저의 리얼리뷰 Pick</h3>
              <p>방문자들이 남긴 솔직한 리뷰를 만나보세요</p>
            </div>
            <div className="section-body">
              <div className="v-scroll">
                <div className="v-scroll-inner">
                  <Restaurants data={data} index={1} />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* 유저 이름님이 좋아할 매장 */}
        {sessionStorage.getItem("token") && (
          <section className="section pb-[45px]">
            <div className="px-[20px]">
              <div className="section-header section-header-v">
                <h3 className="font-bold">
                  {JSON.parse(sessionStorage.getItem("data")).nickname} 님이
                  좋아할 매장
                </h3>
                <p>마음에 들 만한 곳을 모아봤어요</p>
                <a className="btn-more">전체보기</a>
              </div>
              <div className="section-body">
                <div className="v-scroll">
                  <div className="v-scroll-inner">
                    <Restaurants data={data} index={3} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 놓치면 안되는 혜택 가득! */}
        <section className="section pb-[45px]">
          <div className="px-[20px]">
            <div className="section-header section-header-v">
              <h3 className="font-bold">놓치면 안되는 혜택 가득!</h3>
              <p>미식생활을 더욱 스마트하게 즐겨보세요</p>
              <a className="btn-more">전체보기</a>
            </div>
            <div className="section-body">
              <div className="v-scroll">
                <div className="v-scroll-inner">
                  <Restaurants data={data} index={4} />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* 캐치테이블 on! */}
        <section className="section pb-[45px]">
          <div className="px-[20px]">
            <div className="section-header section-header-v">
              <h3 className="font-bold">캐치테이블 ON!</h3>
              <p>편리한 캐치테이블 예약이 오픈되었어요</p>
              <a className="btn-more">전체보기</a>
            </div>
            <div className="section-body">
              <div className="v-scroll">
                <div className="v-scroll-inner">
                  <Restaurants data={data} index={5} />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* 미쉐린 가이드 2024 */}
        <section className="section pb-[45px]">
          <div className="px-[20px]">
            <div className="section-header section-header-v">
              <h3 className="font-bold">미쉐린 가이드 2024</h3>
              <p>미쉐린 맛집도 이제 캐치테이블에서!</p>
              <a className="btn-more">전체보기</a>
            </div>
            <div className="section-body">
              <div className="v-scroll">
                <div className="v-scroll-inner">
                  <Restaurants data={data} index={6} />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>광고 배너</section>
      </main>

      <ModalDrawer
        isOpen={isModalOpen}
        toggleDrawer={toggleDrawer}
      ></ModalDrawer>
    </>
  );
}
