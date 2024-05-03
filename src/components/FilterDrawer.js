import { useEffect, useState, useRef } from "react";
import Drawer from "react-modern-drawer";
import { Swiper, SwiperSlide } from "swiper/react";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

/**
 * 검색 필터 Drawer
 * @returns 
 */
const FilterDrawer = ({isFilter, toggleFilterDrawer, setFilterInfo}) => {
    const regionBox = useRef(null);
    const costBox = useRef(null);
    const placeRef = useRef([]);
    const sliderRef = useRef([]);

    const [isContent, setIsContent] = useState(1);
    const [isSelect, setIsSelect] = useState(0);
    const [cities, setCities] = useState([]);
    const cityItems = [
        {name:"핫플"},{name:"서울"},{name:"경기"},{name:"인천"},{name:"부산"},
        {name:"제주"},{name:"울산"},{name:"경남"},{name:"대구"},{name:"경북"},
        {name:"강원"},{name:"대전"},{name:"충남"},{name:"충북"},{name:"세종"},
        {name:"전남"},{name:"광주"},{name:"전북"},
    ];
    const hotplaces = [
        {name:"서울 전체"},{name:"강남/역삼/선릉"},{name:"강남구청"},{name:"건대/군자/구의"},{name:"금호/옥수/신당"},{name:"명동/을지로/충무로"},{name:"방이"},
        {name:"북촌/삼청"},{name:"삼성/대치"}, {name:"상수/합정/망원"}, {name:"서울역/회현"}, {name:"서초/방배"}, {name:"서촌"}, {name:"성수/서울숲"},
        {name:"신사/논현"}, {name:"신촌/홍대/서교"}, {name:"압구정/청담"}, {name:"양재/도곡"}, {name:"연남"}, {name:"영등포/여의도"}, {name:"용산/삼각지"},
    ]
    const costItems = [
        {name:"10만원 이하",min:0,max:10},{name:"10만원대",min:10,max:20},{name:"20만원대",min:20,max:30},{name:"30만원대",min:30,max:40},{name:"40만원대 이상",min:40,max:40}
    ]
    const [ selected, setSelected ] = useState([]);
    const [ cost, setCost ] = useState({
        min : 0,
        max : 40
    })

    /* tap 클릭이벤트 */
    const contentClick = (e, index) => {
        if(index === 0) {
            setIsContent(1);
            regionBox.current.scrollIntoView({behavior:"smooth"});
        } else if (index === 1){
            setIsContent(2);
            costBox.current.scrollIntoView({behavior:"smooth"});
        }
    }

    /* button 클릭이벤트 */
    const buttonClick = (e, index) => {
        setIsSelect(index);
    }

    /* function : 도시선택 */
    const onSelectCity = (e, newCity) => {
        setCities([newCity, ...cities]);


        const recent = e.currentTarget.classList;
        const recentText = e.currentTarget.innerText;

        //서울 전체인 경우
        const list = placeRef.current;
        if( recentText == "서울 전체" ) {
            if( recent.length < 1 ) {
                list.map((item) => {
                    const arr1 = item.classList;
                    arr1.add("active");
                })
            } else {
                list.map((item) => {
                    const arr1 = item.classList;
                    arr1.remove("active");
                })
                setCities([]);
            }
        } else {
            // 각각인 경우
            if( recent.length < 1) { 
                recent.add("active");
            } else {
                recent.forEach((item, idx) => {
                    if(item == "active") {
                        recent.remove("active");
                        setCities(cities.filter(word => word !== newCity));
                    } else {
                        recent.add("active");
                    }
                })
            }
        }
    }

    /* function : 검색적용 */
    const handleSearch = (e) => {
        toggleFilterDrawer(e);
        setFilterInfo(cities);
    }

    /* function : 초기화 */
    const handleReset = (e) => {
        setCities([]);
        const list = placeRef.current;
        list.map((item) => {
            const arr1 = item.classList;
            arr1.remove("active");
        })
    }

    /* function : 닫기 */
    const handleClose = (e) => {
        handleReset();
        toggleFilterDrawer(e);
    }

    /* function : 가격 설정 */
    const handleChange = (props) => {
        const [ min, max ] = props;
        console.log(min,max);
        setCost({
            'min' : min,
            'max' : max
        })
    }

    /* function : 가격 설정 */
    const handleClickCost = (e) => {
        const min = e.currentTarget.getAttribute("min");
        const max = e.currentTarget.getAttribute("max");
        
        handleChange([min,max])
    }

    useEffect(()=>{
        console.log(cities);
    },[cities])

    return (
        <div className="filter-drawer">
            <Drawer
                open={isFilter}
                onClose={toggleFilterDrawer}
                direction="bottom"
                className="drawer-box custom-box"
                size="calc(100vh - 150px)"
            >
                <div className="filter-wrapper">
                    <header className="sticky">
                        <Swiper className="swiper-container">
                            <div className="swiper-wrapper box-content custom-tap">
                                <SwiperSlide className="w-fit">
                                    <li className={`flex justify-start
                                        ${isContent == 1 ? "selected-tap" : ""}
                                        `}
                                        onClick={(e)=>contentClick(e,0)}
                                    >지역</li>
                                </SwiperSlide>
                                <SwiperSlide className="w-fit">
                                    <li className={`flex justify-start
                                        ${isContent == 2 ? "selected-tap" : ""}
                                        `}
                                        onClick={(e)=>contentClick(e,1)}
                                    >가격</li>
                                </SwiperSlide>
                            </div>
                        </Swiper>
                    </header>
                    <main>
                        <div>
                            <section className="py-[15px] pl-[20px] pr-[20px] region-box"
                                ref={regionBox}
                                >
                                <div className="flex justify-between">
                                    <h3 className="title">지역</h3>
                                    <button className="reset-btn" onClick={handleReset}>초기화</button>
                                </div>
                                <div className="flex city-wrapper">
                                    <div className="grid grid-cols-5">
                                        {cityItems.map((item,index) => {
                                            return(
                                                <button 
                                                    className={`${isSelect == index ? "active" : ""}`}
                                                    onClick={(e)=>buttonClick(e,index)}>
                                                {item.name}</button>
                                            )
                                        })}
                                    </div>
                                    <div></div>
                                </div>
                                <div className="flex hotplace-wrapper">
                                    {hotplaces.map((item,index) => {
                                        return(
                                            <button type="button"
                                                onClick={(e)=>{onSelectCity(e,item.name)}}
                                                ref={el => placeRef.current[index] =el}
                                                ><span>{item.name}</span></button>
                                        )
                                    })}
                                </div>
                            </section>
                        <hr className="seperator"></hr>
                        </div>
                        <div>
                            <section className="py-[15px] pl-[20px] pr-[20px] cost-box"
                                ref={costBox}
                                >
                                <div className="flex justify-between">
                                    <h3 className="title">가격</h3>
                                    <button className="reset-btn">초기화</button>
                                </div>
                                <div className="slider-wrapper">
                                    <h3 className="title">
                                        { cost.min > 0 ? `${cost.min}만원` : `${cost.min}원` } ~ { `${cost.max}만원` }</h3>
                                    <div className="slider-wrapper-inner">
                                        <Slider
                                            range
                                            min={0}
                                            max={40}
                                            defaultValue={[0,40]}
                                            marks={{0:'0원', 20:'20만원', 40:'40만원 이상'}}
                                            onChange={handleChange}
                                            tipFormatter={value => `${value}`}
                                        />
                                    </div>
                                    <div className="slider-help">
                                        { costItems.map((item, index) => {
                                            return(
                                                // <button key={index}>{item}</button>
                                                <button key={index} onClick={handleClickCost} min={item.min} max={item.max}>{item.name}</button>
                                            )})
                                        }
                                    </div>
                                </div>
                            </section>
                        </div>
                    </main>
                    <footer className="fixed">
                        <div className="gradient"></div>
                        <div></div>
                        <div className="flex items-center bg-[#fff] btn-box">
                            <button className="flex items-center justify-center" onClick={(e)=>handleClose(e)}>닫기</button>
                            <button className="flex items-center justify-center" onClick={(e)=>handleSearch(e)}>적용하기</button>
                        </div>
                    </footer>
                </div>
            </Drawer>
        </div>

    )
}
export default FilterDrawer;