import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
/**
 * 4탭
 * @author jimin
 */
export default function RestaurantTap({restaurant}) {
    const [isContent, setIsContent] = useState('home');
    const navigate = useNavigate();
    const location = useLocation();
    const [reviewCount, setReviewCount] = useState(0);

    const restaurantName= restaurant ? restaurant.name : "";
    // console.log('restaurantName',restaurant);

    const contentClick = (e, index) => {
        if(index === 0) {
          setIsContent('home')
          navigate(`/ct/shop/${restaurantName}`, {state : restaurantName});
        } else if (index === 1){
          setIsContent('menu')
          navigate(`/ct/shop/${restaurantName}/menuList`, {state : JSON.stringify(restaurant)});
        } else if (index === 2){
          setIsContent('image')
          navigate(`/ct/shop/${restaurantName}/photoList`, {state : JSON.stringify(restaurant)});
        } else if (index === 3){
          setIsContent('review')
          navigate(`/ct/shop/${restaurantName}/reviewList`, {state : JSON.stringify(restaurant)});
        }
    }

    useEffect(()=> {
        // console.log('tap',restaurant);
        if (location.pathname.indexOf("/reviewList") != -1) {
            setIsContent('review');
        } else if (location.pathname.indexOf("/menuList") != -1) {
            setIsContent('menu');
        } else if (location.pathname.indexOf("/photoList") != -1) {
            setIsContent('photo');
        } 

        restaurant ? setReviewCount(restaurant.reviewComments.length) : setReviewCount(0);
    },[restaurant])

    return(
        <>
            <ul className="tab-menu sticky top-[47px]  bg-white">
            <li className={`w-[50%] leading-[48px] text-center ${
                isContent == "home" ? " active" : ""
                }`}
                onClick={(e) => contentClick(e, 0)}
            > 홈 </li>
            <li className={`w-[50%] leading-[48px] text-center ${
                isContent == "menu" ? "active" : ""
                }`}
                onClick={(e) => contentClick(e, 1)}
            > 메뉴 </li>
            <li className={`w-[50%] leading-[48px] text-center ${
                isContent == "photo" ? "active" : ""
                }`}
                onClick={(e) => contentClick(e, 2)}
            > 사진 </li>
            <li className={`w-[50%] leading-[48px] text-center ${
                isContent == "review" ? "active" : ""
                }`}
                onClick={(e) => contentClick(e, 3)}
            > 리뷰 <span>{reviewCount>0?reviewCount:''}</span></li>
            </ul>
        </>
    )
}