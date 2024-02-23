import styled from "styled-components";
export default function MyDining() {
  const menuClick = () => {};
  return (
    <MyDiningContents className="">
      <ul className="tab-menu sticky top-[47px] left-0">
        <li className=" w-[50%] leading-[48px] text-center" onClick={menuClick}>
          나의 예약
        </li>
        <li className="w-[50%] leading-[48px] text-center " onClick={menuClick}>
          빈자리 알림
        </li>
      </ul>
    </MyDiningContents>
  );
}

const MyDiningContents = styled.div`
  height: calc(100vh - 49px);
  padding-top: 47px;
  box-sizing: border-box;
`;
