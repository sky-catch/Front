import { useState } from "react";
import { TempDrawer } from "../../components/Modal/TempDrawer"

const shortcutItem = [
  {
    id: 0,
    title: "웨이팅TOP",
    url: "https://d3kzx7mqemhf0.cloudfront.net/common_img/comm_23122719075605249.webp",
  },
  {
    id: 1,
    title: "2월의트렌드",
    url: "https://d3kzx7mqemhf0.cloudfront.net/common_img/comm_242510484540744.webp",
  },
  {
    id: 2,
    title: "히든플레이스",
    url: "https://d3kzx7mqemhf0.cloudfront.net/common_img/comm_2422711574179233.webp",
  },
  {
    id: 3,
    title: "온라인웨이팅",
    url: "https://d3kzx7mqemhf0.cloudfront.net/common_img/comm_241103083157477.webp",
  },
  {
    id: 4,
    title: "와인배송",
    url: "https://d3kzx7mqemhf0.cloudfront.net/common_img/comm_2411915251253970.webp",
  },
  {
    id: 5,
    title: "스시오마카세",
    url: "https://d3kzx7mqemhf0.cloudfront.net/catchtable/event/comm_2321711580358978.webp",
  },
  {
    id: 6,
    title: "우마카세",
    url: "https://d3kzx7mqemhf0.cloudfront.net/catchtable/event/comm_2321711580414465.webp",
  },
  {
    id: 7,
    title: "미쉐린가이드",
    url: "https://d3kzx7mqemhf0.cloudfront.net/common_img/comm_2422212584595157.webp",
  },
  {
    id: 8,
    title: "이달의 맛집",
    url: "https://d3kzx7mqemhf0.cloudfront.net/common_img/comm_23121514364404848.webp",
  },
  {
    id: 9,
    title: "호텔다이닝",
    url: "https://d3kzx7mqemhf0.cloudfront.net/catchtable/event/comm_2321711580389675.webp",
  },
  {
    id: 10,
    title: "밀키트",
    url: "https://d3kzx7mqemhf0.cloudfront.net/common_img/comm_2422711562831647.webp",
  },
  {
    id: 11,
    title: "모임예약",
    url: "https://d3kzx7mqemhf0.cloudfront.net/common_img/comm_242216564450416.webp",
  },
  {
    id: 12,
    title: "신규미식스팟",
    url: "https://d3kzx7mqemhf0.cloudfront.net/common_img/comm_242515505882233.webp",
  },
  {
    id: 13,
    title: "케이크",
    url: "https://d3kzx7mqemhf0.cloudfront.net/common_img/comm_2352818423566961.webp",
  },
  {
    id: 14,
    title: "저장TOP",
    url: "https://d3kzx7mqemhf0.cloudfront.net/catchtable/event/comm_2321711580386282.webp",
  },
];

export default function ShortCut() {
  const [isOpen, setIsOpen] = useState(false);

  const handleRank = (e) => {
    setIsOpen((prevState)=>!prevState);
  }

  return (
    <section className="shorcut-list-wrap pb-[20px] px-[20px]">
      <div className="shortcut-list">
        {shortcutItem.map((item) => {
          return (
            <div className="list-item" key={item.id} onClick={handleRank}>
              <div className="icon-wrap">
                <img src={item.url} />
              </div>
              <div className="title">{item.title}</div>
            </div>
          );
        })}
      </div>
      <TempDrawer
        isOpen={isOpen}
        toggleDrawer={handleRank}
      >
      </TempDrawer>
    </section>
  );
}
