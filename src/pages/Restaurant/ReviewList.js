import { useEffect, useState } from "react";
import RestaurantTap from "../../components/RestaurantTap.js";
import { useLocation } from "react-router-dom";
import { getRestaurant } from "../../respository/restaurant.js";
import styled from "styled-components";
import ReviewItem from "./ReviewItem.js";
import pop_bg from "../../assets/icons/pop-bg.svg";
import star from "../../assets/icons/star-yellow.svg";

/**
 * 각 식당의 리뷰 목록
 * @author jimin 
 */
export default function ReviewList() {
    const location = useLocation();
    const [restaurant, setRestaurant] = useState();
    const [commentCount, setCommentCount] = useState();
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
        if( !restaurant ) {
            setRestaurantInfo(shopName);
        } else {
            setCommentCount(restaurant.reviewComments.length);
        }
        // console.log(restaurant.reviewAvg.toFixed(1));
    },[restaurant])

    return(
        <Main className="main">
            <RestaurantTap restaurantInfo={restaurant}></RestaurantTap>
            <section className="section mb-[16px]">
                <div className="container gutter-sm">
                    <div className="review-rating-summary review-rating-summary-splitview">
                        <div className="average">
                            <h5><span>{commentCount}개 리뷰 별점 평균</span></h5>
                            <div className="scoring"><strong>{restaurant ? restaurant.reviewAvg.toFixed(1) : ""}</strong></div>
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
    .review-rating-summary.review-rating-summary-splitview .average {
        display : flex;
        justify-content : center;
        align-items : center;
        flex-direction : column;
        margin : 0 30px 0 10px;
    }
    .review-rating-summary.review-rating-summary-splitview .average h5 {
        font-size : 10px;
        background : url(${pop_bg}) 0 0 no-repeat;
        height : 30px;
        margin-bottom : 5px;
    }
    .review-rating-summary.review-rating-summary-splitview .average h5 span {
        display : flex;
        justify-content : center;
        align-items : center;
        text-align : center;
        padding : 0 10px;
        height : 24px;
        font-weight : 700;
        font-size : 10px;
    }
    .review-rating-summary .average .scoring {
        display : flex;
    }
    .review-rating-summary.review-rating-summary-splitview .average .scoring {
        background : url(${star}) 50% 0 no-repeat;
        background-size : 24px auto;
        font-size : 20px;
        padding-top : 32px;
    }
`;