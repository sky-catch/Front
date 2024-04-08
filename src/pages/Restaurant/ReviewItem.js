import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styled from "styled-components";

/**
 * review 아이템
 * @author jimin 
 */
export default function ReviewItem({info}) {
    const [reviewEach, setReviewEach] = useState();

    useEffect(()=>{
        console.log(info);
        setReviewEach(info);
    },[])

    return(
        <div>  
            <Contents>
                <div className="__header">
                    <div className="__user-info flex">
                        <a className="profile">
                            <div className="profile-pic"><img src="https://app.catchtable.co.kr/public/img/noimg/profile_default_v2.png"></img></div>
                            <h4 className="name usename"><span className="txt">{reviewEach ? reviewEach.nickname:""}</span></h4>
                        </a>
                    </div>
                    <div className="__review-meta flex">
                        <a className="__rating flex"><div>{reviewEach?reviewEach.rate:0}</div></a>
                        <span className="__date">{reviewEach?reviewEach.reviewCreatedDate:""}</span>
                    </div>
                </div>
                <div className="__body">
                    <div>
                        <div className="v-scroll">
                            <div className="v-scroll-inner">
                                <Swiper className="__photos">
                                    {reviewEach.images.map((item, index)=> (
                                        <SwiperSlide className="mr-[10px] swiper-slide">
                                            <img src={item.path}></img>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                    <div className="__review-post"><p>{reviewEach?reviewEach.commentContent:""}</p></div>
                    <div className="__d-flex __v-center justify-between">
                        <div className="__post-meta mb-[24px] flex">
                            <span className="__like flex items-center">0</span>
                            <span className="__comment flex items-center">0</span>
                        </div>
                        <MoreIcon><button type="button"></button></MoreIcon>
                    </div>
                </div>
            </Contents>
        </div>
    )
}
const Contents = styled.article`
    border : none;
    border-top : 1px solid #e8e8e8;

    .__header {
        position : relative;
        padding : 16px 16px 8px;
    }
    .__header .__user-info {
        margin-bottom : 16px;
        align-items : center;
    }
    .__header .__user-info .profile-pic {
        margin-right : 10px;
    }
    .__header .__user-info .profile-pic img {
        width : 30px;
        height : 30px;
        border-radius : 50%;
        box-sizing : border-box;
    }
    .username {
        font-size : 14px;
        font-weight :700;
    }
    .__header .__review-meta {
        position : relative;
        line-height: 16px;
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
    }
    .__header .__review-meta .__rating:before {
        background : url("https://app.catchtable.co.kr/public/img/icons/star-yellow.svg") 0% 50% no-repeat;
        background-size : contain;
        width : 14px;
        height : 14px;
        content : "";
        margin-right : 4px;
    }
    .__header .__review-meta .__date {
        position : absolute;
        margin-left : auto;
        top : 0;
        right : 0;
        font-size : 12px;
        color : #666;
    }
    .__body {
        position : relative;
        padding : 0px 16px;
    }
    .__body .swiper-slide {
        width : 160px !important;
    }
    .__body .swiper-slide img {
        display : block;
        width : 160px;
        height : 160px;
        object-fit : cover;
    }
    .__post-meta {
        margin-top : 24px;
        display : flex;
        gap : 16px;
    }
    .__post-meta .__like:before {
        background : url("https://app.catchtable.co.kr/public/img/icons/heart-new.svg") 50% 50% no-repeat;
        display : block;
        width : 32px;
        height : 32px;
        content : "";
    }
    .__post-meta .__comment:before {
        background : url("./src/assets/icons/comment-new.webp") 50% 50% no-repeat;
        display : block;
        width : 32px;
        height : 32px;
        content : "";
    }
`;
const MoreIcon = styled.div`
    position: relative;
    margin-top: 24px;
    button {
        background : url("https://app.catchtable.co.kr/public/img/icons/btn-more-d.svg") 50% 50% no-repeat;
        width : 20px;
        height : 20px;
    }
`;