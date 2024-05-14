import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import FilterDrawer from "../../components/FilterDrawer.js";
import { FaStar } from "react-icons/fa";

/**
 * 검색 결과
 * @returns 
 */
export default function SearchList (params) {
    const navigate = useNavigate();
    const {state} = useLocation();
    const [restaurantList, setRestaurantList] = useState(); //검색 결과 레스토랑 리스트
    const [filter, setFilter] = useState();  // 검색 결과 필터 정보
    const [isFilter, setIsFilter] = useState(false);  // 필터패널 open 여부 (false : 닫음, true : 열림)

    const menuItems = [{
        id: 1,
        title: "지역",
      },{
        id: 2,
        title: "가격",
      }
    ];

    const handleCalendarDialog =(e)=> {

    }
    /* Function : 레스토랑 클릭 */
    const onClickRestaurant =(param)=> {
        console.log(param);
        let name = param.name;
        navigate(`/ct/shop/${name}`, { state: name });
    }

    /* 상세 검색 패널 열기 */
    const toggleFilterDrawer = (e) => {
        setIsFilter((prevState) => !prevState);
    };

    useEffect(()=>{
        if(!state) return;
        setRestaurantList(state.getRestaurantSearchListRes);
        setFilter(state.searchFilter);
        console.log(restaurantList,filter);
    },[state])

    const week = ["일", "월", "화", "수", "목", "금", "토"];
    return (
        <main id="main">
            <div>   
                <div className="search-header">
                    <div className="datetime-selector" onClick={handleCalendarDialog}>
                        <a>
                        <span>
                          {filter && filter.date}
                        </span>
                        </a>
                    </div>
                    <div className="chip-filter">
                        <div className="filter-icon">
                        <button
                            className={`design_system ${
                                filter ? "active" : ""
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
                                    <button type="button" className={`slide-button
                                    ${filter ? 'active' : ''}
                                    `} onClick={toggleFilterDrawer}>
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
                    <hr className="seperator" /> 
                    {
                    restaurantList ?
                   <div>
                        <div id="search-result-header" className="flex justify-between ">
                            <div className="list-count">
                                <strong>{restaurantList.length}개</strong>의 매장
                            </div>
                        </div>
                        <section className="list-items">
                            <div className="container gutter-sm">
                                <div className="search-list pb-[10px]">
                                    {   
                                    restaurantList && restaurantList.length > 0 ?
                                    restaurantList.map((item,index)=> {
                                        // let imgLink = `background-image:url("${item.imageUrl}")\;]`;
                                        return(
                                            <div key={index} className="search-list-item"
                                                onClick={()=>onClickRestaurant(item)}
                                            >
                                                <div className="tb">
                                                    <div className="img"></div>
                                                </div>
                                                <div className="detail flex">
                                                    <div className="detail-header flex">
                                                        <div className="txt">
                                                            <h4 className="name">{item.name}</h4>
                                                            <p className="excerpt">{item.content}</p>
                                                        </div>
                                                        <a className="btn-bookmark">북마크</a>
                                                    </div>
                                                    <div className="restaurant-meta">
                                                        <div className="flex align-center">
                                                            <FaStar width='16px' height='16px' color="FFC94A" /> {Math.floor(item.reviewAvg)}
                                                        </div>
                                                    </div>
                                                    <div className="timetail-list"></div>
                                                </div>
                                            </div>
                                        )
                                    }) :''
                                    }
                                </div>
                            </div>
                        </section>
                    </div>
                     :
                    <div>
                        <div className="container gutter-sm flex justify-center">
                            검색 결과가 없습니다.
                        </div>
                    </div>}
            </div>
            {/* 필터 패널 Drawer */}
            <FilterDrawer
            isFilter={isFilter}
            toggleFilterDrawer={toggleFilterDrawer}
            setFilterInfo={()=>{

            }}
            ></FilterDrawer>
        </main>
    )
}