import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";

const restaurants = [
  {
    id: 0,
    img: "https://ugc-images.catchtable.co.kr/admin/marketing/banner/images/22be988cd3c84399baadeb76ff15093f",
  },{
    id: 1,
    img: "https://ugc-images.catchtable.co.kr/admin/marketing/banner/images/9830d15e6afd4e30ad26027cd190088a",
  },{
    id: 2,
    img: "https://d3kzx7mqemhf0.cloudfront.net/catchtable/main/banner/comm_2281115183722372.webp",
  },{
    id: 3,
    img: "https://d3kzx7mqemhf0.cloudfront.net/catchtable/main/banner/comm_2281115183777092.webp",
  }
];

const Restaurants_sm = () => {
  const navigate = useNavigate();
  const onDetail = ({ name }) => {
    console.log("name : ", name);
    navigate("/ct/shop", { state : name });
  };

  return (
    <RestaurantsWrapper>
    <Swiper className="slide-wrapper-sm">
      {restaurants.map((item) => {
        return (
          <SwiperSlide
          className="slide-item"
            key={item.id}
            onClick={() => onDetail(item)}
          >
              <a className="tb">
                <img src={item.img}></img>
              </a>
            <div className="detail">
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
    </RestaurantsWrapper>
  );
};

export default Restaurants_sm;

const RestaurantsWrapper = styled.div`
    .slide-wrapper-sm {
        display : flex;
        flex-wrap : nowrap;
    }
    .slide-wrapper-sm .slide-item {
        margin-right : 12px;
        width : auto !important;
    }
    .slide-wrapper-sm .slide-item .tb {
        cursor : pointer;
    }
    .slide-wrapper-sm .slide-item .tb img {
        width : 152px;
        height : 152px;
        border-radius : 10px;
        box-sizing : border-box;
    }
`;
