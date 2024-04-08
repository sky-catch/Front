import { useEffect, useState } from "react";
import RestaurantTap from "../../components/RestaurantTap.js";
import { useLocation } from "react-router-dom";
import { getRestaurant } from "../../respository/restaurant.js";
import styled from "styled-components";
import ReviewItem from "./ReviewItem.js";

/**
 * 각 식당의 리뷰 목록
 * @author jimin 
 */
export default function ReviewList() {
    const location = useLocation();
    const [restaurant, setRestaurant] = useState();
    const createArray = (length) => [...Array(length)]
    
     /* Function : 식당 정보 조회 */
    const setRestaurantInfo = (name) => {
        getRestaurant(name)
        .then((res) => {
            setRestaurant(res.data);
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    };
    
    useEffect(() => {
        const shopName = location.state;
        console.log(shopName);
        if( !restaurant ) {
            setRestaurantInfo(shopName);
          } 
    },[restaurant])

    return(
        <Main className="main">
            <RestaurantTap restaurantInfo={restaurant}></RestaurantTap>
            <section className="section mb-[16px]">
                <div className="container gutter-sm">
                    <div className="review-rating-summary review-rating-summary-splitview">
                        <div className="average">
                            <h5>N개 리뷰 별점 평균</h5>
                            <div className="score"><strong>{restaurant ? restaurant.reviewAvg : ""}</strong></div>
                        </div>
                        <div className="rating-distribution">
                            <ul>
                                {createArray(5).map((n,i)=>(
                                    <li>
                                        <span className="reating-score">{5-i}점</span>
                                        <span className="progress"><span className="bar"></span></span>
                                        <span className="count">0</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            {restaurant ? ( <section>
                <div className="section-header"></div>
                <div className="container gutter-sm">
                    <div className="section-body">
                    {restaurant.reviewComments.map((item, index)=>{
                        return(
                            <ReviewItem info={item}/>
                        )
                    })}
                    </div>
                </div>
            </section>) : (<section></section>)}
        </Main>
    )
}
const Main = styled.main`

`;