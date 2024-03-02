import React from "react";

const Visitcomponent = ({ itemList }) => {
  console.log(itemList);
  return (
    <div className=" py-[20px] px-[16px] bg-white rounded-[10px] shadow-lg min-h-[180px] relative">
      <span className="text-[#666] text-[12px] bg-[#f4f4f4] p-[5px] rounded-full">
        {itemList.visitType}
      </span>
      <div className="flex mt-3">
        <div className=" size-[64px] rounded-md bg-slate-500 mr-[10px]"></div>
        <div className="flex flex-col">
          <span className="text-[16px] font-bold">{itemList.name}</span>
          <span className="text-[#666] text-[12px]">
            {itemList.type} • {itemList.location}
          </span>
          <span className="text-[#ff3d00] ">{itemList.date}</span>
        </div>
      </div>
      <span className=" text-center text-[#aaa] text-[12px] block mt-[15px]">
        작성 기한이 지나 리뷰를 쓸 수 없어요.
      </span>
    </div>
  );
};

export default Visitcomponent;
