// import moment from "moment";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Drawer from "react-modern-drawer";
// import { useQueryClient } from "react-query";
import { useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { ReservationTimes } from "../respository/reservation";
// import { checkReservationTimes } from "../respository/reservation";
const CalendarComponent = ({ isOpen, toggleDrawer, restaurant }) => {
  const [date, setDate] = useState(new Date());
  const [isTimes, setIsTime] = useState([]);
  const [restaurantId, setIsRestaurantId] = useState("");
  const queryClient = useQueryClient();
  const { mutate: checkReservationTimes } = ReservationTimes();
  const [isRestaurantInfor, setIsRestaurantInfor] = useState([]);
  const [numberOfPeople, setIsPeopleNum] = useState(1);
  const [isVisitTime, setVisitTime] = useState("00:00");
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  useEffect(() => {
    if (isOpen) {
      setDate(new Date());
      setIsPeopleNum(1);
      setIsRestaurantId(restaurant.restaurantId);
      setIsRestaurantInfor(restaurant);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const visitTimeHours = String(new Date().getHours()).padStart(2, "0");
      const visitTimeMinutes = String(new Date().getMinutes()).padStart(2, "0");
      const searchDate =
        date.getFullYear() +
        "-" +
        String(date.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(date.getDate()).padStart(2, "0");

      const visitTime = visitTimeHours + ":" + visitTimeMinutes + ":" + "00";

      const testObj = { restaurantId, numberOfPeople, searchDate, visitTime };

      checkReservationTimes(testObj);
    }
  }, [date, numberOfPeople, isVisitTime, isRestaurantInfor]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };
  const handleTodayClick = () => {
    const today = new Date();
    setActiveStartDate(today);
    setDate(today);
  };
  const peopleNum = () => {
    let array = [];
    for (let index = 1; index <= 10; index++) {
      array.push(
        <SwiperSlide key={index}>
          <span
            onClick={() => {
              setIsPeopleNum(index);
            }}
            className={` block size-[48px] rounded-[50%] text-center leading-[48px] font-light text-[14px] ${
              index === numberOfPeople
                ? `bg-[#ff3d00] text-[#fff]`
                : `text-[#aaa] border-[1px] border-[#aaa]`
            }`}
          >
            {index + "명"}
          </span>
        </SwiperSlide>
      );
    }

    return array;
  };

  return (
    <div>
      <Drawer
        open={isOpen}
        // onClose={toggleDrawer}
        direction="bottom"
        className="drawer-box"
        size="620px"
      >
        <StyledCalendarWrapper>
          <StyledDate onClick={handleTodayClick}>오늘</StyledDate>

          <StyledCalendar
            onChange={handleDateChange}
            value={date}
            formatDay={(locale, date) => moment(date).format("D")} // 일 제거 숫자만 보이게
            formatYear={(locale, date) => moment(date).format("YYYY")} // 네비게이션 눌렀을때 숫자 년도만 보이게
            formatMonthYear={(locale, date) =>
              moment(date).format("YYYY년 MM월")
            } // 네비게이션에서 2023. 12 이렇게 보이도록 설정
            calendarType="gregory" // 일요일 부터 시작
            // showNeighboringMonth={true} // 전달, 다음달 날짜 숨기기
            next2Label={null} // +1년 & +10년 이동 버튼 숨기기
            prev2Label={null} // -1년 & -10년 이동 버튼 숨기기
            minDetail="year" // 10년단위 년도 숨기기
            allowPartialRange={true}
            activeStartDate={
              activeStartDate === null ? undefined : activeStartDate
            }
            onActiveStartDateChange={({ activeStartDate }) =>
              setActiveStartDate(activeStartDate)
            }
            minDate={new Date()}
          />
        </StyledCalendarWrapper>
        {/* 인원 수 */}
        <Swiper
          className=" pl-[20px] py-[10px]"
          spaceBetween={0}
          slidesPerView={6}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {peopleNum()}
        </Swiper>

        {/* 시간 */}
        {isTimes.length > 0 ? (
          <Swiper
            className=" pl-[20px] py-[15px]"
            spaceBetween={7}
            slidesPerView={4}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {isTimes.map((item, index) => {
              return (
                <SwiperSlide
                  key={index}
                  onClick={() => {
                    console.log(item.time);
                    setVisitTime(item.time);
                  }}
                  className=" min-w-[70px] h-[38px] rounded-[6px] bg-[#ff3d00] text-[#fff] w-fit text-[13px] text-center leading-[38px]"
                >
                  {item.time.slice(0, 2) < 13
                    ? `오전 ${item.time.slice(0, 2)}`
                    : `오후 ${String(
                        Number(item.time.slice(0, 2)) - 12
                      ).padStart(2, "0")}`}
                  {":" + item.time.slice(3)}
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : (
          <div className="container mt-[10px]">
            <span className=" block h-[38px] bg-[#f4f4f4] text-center text-[#aaa] leading-[38px] text-[13px]">
              예약이 모두 마감되었습니다.
            </span>
          </div>
        )}

        <CloseBtn type="button" open={isOpen} onClick={toggleDrawer}>
          닫기
        </CloseBtn>
      </Drawer>
    </div>
  );
};

export default CalendarComponent;
const CloseBtn = styled.button`
  padding: 0 5%;
  width: 90%;
  margin: 0 auto;
  height: 48px;
  border-color: #d5d5d5;
  border-width: 1px;
  line-height: 46px;
  border-radius: 6px;
  box-sizing: border-box;
  display: block;
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 20px;
`;
export const StyledCalendarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  .react-calendar {
    width: 100%;
    border: none;
    border-radius: 0.5rem;
    /* box-shadow: 4px 2px 10px 0px rgba(0, 0, 0, 0.13); */
    padding: 3% 5%;
    background-color: white;
  }

  /* 전체 폰트 컬러 */
  .react-calendar__month-view {
    abbr {
      color: ${(props) => props.theme.gray_1};
    }
  }

  /* 네비게이션 가운데 정렬 */
  .react-calendar__navigation {
    justify-content: center;
  }

  /* 네비게이션 폰트 설정 */
  .react-calendar__navigation button {
    font-weight: 800;
    font-size: 1rem;
  }

  /* 네비게이션 버튼 컬러 */
  .react-calendar__navigation button:focus {
    background-color: white;
  }

  /* 네비게이션 비활성화 됐을때 스타일 */
  .react-calendar__navigation button:disabled {
    background-color: white;
    opacity: 0.4;
    color: ${(props) => props.theme.darkBlack};
  }

  /* 년/월 상단 네비게이션 칸 크기 줄이기 */
  .react-calendar__navigation__label {
    flex-grow: 0 !important;
  }

  /* 요일 밑줄 제거 */
  .react-calendar__month-view__weekdays abbr {
    text-decoration: none;
    font-weight: 800;
  }

  /* 일요일에만 빨간 폰트 */
  .react-calendar__month-view__weekdays__weekday--weekend abbr[title="일요일"] {
    color: ${(props) => props.theme.red_1};
  }

  /* 오늘 날짜 폰트 컬러 */
  .react-calendar__tile--now {
    background: none;
    abbr {
      color: ${(props) => props.theme.primary_2};
    }
  }

  /* 네비게이션 월 스타일 적용 */
  .react-calendar__year-view__months__month {
    border-radius: 0.8rem;
    background-color: ${(props) => props.theme.gray_5};
    padding: 0;
  }

  /* 네비게이션 현재 월 스타일 적용 */
  .react-calendar__tile--hasActive {
    background-color: ${(props) => props.theme.primary_2};
    abbr {
      color: white;
    }
  }

  /* 일 날짜 간격 */
  .react-calendar__tile {
    padding: 5px 0px 18px;
    position: relative;
  }

  /* 네비게이션 월 스타일 적용 */
  .react-calendar__year-view__months__month {
    flex: 0 0 calc(33.3333% - 10px) !important;
    margin-inline-start: 5px !important;
    margin-inline-end: 5px !important;
    margin-block-end: 10px;
    padding: 20px 6.6667px;
    font-size: 0.9rem;
    font-weight: 600;
    color: ${(props) => props.theme.gray_1};
  }

  /* 선택한 날짜 스타일 적용 */
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus,
  .react-calendar__tile--active {
    background-color: ${(props) => props.theme.yellow_2};
    border-radius: 0.3rem;
  }
`;

/* 오늘 버튼 스타일 */
export const StyledDate = styled.div`
  position: absolute;
  left: 7%;
  top: 22px;
  background-color: ${(props) => props.theme.primary_3};
  /* color: ${(props) => props.theme.yellow_2}; */
  width: 18%;
  min-width: fit-content;
  height: 1.5rem;
  text-align: center;
  margin: 0 auto;
  font-weight: 400;
  line-height: 1.6rem;
  border-radius: 15px;
  font-size: 0.9rem;
  color: #f35421 !important;
  text-decoration: underline;
  /* font-weight: 800; */
`;

/* 오늘 날짜에 텍스트 삽입 스타일 */
export const StyledToday = styled.div`
  font-size: x-small;
  color: ${(props) => props.theme.br_2};
  font-weight: 600;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
`;

/* 출석한 날짜에 점 표시 스타일 */
export const StyledDot = styled.div`
  background-color: ${(props) => props.theme.br_2};
  border-radius: 50%;
  width: 0.3rem;
  height: 0.3rem;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translateX(-50%);
`;

export const StyledCalendar = styled(Calendar)``;
