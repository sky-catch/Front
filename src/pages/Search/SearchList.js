    import { useEffect, useState } from "react";
    import { useLocation, useNavigate } from "react-router-dom";
    import { Swiper, SwiperSlide } from "swiper/react";
    import FilterDrawer from "../../components/Modal/FilterDrawer.js";
    import { FaStar } from "react-icons/fa";
    import { useQuery } from "@tanstack/react-query";
    import { searchByFilter } from "../../respository/search.js";

    /**
     * 검색 결과
     * @returns 
     */
    export default function SearchList () {
        const navigate = useNavigate();
        const {state} = useLocation();
        const [filterInfo, setFilterInfo] = useState(state); // 검색 결과 필터 정보
        const {data: searchList} = useQuery({queryKey : [ 'filter', filterInfo], queryFn : ()=>searchByFilter(filterInfo), enabled:!!filterInfo });
        let restaurantList = searchList?.getRestaurantSearchListRes; // 레스토랑 리스트
        let filter = searchList?.searchFilter; // 검색 결과 필터 정보
        
        const isFilterOn = (filterInfo?.hotPlace || filterInfo?.koreanCity) || (state?.maxPrice > 0 || state?.minPrice > 0) ;
        const [isFilter, setIsFilter] = useState(false);  // 필터패널 open 여부 (false : 닫음, true : 열림)
        console.log('filterInfo', filterInfo, 'state', state,'filter',filter, 'restaurantList', restaurantList);

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
            let name = param.name;
            navigate(`/ct/shop/${name}`, { state: name });
        }

        /* 상세 검색 패널 열기 */
        const toggleFilterDrawer = (e) => {
            setIsFilter((prevState) => !prevState);
        };

        useEffect(()=>{
            if(!state) return;
        },[state])

        const week = ["일", "월", "화", "수", "목", "금", "토"];
        const date = new Date(filterInfo?.date);
        const minNum = filterInfo?.personCount;
        const time = filterInfo?.time;
        return (
            <main id="main">
                <div>   
                    <div className="search-header">
                        <div className="datetime-selector" onClick={handleCalendarDialog}>
                            <a>
                                <span>
                                    { String(date.getMonth() + 1).padStart(2, "0") +
                                    "." +
                                    String(date.getDate()).padStart(2, "0") +
                                    "(" +
                                    week[date.getDay()] +
                                    ")"} / {minNum}명 / {time}
                                </span>
                            </a>
                        </div>
                        <div className="chip-filter">
                            <div className="filter-icon">
                            <button
                                className={`design_system ${
                                    isFilterOn? "active" : ""
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
                                <span className={`filters ${ isFilterOn ? "active" : "" }`}>
                                    {1}</span>
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
                                            ${ (filterInfo?.hotPlace || filterInfo?.koreanCity) && index==0
                                                || ( (filterInfo?.maxPrice > 0 || filterInfo?.minPrice > 0) && index==1) ? 'active' : ''}
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
                                    <div className="search-list pb-[30px]">
                                        {   
                                        restaurantList && restaurantList.length > 0 ?
                                        restaurantList.map((item,index)=> {
                                            return(
                                                <div key={index} className="search-list-item"
                                                    onClick={()=>onClickRestaurant(item)}
                                                >
                                                    <div className="tb">
                                                        <div className="img"><img src={item.imageUrl}></img></div>
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
                setFilterInfo={setFilterInfo}
                searchFilter={filterInfo}
                ></FilterDrawer>
            </main>
        )
    }