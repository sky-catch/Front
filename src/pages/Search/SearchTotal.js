import { QueryClient, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { searchByKeyword } from "../../respository/search";
import replace from "../../assets/icons/restaurant.svg";
import Restaurants_sm from "../../components/Restaurants-sm";

/**
 * 검색어 검색화면 - 목록
 * @author jimin
 */
export default function SearhTotal({ search }) {
  const navigate = useNavigate();
  const [keywords, setKeywords] = useState(JSON.parse(sessionStorage.getItem("keywords")) || []); // 최근 검색어
  let restaurantList = [];  // 식당 목록 기본 초기화
  let region = [];  // 도시 정보 기본 초기화
  let place = []; //  상세지역 정보 기본 초기화
  
  const { data : searchResult, isLoading } = useQuery({ 
    queryKey : ['search', search], 
    queryFn : ()=>searchByKeyword(search)
  }); // 식당
  restaurantList = searchResult?.restaurantSummaryDTOList;  // 식당 목록 세팅
  console.log(searchResult);
  
  //지역 목록 세팅
  for (let key in searchResult) {
    if(key == 'city' && searchResult[key] != null) {
      region.push([searchResult[key], searchResult['cityRestaurantCount']]);
    } 
    if(key == 'hotPlace' && searchResult[key] != null) {
      // [ToDo] hotPlace가 복수개면 로직 수정해야할듯
      place.push([searchResult[key], searchResult['hotPlaceRestaurantCount']]);
    }
  }
  let allRegion = [...region, ...place];
  // console.log('allRegion',allRegion);


  // funtion : 식당 이동
  const handleMovePage = (e) => {
    var param = e.currentTarget.id;
    navigate(`/ct/shop/${param}`, { state: param });
  };

  // function : 지역 검색
  const handleSearch = (e) => {
    // 선택한 지역으로 검색!
    const date = new Date();
    let id = e.currentTarget.id;
    let [city, place] = '';
    if (id.indexOf('koreanCity') > -1) city = id.split(' ')[1];
    else place = id.split(' ')[1];
    // console.log(city, place);
    const filter = {
      date : `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`,
      time : `07:00`,
      personCount : 2,
      koreanCity : city,
      hotPlace: place,
      category: '한식',
      minPrice: 0,
      maxPrice: 0,
      orderType: '기본순',
  };
    navigate(`/search/list`, {state : filter }); 
    // 선택해야 최근 검색어로 저장
    handleAddKeyword(e.currentTarget.id);
  };

  // function : 최근 검색어 추가
  const handleAddKeyword = (text) => {
    let isAdd = true;
    const newText = {
      id: Date.now(),
      text: text,
    };
    // 최근 검색어 리스트에 이미 있으면 넣지 않는다.
    for(let v of keywords) {if(text==v.text){isAdd = false;return;}}
    if(isAdd) setKeywords([newText, ...keywords]);
  };

  // function : 최근 검색어 삭제창 노출
  const handleDeleteAlert = (e) => {
    var recent = e.currentTarget.nextSibling.classList;
    recent.forEach((item) => {
      if (item == "show") {
        recent.remove("show");
      } else {
        recent.add("show");
      }
    });
  };

  // function : 최근 검색어 전체 삭제
  const handleDeleteAll = (e) => {
    console.log(e.currentTarget.parentNode.classList);
    setKeywords([]);
  };

  //
  const handleImg =(e) => {
    console.log(e.target.src);
    e.target.src = replace;
  }

  useEffect(() => {
    // 최근 검색어 저장
    // arr타입을 string 형태로 바꾸기 위해 json.stringfy 사용
    sessionStorage.setItem("keywords", JSON.stringify(keywords));
    restaurantList = []; //초기화
  }, [search, keywords]);

  return (
    <main className="main">
      <hr className="seperator" />
      <section>
        <div className="mt-[18]">
          {/* 디폴트 : 검색어 입력 전 */}
          {/* 키워드 데이터가 있으면 노출한다. */}
          { !search && keywords.length > 0 && <div className="container gutter-sm">
              <div className="recent-input-header flex justify-between">
                <h3 className="title">최근 검색어</h3>
                <div className="dots">
                  <button type="button" onClick={handleDeleteAlert}></button>
                  <div className="delete-alert alert-box">
                    <button type="button" onClick={handleDeleteAll}>
                      전체 삭제
                    </button>
                  </div>
                </div>
              </div>
              <div className="recent-input-body">
                <Swiper
                  slidesPerView={"auto"}>
                  {keywords.map((item, index) => {
                    return (
                      <SwiperSlide
                        key={index}
                        className="swiper-slide-chip chip-design"
                      >
                        <a>{item.text}</a>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
          </div>}
          {/* 검색 후 : 결과가 없다면 X */}
          { search && ( restaurantList?.length < 1 || allRegion?.length < 1) && (
            <div>
              <div>
                <div className="search-result-nodata">
                  <div className="search-result-nodata-text">
                    <span>앗! 검색결과가 없어요.</span>
                    원하는 매장이 없다면 캐치테이블에 제안해주세요.
                  </div>
                </div>
              </div>
              <hr className="seperator"></hr>
            </div>
          )}
          { (!search || restaurantList?.length < 1 && allRegion?.length < 1 ) && <div className="container gutter-sm mt-[24px]">
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
          </div>}
          {/* 검색 후 : 결과가 있다면 O */}
          <div>
            {/* 1.지역 */}
            {allRegion?.length > 0 && (
              <>
              <section className="pt-[10px]">
                <div className="container gutter-sm">
                  <div className="form-block">
                    <div className="form-block-header">
                      <h2>지역</h2>
                    </div>
                    <div className="form-block-body">
                      {region.map((item, idx) => {
                        if(!item) return;
                        return (
                          <div
                            className="searched-keyword-left-item"
                            key={idx}
                            id={`koreanCity ${item[0]}`}
                            onClick={handleSearch}
                          >
                            <i className="icon"></i>
                            <span>{item[0]}</span>
                            <small>{item[1]}</small>
                          </div>
                        );
                      })}
                      {place.map((item, idx) => {
                        if(!item) return;
                        return (
                          <div
                            className="searched-keyword-left-item"
                            key={idx}
                            id={`hotplace ${item[0]}`}
                            onClick={handleSearch}
                          >
                            <i className="icon"></i>
                            <span>{item[0]}</span>
                            <small>{item[1]}</small>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </section>
              <hr />
              </>
            )}
            {/* 2. 식당 */}
            { restaurantList?.length > 0 && 
              <>
                <div>
                  <section className="pt-[10px] mb-[50px]">
                    <div className="container gutter-sm">
                      <div className="form-block">
                        <div className="form-block-header">
                          <h2>레스토랑</h2>
                        </div>
                        <div className="form-block-body">
                          { restaurantList.map((item, idx) => {
                            return (
                              <div
                                className="searched-keyword-left-item"
                                key={idx}
                                id={item.name}
                                onClick={handleMovePage}
                              >
                                <div className="tb"><img className="img" src={item.imageUrl} onError={handleImg}></img></div>
                                <div className="keyword">
                                  <h4 className="name">{item.name}</h4>
                                  <div className="location">
                                    {item.fullAddress}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </>
          }
          </div>
        </div>
      </section>
    </main>
  );
}