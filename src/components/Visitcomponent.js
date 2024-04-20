import React from "react";

const Visitcomponent = ({ itemList }) => {
  console.log("itemList", itemList);
  const setTime = (time) => {
    var week = new Array("일", "월", "화", "수", "목", "금", "토");
    const dayTime = time.split("T");

    const isDate = dayTime[0].replaceAll("-", ".");
    const isTime = dayTime[1].slice(0, 5);
    const setDay = new Date(dayTime[0]).getDay();
    const isDay = week[setDay];
    return `${isDate} (${isDay})•${isTime}•`;
  };

  const timeGap = (time) => {
    const remainTime = Math.ceil(time / (1000 * 60 * 60 * 24));
    console.log(remainTime);
    if (remainTime < 0) {
      return `D+${remainTime * -1}`;
    } else if (remainTime > 0) {
      return `D-${remainTime}`;
    } else {
      return `D-DAY`;
    }
  };
  return (
    <div className=" py-[20px] px-[16px] bg-white rounded-[10px] shadow-lg min-h-[180px] relative mb-[15px]">
      <span className="text-[#666] text-[12px] bg-[#f4f4f4] py-[3px] px-[8px] rounded-full">
        {timeGap(new Date(itemList.time.split("T")[0]) - new Date())}
      </span>
      <div className="flex mt-3">
        <div className=" size-[64px] rounded-md bg-slate-500 mr-[10px]"></div>
        <div className="flex flex-col">
          <span className="text-[16px] font-bold">
            {itemList.restaurantName}
          </span>
          <span className="text-[#666] text-[12px]">
            {itemList.restaurantCategory} • {itemList.restaurantAddress}
          </span>
          <span className="text-[#ff3d00] text-[14px]">{`${setTime(
            itemList.time
          )}${itemList.numberOfPeople}명`}</span>
        </div>
      </div>
      <span className=" text-center text-[#727272] text-[12px] block mt-[15px]">
        {itemList.memo}
      </span>
    </div>
  );
};

export default Visitcomponent;
