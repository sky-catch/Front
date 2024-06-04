import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import RestaurantTap from "../../components/RestaurantTap.js";

export const MenuList = () => {
  let { state } = useLocation();
  const [restaurant, setRestaurant] = useState();
  const [images, setImages] = useState();

  useEffect(() => {
    let data = JSON.parse(state);
    setRestaurant(data);
    console.log(data);
    data.reviewComments.forEach((el) => {
      if (el.images.length > 0) {
        setImages(...el.images);
      }
    });
    console.log(images);
  }, [state]);

  return (
    <main className="main">
      <RestaurantTap restaurant={restaurant}></RestaurantTap>
      <hr className="seperator" />
      {!images ? (
        <div className="container gutter-sm">
          <div className="flex justify-center pt-[20px] color-gray">
            메뉴 준비중 입니다.
          </div>
        </div>
      ) : (
        <></>
      )}
    </main>
  );
};
