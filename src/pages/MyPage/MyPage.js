import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import "moment/locale/ko";
import { useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
import Drawer from "react-modern-drawer";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { LoginState, RestaurantState } from "../../States/LoginState";
import { convertURLtoFile } from "../../apis/ApiClient";
import defaultImage from "../../assets/icons/default.png";
import Loading from "../../components/Loading";
import { DeleteReview, UpdateReview } from "../../respository/reservation";
import {
  getMyRestaurant,
  getOwner,
  getUserInfo,
} from "../../respository/userInfo";

/**
 * 마이페이지
 */

function MyPage() {
  const navigate = useNavigate();

  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const { mutate: DeleteReviewItem } = DeleteReview();
  const [user, setUser] = useRecoilState(LoginState);
  const [restaurant, setRestaurant] = useRecoilState(RestaurantState);
  const textInput = useRef();
  const { mutate: review } = UpdateReview();
  const photoInput = useRef();
  const [isSelect, setIsSelect] = useState(true);
  const [isRestaurant, setIsRestaurant] = useState(false);
  const [photoToAddList, setPhotoToAddList] = useState([]);
  const [isSelectInfo, setIsSelectInfo] = useState([]);
  const [isSelectItem, setSelectItem] = useState({ score: 0, reviewId: 0 });
  const [isSave, setIsSave] =
    useState(true); /* 탭 true : 나의 저장, false : 리뷰 */

  const { data: isUserInfo, isLoading: userLoading } = useQuery({
    queryKey: ["getUserInfo"],
    queryFn: getUserInfo,
    retry: true,
  });
  const [isOwner, setIsOwner] = useState(isUserInfo ? isUserInfo.owner : false);
  const [following, setFollowing] = useState(0); //isUserInfo 팔로잉,팔로워 수 리턴받아야함.(TODO)
  const [follower, setFollower] = useState(0); // 동일

  /* Function : 프로필 수정 */
  const updateUserInfo = () => {
    navigate("/my/myProfileInfo");
  };
  const {
    data: getRestaurantItem,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getMyRestaurant"],
    queryFn: () => {
      return getMyRestaurant()
        .then((res) => {
          if (res !== undefined) {
            console.log(res);
          }
          return res;
        })
        .catch((err) => {
          console.log("err1", err.response);
          throw err;
        });
    },
    retry: 1,
    enabled: isUserInfo?.owner,
  });

  const { data: getOwnerItem } = useQuery({
    queryKey: ["getOwner"],
    queryFn: () => {
      return getOwner()
        .then((res) => {
          if (res === undefined) {
            throw new Error("Data is undefined");
          }
          return res;
        })
        .catch((err) => {
          console.log("err2", err);
          throw err;
        });
    },
    retry: 1,
    enabled: isUserInfo?.owner,
  });

  useEffect(() => {
    if (!isReviewOpen) return;
    if (!isSelectInfo) return;
    const fetchAndConvertImages = async () => {
      const promises = isSelectInfo.map(async (item) => {
        try {
          const file = await convertURLtoFile(item.path);
          console.log("file", file);
          return file;
        } catch (err) {
          console.error("Error converting URL to file:", err);
          return null;
        }
      });
      const files = await Promise.all(promises);
      files.map((item) => {
        setPhotoToAddList((prevList) => [...prevList, { file: item }]);
      });
    };

    fetchAndConvertImages();
  }, [isReviewOpen, isSelectInfo]);
  useEffect(() => {
    // 이미지 정보 설정
    setUser((prevUser) => ({
      ...prevUser,
      profileImageUrl: isUserInfo?.profileImageUrl,
      isOwner: isUserInfo?.owner,
      saveRestaurants: isUserInfo?.savedRestaurants,
    }));
  }, [isUserInfo]);
  const toggleDrawerReview = (e, info) => {
    setIsReviewOpen((prevState) => !prevState);
    if (isReviewOpen) {
      setSelectItem({ score: 0, reviewId: 0 });
      document.querySelector(`.star span`).style.width = `0%`;
      textInput.current.value = "";
      setPhotoToAddList([]);
    } else {
      setSelectItem({ score: info.rate, reviewId: info.reviewId });
      document.querySelector(`.star span`).style.width = `${
        info.rate * 2 * 10
      }%`;
      textInput.current.value = info.comment;
      setIsSelectInfo(info.images);
    }
  };

  const handleClick = () => {
    if (photoToAddList.length >= 5) {
      alert("최대 5장만 가능합니다.");
      return;
    }
    photoInput.current.click();
  };

  const handlePhoto = (e) => {
    const temp = [];
    const photoToAdd = e.target.files;
    for (let i = 0; i < photoToAdd.length; i++) {
      temp.push({ file: photoToAdd[i] });
    }
    setPhotoToAddList(temp.concat(photoToAddList));
  };

  const photoToAddPreview = () => {
    if (!isReviewOpen) return;
    if (photoToAddList.length > 5) {
      alert("최대 5장만 가능합니다.");
      photoToAddList.length = 5;
    }

    return photoToAddList.map((photo) => {
      console.log("photoToAddList", photo);
      let photoUrl = URL.createObjectURL(photo.file);

      return (
        <div className="photoBox" key={photoUrl}>
          <div
            className="photoBoxDelete icon delect-icon"
            onClick={() => onRemoveToAdd(photo.file.name)}
          />
          <img
            className="photoPreview size-[100%]"
            src={photoUrl}
            alt="preview"
          />
          {URL.revokeObjectURL(photo.file)}
        </div>
      );
    });
  };

  const drawStar = (e) => {
    document.querySelector(`.star span`).style.width = `${
      e.target.value * 10 * 2
    }%`;

    setSelectItem((prevState) => ({ ...prevState, score: e.target.value }));
  };

  const onRemoveToAdd = (deleteName) => {
    setPhotoToAddList(
      photoToAddList.filter((photo) => photo.file.name !== deleteName)
    );
  };
  const onRemove = (deleteName) => {
    // setIsSelectInfo(
    //   isSelectInfo.images.filter((photo) => photo.path !== deleteName)
    // );
  };
  const createOwner = () => {
    navigate(`/owner`);
  };

  const menuClick = (e, index) => {
    if (index === 0) {
      setIsSelect(true);
      setIsSave(true);
    } else {
      setIsSelect(false);
      setIsSave(false);
    }
  };

  useEffect(() => {
    if (isUserInfo?.owner && getRestaurantItem) {
      setIsRestaurant(true);
      setRestaurant((prevUser) => ({ ...getRestaurantItem }));
    }
  }, [getRestaurantItem]);

  useEffect(() => {
    // 이미지 정보 설정

    setUser((prevUser) => ({
      ...prevUser,
      profileImageUrl: isUserInfo?.profileImageUrl,
      isOwner: isUserInfo?.owner,
      saveRestaurants: isUserInfo?.savedRestaurants,
    }));
    if (isUserInfo) {
      console.log("마이페이지 success", isUserInfo);
      sessionStorage.setItem("data", JSON.stringify(isUserInfo));
    } 
  }, [isUserInfo]);

  useEffect(()=>{console.log(user);},[user])

  const manageRestaurant = () => {
    navigate(`/my/myshop?owner=${getOwnerItem.ownerId}`);
  };

  const createRestaurant = () => {
    navigate(`/my/myshop/edit/add`);
  };

  const rateBox = (count) => {
    const element = [];
    for (let index = 0; index < count; index++) {
      element.push(<span key={index}>★</span>);
    }
    for (let index = 0; index < 5 - count; index++) {
      element.push(<span key={5 - index}>☆</span>);
    }
    return element;
  };

  const reviewSend = () => {
    const reviewItem = {
      updateReviewReq: {
        reviewId: Number(isSelectItem.reviewId),
        rate: Number(isSelectItem.score),
        comment: textInput.current.value,
      },
      files: photoToAddList,
    };
    review(reviewItem);
  };

  const reviewDelect = (e, info) => {
    DeleteReviewItem(info.reviewId);
  };

  const onDetail = ({ restaurantName, id }) => {
    console.log("name : ", restaurantName);
    navigate(`/ct/shop/${restaurantName}`, { state: restaurantName });
  };
  // 내 정보 프로필사진이나 닉네임 등등 없으면 로딩하게 제작
  if (userLoading || !isUserInfo) {
    return <Loading></Loading>;
  }

  // 이미지 없는 경우, default 이미지 노출
  const onErrorImg = (e) => {
    e.target.src = defaultImage;
  };
  return (
    <MainContents className="main">
      {/* 프로필정보 */}
      <section className="section pt-[24px]">
        <section className="container gutter-sm">
          <div className="mypage-profile flex items-start mb-[16px]">
            <div className="profile-pic mr-[12px]">
              <img
                className="img border border-[#d5d5d5]"
                src={`${isUserInfo?.profileImageUrl}`}
                alt={defaultImage}
              ></img>
            </div>
            <div className="mypage-profile-meta">
              <div className="userInfo flex items-center">
                <h4 className="name">{isUserInfo?.nickname}</h4>
                <div className="isOwner flex">
                  <FaStar color="#ff3d00"></FaStar>
                </div>
              </div>
              <div className="social"></div>
            </div>
          </div>
          <div className="mypage-profile-btn flex ">
            <button
              className="btn btn-md btn-outline btn-rounded mt-18"
              onClick={updateUserInfo}
            >
              <span className="label">프로필 수정</span>
            </button>
            <button
              className="btn btn-md btn-outline btn-rounded mt-18"
              onClick={
                isUserInfo?.owner
                  ? isRestaurant
                    ? manageRestaurant
                    : createRestaurant
                  : createOwner
              }
            >
              <span className="label">
                {isUserInfo?.owner
                  ? isRestaurant
                    ? "내 식당 관리"
                    : "내 식당 등록"
                  : "사장님 등록"}
              </span>
            </button>
          </div>
        </section>
        {/* 예약확인 */}
        <section className="section section-overflow-hidden"></section>
        {/* 배너 */}
        <div>
          <div
            className="mypage-ad flex items-center"
            onClick={(e) => {
              e.preventDefault();
              alert("준비중 입니다.");
            }}
          >
            <img src="https://app.catchtable.co.kr/public/img/Anniversary/anniversary-cake.svg"></img>
            <div>
              <p>캐치테이블이 특별한 날을 축하해드릴게요</p>
              <span>
                생일/기념일 등록하기<i></i>
              </span>
            </div>
          </div>
        </div>
        {/* 탭 */}
        <div>
          <ul className="tab-menu sticky top-[0px] mb-[10px] bg-white">
            <li
              className={`w-[50%] leading-[48px] text-center ${
                isSelect ? " active" : ""
              }`}
              onClick={(e) => menuClick(e, 0)}
            >
              나의 저장
            </li>
            <li
              className={`w-[50%] leading-[48px] text-center ${
                isSelect ? "" : "active"
              }`}
              onClick={(e) => {
                menuClick(e, 1);
              }}
            >
              리뷰
            </li>
          </ul>
          {isSave ? (
            <div className="collection">
              {user?.saveRestaurants?.length > 0 ? (
                <section className="section pt-[20px]">
                  <div className="container gutter-sm">
                    <div className="__d-flex">
                      <div className="section-header justify-between full-width">
                        <h3 className="section-title flex">
                          저장한 레스토랑
                          <span className="count">
                            {user?.saveRestaurants?.length}
                          </span>
                        </h3>
                      </div>
                    </div>
                    <div className="section-body pb-[32px]">
                      <div className="saved-restaurant-list">
                        {user?.saveRestaurants?.map((item, index) => {
                          return (
                            <div
                              className="saved-restaurant-list-item"
                              key={index}
                            >
                              <div className="restaurant-info">
                                <a className="tb">
                                  <div className="img">
                                    <img
                                      src={`${item.imageUrl}`}
                                      onError={onErrorImg}
                                    />
                                  </div>
                                </a>
                                <a className="detail">
                                  <h4 className="name">
                                    {item.savedRestaurantName || "식당 이름"}
                                  </h4>
                                  <p className="excerpt">
                                    {item.content || "식당 소개"}
                                  </p>
                                  <div className="restaurant-meta">
                                    <div className="rating">
                                      <span className="star">
                                        {item.rate || "식당 별점"}
                                      </span>
                                      <span className="count">
                                        {item.reviewCount || "식당 리뷰수"}
                                      </span>
                                    </div>
                                  </div>
                                </a>
                                <a className="btn-bookmark active"></a>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </section>
              ) : (
                <div className=" w-[100%] h-[220px] flex-col gap-y-[20px] flex items-center justify-center ">
                  <img
                    className=" size-[70px]"
                    src={require("../../assets/icons/empty.png")}
                  />
                  <span className=" text-[#47566A] text-[16px] text-bold ">
                    현재 저장된 레스토랑이 없습니다.
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="review container">
              {isUserInfo && isUserInfo.reviews.length > 0 ? (
                isUserInfo.reviews.map((info, index) => {
                  return (
                    <div
                      key={index}
                      className=" py-[20px] px-[16px] bg-white rounded-[10px] shadow-lg min-h-[120px] relative mb-[15px]"
                    >
                      <div className="">
                        <div className="flex flex-col w-[100%] gap-y-[7px]">
                          <div className="flex justify-between">
                            <span className="text-[16px] font-bold">
                              {info.restaurantName}
                            </span>
                            <div className="flex justify-end gap-x-[7px]">
                              <span
                                className="w-[63px] text-center text-[#666] text-[12px] float-right rounded-full py-[2px] px-[1px] border border-[#d5d5d5]"
                                onClick={(e) => {
                                  toggleDrawerReview(e, info);
                                }}
                              >
                                수정
                              </span>

                              {isUserInfo.comments.map((item, index) => {
                                return info.reviewId !== item.reviewId ? (
                                  <span
                                    key={index}
                                    className="w-[63px] text-center text-[#666] text-[12px] float-right rounded-full py-[1px] px-[8px] border border-[#d5d5d5]"
                                    onClick={(e) => {
                                      reviewDelect(e, info);
                                    }}
                                  >
                                    삭제
                                  </span>
                                ) : (
                                  ""
                                );
                              })}
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <div className=" text-[#ff3d00]">
                              {rateBox(info.rate)}
                            </div>
                            <span className="text-[#666] text-[12px] item self-end">
                              {info.createdDate.split("T")[0]}
                            </span>
                          </div>
                          <span className="text-[14px] my-[5px]">
                            {info.comment}
                          </span>
                          <div className=" grid grid-cols-4 justify-center gap-[10px]">
                            {info.images &&
                              info.images.map((item) => {
                                return (
                                  <img
                                    className="rounded-[6px] size-[68px] border border-[#d5d5d5]"
                                    key={item.reviewImageId}
                                    src={`${item.path}`}
                                  />
                                );
                              })}
                          </div>
                          {isUserInfo.comments.map((item) => {
                            return info.reviewId === item.reviewId &&
                              item.ownerId !== 0 ? (
                              <div
                                key={item.reviewId}
                                className=" flex flex-col gap-y-[10px]"
                              >
                                <div className="">
                                  <span className=" font-bold">사장님</span>
                                  <span className=" text-[12px] ml-[7px]">
                                    {moment(item.updatedDate)
                                      .endOf("day")
                                      .fromNow()}
                                  </span>
                                </div>
                                <div className="p-[7px] w-auto rounded-lg bg-[#f4f4f4] text-[#2c2c2c] text-[14px] min-h-[80px] ">
                                  {item.content}
                                </div>
                              </div>
                            ) : (
                              ""
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className=" w-[100%] h-[220px] flex-col gap-y-[20px] flex items-center justify-center ">
                  <img
                    className=" size-[70px]"
                    src={require("../../assets/icons/empty.png")}
                  />
                  <span className=" text-[#47566A] text-[16px] text-bold ">
                    현재 리뷰 없습니다.
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
      {/* 리뷰 슬라이드 */}
      <Drawer
        open={isReviewOpen}
        onClose={toggleDrawerReview}
        direction="right"
        className="drawer-box right"
        size="100%"
      >
        <div className="container">
          <div className="header-left items-center flex gap-[12px] h-[47px]">
            <a
              className="header-close-black h-[47px] leading-[47px] z-50"
              onClick={toggleDrawerReview}
            ></a>
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
                    value={isSelectItem.score}
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
          <ReviewSendBtn onClick={reviewSend}>리뷰 입력 완료</ReviewSendBtn>
        </div>
      </Drawer>
    </MainContents>
  );
}

export default MyPage;
const PictureFilled = styled.div`
  width: 100px;
  height: 100px;
  background-color: #eee;
`;
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
const MainContents = styled.div`
  padding-bottom: 48px;
  box-sizing: border-box;
  overflow: auto;
  height: calc(100vh - 47px);

  /* 개인프로필 */
  .mypage-profile .profile-pic .img {
    background-image: url("https://app.catchtable.co.kr/public/img/noimg/profile_default_v2.png");
    background-size: 100%;
    width: 80px;
    height: 80px;
    border-radius: 100%;
    box-sizing: border-box;
  }
  /* 개인정보 */
  .mypage-profile .mypage-profile-meta {
    position: relative;
    flex: 1;
    min-width: 0;
    padding-top: 15px;
  }
  .mypage-profile-meta .name {
    display: flex;
    font-size: 16px;
    font-weight: 700;
  }
  .mypage-profile-meta .meta {
    display: flex;
    gap: 10px;
    margin-top: 5px;
  }
  .meta {
    align-items: baseline;
    line-height: 14px;
  }
  .mypage-profile-meta .meta dl {
    display: flex;
    gap: 5px;
  }
  .mypage-profile-meta .meta dl dt {
    color: #666;
    font-size: 12px;
  }
  .mypage-profile-meta .meta dl dd {
    font-weight: 700;
    color: #000;
    font-size: 14px;
  }
  /* 버튼관련 */
  .mypage-profile-btn {
    justify-content: space-between;
    gap: 5px;
  }
  .mypage-profile-btn .btn {
    flex: 1;
    // margin-top : 18px !important;
  }
  /* 배너 */
  .mypage-ad {
    padding: 20px 30px;
    gap: 12px;
    background-color: #f4f4f4;
    margin-top: 28px;
  }
  .mypage-ad p {
    color: #222222;
    font-size: 16px;
    font-weight: 700;
    line-height: 150%;
  }
  .mypage-ad span {
    color: #222222;
    font-size: 14px;
    font-weight: 400;
    line-height: 150%;
    display: flex;
    align-items: center;
  }
  .mypage-ad span i {
    width: 16px;
    height: 16px;
    display: block;
    background: url("https://app.catchtable.co.kr/public/img/icons/arrow-right.svg")
      50% 50% no-repeat;
  }
  /* 나의 저장 */
  .section .section-header .section-title {
    font-weight: 700;
    letter-spacing: 0;
    font-size: 16px !important;
    display: flex;
  }
  .section .section-header .section-title span {
    font-size: 14px;
    color: #999;
    margin-left: 8px;
    font-weight: 400;
  }
  .section .margin-custom {
    margin: 28px 0 24px 0;
  }
  .section .section-header .section-title .count {
    font-size: 14px;
    color: #999;
    margin-left: 8px;
    font-weight: 400;
  }
  .font-size img {
    margin-left: 4px;
    width: 16px;
    height: 16px;
  }
`;
