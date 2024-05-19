import styled from "styled-components";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slideItem = [
  {
    id: 0,
    url: "https://ugc-images.catchtable.co.kr/admin/marketing/banner/images/6872af8d3926459382a6d8c3bd05d0be",
  },
  {
    id: 1,
    url: "https://ugc-images.catchtable.co.kr/admin/marketing/banner/images/dd3cf3ca4172400795af5de7f7ef3bbb",
  },
  {
    id: 2,
    url: "https://ugc-images.catchtable.co.kr/admin/marketing/banner/images/fa84ce5706f046508828f5032cd6dc78",
  },
  {
    id: 3,
    url: "https://ugc-images.catchtable.co.kr/admin/marketing/banner/images/b62bbe9454a946fc90834334406ddda8",
  },
  {
    id: 4,
    url: "https://d3kzx7mqemhf0.cloudfront.net/common_img/comm_2422211081434326.webp",
  },
];

export default function Carousel() {
  return (
    <CarouselWrapper className="slider mb-[16px]">
      <Swiper
        className="swiper-wrapper"
        modules={[Pagination, Autoplay]}
        loop={true}
        spaceBetween={0}
        pagination={true}
        slidesPerView={"auto"}
        autoplay={{ delay: 3500 }}
        centeredSlides={true}
      >
        {slideItem.map((item, index) => {
          return (
            <SwiperSlide
              key={index}
              data-swiper-slide-index={index}
              className="slide-item carousels"
            >
              <a>
                <img src={item.url}></img>
              </a>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </CarouselWrapper>
  );
}

const CarouselWrapper = styled.section`
  position: relative;
  display: block;

  .slide-item {
    /* width: 420px; */
    /* margin-right: 8px; */
  }
  .slide-item a {
    display: block;
  }
  .slide-item a img {
    display: block;
    width: 100%;
    height: auto;
  }
  .carousels {
    max-width: 429.041px;
    width: calc(100vw - 40px);
    margin-right: 8px;
    border-radius: 8px;
    overflow: hidden;
  }
`;
