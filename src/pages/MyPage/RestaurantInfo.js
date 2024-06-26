import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { RestaurantState } from "../../States/LoginState";
import { convertURLtoFile } from "../../apis/ApiClient";
import { geocodeAddress } from "../../apis/geocodeAddress";
import { CreateRestaurantImagesItem } from "../../respository/reservation";
import {
  UpdateRestaurantRes,
  createRestaurant,
} from "../../respository/restaurant";
import { DeleteOwnerReq } from "../../respository/userInfo";
/**
 * 식당 정보 입력 화면
 * @author jimin
 */

const facilites = [
  { value: "PARKING", label: "주차 가능" },
  { value: "VALET_PARKING", label: "발렛 가능" },
  { value: "CORKAGE", label: "콜키지 가능" },
  { value: "CORKAGE_FREE", label: "콜키지 프리" },
  { value: "RENT", label: "대관 가능" },
  { value: "NO_KIDS", label: "노키즈존" },
  { value: "WINE_DELIVERY", label: "와인배송" },
  { value: "LETTERING", label: "레터링" },
  { value: "SOMMELIER", label: "전문 소믈리에" },
  { value: "PET", label: "반려동물 동반" },
  { value: "ACCESSIBLE", label: "장애인 편의시설" },
];
const facilityOptions = [
  "주차",
  "발렛 가능",
  "콜키지 가능",
  "콜키지 프리",
  "대관 가능",
  "노키즈존",
  "와인배송",
  "레터링",
  "전문 소믈리에",
  "반려동물 동반",
  "장애인 편의시설",
];

const testFile = (photoList) => {
  const photoArray = [];
  const photoLength = photoList.length - 1;
  photoList.map((item, index) => {
    photoArray.push(0 === index ? "REPRESENTATIVE" : "NORMAL");
  });

  return photoArray;
};

const dataChange = (items, data, lan) => {
  const array = [];
  items.map((item) => {
    if (lan === "ko") {
      const found = data.find((fa) => fa.value === item);
      array.push(found.label);
    } else {
      const found = data.find((fa) => fa.label === item);
      console.log(found);
      array.push(found.value);
    }
  });
  return array;
};
export default function RestaurantInfo() {
  const [user, setUser] = useState([]);
  const { mutate: createImages } = CreateRestaurantImagesItem();
  const { text } = useParams();
  const userInfo = useRecoilValue(RestaurantState);
  const { mutate: deleteOwner } = DeleteOwnerReq();
  const photoInput = useRef();
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [restaurant, setRestaurant] = useState(false);
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const theme = useTheme();
  const inputRef = useRef([]);
  const { mutate: updateRestaurant } = UpdateRestaurantRes();
  const [photoToAddList, setPhotoToAddList] = useState([]);
  const ITEM_HEIGHT = 40;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 8.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const handleChange = (event) => {
    const { id, value } = event.target;
    setUser((prevValuse) => ({
      ...prevValuse,
      [id]: value,
    }));
  };
  /* 식당이 있으면 조회 */
  useEffect(() => {
    //내 식당 정보 조회 및 세팅
    if (text.indexOf("add") === 0) {
      // 식당 정보 없을때
      setRestaurant(false);
    } else {
      // 식당 정보 있을때
      const prevUser = userInfo;
      setUser(prevUser);
      if (prevUser.category) {
        setSelectedCategory(prevUser.category);
      }

      if (prevUser.facilities) {
        const facilities = prevUser.facilities.map((item) => {
          return item.name;
        });
        setSelectedFacilities(facilities);
      }
      setLocation({ lat: prevUser.lat, lng: prevUser.lng });
      setRestaurant(true);
    }
  }, []);

  /* Select 값 변경 Function */
  useEffect(() => {
    if (!user.images) return;
    const fetchAndConvertImages = async () => {
      const promises = user.images.map(async (item) => {
        if (!item.path) return;
        try {
          const file = await convertURLtoFile(item.path);
          console.log("file", file);
          return file;
        } catch (err) {
          console.log("Error converting URL to file:", err);
        }
      });
      const files = await Promise.all(promises);
      files.map((item) => {
        setPhotoToAddList((prevList) => [...prevList, { file: item }]);
      });
    };
    fetchAndConvertImages();
  }, [user]);

  const handleSelectFacility = (event) => {
    const selectedValue = event.target.value;
    const selectedFacilitie =
      typeof selectedValue === "string"
        ? selectedValue.split(",")
        : selectedValue;
    setSelectedFacilities(selectedFacilitie);
  };

  const handleSelectCategory = (e) => {
    setSelectedCategory(e.target.value);
  };

  /* 식당 저장 */
  const addRestaurantInfo = () => {
    const today = new Date();
    /* 값 설정 */
    const name = inputRef.current[0].value;
    const category = selectedCategory;
    const content = inputRef.current[2].value;
    const phone = inputRef.current[3].value;
    const tablePersonMax = parseInt(inputRef.current[4].value);
    const tablePersonMin = parseInt(inputRef.current[5].value);
    const openTime = inputRef.current[6].value.slice(0, 5) + ":" + "00";
    const lastOrderTime = inputRef.current[7].value.slice(0, 5) + ":" + "00";
    const closeTime = inputRef.current[8].value.slice(0, 5) + ":" + "00";
    const address = inputRef.current[9].value;
    const detailAddress = inputRef.current[10].value;
    const lunchPrice = parseInt(inputRef.current[11].value);
    const dinnerPrice = parseInt(inputRef.current[12].value);

    const reservationBeginDate = inputRef.current[14].value;
    const reservationEndDate = inputRef.current[15].value;
    const info = {
      name: name,
      category: category,
      content: content,
      phone: phone,
      tablePersonMax: tablePersonMax,
      tablePersonMin: tablePersonMin,
      openTime: openTime,
      lastOrderTime: lastOrderTime,
      closeTime: closeTime,
      address: address,
      detailAddress: detailAddress,
      lat: Number(location.lat),
      lng: Number(location.lng),
      lunchPrice: lunchPrice ? lunchPrice : 0,
      dinnerPrice: dinnerPrice ? dinnerPrice : 0,
      reservationBeginDate: reservationBeginDate,
      reservationEndDate: reservationEndDate,
      facilities: dataChange(selectedFacilities, facilites, "en"),
    };

    console.log("location", location);
    /* 모두 필수 : 하나라도 입력하지 않은 경우 알림창 */
    if (
      !name ||
      !selectedCategory ||
      phone.length < 12 ||
      !tablePersonMax ||
      !tablePersonMin ||
      !openTime ||
      !lastOrderTime ||
      !closeTime ||
      !address ||
      !detailAddress ||
      !reservationBeginDate ||
      !reservationEndDate
    ) {
      alert("식당 정보를 모두 입력해주세요");
      return;
    }

    //식당 추가
    if (text.indexOf("add") === 0) {
      // 식당 정보 없을때
      console.log("식당 정보 없을때");
      createRestaurant(info)
        .then((res) => {
          // window.location.href = "/account";
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      //식당 정보 있을때
      updateRestaurant(info);
      // 사진 보내기
      if (!photoToAddList) return;
      const restaurantItem = {
        addRestaurantImagesReq: {
          restaurantImageTypes: testFile(photoToAddList),
        },
        files: photoToAddList,
        // restaurantId: 47,
        restaurantId: userInfo.restaurantId,
      };
      createImages(restaurantItem);
    }
  };

  const addressLocation = () => {
    const address = inputRef.current[9].value;
    geocodeAddress(address)
      .then((res) => {
        setLocation({ lat: res.lat, lng: res.lon });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 식당 삭제
  const deleteRestaurant = (ownerId) => {
    deleteOwner(ownerId);
  };
  const handleClick = () => {
    if (photoToAddList.length >= 10) {
      alert("최대 10장만 가능합니다.");
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
    if (photoToAddList.length === 0) return;
    if (photoToAddList.length > 10) {
      alert("최대 10장만 가능합니다.");
      photoToAddList.length = 10;
    }

    return photoToAddList.map((photo) => {
      if (!photo.file) return;
      let photoUrl = URL.createObjectURL(photo.file);
      console.log("photo", photoUrl);
      return (
        <div className="photoBox" key={photoUrl}>
          <div
            className="photoBoxDelete icon delete-icon"
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

  const onRemoveToAdd = (deleteName) => {
    setPhotoToAddList(
      photoToAddList.filter((photo) => photo.file.name !== deleteName)
    );
  };
  return (
    <MainContents className="main">
      <div className=" h-[100%] overflow-auto">
        <div className="container gutter-sm pb-[30px]">
          <div className="form-block mb-[20px]">
            <span className="mb-[6px]">
              <Serious className="color-gray text-[12px]">식당 이름</Serious>
            </span>
            <input
              type="text"
              ref={(el) => (inputRef.current[0] = el)}
              className="form-input"
              id="name"
              placeholder="식당이름을 입력해주세요."
              value={user.name || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-block mb-[20px]">
            <div className="mb-[6px]">
              <Serious className="color-gray text-[12px]">카테고리</Serious>
            </div>
            <Box sx={{ width: 100 + "%" }}>
              <FormControl fullWidth>
                <Select
                  id="demo-simple-select"
                  value={selectedCategory}
                  ref={(el) => (inputRef.current[1] = el)}
                  onChange={handleSelectCategory}
                >
                  <MenuItem value={"스시오마카세"}>스시오마카세</MenuItem>
                  <MenuItem value={"한우오마카세"}>한우 오마카세</MenuItem>
                  <MenuItem value={"스테이크"}>스테이크</MenuItem>
                  <MenuItem value={"한식"}>한식</MenuItem>
                  <MenuItem value={"소고기구이"}>소고기구이</MenuItem>
                  <MenuItem value={"중국식"}>중국식</MenuItem>
                  <MenuItem value={"일식"}>일식</MenuItem>
                  <MenuItem value={"이탈리아음식"}>이탈리아음식</MenuItem>
                  <MenuItem value={"프랑스음식"}>프랑스음식</MenuItem>
                  <MenuItem value={"아시아음식"}>아시아음식</MenuItem>
                  <MenuItem value={"와인"}>와인</MenuItem>
                  <MenuItem value={"맥주"}>맥주</MenuItem>
                  <MenuItem value={"기타"}>기타</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
          <div className="form-block mb-[20px]">
            <div className="mb-[6px]">
              <label className="color-gray text-[12px]">식당 설명</label>
            </div>
            <textarea
              className="form-input"
              id="content"
              placeholder="식당 설명을 입력해주세요."
              rows="3"
              maxLength="35"
              ref={(el) => (inputRef.current[2] = el)}
              value={user.content || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-block mb-[20px]">
            <div className="mb-[6px]">
              <Serious className="color-gray text-[12px]">식당 전화</Serious>
            </div>
            <input
              type="text"
              className="form-input"
              ref={(el) => (inputRef.current[3] = el)}
              id="phone"
              value={user.phone || ""}
              placeholder="식당 전화 번호 입력해주세요. 예시 : 02-0000-0000"
              maxLength={13}
              onChange={(e) => {
                let value = e.target.value;
                const inputValue = value.replace(/\D/g, "");
                const formattedValue = inputValue.replace(
                  /^(\d{2,3})(\d{4})(\d{4})$/,
                  (match, p1, p2, p3) => {
                    let result = "";
                    if (p1) result += p1;
                    if (p2) result += "-" + p2;
                    if (p3) result += "-" + p3;
                    return result;
                  }
                );
                setUser((prevUser) => ({
                  ...prevUser,
                  phone: formattedValue,
                }));
              }}
            />
          </div>
          <div className="form-block mb-[20px]">
            <div className="mb-[6px]">
              <Serious className="color-gray text-[12px]">
                한테이블 당 최대 인원
              </Serious>
            </div>
            <input
              type="number"
              className="form-input"
              ref={(el) => (inputRef.current[4] = el)}
              id="tablePersonMax"
              min={1}
              value={user.tablePersonMax || ""}
              placeholder="한 테이블 당 최대 인원을 입력해주세요."
              onChange={handleChange}
            />
          </div>
          <div className="form-block mb-[20px]">
            <div className="mb-[6px]">
              <Serious className="color-gray text-[12px]">
                한테이블 당 최소 인원
              </Serious>
            </div>
            <input
              type="number"
              className="form-input"
              ref={(el) => (inputRef.current[5] = el)}
              min={1}
              id="tablePersonMin"
              value={user.tablePersonMin || ""}
              placeholder="한 테이블 당 최소 인원을 입력해주세요."
              onChange={handleChange}
            />
          </div>
          <div className="form-block mb-[20px]">
            <div className="mb-[6px]">
              <Serious className="color-gray text-[12px]">오픈 시간</Serious>
            </div>
            <input
              type="time"
              className="form-input"
              ref={(el) => (inputRef.current[6] = el)}
              id="openTime"
              value={user.openTime || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-block mb-[20px]">
            <div className="mb-[6px]">
              <Serious className="color-gray text-[12px]">
                라스트 오더 시간
              </Serious>
            </div>
            <input
              type="time"
              className="form-input"
              ref={(el) => (inputRef.current[7] = el)}
              id="lastOrderTime"
              defaultValue={user.lastOrderTime || ""}
            />
          </div>
          <div className="form-block mb-[20px]">
            <div className="mb-[6px]">
              <Serious className="color-gray text-[12px]">마감 시간</Serious>
            </div>
            <input
              type="time"
              className="form-input"
              ref={(el) => (inputRef.current[8] = el)}
              id="closeTime"
              value={user.closeTime || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-block mb-[20px]">
            <div className="mb-[6px]">
              <Serious className="color-gray text-[12px]">식당 주소</Serious>
            </div>
            <input
              type="text"
              className="form-input"
              ref={(el) => (inputRef.current[9] = el)}
              id="address"
              placeholder="식당 주소를 입력해주세요."
              value={user.address || ""}
              onChange={handleChange}
              onBlur={addressLocation}
            />
            <input
              type="text"
              className="form-input mt-[10px]"
              ref={(el) => (inputRef.current[10] = el)}
              id="detailAddress"
              placeholder="식당 상세 주소를 입력해주세요."
              value={user.detailAddress || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-block mb-[20px]">
            <div className="mb-[6px]">
              <label className="color-gray text-[12px]">점심 가격</label>
            </div>
            <input
              type="number"
              className="form-input"
              id="lunchPrice"
              ref={(el) => (inputRef.current[11] = el)}
              placeholder="점심 시간을 입력해주세요."
              value={user.lunchPrice || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-block mb-[20px]">
            <div className="mb-[6px]">
              <label className="color-gray text-[12px]">저녁 가격</label>
            </div>
            <input
              type="number"
              className="form-input"
              ref={(el) => (inputRef.current[12] = el)}
              id="dinnerPrice"
              value={user.dinnerPrice || ""}
              placeholder="저녁 가격을 입력해주세요."
              onChange={handleChange}
            />
          </div>
          <div className="form-block mb-[20px]">
            <div className="mb-[6px]">
              <Serious className="color-gray text-[12px]">
                예약 오픈 일자
              </Serious>
            </div>
            <input
              type="date"
              ref={(el) => (inputRef.current[14] = el)}
              className="form-input"
              id="reservationBeginDate"
              required="required"
              value={user.reservationBeginDate || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-block mb-[20px]">
            <div className="mb-[6px]">
              <Serious className="color-gray text-[12px]">
                예약 마감 일자
              </Serious>
            </div>
            <input
              type="date"
              className="form-input"
              ref={(el) => (inputRef.current[15] = el)}
              id="reservationEndDate"
              onChange={handleChange}
              value={user.reservationEndDate || ""}
            />
          </div>
          <div className="form-block mb-[20px]">
            <div className="mb-[6px]">
              <label className="color-gray text-[12px]">편의 시설</label>
            </div>
            <FormControl sx={{ width: 100 + "%" }}>
              <Select
                id="demo-multiple-chip"
                multiple
                ref={(el) => (inputRef.current[16] = el)}
                value={selectedFacilities}
                onChange={handleSelectFacility}
                input={<OutlinedInput id="select-multiple-chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {facilityOptions.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, selectedFacilities, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          {text.indexOf("update") === 0 && (
            <div className="form-block mb-[20px]">
              <div className="mb-[6px]">
                <label className="color-gray text-[12px]">식당 이미지</label>
              </div>
              <span className="text-center text-[12px] block mb-[15px]">
                최대 10장 가능합니다. 마지막 이미지가 메인 입니다.
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
                {photoToAddList && photoToAddPreview()}
              </div>
            </div>
          )}
        </div>
      </div>
      {restaurant ? (
        <div className="h-[48px]  btn-rounded container flex justify-between">
          <DeleteBtn
            className=""
            onClick={() => {
              deleteRestaurant(user.ownerId);
            }}
          >
            식당 삭제
          </DeleteBtn>
          <InfoBtn className="" even={restaurant} onClick={addRestaurantInfo}>
            저장
          </InfoBtn>
        </div>
      ) : (
        <div className="`h-[48px]  btn-rounded container flex justify-between`">
          <InfoBtn className="" even={restaurant} onClick={addRestaurantInfo}>
            저장
          </InfoBtn>
        </div>
      )}
    </MainContents>
  );
}

const MainContents = styled.div`
  box-sizing: border-box;
  height: calc(100vh - 47px);
`;
const PictureFilled = styled.div`
  width: 100px;
  height: 100px;
  background-color: #eee;
`;
const DeleteBtn = styled.button`
  border-radius: 6px;
  line-height: 48px;
  text-align: center;
  font-size: 16px;
  width: 30%;
  color: rgb(102, 102, 102);
  background-color: rgb(244, 244, 244);
`;

const InfoBtn = styled.button`
  border-radius: 6px;
  line-height: 48px;
  text-align: center;
  font-size: 16px;
  ${(props) => (props.even ? " width: 65%;" : " width: 100%;")}
  background-color: #ff3d00;
  color: #fff;
`;

const Serious = styled.label`
  padding-left: 0px;
  position: relative;
  ::after {
    position: absolute;
    right: -9px;
    top: 0;
    content: "*";

    color: #ff3d00;
  }
`;
