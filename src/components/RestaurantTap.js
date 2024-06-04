import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
/**
 * 4탭
 * @author jimin
 */
export default function RestaurantTap({ restaurant }) {
  const [isContent, setIsContent] = useState("home");
  const navigate = useNavigate();
  const location = useLocation();
  const [reviewCount, setReviewCount] = useState(0);
  const tabBox = useRef();
  const [tabPosition, setTabPosition] = useState(false);
  const restaurantName = restaurant ? restaurant.name : "";
  // console.log('restaurantName',restaurant);

  const contentClick = (e, index) => {
    if (index === 0) {
      setIsContent("home");
      navigate(`/ct/shop/${restaurantName}`, { state: restaurantName });
    } else if (index === 1) {
      setIsContent("menu");
      navigate(`/ct/shop/${restaurantName}/menuList`, {
        state: JSON.stringify(restaurant),
      });
    } else if (index === 2) {
      setIsContent("image");
      navigate(`/ct/shop/${restaurantName}/photoList`, {
        state: JSON.stringify(restaurant),
      });
    } else if (index === 3) {
      setIsContent("review");
      navigate(`/ct/shop/${restaurantName}/reviewList`, {
        state: JSON.stringify(restaurant),
      });
    }
  };

  useEffect(() => {
    // console.log('tap',restaurant);
    if (location.pathname.indexOf("/reviewList") != -1) {
      setIsContent("review");
    } else if (location.pathname.indexOf("/menuList") != -1) {
      setIsContent("menu");
    } else if (location.pathname.indexOf("/photoList") != -1) {
      setIsContent("photo");
    }

    restaurant
      ? setReviewCount(restaurant.reviewComments.length)
      : setReviewCount(0);
  }, [restaurant]);
  //부모 요소에 height: 100vh이 있으면 스크롤 인식 안됨, 반대로 없으면 sticky 인식 안됨
  useEffect(() => {
    if (!tabBox.current) return;
    const tabTop = tabBox.current.offsetTop;
    window.addEventListener("scroll", () => {
      if (tabTop - 48 <= window.scrollY) {
        setTabPosition(true);
      } else {
        setTabPosition(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", function () {});
    };
  }, [tabBox]);

  return (
    <>
      <ul
        className={`tab-menu top-[47px] ${
          !tabPosition ? "relative" : "fixed left-0 right-0"
        } bg-white`}
        ref={tabBox}
      >
        <li
          className={`w-[50%] leading-[48px] text-center ${
            isContent == "home" ? " active" : ""
          }`}
          onClick={(e) => contentClick(e, 0)}
        >
          {" "}
          홈{" "}
        </li>
        <li
          className={`w-[50%] leading-[48px] text-center ${
            isContent == "menu" ? "active" : ""
          }`}
          onClick={(e) => contentClick(e, 1)}
        >
          {" "}
          메뉴{" "}
        </li>
        <li
          className={`w-[50%] leading-[48px] text-center ${
            isContent == "photo" ? "active" : ""
          }`}
          onClick={(e) => contentClick(e, 2)}
        >
          {" "}
          사진{" "}
        </li>
        <li
          className={`w-[50%] leading-[48px] text-center ${
            isContent == "review" ? "active" : ""
          }`}
          onClick={(e) => contentClick(e, 3)}
        >
          {" "}
          리뷰 <span>{reviewCount > 0 ? reviewCount : ""}</span>
        </li>
      </ul>
    </>
  );
}
