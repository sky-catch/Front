import { useEffect, useState } from "react";
// import Select from "react-select";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
// import { useRecoilState } from "recoil";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { RestaurantState } from "../../States/LoginState";
import {
  UpdateRestaurantRes,
  createRestaurant,
} from "../../respository/restaurant";
import { DeleteOwnerReq } from "../../respository/userInfo";

/**
 * 식당 정보 입력 화면
 * @author jimin
 */

// const categoryOptions = [
//   { value: "SUSHI_OMAKASE", label: "스시 오마카세" },
//   { value: "HANWOO_OMAKASE", label: "한우 오마카세" },
//   { value: "STEAK", label: "스테이크" },
//   { value: "KOREAN", label: "한식" },
//   { value: "BEEF_GRILL", label: "쇠고기 그릴" },
//   { value: "CHINESE", label: "중국식" },
//   { value: "JAPANESE", label: "일본식" },
//   { value: "ITALIAN", label: "이탈리아식" },
//   { value: "FRENCH", label: "프랑스식" },
//   { value: "ASIAN", label: "아시아식" },
//   { value: "WINE", label: "와인" },
//   { value: "BEER", label: "맥주" },
//   { value: "OTHER", label: "기타" },
// ];
// const testDay = ["MODDAY", "TUESDAY"];
// const testFacility = ["PARKING"];
export default function RestaurantInfo() {
  const [user, setUser] = useState([]);
  const userInfo = useRecoilValue(RestaurantState);
  const { mutate: deleteOwner } = DeleteOwnerReq();
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [restaurant, setRestaurant] = useState(false);
  const [isNumber, setIsNumber] = useState("");
  const theme = useTheme();
  const { mutate: updateRestaurant } = UpdateRestaurantRes();
  const ITEM_HEIGHT = 40;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    // console.log('아녕')
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 8.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const days = [
    { value: "MONDAY", label: "월" },
    { value: "TUESDAY", label: "화" },
    { value: "WEDNESDAY", label: "수" },
    { value: "THURSDAY", label: "목" },
    { value: "FRIDAY", label: "금" },
    { value: "SATURDAY", label: "토" },
    { value: "SUNDAY", label: "일" },
  ];
  const daysOptions = ["월", "화", "수", "목", "금", "토", "일"];
  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  // const facilityOptions = [
  //   { value: "주차", label: "PARKING" },
  //   { value: "발렛 가능", label: "VALET_PARKING" },
  //   { value: "콜키지 가능", label: "CORKAGE" },
  //   { value: "콜키지 프리", label: "CORKAGE_FREE" },
  //   { value: "대관 가능", label: "RENT" },
  //   { value: "노키즈존", label: "NO_KIDS" },
  //   { value: "와인배송", label: "WINE_DELIVERY" },
  //   { value: "레터링", label: "LETTERING" },
  //   { value: "전문 소믈리에", label: "SOMMELIER" },
  //   { value: "반려동물 동반", label: "PET" },
  //   { value: "장애인 편의시설", label: "ACCESSIBLE" },
  // ];
  // const facilityOptions = [
  //   { value: "PARKING", label: "주차" },
  //   { value: "VALET_PARKING", label: "발렛 가능" },
  //   { value: "CORKAGE", label: "콜키지 가능" },
  //   { value: "CORKAGE_FREE", label: "콜키지 프리" },
  //   { value: "RENT", label: "대관 가능" },
  //   { value: "NO_KIDS", label: "노키즈존" },
  //   { value: "WINE_DELIVERY", label: "와인배송" },
  //   { value: "LETTERING", label: "레터링" },
  //   { value: "SOMMELIER", label: "전문 소믈리에" },
  //   { value: "PET", label: "반려동물 동반" },
  //   { value: "ACCESSIBLE", label: "장애인 편의시설" },
  // ];
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
  // const categoryOptions = [
  //   { value: "스시 오마카세", label: "스시 오마카세" },
  //   { value: "한우 오마카세", label: "한우 오마카세" },
  //   { value: "스테이크", label: "스테이크" },
  //   { value: "한식", label: "한식" },
  //   { value: "쇠고기 그릴", label: "쇠고기 그릴" },
  //   { value: "중국식", label: "중국식" },
  //   { value: "일본식", label: "일본식" },
  //   { value: "이탈리아식", label: "이탈리아식" },
  //   { value: "프랑스식", label: "프랑스식" },
  //   { value: "ASIAN", label: "아시아식" },
  //   { value: "와인", label: "와인" },
  //   { value: "맥주", label: "맥주" },
  //   { value: "기타", label: "기타" },
  // ];
  const categoryOptions = [
    { value: "스시 오마카세", label: "스시 오마카세" },
    { value: "한우 오마카세", label: "한우 오마카세" },
    { value: "스테이크", label: "스테이크" },
    { value: "한식", label: "한식" },
    { value: "쇠고기 그릴", label: "쇠고기 그릴" },
    { value: "중국식", label: "중국식" },
    { value: "일본식", label: "일본식" },
    { value: "이탈리아식", label: "이탈리아식" },
    { value: "프랑스식", label: "프랑스식" },
    { value: "ASIAN", label: "아시아식" },
    { value: "와인", label: "와인" },
    { value: "맥주", label: "맥주" },
    { value: "기타", label: "기타" },
  ];
  /* 식당이 있으면 조회 */
  useEffect(() => {
    //내 식당 정보 조회 및 세팅
    console.log("userInfo", userInfo);
    if (userInfo.name) {
      const prevUser = userInfo;
      // 식당 정보 있을때
      console.log("식당 정보 있을때");

      setUser(prevUser);
      if (prevUser.days.days) {
        const convertedTest = prevUser.days.days.map((dayValue) => {
          const foundDay = days.find((day) => day.value === dayValue);
          return foundDay ? foundDay.label : dayValue;
        });
        setSelectedDays(convertedTest);
      }

      if (prevUser.category) {
        console.log("안녕카테고리");
        setSelectedCategory(prevUser.category);
      }

      if (prevUser.facilities) {
        console.log("안녕편의시설");
        // setSelectedCategory(prevUser.category);
      }
      setRestaurant(true);
      // });
    } else {
      // 식당 정보 없을때
      console.log("식당 정보 없을때");
      // console.log("userInfoInfo", user);
      // setRestaurant(true);
      setRestaurant(false);
      // setSelectedCategory("HANWOO_OMAKASE");
      // setSelectedDays(["월"]);
      // setSelectedFacilities(["주차"]);
    }
  }, []);

  /* Select 값 변경 Function */
  const handleSelectDay = (event) => {
    const selectedValue = event.target.value;
    const selectedDay =
      typeof selectedValue === "string"
        ? selectedValue.split(",")
        : selectedValue;

    setSelectedDays(selectedDay);
  };

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
    var today = new Date();
    /* 값 설정 */
    var name = document.getElementById("name").value;
    // var category = document.getElementById("category").value;
    var content = document.getElementById("content").value;
    var phone = document.getElementById("phone").value;
    var tablePersonMax = parseInt(
      document.getElementById("tablePersonMax").value
    );
    var tablePersonMin = parseInt(
      document.getElementById("tablePersonMin").value
    );
    var openTime =
      document.getElementById("openTime").value.slice(0, 5) +
      ":" +
      ("0" + today.getSeconds()).slice(-2);
    var lastOrderTime =
      document.getElementById("lastOrderTime").value.slice(0, 5) +
      ":" +
      ("0" + today.getSeconds()).slice(-2);

    var closeTime =
      document.getElementById("closeTime").value.slice(0, 5) +
      ":" +
      ("0" + today.getSeconds()).slice(-2);

    var address = document.getElementById("address").value;
    var detailAddress = document.getElementById("detailAddress").value;
    var lunchPrice = parseInt(document.getElementById("lunchPrice").value);
    var dinnerPrice = parseInt(document.getElementById("dinnerPrice").value);
    var reservationBeginDate = document.getElementById(
      "reservationBeginDate"
    ).value;
    var reservationEndDate =
      document.getElementById("reservationEndDate").value;
    console.log("user", user);
    var info = {
      name: name,
      category: selectedCategory,
      content: content,
      phone: phone,
      tablePersonMax: tablePersonMax,
      tablePersonMin: tablePersonMin,
      openTime: openTime,
      lastOrderTime: lastOrderTime,
      closeTime: closeTime,
      address: address,
      detailAddress: detailAddress,
      lat: 0,
      // lat: user.lat,
      lng: 0,
      // lng: user.lng,
      lunchPrice: lunchPrice,
      dinnerPrice: dinnerPrice,
      days: {
        days: selectedDays,
      },
      reservationBeginDate: reservationBeginDate,
      reservationEndDate: reservationEndDate,
      facilities: selectedFacilities,
    };

    /* 모두 필수 : 하나라도 입력하지 않은 경우 알림창 */
    // if (
    //   !name ||
    //   selectedCategory.length == 0 ||
    //   !phone ||
    //   !tablePersonMax ||
    //   !tablePersonMin ||
    //   !openTime ||
    //   !lastOrderTime ||
    //   !closeTime ||
    //   !address ||
    //   !detailAddress ||
    //   !reservationBeginDate ||
    //   !reservationEndDate
    // ) {
    //   alert("식당 정보를 모두 입력해주세요");
    //   return;
    // }

    //식당 추가
    // createRestaurant(info)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    console.log("restaurant", restaurant);
    if (restaurant) {
      //식당 수정
      info.lat = user.lat;
      info.lng = user.lng;
      updateRestaurant(info);
    } else {
      //식당 생성
      createRestaurant(info)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const inputNumber = (e) => {
    let value = e.target.value;
    const inputValue = value.replace(/\D/g, "");
    const formattedValue = inputValue.replace(
      /^\d{2,3}-\d{4}-\d{4}$/,
      (match, p1, p2, p3) => {
        let result = "";
        if (p1) result += p1;
        if (p2) result += "-" + p2;
        if (p3) result += "-" + p3;
        return result;
      }
    );
    setIsNumber(formattedValue);
  };

  // 식당 삭제
  const deleteRestaurant = () => {
    const owner = user.ownerId;
    deleteOwner(owner);
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
              className="form-input"
              id="name"
              placeholder="식당이름을 입력해주세요."
              defaultValue={user ? user.name : ""}
            />
          </div>
          <div className="form-block mb-[20px]">
            <div className="mb-[6px]">
              <Serious className="color-gray text-[12px]">카테고리</Serious>
            </div>
            <Box sx={{ width: 100 + "%" }}>
              <FormControl fullWidth>
                {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                <Select
                  id="demo-simple-select"
                  value={selectedCategory}
                  label="Age"
                  onChange={handleSelectCategory}
                >
                  {/* <MenuItem value={"SUSHI_OMAKASE"}>스시 오마카세</MenuItem>
                  <MenuItem value={"HANWOO_OMAKASE"}>한우 오마카세</MenuItem>
                  <MenuItem value={"STEAK"}>스테이크</MenuItem>
                  <MenuItem value={"KOREAN"}>한식</MenuItem>
                  <MenuItem value={"BEEF_GRILL"}>쇠고기 그릴</MenuItem>
                  <MenuItem value={"CHINESE"}>중국식</MenuItem>
                  <MenuItem value={"JAPANESE"}>일본식</MenuItem>
                  <MenuItem value={"ITALIAN"}>이탈리아식</MenuItem>
                  <MenuItem value={"FRENCH"}>프랑스식</MenuItem>
                  <MenuItem value={"ASIAN"}>아시아식</MenuItem>
                  <MenuItem value={"WINE"}>와인</MenuItem>
                  <MenuItem value={"BEER"}>맥주</MenuItem>
                  <MenuItem value={"OTHER"}>기타</MenuItem> */}
                  <MenuItem value={"스시 오마카세"}>스시 오마카세</MenuItem>
                  <MenuItem value={"한우 오마카세"}>한우 오마카세</MenuItem>
                  <MenuItem value={"스테이크"}>스테이크</MenuItem>
                  <MenuItem value={"한식"}>한식</MenuItem>
                  <MenuItem value={"쇠고기 그릴"}>쇠고기 그릴</MenuItem>
                  <MenuItem value={"중국식"}>중국식</MenuItem>
                  <MenuItem value={"일본식"}>일본식</MenuItem>
                  <MenuItem value={"이탈리아식"}>이탈리아식</MenuItem>
                  <MenuItem value={"프랑스식"}>프랑스식</MenuItem>
                  <MenuItem value={"아시아식"}>아시아식</MenuItem>
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
              defaultValue={user ? user.content : ""}
            />
          </div>
          <div className="form-block mb-[20px]">
            <div className="mb-[6px]">
              <Serious className="color-gray text-[12px]">식당 전화</Serious>
            </div>
            <input
              type="text"
              className="form-input"
              id="phone"
              value={user ? user.phone : ""}
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
                  shop: {
                    ...prevUser,
                    phone: formattedValue,
                  },
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
              id="tablePersonMax"
              min={1}
              value={user ? user.tablePersonMax : ""}
              placeholder="한 테이블 당 최대 인원을 입력해주세요."
              onChange={(e) => {
                const newValue = parseInt(e.target.value);
                setUser((prevUser) => ({
                  ...prevUser,
                  shop: {
                    ...prevUser,
                    tablePersonMax: newValue,
                  },
                }));
              }}
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
              min={1}
              id="tablePersonMin"
              value={user ? user.tablePersonMin : ""}
              placeholder="한 테이블 당 최소 인원을 입력해주세요."
              onChange={(e) => {
                const newValue = parseInt(e.target.value);
                setUser((prevUser) => ({
                  ...prevUser,
                  shop: {
                    ...prevUser,
                    tablePersonMin: newValue,
                  },
                }));
              }}
            />
          </div>
          <div className="form-block mb-[20px]">
            <div className="mb-[6px]">
              <Serious className="color-gray text-[12px]">오픈 시간</Serious>
            </div>
            <input
              type="time"
              className="form-input"
              id="openTime"
              defaultValue={user ? user.openTime : ""}
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
              id="lastOrderTime"
              defaultValue={user ? user.lastOrderTime : ""}
            />
          </div>
          <div className="form-block mb-[20px]">
            <div className="mb-[6px]">
              <Serious className="color-gray text-[12px]">마감 시간</Serious>
            </div>
            <input
              type="time"
              className="form-input"
              id="closeTime"
              defaultValue={user ? user.closeTime : ""}
            />
          </div>
          <div className="form-block mb-[20px]">
            <div className="mb-[6px]">
              <Serious className="color-gray text-[12px]">식당 주소</Serious>
            </div>
            <input
              type="text"
              className="form-input"
              id="address"
              placeholder="식당 주소를 입력해주세요."
              defaultValue={user ? user.address : ""}
            />
            <input
              type="text"
              className="form-input mt-[10px]"
              id="detailAddress"
              placeholder="식당 상세 주소를 입력해주세요."
              defaultValue={user ? user.detailAddress : ""}
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
              placeholder="점심 시간을 입력해주세요."
              value={user ? user.lunchPrice : ""}
              onChange={(e) => {
                const newValue = parseInt(e.target.value);
                setUser((prevUser) => ({
                  ...prevUser,
                  shop: {
                    ...prevUser,
                    lunchPrice: newValue,
                  },
                }));
              }}
            />
          </div>
          <div className="form-block mb-[20px]">
            <div className="mb-[6px]">
              <label className="color-gray text-[12px]">저녁 가격</label>
            </div>
            <input
              type="number"
              className="form-input"
              id="dinnerPrice"
              value={user ? user.dinnerPrice : ""}
              placeholder="저녁 가격을 입력해주세요."
              onChange={(e) => {
                const newValue = parseInt(e.target.value);
                setUser((prevUser) => ({
                  ...prevUser,
                  shop: {
                    ...prevUser,
                    dinnerPrice: newValue,
                  },
                }));
              }}
            />
          </div>
          <div className="form-block mb-[20px]">
            <div className="mb-[6px]">
              <label className="color-gray text-[12px]">운영 날짜</label>
            </div>
            <FormControl sx={{ width: 100 + "%" }}>
              <Select
                id="demo-multiple-chip"
                multiple
                value={selectedDays}
                onChange={handleSelectDay}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {daysOptions.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, selectedDays, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* <Select
              options={daysOptions}
              isSearchable={false}
              isClearable={false}
              // isDisabled={false}
              classNamePrefix="select"
              closeMenuOnSelect={false}
              value={defaultDay(selectedDays)}
              // defaultValue={user ? defaultDay(selectedDays) : ""}
              isMulti
              className="basic-multi-select"
              onChange={handleSelectDay}
            ></Select> */}
          </div>
          <div className="form-block mb-[20px]">
            <div className="mb-[6px]">
              <Serious className="color-gray text-[12px]">
                예약 오픈 일자
              </Serious>
            </div>
            <input
              type="date"
              className="form-input"
              id="reservationBeginDate"
              required="required"
              defaultValue={user ? user.reservationBeginDate : ""}
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
              id="reservationEndDate"
              defaultValue={user ? user.reservationEndDate : ""}
            />
          </div>
          <div className="form-block mb-[20px]">
            <div className="mb-[6px]">
              <label className="color-gray text-[12px]">편의 시설</label>
            </div>

            <FormControl sx={{ width: 100 + "%" }}>
              {/* <InputLabel id="">운영 날짜</InputLabel> */}
              <Select
                // labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={selectedFacilities}
                onChange={handleSelectFacility}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
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

            {/* <Select
              options={facilityOptions}
              isClearable={false}
              value={defaultFacility(selectedFacilities)}
              // defaultValue={user ? defaultFacility(selectedFacilities) : ""}
              isMulti
              className="basic-multi-select"
              onChange={handleSelectFacility}
            ></Select> */}
          </div>
        </div>
      </div>
      {restaurant ? (
        <div className="h-[48px] btn btn-md btn-outline btn-rounded container flex justify-between">
          <DeleteBtn className="" onClick={deleteRestaurant}>
            식당 삭제
          </DeleteBtn>
          <InfoBtn className="" even={restaurant} onClick={addRestaurantInfo}>
            저장
          </InfoBtn>
        </div>
      ) : (
        <div className="h-[48px] btn btn-md btn-outline btn-rounded container flex justify-between">
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
  /* width: 65%; */
  ${(props) => (props.even ? " width: 65%;" : " width: 100%;")}
  /* margin-top: 0.75rem; */
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
