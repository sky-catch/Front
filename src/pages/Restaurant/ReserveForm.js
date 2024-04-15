import { useEffect, useState } from "react";
import styled from "styled-components";
import { requestPayment } from "../../respository/payment";

/**
 * 예약화면
 * @author jimin
 */
export default function ReserveForm() {
    const [min, setMin] = useState(7);
    const [sec, setSec] = useState(0);

    /* Funciton : 결제 */
    const requestPay = () => {
        const { IMP } = window;
        IMP.init('가맹점식별코드');
        IMP.request_pay({
            imp_uid : "imp_00000000",
            reservation_id : 1   
        })

        console.log(IMP);
        requestPayment()
            .then((res)=> {
                console.log(res);
            })
    };

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

    useEffect(()=>{
        /* 카운트다운 */
        const countdown = setInterval(()=>{
            if (parseInt(sec) > 0) {
                setSec(parseInt(sec) - 1);
            }
            if (parseInt(sec) === 0) {
                if(parseInt(min) === 0) {
                    clearInterval(countdown);
                } else {
                    setMin(parseInt(min)-1);
                    setSec(59);
                }
            }
        },1000);
        return () => clearInterval(countdown);
    },[min,sec]);

    return(
        <>
            <Maincontent>
                <div className="__reservation-timer">
                    <span className="__timer">{min}:{sec}</span>
                    <p className="font-12">7분간 예약 찜! 시간 내 예약을 완료해주세요.</p>
                </div>
                <div className="space-35"></div>
            </Maincontent>
            <ReserveButton className="reserve-button">
                <div className="wrapper">
                    <div className="detail flex justify-center align-center">
                        <div className="reserve">
                            <span>예약정보</span>
                            <div>
                                <div>04월 15일(월) 오후 18:00</div>
                            </div>
                        </div>
                        <div className="btn-section">
                            <button type="button" className="color-btn flex justify-center align-center" onClick={requestPay}>
                                <span>결제하기</span>
                            </button>
                        </div>
                    </div>
                </div>
            </ReserveButton>
        </>
    )
}

const Maincontent = styled.main`
    margin-top: 47px;

    .__reservation-timer {
        position : sticky;
        top : 48px;
        z-index : 99;
        padding : 12px 20px;
        background: #f9f9f9;
        display : flex;
        align-items : center;
    }
    .__reservation-timer .__timer {
        display : flex;
        align-items : center;
        justify-content : center;
        width  :70px;
        height : 32px;
        color : #0091ff;
        background : #e8f2f9;
        border-radius : 8px;
        margin-right : 12px;
    }
`;
const ReserveButton = styled.aside`
    position : fixed;
    display : flex;
    bottom : 0;
    z-index : 99;
    flex-direction : column;
    max-width : 480px;
    width : 100vw;
    
    .wrapper{
        background : #ffffff;
        box-shadow: 0 0 20px #0000001a;
        border-radius : 20px 20px 0 0;
    }
    .detail {
        flex-direction : column;
        gap : 4px;
        padding : 20px 24px 8px;
    }
    .detail .reserve {
        display : flex;
        justify-content : space-between;
        width : 100%;
    }
    .btn-section {
        display : flex;
        padding : 8px;
        position : relative;
        width : 100%;
    }
    .color-btn {
        display : flex;
        background : #FF3D00;
        color : #ffffff;
        padding : 14px;
        width : 100%;
        border-radius: 6px;
    }
`;