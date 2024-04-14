import styled from "styled-components";

/**
 * 예약화면
 * @author jimin
 */
export default function ReserveForm() {
    return(
        <>
            <main>
                <div className="__reservation-timer"></div>
                <div className="space-35"></div>
            </main>
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
                            <button type="button" className="color-btn flex justify-center align-center"><span>예약하기</span></button>
                        </div>
                    </div>
                </div>
            </ReserveButton>
        </>
    )
}

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