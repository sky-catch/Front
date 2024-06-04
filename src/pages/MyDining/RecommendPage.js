const RecommendPage = ({ title, pageList, toggleDrawerBox }) => {
  const listContainer = (pageItem) => {
    let array = [];
    for (let index = 0; index < 4; index++) {
      if (index < 3) {
        array.push(
          <div className="" key={index}>
            <img className="  size-[100%]" src={pageItem[index].imageUrl} />
            <span className=" text-[16px] text-white font-medium">
              {pageItem[index].name}
            </span>
            <span className="text-[14px] text-[#bcbcbc] font-light">
              {pageItem[index].category} • {pageItem[index].address}
            </span>
            <span className="score text-[16px] text-white font-bold ">
              {Number(pageItem[index].reviewAvg).toFixed(1)}
            </span>
          </div>
        );
      } else {
        array.push(
          <div className="" key={index}>
            <img className="" src={pageItem[index].imageUrl} />
            <span className="text-[32px] font-bold text-white text-center text-num block relative z-40">
              +{5}
            </span>
          </div>
        );
      }
    }

    return array;
  };
  return (
    <div
      className="container mb-[40px] cursor-pointer"
      onClick={() => {
        toggleDrawerBox();
      }}
    >
      <h2 className=" text-[26px] font-bold">{title}</h2>
      <div className=" my-[20px] recommend-box">
        {pageList && listContainer(pageList)}
      </div>
      <button className="w-[100%] h-[60px] border-[2px] border-black rounded-[5px] more-btn">
        <span className=" mr-[5px]">{title}</span>전체보기
      </button>
    </div>
  );
};

export default RecommendPage;
