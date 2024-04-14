import Drawer from "react-modern-drawer";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
/**
 * 식당 에약 완료 모달창
 */
const ConfirmReserve = ({isConfirmOpen, toggleDrawer, info}) => {
    const navigate = useNavigate();

    const onReserve = () => {
        navigate(`/ct/shop/reservation/form`, {state : info});
    }

    return(
        <div>
            <Drawer
                open={true}
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
                        <div></div>
                        <div className="font-16 color-gray">당일취소 및 노쇼는 레스토랑뿐만 아니라 다른 고객님께도 피해가 될 수 있으므로 신중히 예약 부탁드립니다.</div>
                    </div>
                    <div className="drawer-box-footer">
                        <div className="btn-group">
                            <button className="btn btn-lg btn-outline">취소</button>
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