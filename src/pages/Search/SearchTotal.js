import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { searchByKeyword } from "../../respository/search";
import replace from "../../assets/icons/restaurant.svg";

/**
 * 전체 검색
 * @author jimin
 */
export default function SearhTotal({ search }) {
  const navigate = useNavigate();
  const [keywords, setKeywords] = useState(JSON.parse(sessionStorage.getItem("keywords")) || []); // 최근 검색어
  
  const { data : searchResult, isLoading } = useQuery({ queryKey : [search], queryFn : searchByKeyword}); // 레스토랑
  console.log(search,searchResult);
  let restaurants = searchResult?.restaurantSummaryDTOList;
  let region = [];  // 지역 정보
  for (let key in searchResult) {
    if(key == 'city' && searchResult[key] != null) {
      region.push([searchResult[key], searchResult['cityRestaurantCount']]);
    } 
    if(key == 'hotPlace' && searchResult[key] != null) {
      // [ToDo] hotPlace가 복수개면 로직 수정해야할듯
      region.push([searchResult[key], searchResult['hotPlaceRestaurantCount']]);
    }
  }
  // console.log('searchResult : ', searchResult, 'restaurants:', restaurants, 'search:',search, 'keywords:',keywords);


  // funtion : 식당 이동
  const handleMovePage = (e) => {
    var param = e.currentTarget.id;
    navigate(`/ct/shop/${param}`, { state: param });
  };

  // function : 지역 검색
  const handleSearch = (e) => {
    // 선택한 지역으로 검색!
    navigate(`/search/list`); 
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
    console.log(!search);
    // if(!search) {
      restaurants = [];
    // }
  }, [search, keywords]);

  return (
    // <></>
    <ContentMain>
      <hr className="seperator" />
      <section>
        <div className="mt-[18]">
          {/* 검색 전 : 최근검색 = 검색 결과 없으면 */}
          {region?.length < 1 && keywords.length > 0 && (
            <div className="container gutter-sm">
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
                  slidesPerView={"auto"}
                  // className="swiper-wrapper"
                >
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
            </div>
          )}
          {/* 검색후 : 결과 O */}
          <div>
            {/* 1.지역 */}
            {region?.length > 0 && (
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
                            id={item[0]}
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
            { restaurants?.length > 0 && 
              <>
                <div>
                  <section className="pt-[10px] mb-[50px]">
                    <div className="container gutter-sm">
                      <div className="form-block">
                        <div className="form-block-header">
                          <h2>레스토랑</h2>
                        </div>
                        <div className="form-block-body">
                          { restaurants.map((item, idx) => {
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
          {/* 검색후 : 결과 X */}
          {/* { input.length > 0 && region.length < 1 && restaurants ? (
            <div>
              <div className="search-result-nodata">
                <div className="search-result-nodata-text">
                  <span>앗! 검색결과가 없어요.</span>
                  원하는 매장이 없다면 캐치테이블에 제안해주세요.
                </div>
              </div>
            </div>
          ) : (
            ""
          )} */}
        </div>
      </section>
    </ContentMain>
  );
}

const ContentMain = styled.main`
  margin-top: 47px;
`;
