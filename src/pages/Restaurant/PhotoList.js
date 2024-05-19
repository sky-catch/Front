import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import RestaurantTap from "../../components/RestaurantTap.js";

export const PhotoList = () => {
    let {state} = useLocation();
    const [restaurant, setRestaurant] = useState();

    useEffect(()=>{
        let data = JSON.parse(state);
        setRestaurant(data);
        console.log(data);
    },[state])

    return(
    <main className="main">
        <RestaurantTap restaurant={restaurant}></RestaurantTap>
        <hr className="seperator"></hr>
        <div className="container gutter-sm">
            <div className="flex justify-center pt-[20px] color-gray">사진이 없습니다.</div>
        </div>
    </main>
    )
}