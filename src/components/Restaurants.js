import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useDeleteRestaurant,
  useSaveRestaurant,
} from "../respository/restaurant";

const Restaurants = ({ data, index = 0 }) => {
  const navigate = useNavigate();
  const [restaurantList, setRestaurantList] = useState([]);
  const queryClient = useQueryClient();
  const onDetail = (e, { name, id }) => {
    e.preventDefault();
    navigate(`/ct/shop/:${name}`, { state: name });
  };
  // 식당 저장 생성
  const saveSave = useMutation({
    mutationKey: "useSaveRestaurant",
    mutationFn: useSaveRestaurant,
    onSuccess: ({ id }) => {
      queryClient.invalidateQueries(data, { queryKey: [id] });
    },
  });
  //식당 저장 삭제
  const deleteSave = useMutation({
    mutationFn: useDeleteRestaurant,
    onSuccess: ({ id }) => {
      queryClient.invalidateQueries(data, { queryKey: [id] });
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
