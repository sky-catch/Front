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
    let {state} = useLocation();
    const [restaurant, setRestaurant] = useState();
    const [commentCount, setCommentCount] = useState(); /* 리뷰 개수 */
    const rateCount = []; /* 리뷰 평점별 개수 */
    let countList = [...Array(5)].map(()=>0);
    const [counts, setCounts] = useState();
    const createArray = (length) => [...Array(length)]
    
    useEffect(() => {
        /* state에서 식당정보 겟 */
        if( !restaurant ) {
            let data = JSON.parse(state);
            setRestaurant(data);
            setCommentCount(data.reviewComments.length);
            
            // 각 점수별로 개수 세기
            let cmmt = data.reviewComments;
            cmmt.forEach((item, index)=>{
                countList[item.rate-1] += 1;
            })
            // 각 점수별로 카운트한 정보를 담기
            setCounts(countList);
        }
        // console.log(counts);
        // console.log(restaurant);
    },[restaurant, countList])

    return(
        <Main className="main">
            <RestaurantTap restaurantInfo={restaurant}></RestaurantTap>
            <section className="section mb-[16px]">
                <div className="container gutter-sm">
                    <div className="review-rating-summary review-rating-summary-splitview flex mt-[24px]">
                        <div className="average">
                            <h5><span>{commentCount}개 리뷰 별점 평균</span></h5>
                            <div className="scoring"><strong>{restaurant ? restaurant.reviewAvg >= 5 ? '5.0' : restaurant.reviewAvg.toFixed(1) : ""}</strong></div>
                        </div>
                        <div className="rating-distribution">
                            <ul>
                                {createArray(5).map((n,i)=>
                                {console.log(i);
                                return (
                                    <li>
                                        <span className="reating-score">{5-i}점</span>
                                        <span className="progress"><span className="bar" style={{width:`${counts ? counts[4-i]:0}%`}}></span></span>
                                        <span className="count">{counts ? counts[4-i]:0}</span>
                                    </li>
                                )})}
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
        justify-content : center;
    }
    .review-rating-summary.review-rating-summary-splitview .average .scoring {
        background : url(${star}) 50% 0 no-repeat;
        background-size : 24px auto;
        font-size : 20px;
        padding-top : 32px;
        width : 50px;
    }
    .review-rating-summary .rating-distribution ul li {
        display: flex;
        font-size: 11px;
        font-weight: 500;
        margin-bottom: 9px;
        align-items: center;
    }
    .rating-distribution {
        flex : 1;
    }
    .rating-distribution ul li .progress{ 
        margin-top: -2px;
        flex: 1;
        background: #f9f9f9;
        border-radius: 10px;
        height: 3px;
        position: relative;
    }
    .review-rating-summary .rating-distribution ul li .progress .bar {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        border-radius: 10px;
        height: 3px;
        display: block;
        background: #171717;
    }
    .review-rating-summary .rating-distribution ul li .count {
        margin-left: 8px;
        width: 20px;
        color: #aaa;
    }
    .review-rating-summary .rating-distribution ul li .reating-score {
        margin-right: 8px;
        width: 20px;
    }
`;