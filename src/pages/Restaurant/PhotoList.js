import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import RestaurantTap from "../../components/RestaurantTap.js";

export const PhotoList = () => {
  let { state } = useLocation();
  const [restaurant, setRestaurant] = useState();

  useEffect(() => {
    let data = JSON.parse(state);
    setRestaurant(data);
    console.log(data);
  }, [state]);
  //   console.log();
  return (
    <main className="main">
      <RestaurantTap restaurant={restaurant}></RestaurantTap>
      <hr className="seperator"></hr>
      {restaurant && restaurant.images.length === 0 ? (
        <div className=" w-[100%] h-[calc(100vh-153px)] flex-col gap-y-[20px] flex items-center justify-center ">
          <img
            className=" size-[70px]"
            src={require("../../assets/icons/empty.png")}
          />
          <span className=" text-[#47566A] text-[16px] text-bold ">
            현재 사진이 없습니다.
          </span>
        </div>
      ) : (
        <div className="grid grid-cols-3 h-[calc(100vh-153px)] justify-center py-[20px] gap-[10px] container">
          {restaurant &&
            restaurant.images.map((item) => {
              return (
                <img
                  className="rounded-[6px] size-[105px] border border-[#d5d5d5]"
                  key={item.restaurantImageId}
                  src={`${item.path}`}
                />
              );
            })}
        </div>
      )}
    </main>
  );
};
