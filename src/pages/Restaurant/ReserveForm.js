import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { createReservation } from "../../respository/reservation";

/**
 * 예약화면
 * @author jimin
 */
export default function ReserveForm() {
  const [min, setMin] = useState(7);
  const [sec, setSec] = useState(0);
  const [isMethod, setIsMethod] = useState(false); // 일반결제 radio 버튼 클릭 여부
  const [isContinue, setIsContinue] = useState(0); // 결제 동의
  const [isReserveAble, setIsReserveAble] = useState(false); //결제하기 버튼 활성화

  const navigate = useNavigate();
  const { state } = useLocation();

  // 예약 시 필요 정보
  const [memo, setMemo] = useState();
  const [deposit, setDeposit] = useState(state.restaurant.deposit);
  const [detail, setDetail] = useState(state.detail);
  const [restaurantId, setRestaurantId] = useState(
    state.restaurant.restaurantId
  );
  console.log('deposit',deposit);

  /* Funciton : 결제 */
  const requestPay = (e) => {
    if (!isReserveAble) return;

    const { IMP } = window;
    IMP.init("imp40776486"); // 아임포트 가맹점 식별코드
    IMP.request_pay(
      {
        pg: "kakaopay.TC0ONETIME", // 고정값입니다.
        pay_method: "card", // 고정값입니다.
        merchant_uid: new Date().getTime(), // 고정값입니다, 요청마다 다른 값을 넘겨야 합니다, 주문 상품 id 값이지만 저희는 주문 상품이 없기 때문에 이 같이 설정했습니다.
        name: "테스트 상품",
        amount: 100, // 총 결제 금액
        buyer_email: "test@test.com",
        buyer_name: "test",
        buyer_tel: "010-1234-5678",
        buyer_addr: "seoul",
        buyer_postcode: "123-456",
      },
      function (rsp) {
        // callback
        if (rsp.success) {
          console.log("success", rsp);
          const params = {
            imp_uid: rsp.imp_uid,
          };
        } else {
          console.log("fail");
        }
      }
    );
  };
  /* Function : 결제 수단 */
  const handlePayMethod = (e) => {
    console.log(e.target.value);
    if (e.target.value == "general") setIsMethod(true);
  };

  /* Function : 동의 여부 확인 */
  const handleAgreement = (e) => {
    if (
      e.target.value == "agree1" ||
      e.target.value == "agree2" ||
      e.target.type == "radio"
    ) {
      if (e.target.checked) {
        setIsContinue((prevState) => prevState + 1);
      } else {
        setIsContinue((prevState) => prevState - 1);
      }
    }
  };

  /* Function : 예약하기 */
  const requestReserve = (e) => {
    console.log(restaurantId, detail, deposit);
    const year = detail.date.getFullYear();
    const month = String(detail.date.getMonth() + 1).padStart(2, "0");
    const date = String(detail.date.getDate()).padStart(2, "0");

    const info = {
      visitDateTime:
        year + "-" + month + "-" + date + " " + detail.time + ":00",
      numberOfPeople: detail.people,
      memo: memo,
      amountToPay: deposit,
    };
    
    // 1. 예약 생성하기
    createReservation(restaurantId, info)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    // 2. 나의 예약 화면으로 이동
    navigate("/mydining/my");
  };

  /* Function : 식당 예약 메모 저장 */
  const handleMemo = (e) => {
    if (!e.target.value) return;
    setMemo(e.target.value);
  };

  /* 결제에 필요 */
  useEffect(() => {
    const jquery = document.createElement("script");
    jquery.src = "http://code.jquery.com/jquery-1.12.4.min.js";
    const iamport = document.createElement("script");
    iamport.src = "http://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, []);

  useEffect(() => {
    /* 카운트다운 */
    const countdown = setInterval(() => {
      if (parseInt(sec) > 0) {
        setSec(parseInt(sec) - 1);
      }
      if (parseInt(sec) === 0) {
        if (parseInt(min) === 0) {
          clearInterval(countdown);
        } else {
          setMin(parseInt(min) - 1);
          setSec(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [min, sec]);

  useEffect(() => {
    // 예약금 없으면 - 바로 예약
    // 예약금 있으면 - 결제 후 예약
    if (isContinue >= 3) {
      setIsReserveAble(true);
    } else {
      setIsReserveAble(false);
    }
  }, [isContinue]);

  const week = ["일", "월", "화", "수", "목", "금", "토"];
  return (
    <>
      <Maincontent>
        <div className="__reservation-timer">
          <span className="__timer">
            {min}:{sec}
          </span>
          <p className="font-12">7분간 예약 찜! 시간 내 예약을 완료해주세요.</p>
        </div>
        <div className="space-35"></div>
        <section className="section">
          <div className="container gutter-sm">
            <div className="section-header">
              <h3 className="section-title font-18">예약 정보</h3>
            </div>
            <div className="section-body">
              <div className="summary-info mb-[10px]">
                <p className="plain-txt">
                  {String(detail.date.getMonth() + 1).padStart(2, "0")}월
                  {String(detail.date.getDate()).padStart(2, "0")}일{" "}
                  {week[detail.date.getDay()]}.{" "}
                  {detail.time.substr(0, 2) > 12 ? "오후" : "오전"}{" "}
                  {`${detail.time.substr(0, 2) % 12}:${detail.time.substr(
                    3,
                    4
                  )}`}
                  . {detail.people}명
                </p>
              </div>
            </div>
          </div>
        </section>
        {deposit ? (
          <div>
            <hr className="seperator mt-[24px] mb-[24px]" />
            <section className="section">
              <div className="container gutter-sm">
                <div className="section-header">
                  <h3 className="section-title font-18">결제 수단</h3>
                </div>
                <div className="section-body mt-[24px]">
                  <label className="label-checkbox label-checkbox-btn mt-[15px] mb-[15px]">
                    <input
                      type="radio"
                      className="checkbox-btn radio-btn"
                      value="general"
                      onChange={handlePayMethod}
                    ></input>
                    <span className="label">일반 결제</span>
                  </label>
                  {isMethod ? (
                    <div className="checkout-methods">
                      <div className="__item" id="reservation_payment">
                        <label>
                          <input
                            type="radio"
                            name="checkout-method"
                            onClick={handleAgreement}
                          ></input>
                          <span className="__kakaopay">카카오페이</span>
                        </label>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </section>
            <hr className="seperator mt-[24px] mb-[24px]" />
            <section>
              <div className="container gutter-sm">
                <div className="section-header">
                  <h3 className="section-title font-18">
                    주문 내용 확인 및 결제 동의
                  </h3>
                </div>
                <div>
                  <label className="label-checkbox label-checkbox-btn mt-[15px] mb-[15px]">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      value="agree1"
                      onClick={handleAgreement}
                    ></input>
                    <span className="label">
                      [필수] 결제 대행 서비스 이용 약관 동의
                    </span>
                  </label>
                </div>
                <div>
                  <label className="label-checkbox label-checkbox-btn mt-[15px] mb-[15px]">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      value="agree2"
                      onClick={handleAgreement}
                    ></input>
                    <span className="label">
                      [필수] 취소 및 환불 규정에 동의합니다.
                    </span>
                  </label>
                </div>
              </div>
            </section>
          </div>
        ) : (
          <div>
            <hr className="seperator mt-[24px] mb-[24px]" />
            <section className="section">
              <div className="container gutter-sm">
                <div className="section-header">
                  <h3 className="section-title font-18">고객 요청사항</h3>
                </div>
                <div className="section-body">
                  <div className="select-textarea">
                    <textarea
                      className="form-input"
                      placeholder="레스토랑에 요청하실 내용을 입력해주세요."
                      rows="4"
                      onChange={handleMemo}
                    ></textarea>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </Maincontent>
      <ReserveButton className="reserve-button">
        <div className="wrapper">
          <div className="detail flex justify-center align-center">
            <div className="reserve">
              <span>예약정보</span>
              <div>
                <div>
                  {String(detail.date.getMonth() + 1).padStart(2, "0")}월
                  {String(detail.date.getDate()).padStart(2, "0")}일 (
                  {week[detail.date.getDay()]})
                  {detail.time.substr(0, 2) > 12 ? "오후" : "오전"}{" "}
                  {`${detail.time.substr(0, 2) % 12}:${detail.time.substr(
                    3,
                    4
                  )}`}
                </div>
              </div>
            </div>
            {deposit ? (
              <div className="reserve">
                <span>결제금액</span>
                <div>
                  <div>10,000원</div>
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="btn-section">
              {deposit ? (
                <button
                  type="button"
                  className={`flex justify-center align-center payment-btn 
                                ${
                                  isReserveAble ? "color-btn" : "disabled-btn"
                                }`}
                  onClick={requestPay}
                >
                  <span>결제하기</span>
                </button>
              ) : (
                <button
                  type="button"
                  className="flex justify-center align-center color-btn"
                  onClick={requestReserve}
                >
                  에약하기
                </button>
              )}
            </div>
          </div>
        </div>
      </ReserveButton>
    </>
  );
}

const Maincontent = styled.main`
  margin-top: 47px;

  .__reservation-timer {
    position: sticky;
    top: 48px;
    z-index: 99;
    padding: 12px 20px;
    background: #f9f9f9;
    display: flex;
    align-items: center;
  }
  .__reservation-timer .__timer {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70px;
    height: 32px;
    color: #0091ff;
    background: #e8f2f9;
    border-radius: 8px;
    margin-right: 12px;
  }
`;
const ReserveButton = styled.aside`
  position: fixed;
  display: flex;
  bottom: 0;
  z-index: 99;
  flex-direction: column;
  max-width: 480px;
  width: 100vw;

  .wrapper {
    background: #ffffff;
    box-shadow: 0 0 20px #0000001a;
    border-radius: 20px 20px 0 0;
  }
  .detail {
    flex-direction: column;
    gap: 4px;
    padding: 20px 24px 8px;
  }
  .detail .reserve {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .btn-section {
    display: flex;
    padding: 8px;
    position: relative;
    width: 100%;
  }
  .color-btn {
    display: flex;
    background: #ff3d00;
    color: #ffffff;
    padding: 14px;
    width: 100%;
    border-radius: 6px;
  }
`;
