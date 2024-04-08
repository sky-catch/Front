import Drawer from "react-modern-drawer";
import styled from "styled-components";
/**
 * 식당 저장 완료창
 * @author jimin
 */
const SaveConfirmComponent = ({isSave, toggleDrawer}) => {
    return(
        <div>
            <Drawer
                open={isSave}
                direction="bottom"
                className="drawer-box"
                size="120px"
            >
                <CloseBtn className="closeSaveModal" type="button" open={isSave} onClick={toggleDrawer}>
                    X
                </CloseBtn>
                <DrawerContents className="container">
                    <div className="flex justify-between">
                        <h2>매장이 저장되었습니다.</h2>
                        <button className="drawer-edit-button">저장 목록 편집 <i></i></button>
                    </div>
                    <p>저장한 매장의 새로운 소식과 혜택을 알려드립니다.</p>
                </DrawerContents>
            </Drawer>
        </div>
    )
};
export default SaveConfirmComponent;
const CloseBtn = styled.button`
    position : fixed;
    top : -20%;
    right : 5%;
    color : #ffffff;
`;
const DrawerContents = styled.div`
    padding : 24px 20px 18px;

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