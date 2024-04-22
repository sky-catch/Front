import React, { useRef, useState } from "react";
import Drawer from "react-modern-drawer";
import styled from "styled-components";
import { CancelReservation } from "../respository/reservation";
const Visitcomponent = ({ itemList }) => {
  const [isOpen, setIsOpen] = useState(false);
  const photoInput = useRef();
  const textInput = useRef();
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const { mutate: cancelList, data } = CancelReservation();
  const [isScore, setIsScore] = useState(0);
  const [photoToAddList, setPhotoToAddList] = useState([]);
  const handleClick = () => {
    photoInput.current.click();
  };

  const photoToAddPreview = () => {
    return photoToAddList.map((photo) => {
      return (
        <div className="photoBox" key={photo.url}>
          <div
            className="photoBoxDelete icon delect-icon"
            onClick={() => onRemoveToAdd(photo.url)}
          />
          <img className="photoPreview" src={photo.url} />
        </div>
      );
    });
  };

  const onRemoveToAdd = (deleteUrl) => {
    setPhotoToAddList(photoToAddList.filter((photo) => photo.url != deleteUrl));
  };

  const handlePhoto = (e) => {
    const temp = [];
    const photoToAdd = e.target.files;

    for (let i = 0; i < photoToAdd.length; i++) {
      temp.push({
        id: photoToAdd[i].name,
        file: photoToAdd[i],
        url: URL.createObjectURL(photoToAdd[i]),
      });
    }
    setPhotoToAddList(temp.concat(photoToAddList));
  };

  const drawStar = (e) => {
    document.querySelector(`.star span`).style.width = `${
      e.target.value * 10 * 2
    }%`;
    setIsScore(e.target.value);
  };
  const onchange = () => {};
  const setTime = (time) => {
    var week = new Array("일", "월", "화", "수", "목", "금", "토");
    const dayTime = time.split("T");

    const isDate = dayTime[0].replaceAll("-", ".");
    const isTime = dayTime[1].slice(0, 5);
    const setDay = new Date(dayTime[0]).getDay();
    const isDay = week[setDay];
    return `${isDate} (${isDay})•${isTime}`;
  };

  const timeGap = (time) => {
    const remainTime = Math.ceil(time / (1000 * 60 * 60 * 24));
    if (remainTime < 0) {
      return `D+${remainTime * -1}`;
    } else if (remainTime > 0) {
      return `D-${remainTime}`;
    } else {
      return `D-DAY`;
    }
  };

  const toggleDrawer = (e) => {
    setIsOpen((prevState) => !prevState);
  };
  const toggleDrawerReview = (e) => {
    setIsReviewOpen((prevState) => !prevState);

    if (isReviewOpen) {
      setIsScore(0);
      document.querySelector(`.star span`).style.width = `0%`;
      textInput.current.value = "";
      setPhotoToAddList([]);
    }
  };

  const cancelItem = (id) => {
    cancelList(id);
    window.location.replace("/mydining/my");
  };
  return (
    <>
      <div className=" py-[20px] px-[16px] bg-white rounded-[10px] shadow-lg min-h-[180px] relative mb-[15px]">
        <span className="text-[#666] text-[12px] bg-[#f4f4f4] py-[3px] px-[8px] rounded-full">
          {itemList.status === "PLANNED"
            ? timeGap(new Date(itemList.time.split("T")[0]) - new Date())
            : itemList.status === "DONE"
            ? "방문 완료"
            : "예약 취소"}
        </span>
        {itemList.status === "PLANNED" && (
          <span
            className="text-[#666] text-[12px] float-right"
            onClick={() => {
              toggleDrawer();
            }}
          >
            예약취소
          </span>
        )}
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
            )}•${itemList.numberOfPeople}명`}</span>
          </div>
        </div>
        {itemList.status === "DONE" ? (
          itemList.review === true ? (
            <ReviewBtn even={true}>리뷰 완료</ReviewBtn>
          ) : (
            <ReviewBtn
              even={false}
              onClick={() => {
                toggleDrawerReview();
              }}
            >
              리뷰 쓰기
            </ReviewBtn>
          )
        ) : (
          <span className=" text-center text-[#727272] text-[12px] block mt-[15px]">
            {itemList.memo}
          </span>
        )}
      </div>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="bottom"
        className="drawer-box"
        size="270px"
      >
        <div className="container">
          <span className="text-[#000] text-[18px] font-bold py-[10px] block">
            예약을 취소하시겠어요?
          </span>

          <div className=" grid grid-cols-3 gap-y-[10px] py-[15px] mt-[10px] border-solid border-y-[1px] border-[#cacaca]">
            <em className="text-[#727272] text-[12px] ">매장</em>
            <span className="col-span-2 text-[#3a3a3a] text-[14px] ">
              {itemList.restaurantName}
            </span>
            <em className="text-[#727272] text-[12px] ">예약일시</em>
            <span className="col-span-2 text-[#ff3d00] text-[14px] ">{`${setTime(
              itemList.time
            )}`}</span>
            <em className="text-[#727272] text-[12px] ">인원수</em>
            <span className="col-span-2 text-[#3a3a3a] text-[14px] ">{`${itemList.numberOfPeople}명`}</span>
          </div>

          <div>
            <CloseBtn
              even={true}
              type="button"
              open={isOpen}
              onClick={() => {
                toggleDrawer();
              }}
            >
              취소하지 않음
            </CloseBtn>
            <CloseBtn
              even={false}
              type="button"
              open={isOpen}
              onClick={() => {
                toggleDrawer();
                cancelItem(itemList.reservationId);
              }}
            >
              예약 취소
            </CloseBtn>
          </div>
        </div>
      </Drawer>

      {/* 리뷰 슬라이드 */}
      <Drawer
        open={isReviewOpen}
        onClose={toggleDrawerReview}
        direction="right"
        className="drawer-box right"
        size="100%"
      >
        <div className="container">
          <div className="header-left items-center flex gap-[12px]">
            <a
              className="header-back-black h-[47px] leading-[47px] z-50"
              onClick={toggleDrawerReview}
            >
              뒤로
            </a>
            <a className="text-xl h-[47px] leading-[47px] font-bold block absolute left-0 right-0 text-center">
              리뷰 쓰기
            </a>
          </div>
          <div className="h-[calc(100vh-47px-47px)] overflow-y-auto pb-[15px]">
            <div className="">
              <div className="star-wrap text-center py-[5px] border-y border-[#d5d5d5]">
                <span className="star">
                  ★★★★★
                  <span>★★★★★</span>
                  <input
                    type="range"
                    onInput={drawStar}
                    value={isScore}
                    step="1"
                    min="0"
                    max="5"
                  />
                </span>
              </div>
            </div>
            <div className=" my-[15px]">
              <textarea
                name="review"
                ref={textInput}
                className="form-input block w-[100%] p-[8px] border border-[#d5d5d5] rounded-md"
                rows={7}
                minLength={10}
                placeholder={"리뷰 최소 10자 이상 작성해주세요."}
                onChange={onchange}
              ></textarea>
            </div>

            <div className="">
              <span className="text-center text-[12px] block mb-[15px]">
                사진은 최대 5장까지 가능합니다.
              </span>
              <div className="photoUploaderContent">
                <div className="photoBox addPhoto">
                  <button
                    className="icon add-icon"
                    onClick={handleClick}
                  ></button>
                  {/* <PlusOutlined /> */}
                  <PictureFilled onClick={handleClick} />
                  <input
                    type="file"
                    accept="image/jpg, image/jpeg, image/png"
                    multiple
                    ref={photoInput}
                    onChange={(e) => handlePhoto(e)}
                    style={{ display: "none" }}
                  />
                </div>
                {photoToAddPreview()}
              </div>
            </div>
          </div>
          <ReviewSendBtn>리뷰 입력 완료</ReviewSendBtn>
          {/* </div> */}
        </div>
      </Drawer>
    </>
  );
};

export default Visitcomponent;
const ReviewSendBtn = styled.button`
  border-radius: 6px;
  line-height: 47px;
  text-align: center;
  font-size: 14px;
  width: 100%;
  background-color: #ff3d00;
  color: #fff;
  /* margin-top: 0.75rem; */
`;
const PictureFilled = styled.div`
  width: 100px;
  height: 100px;
  background-color: #eee;
`;
const ReviewBtn = styled.button`
  border-radius: 6px;
  line-height: 36px;
  text-align: center;
  font-size: 14px;
  width: 100%;
  margin-top: 0.75rem;
  ${(props) =>
    props.even == true
      ? ` color: #000; background-color: #d6d6d6;`
      : `background-color: #ff3d00;  color: #fff;`}
`;
const CloseBtn = styled.button`
  padding: 0 5%;
  width: 43%;
  margin: 0 auto;
  height: 48px;
  border-width: 1px;
  line-height: 46px;
  border-radius: 6px;
  font-size: 14px;
  box-sizing: border-box;
  display: block;
  position: absolute;
  bottom: 20px;
  ${(props) =>
    props.even === true
      ? `right: 20px; color: #fff;  border-color: #ff3d00;  background-color: #ff3d00;`
      : `left: 20px; color: #000;`}
`;
