import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";

/**
 * 전체 검색
 * @author jimin
 */
export default function SearhTotal ({search}) {
    const navigate = useNavigate();
    const [ region, setRegion ] = useState([]); //지역
    const [ diner, setDiner ] = useState([]); // 레스토랑
    const [ keywords, setKeywords ] = useState( JSON.parse(localStorage.getItem('keywords')) || [] );
    const [ input, setInput ] = useState("");
    var cityCount, hotCount = 0;

    // funtion : 식당 이동 
    const handleMovePage = (e) => {
        var param = e.currentTarget.id;
        navigate(`/ct/shop/${param}`, {state : param});
    }

    // function : 지역 검색
    const handleSearch = (e) => {
        console.log(e.currentTarget);
        navigate()
        // 선택해야 최근 검색어로 저장
        handleAddKeyword(e.currentTarget.id);
    }

    // function : 최근 검색어 추가
    const handleAddKeyword = (text) => {
        console.log(text);
        const newText = {
            id : Date.now(),
            text : text
        }
        setKeywords([newText, ...keywords]);
    }

    // function : 최근 검색어 삭제창 노출
    const handleDeleteAlert = (e) => {
        var recent = e.currentTarget.nextSibling.classList;
        console.log(e.currentTarget);
        recent.forEach((item) => {
            if (item == "show") {
                recent.remove('show');
            } else {
                recent.add('show');
            }
        })
    }

    // function : 최근 검색어 전체 삭제
    const handleDeleteAll = (e) => {
        console.log(e.currentTarget.parentNode.classList);
        setKeywords([]);
    }

    useEffect(()=> {
        // 1. 지역, 레스토랑 저장
        var arr1 = ["city", "hotPlace"];
        var arr2 = [];
        Object.entries(search).map((item, idx) => {
            if(arr1.indexOf(item[0]) > -1 && (item[1] != null)) {
                var data = {};
                data[item[0]] = item[1];
                arr2.push(data);
            }

            if(item[0]=="restaurantSummaryDTOList") {
                setDiner(item[1]);
            }

            if(item[0] == "input") {
                setInput(item[1]);
            }
        })
        setRegion(arr2);
        console.log(region,diner,input);

        // 2. 최근 검색어 저장
        // arr타입을 string 형태로 바꾸기 위해 json.stringfy 사용
        localStorage.setItem('keywords', JSON.stringify(keywords));
        
    },[search, keywords]);

    return(
        <ContentMain>
            <hr className="seperator" />
            <section>
                <div className="mt-[18]">
                    {/* 검색 전 : 최근검색 */}
                    { region.length < 1 && input.length < 1 ?
                    <div className="container gutter-sm">
                        <div className="recent-input-header flex justify-between">
                            <h3 className="title">최근 검색어</h3>
                            <div className="dots">
                                <button type="button" onClick={handleDeleteAlert}></button>
                                <div className="delete-alert alert-box">
                                    <button type="button" onClick={handleDeleteAll}>전체 삭제</button>
                                </div>
                            </div>
                        </div>
                        <div className="recent-input-body">
                            <Swiper
                                slidesPerView={"auto"}
                                // className="swiper-wrapper"
                                >
                                {
                                    keywords.map((item, index) => {
                                        console.log(item);
                                        return(
                                            <SwiperSlide
                                                key={index}
                                                className="swiper-slide-chip chip-design">
                                                    <a>{item.text}</a>
                                            </SwiperSlide>
                                        )
                                    })
                                }
                            </Swiper>
                        </div>
                    </div>
                    : "" }
                    {/* 검색후 : 결과 O */}
                    <div>
                        {/* 1.지역 */}
                        { region.length > 0 ?
                            <section className="pt-[10px]">
                                <div className="container gutter-sm">
                                    <div className="form-block">
                                        <div className="form-block-header"><h2>지역</h2></div>
                                        <div className="form-block-body">
                                            {
                                                region.map((item, idx) => {
                                                    if( (Object.keys(item) == "city" && Object.values(item) != "" ) || 
                                                        (Object.keys(item) == "hotPlace" && Object.values(item) != "" ) ) {
                                                            // console.log(item);
                                                        return (
                                                            <div className="searched-keyword-left-item" key={idx}
                                                                id={Object.values(item)}
                                                                onClick={handleSearch}>
                                                                <i className="icon"></i>
                                                                <span>{Object.values(item)}</span>
                                                                {/* <small>{cityCount}, {hotCount}</small> */}
                                                            </div>
                                                        )
                                                    }
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </section>
                         : "" }
                        {/* 2. 식당 */}
                        {
                            diner.length > 0 ? 
                        <>
                            <hr />
                            <div>
                                <section className="pt-[10px]">
                                    <div className="container gutter-sm">
                                        <div className="form-block">
                                            <div className="form-block-header"><h2>레스토랑</h2></div>
                                            <div className="form-block-body">
                                                {
                                                    diner.map((item, idx) => {
                                                        return(
                                                            <div className="searched-keyword-left-item" key={item.restaurantId}
                                                                id={item.name}
                                                                onClick={handleMovePage}>
                                                                <div className="tb">img</div>
                                                                <div className="keyword">
                                                                    <h4 className="name">{item.name}</h4>
                                                                    <div className="location">{item.fullAddress}</div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </>
                    : ""}
                    </div>
                    {/* 검색후 : 결과 X */}
                    {
                        input.length > 0 && ( region.length < 1 ) && ( diner.length < 1) ?
                        <div>
                            <div className="search-result-nodata">
                                <div className="search-result-nodata-text">
                                    <span>앗! 검색결과가 없어요.</span>
                                    원하는 매장이 없다면 캐치테이블에 제안해주세요.
                                </div>
                            </div>
                        </div>
                    : "" }
                </div>
            </section>
        </ContentMain>
    )
}

const ContentMain = styled.main`
    margin-top: 47px;
`;