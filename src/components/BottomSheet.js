import { useEffect } from "react";

const BottomSheet = ({visible, getVisible}) => {
    
    function offBottomSheet () {
        getVisible(!visible)
    };

    return(
        <>
            <div className="bg-dim" onClick={offBottomSheet}></div>
            <div className="bottomsheet-container">
                
            </div>
        </>
    );
};

export default BottomSheet;