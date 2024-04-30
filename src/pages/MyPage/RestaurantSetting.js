// import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import React from "react";
// import { createRestaurant } from "../../respository/restaurant";
import { getMyRestaurant } from "../../respository/userInfo";
export default function Restaurantsetting() {
  const addRestaurant = () => {
    // createRestaurant()
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
  // useEffect(() => {
  //   getMyRestaurant()
  //     .then((res) => {
  //       console.log(res);

  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  // 내 식당 관리 페이지
  const { data } = useQuery({
    queryKey: ["getMyRestaurant"],
    queryFn: () => {
      return getMyRestaurant()
        .then((res) => {
          return res;
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
  });

  console.log(data);
  return (
    <div>
      <button
        className="btn btn-md btn-outline btn-rounded"
        onClick={addRestaurant}
      >
        저장
      </button>
    </div>
  );
}
