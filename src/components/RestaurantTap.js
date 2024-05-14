import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
/**
 * 4탭
 * @author jimin
 */
export default function RestaurantTap({restaurantInfo}) {
    const [isContent, setIsContent] = useState('home');
    const navigate = useNavigate();
    const location = useLocation();
    const [reviewCount, setReviewCount] = useState(0);

    const contentClick = (e, index) => {
        if(index === 0) {
          setIsContent('home')
        } else if (index === 1){
          setIsContent('menu')
        } else if (index === 2){
          setIsContent('image')
        } else if (index === 3){
          setIsContent('review')
        }
    }

    /* 홈으로 이동 */
    const goToHome = (e) => {
        contentClick(e, 0);
        const restaurantName= restaurantInfo ? restaurantInfo.name : "";
        navigate(`/ct/shop/${restaurantName}`, {state : restaurantName});
    }
    
    /* 리뷰 페이지로 이동 */
    const goToReview = (e) => {
        contentClick(e, 3);
        console.log('restaurantInfo : ', restaurantInfo);
        const restaurantName= restaurantInfo ? restaurantInfo.name : "";
        navigate(`/ct/shop/${restaurantName}/reviewList`, {state : JSON.stringify(restaurantInfo)});
    }

    useEffect(()=> {
        console.log(restaurantInfo);
        if (location.pathname.indexOf("/reviewList") != -1) {
            setIsContent('review');
        }
        restaurantInfo ? setReviewCount(restaurantInfo.reviewComments.length) : setReviewCount(0);
    },[restaurantInfo])

    return(
        <>
            <ul className="tab-menu sticky top-[47px]  bg-white">
            <li className={`w-[50%] leading-[48px] text-center ${
                isContent == "home" ? " active" : ""
                }`}
                onClick={()=>goToHome()}
            > 홈 </li>
            <li className={`w-[50%] leading-[48px] text-center ${
                isContent == "menu" ? "active" : ""
                }`}
                onClick={(e) => contentClick(e, 1)}
            > 메뉴 </li>
            <li className={`w-[50%] leading-[48px] text-center ${
                isContent == "image" ? "active" : ""
                }`}
                onClick={(e) => contentClick(e, 2)}
            > 사진 </li>
            <li className={`w-[50%] leading-[48px] text-center ${
                isContent == "review" ? "active" : ""
                }`}
                onClick={()=>goToReview()}
            > 리뷰 <span>{reviewCount}</span></li>
            </ul>
        </>
    )
}