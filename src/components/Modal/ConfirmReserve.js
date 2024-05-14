import { useEffect, useState } from "react";
import Drawer from "react-modern-drawer";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
/**
 * 식당 에약 완료 모달창
 * 
 * @author jimin
 */
const ConfirmReserve = ({isConfirmOpen, restaurant, reserveInfo, toggleDrawer}) => {
    const navigate = useNavigate();
    const [detail, setDetail] = useState();

    const onReserve = () => {
        const params = {
            cost : 0,
            detail : detail,
            restaurant : restaurant
        }
       
        navigate(`/ct/shop/reservation/form`, {state : params});
    }

    const onClose = (e) => {
        toggleDrawer(e);
    }

    useEffect(()=> {
        setDetail(reserveInfo);
        // console.log(detail,reserveInfo);
    },[restaurant,reserveInfo])

    return(
        <div>
            <Drawer
                open={isConfirmOpen}
                direction="bottom"
                className="drawer-box"
                size="480px"
            >
                <DrawerContents className="drawer-box">
                    <div className="drawer-header flex justify-between">
                        <h2>내일 방문이 맞으신가요?</h2>
                    </div>
                    <div className="progress"><div className="bar"></div></div>
                    <div className="drawer-box-body">
                        <div className="font-16 color-gray mb-[24px]">방문 일정을 다시 한번 확인해 주세요.</div>
                        <div className="border-box mb-25">
                            <div className="restaurant-reservation-detail">
                                <div className="detail-box-header">
                                    <h2 className="name">{restaurant ? restaurant.name:""}</h2>
                                    <h3 className="type">{restaurant ? restaurant.category:""}</h3>
                                </div>
                                <div className="detail-box-body">
                                    <div className="options-with-icon">
                                        <div className="date">{detail ? detail.date.getMonth()+1 +'월'+ detail.date.getDate()+'일' :""}</div>
                                        <div className="time">{detail ? detail.time :""}</div>
                                        <div className="people">{detail ? detail.people+'명' :""}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="font-16 color-gray">당일취소 및 노쇼는 레스토랑뿐만 아니라 다른 고객님께도 피해가 될 수 있으므로 신중히 예약 부탁드립니다.</div>
                    </div>
                    <div className="drawer-box-footer">
                        <div className="btn-group">
                            <button className="confirm-close btn btn-lg btn-outline" open={isConfirmOpen} onClick={onClose}>취소</button>
                            <button className="btn btn-lg btn-red" onClick={onReserve}>확인</button>
                        </div>
                    </div>
                </DrawerContents>
            </Drawer>
        </div>
    )
}
export default ConfirmReserve;

const DrawerContents = styled.div`
    .drawer-header {
        padding : 18px 20px;
    }
    .progress {
        position : relative;
        background : #f1f1f1;
        height : 3px;
    }
    .progress .bar {
        position : absolute;
        left : 0;
        top : 0;
        background : #ff3d00;
        height : 100%;
        width : 50%;
    }
    div h2 {
        font-weight : 700;
        font-size : 16px;
        line-height : 150%;
    }
    div .drawer-edit-button {
        display : flex;
        font-size : 12px;
    }
    p {
        font-weight : 400;
        font-size : 12px;
        line-height : 150%;
    }
`;