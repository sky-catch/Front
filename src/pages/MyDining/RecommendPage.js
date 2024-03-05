import React from "react";

const RecommendPage = ({ title }) => {
  const pageList = [
    {
      id: 1,
      storeName: "매장이름",
      type: "한식",
      score: "10",
      img: "https://ugc-images.catchtable.co.kr/catchtable/shopinfo/stwQPDWOYfWA52EG2k_1v2g/b435c102ae5d42ef8db5729ac781e208?small400",
      location: "혜화",
    },
    {
      id: 2,
      storeName: "매장이름",
      type: "한식",
      score: "10",
      img: "https://ugc-images.catchtable.co.kr/catchtable/shopinfo/stwQPDWOYfWA52EG2k_1v2g/b435c102ae5d42ef8db5729ac781e208?small400",
      location: "혜화",
    },
    {
      id: 3,
      storeName: "매장이름",
      type: "한식",
      score: "10",
      img: "https://ugc-images.catchtable.co.kr/catchtable/shopinfo/stwQPDWOYfWA52EG2k_1v2g/b435c102ae5d42ef8db5729ac781e208?small400",
      location: "혜화",
    },
    {
      id: 4,
      storeName: "매장이름",
      type: "한식",
      score: "10",
      img: "https://ugc-images.catchtable.co.kr/catchtable/shopinfo/stwQPDWOYfWA52EG2k_1v2g/b435c102ae5d42ef8db5729ac781e208?small400",
      location: "혜화",
    },
    {
      id: 5,
      storeName: "매장이름",
      type: "한식",
      score: "10",
      img: "https://ugc-images.catchtable.co.kr/catchtable/shopinfo/stwQPDWOYfWA52EG2k_1v2g/b435c102ae5d42ef8db5729ac781e208?small400",
      location: "혜화",
    },
    {
      id: 6,
      storeName: "매장이름",
      type: "한식",
      score: "10",
      img: "https://ugc-images.catchtable.co.kr/catchtable/shopinfo/stwQPDWOYfWA52EG2k_1v2g/b435c102ae5d42ef8db5729ac781e208?small400",
      location: "혜화",
    },
  ];
  const listContainer = () => {
    console.log(pageList);
    let array = [];
    for (let index = 0; index < 4; index++) {
      if (index < 3) {
        array.push(
          <div className="" key={index}>
            <img className="" src={pageList[index].img} />
            <span className=" text-[16px] text-white font-medium">
              {pageList[index].storeName}
            </span>
            <span className="text-[14px] text-[#bcbcbc] font-light">
              {pageList[index].type} • {pageList[index].location}
            </span>
            <span className="score text-[16px] text-white font-bold">
              {pageList[index].score}
            </span>
          </div>
        );
      } else {
        array.push(
          <div className="" key={index}>
            <img className="" src={pageList[index].img} />
            <span className="text-[32px] font-bold text-white text-center leading-[210px] block relative z-40">
              +{pageList.length - 3}
            </span>
          </div>
        );
      }
    }

    return array;
  };
  return (
    <div className="container">
      <h2 className=" text-[26px] font-bold">{title}</h2>
      <div className=" my-[20px] recommend-box">{listContainer()}</div>
      <button className="w-[100%] h-[60px] border-[2px] border-black rounded-[5px] more-btn">
        <span className=" mr-[5px]">{title}</span>전체보기
      </button>
    </div>
  );
};

export default RecommendPage;
