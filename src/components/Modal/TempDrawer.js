import Drawer from "react-modern-drawer";

/**
 * 준비중 모달
 * 
 * @param {*} param0 
 * @returns 
 */

export const TempDrawer = ({isOpen, toggleDrawer}) => {
    return(
        <Drawer
            open={isOpen}
            onClose={toggleDrawer}
            direction="bottom"
            className="drawer-box custom-box"
            size="calc(100vh - 780px)"
            >
            <div className="drawer-box-header">
                <div className="name">아직 준비중입니다.</div>
                <div className="delete-btn" onClick={toggleDrawer}>x</div>
            </div>
            <div className="drawer-box-body">
                <p>
                아직 준비중입니다. 빠른 시일 내에 완료하도록 하겠습니다.
                조금만 기다려주세요. 감사합니다 :) 
                </p>
            </div>
        </Drawer>
    )
}