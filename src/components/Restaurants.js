import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useDeleteRestaurant,
  useSaveRestaurant,
} from "../respository/restaurant";
// const restaurants = [
//   {
//     id: 8,
//     img: "https://ugc-images.catchtable.co.kr/catchtable/shopinfo/sJgrr78E9EtvtvALfRjk_DQ/cacc203c048044ef97f078e072df2d68?small400",
//     name: "스시미루",
//     meta: {
//       star: 2,
//       tags: "스시오마카세",
//     },
//   },
//   {
//     id: 13,
//     img: "https://ugc-images.catchtable.co.kr/catchtable/shopinfo/s7aORNMXw9Kwl_pshlxb01w/de140f38874149c2a8a9c02d4ec859b2?small400",
//     name: "한국식당",
//     meta: {
//       star: 3,
//       tags: "한식",
//     },
//   },
//   {
//     id: 14,
//     img: "https://image.toast.com/aaaaaqx/catchtable/shopinfo/sFua-ZnyjLzjJjVMIJpjfCQ/fua-znyjlzjjjvmijpjfcq_2362215281096963.jpg?small400",
//     name: "하이디라오",
//     meta: {
//       star: 3,
//       tags: "와인",
//     },
//   },
//   {
//     id: 21,
//     img: "https://ugc-images.catchtable.co.kr/catchtable/shopinfo/stwQPDWOYfWA52EG2k_1v2g/b435c102ae5d42ef8db5729ac781e208?small400",
//     name: "서울가야밀면",
//     meta: {
//       star: 0,
//       tags: "한식",
//     },
//   },
// ];

const Restaurants = ({ data, index = 0 }) => {
  const navigate = useNavigate();
  const [restaurantList, setRestaurantList] = useState([]);
  const queryClient = useQueryClient();
  const onDetail = (e, { name, id }) => {
    console.log("name", name);
    e.preventDefault();
    navigate(`/ct/shop/:${name}`, { state: name });
  };
  // 식당 저장
  const saveSave = useMutation({
    mutationKey: "useSaveRestaurant",
    mutationFn: useSaveRestaurant,
    onSuccess: ({ id }) => {
      console.log("data", id);
      // window.location.reload();
      queryClient.invalidateQueries({ queryKey: [id] });
    },
  });
  //식당 삭제
  const deleteSave = useMutation({
    mutationFn: useDeleteRestaurant,
    onSuccess: () => {
      // window.location.reload();
      // queryClient.invalidateQueries({ queryKey: [state] });
    },
  });
  useEffect(() => {
    if (!data) return;
    const arr = [];
    for (let index = 0; index < data.length; index += 5) {
      arr.push(data.slice(index, index + 5));
    }
    setRestaurantList(arr);
  }, [data]);

  const saveRestaurant = (e, item) => {
    e.stopPropagation();
    if (sessionStorage.getItem("token")) {
      //로그인함
      if (item.savedRestaurant) {
        // 저장 된 식당
        console.log("저장 된 식당");
        deleteSave.mutate({ id: item.restaurantId });
      } else {
        // 저장 안된 식당
        console.log("저장 안된 식당");
        saveSave.mutate({ id: item.restaurantId });
      }
    } else {
      //로그인 안함
      navigate("/account");
    }
  };

  return (
    <div className="restaurant-list">
      {restaurantList[index] &&
        restaurantList[index].map((item) => {
          return (
            <div
              className="restaurant-list-item"
              key={item.restaurantId}
              onClick={(e) => onDetail(e, item)}
            >
              <a className="tb">
                <img src={item.imageUrl}></img>
              </a>
              <div className="detail">
                <div className="w-[150px]">
                  <h3 className="name">{item.name}</h3>
                  <div className="meta">
                    <span className="star">{item.reviewAvg.toFixed(1)}</span>
                    <span className="tags">
                      {item.category}
                      {" • "}
                    </span>
                    <span className="tags ml-[4px]">{item.address}</span>
                  </div>
                </div>
                <a
                  className={`btn-bookmark ${
                    item.savedRestaurant ? "active" : ""
                  }`}
                  onClick={(e) => {
                    saveRestaurant(e, item);
                  }}
                ></a>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Restaurants;
