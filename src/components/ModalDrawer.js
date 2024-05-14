import React, { useEffect } from "react";
import Drawer from "react-modern-drawer";

/**
 * 기본모달 (위치정보없음)
 * 
 * @param {*} param0 
 * @returns 
 */
const ModalDrawer = ({isOpen, toggleDrawer}) => {

    /* function : 닫기 */
    const handleClose = (e) => {
        toggleDrawer(e);
    };

    return (
        <Drawer
            open={isOpen}
            onClose={toggleDrawer}
            direction="bottom"
            className="drawer-box"
            size="calc(100vh - 700px)"
        >
            <div className="drawer-box-header">
                <h2>위치 정보를 사용할 수 없습니다.</h2>
            </div>
            <div className="drawer-box-body">
                <p className="color-gray">위치 정보 사용을 원하시면 브라우저 설정에서 위치 정보 사용 권한을 허용해주시기 바랍니다.</p>
            </div>
            <div className="drawer-box-footer">
                <div className="btn-group">
                    <button className="btn btn-lg btn-red"onClick={(e) => handleClose(e)}>닫기</button>
                </div>
            </div>
        </Drawer>
    )
}

export default ModalDrawer;