import { useNavigate } from "react-router-dom";

const restaurants = [
  {
    id: 8,
    img: "https://ugc-images.catchtable.co.kr/catchtable/shopinfo/stwQPDWOYfWA52EG2k_1v2g/b435c102ae5d42ef8db5729ac781e208?small400",
    name: "스시미루",
    meta: {
      star: 4.2,
      tags: "돼지고기구이 * 석촌",
    },
  },
  {
    id: 1,
    img: "https://image.toast.com/aaaaaqx/catchtable/shopinfo/s4bykFRYK9M267n2BIZXZjg/4bykfryk9m267n2bizxzjg_236815131963864.jpg?small400",
    name: "ㅁㅁ오마카세",
    meta: {
      star: 4.2,
      tags: "스시, 초밥 * 제주 서귀포",
    },
  },
  {
    id: 2,
    img: "https://image.toast.com/aaaaaqx/catchtable/shopinfo/sFua-ZnyjLzjJjVMIJpjfCQ/fua-znyjlzjjjvmijpjfcq_2362215281096963.jpg?small400",
    name: "ㅁㅁ오마카세",
    meta: {
      star: 4.2,
      tags: "일식 * 광주",
    },
  },
  {
    id: 3,
    img: "https://ugc-images.catchtable.co.kr/catchtable/shopinfo/stwQPDWOYfWA52EG2k_1v2g/b435c102ae5d42ef8db5729ac781e208?small400",
    name: "ㅁㅁ오마카세",
    meta: {
      star: 4.2,
      tags: "돼지고기구이 * 석촌",
    },
  },
];

const Restaurants = () => {
  const navigate = useNavigate();
  const onDetail = ({ name, id }) => {
    console.log("name : ", name);
    navigate(`/ct/shop?id=${id}`, { state: name });
  };

  return (
    <div className="restaurant-list">
      {restaurants.map((item) => {
        return (
          <div
            className="restaurant-list-item"
            key={item.id}
            onClick={() => onDetail(item)}
          >
            <a className="tb">
              <img src={item.img}></img>
            </a>
            <div className="detail">
              <a className="btn-bookmark"></a>
              <h3 className="name">{item.name}</h3>
              <div className="meta">
                <span className="star">{item.meta.star}</span>
                <span className="tags">{item.meta.tags}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Restaurants;
