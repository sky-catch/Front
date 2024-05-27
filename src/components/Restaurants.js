import { useNavigate } from "react-router-dom";

const restaurants = [
  {
    id: 8,
    img: "https://ugc-images.catchtable.co.kr/catchtable/shopinfo/sJgrr78E9EtvtvALfRjk_DQ/cacc203c048044ef97f078e072df2d68?small400",
    name: "스시미루",
    meta: {
      star: 2,
      tags: "스시오마카세",
    },
  },
  {
    id: 13,
    img: "https://ugc-images.catchtable.co.kr/catchtable/shopinfo/s7aORNMXw9Kwl_pshlxb01w/de140f38874149c2a8a9c02d4ec859b2?small400",
    name: "한국식당",
    meta: {
      star: 3,
      tags: "한식",
    },
  },
  {
    id: 14,
    img: "https://image.toast.com/aaaaaqx/catchtable/shopinfo/sFua-ZnyjLzjJjVMIJpjfCQ/fua-znyjlzjjjvmijpjfcq_2362215281096963.jpg?small400",
    name: "한국 식당",
    meta: {
      star: 3,
      tags: "와인",
    },
  },
  {
    id: 21,
    img: "https://ugc-images.catchtable.co.kr/catchtable/shopinfo/stwQPDWOYfWA52EG2k_1v2g/b435c102ae5d42ef8db5729ac781e208?small400",
    name: "서울가야밀면",
    meta: {
      star: 0,
      tags: "한식",
    },
  },
];

const Restaurants = () => {
  const navigate = useNavigate();
  const onDetail = ({ name, id }) => {
    navigate(`/ct/shop/${name}`, { state: name });
  };

  const saveRestaurant = (e) => {
    
  }

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
              <a>
                <h3 className="name">{item.name}</h3>
                <div className="meta">
                  <span className="star">{item.meta.star}</span>
                  <span className="tags" onClick={saveRestaurant}>{item.meta.tags}</span>
                </div>
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Restaurants;
