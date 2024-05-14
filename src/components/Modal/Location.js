import { useEffect } from "react";
import Drawer from "react-modern-drawer";

/**
 * 위치 정보 모달창
 * 
 * @author jimin
 */
const {kakao} = window;



export const LocationDrawer = ({isOpen, toggleDrawer, info}) => {

    useEffect(()=>{
        const lat = info ? info.lat : 0;
        const lng = info ? info.lng : 0;

        var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        var options = { //지도를 생성할 때 필요한 기본 옵션
            center: new kakao.maps.LatLng(lat, lng), //지도의 중심좌표.
            level: 3 //지도의 레벨(확대, 축소 정도)
        };

        var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

        // 마커가 표시될 위치입니다 
        var markerPosition  = new kakao.maps.LatLng(lat, lng); 

        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
            position: markerPosition
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);
    },[info])

    return(
        <Drawer 
            open={isOpen}
            onClose={toggleDrawer}
            direction="bottom"
            className="drawer-box custom-box"
            size="calc(100vh - 380px)"
            >
                <div className="drawer-box-header">
                    <div className="name">{info ? info.name :''}</div>
                    <div className="delete-btn" onClick={toggleDrawer}>x</div>
                </div>
                <div className="drawer-box-body">
                    <div className="address">{info ? `${info.address} ${info.detailAddress}` : ''}</div>
                    <div id="map" className="kakao-address">
                    </div>
                </div>
        </Drawer>
    )
}