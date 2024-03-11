import React, { useRef } from "react";
import Drawer from "react-modern-drawer";
export function drawCal(year, month, calRow) {
  console.log("안녕", year, month, calRow);
  var today = new Date();

  var firstday = new Date(year, month, 1);
  var loop = new Date(firstday.setDate(firstday.getDate() - firstday.getDay()));
  var dayNames = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  // const calRow = document.querySelector(".cal-row");

  // $(".cal-row").empty();
  // console.log(document.querySelector(".cal-row"));
  //   calRow.innerText = " ";
  //   for (let i = 0; i < 7 * 6; i++) {
  //     var rowNo = Math.floor(i / 7);
  //     var cellNo = i % 7;
  //     var day = loop.getDate();

  //     // var num = loop.getMonth() + 1;
  //     var currentMonth =
  //       loop.getFullYear() != year || loop.getMonth() != month
  //         ? "not-current"
  //         : "";
  //     var cell =
  //       "<span class='day " +
  //       dayNames[cellNo] +
  //       " " +
  //       currentMonth +
  //       "'>" +
  //       day +
  //       "</span>";
  //     calRow.innerHTML(cell);
  //     loop = new Date(loop.setDate(loop.getDate() + 1));

  //     if (day === today.getDate() && cellNo === today.getDay()) {
  //       //   $(".cal-row:eq(" + rowNo + ") .day:eq(" + cellNo + ")").addClass("today");
  //     }
  //   }
}

const Calendar = ({ isOpen, toggleDrawer }) => {
  var today = new Date();
  var thisMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate()
  );

  const monthRef = useRef();
  console.log(monthRef);
  // const calRowRef = useRef();
  // monthRef.current.innerText =
  //   String(thisMonth.getFullYear()) +
  //   " " +
  //   String(thisMonth.getMonth()).padStart(2, "0");

  // var this_year = today.getFullYear();
  // var this_month = today.getMonth();

  // DrawCalendar.drawCal("2024", "03", calRowRef);
  return (
    <div>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="bottom"
        className="drawer-box"
        size="calc(100vh - 150px)"
      >
        <div className="calender-box">
          <div className="cal-name">
            <img
              src="img/btn-arrow-03-l-s.png"
              alt="arrow"
              className="btn-prev"
            />
            <button className="btn-prev">P</button>
            <span className="cal-month" ref={monthRef}></span>
            <button className="btn-next">N</button>
            <img
              src="img/btn-arrow-03-r-s.png"
              alt="arrow"
              className="btn-next"
            />
          </div>
          <div className="cal-header">
            <span className="day-name sunday">SUN</span>
            <span className="day-name monday">MON</span>
            <span className="day-name tuesday">TUE</span>
            <span className="day-name wednesday">WED</span>
            <span className="day-name thursday">THU</span>
            <span className="day-name friday">FRI</span>
            <span className="day-name saturday">SAT</span>
          </div>
          <div className="cal-body">
            <div className="cal-row"></div>
            <div className="cal-row"></div>
            <div className="cal-row"></div>
            <div className="cal-row"></div>
            <div className="cal-row"></div>
            <div className="cal-row"></div>
            <div className="cal-row"></div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Calendar;
