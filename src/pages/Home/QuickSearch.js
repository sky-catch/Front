import {useState} from "react";
import ModalDrawer from "../../components/ModalDrawer";

const searchItem = [
  {
    id: 0,
    img_url:
      "https://app.catchtable.co.kr/public/img/icons/icon-search-nearby.svg",
    title: "검색",
  },{
    id: 1,
    img_url: "https://image.toast.com/aaaaaqx/md/0706apgujeong.jpg",
    title: "압구정 청담",
  },{
    id: 2,
    img_url:
      "https://ugc-images.catchtable.co.kr/admin/marketing/banner/images/29098644e325436a8fc1af53f2e275c1",
    title: "잠실 송파",
  },{
    id: 3,
    img_url: "https://image.toast.com/aaaaaqx/md/busan_.jpg",
    title: "부산",
  },{
    id: 4,
    img_url: "https://image.toast.com/aaaaaqx/md/0706itaewon.jpg",
    title: "이태원 한남",
  },{
    id: 5,
    img_url:
      "https://ugc-images.catchtable.co.kr/admin/marketing/banner/images/72fab804b63a46d5822bbf0e82e4d764",
    title: "성수",
  },{
    id: 6,
    img_url: "https://image.toast.com/aaaaaqx/md/0706sungsoo.jpg",
    title: "광화문 종로",
  },{
    id: 7,
    img_url: "https://image.toast.com/aaaaaqx/md/0706gwanghwamun.jpg",
    title: "강남 역삼",
  },{
    id: 8,
    img_url: "https://image.toast.com/aaaaaqx/md/0706gangnam.jpg",
    title: "합정 망원",
  },{
    id: 9,
    img_url: "https://image.toast.com/aaaaaqx/md/0706sungsoo.jpg",
    title: "여의도",
  },{
    id: 10,
    img_url: "https://image.toast.com/aaaaaqx/md/0706sungsoo.jpg",
    title: "제주",
  },{
    id: 11,
    img_url: "https://image.toast.com/aaaaaqx/md/0706sungsoo.jpg",
    title: "홍대 신촌",
  },{
    id: 12,
    img_url: "https://image.toast.com/aaaaaqx/md/0706sungsoo.jpg",
    title: "대구",
  },{
    id: 13,
    img_url: "https://image.toast.com/aaaaaqx/md/0706sungsoo.jpg",
    title: "북폰 삼청",
  },{
    id: 14,
    img_url: "https://image.toast.com/aaaaaqx/md/0706sungsoo.jpg",
    title: "명동 을지로",
  },
];

export default function QuickSearch({handleWhereTogo}) {
  return (
    <>
    <div className="quick-search">
      {searchItem &&
        searchItem.map((item, index) => {
          return (
            <a key={index} id={item.id} onClick={handleWhereTogo}>
              <span>{item.title}</span>
              <img src={item.img_url}></img>
            </a>
          );
        })}
    </div>
    </>
  );
}
